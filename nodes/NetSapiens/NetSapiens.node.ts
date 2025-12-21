import type {
	IExecuteFunctions,
	IDataObject,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodeProperties,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

import { operationMap, operations, resources } from '../../generated/openapi';
import { operationOverrides, resourceOverrides } from '../../overrides/operations.overrides';
import {
	netSapiensRequest,
	replacePathParams,
	resolveBaseUrl,
	toHttpRequestMethod,
} from '../../transport/request';

type Options = INodePropertyOptions;

type CacheEntry = {
	fetchedAtMs: number;
	options: INodePropertyOptions[];
};

const resellersCacheByBaseUrl = new Map<string, CacheEntry>();
const domainsCacheByBaseUrl = new Map<string, CacheEntry>();
const usersCacheByBaseUrlAndDomain = new Map<string, CacheEntry>();

const loadOptionsTtlMs = 15 * 60 * 1000;

const resellerAwareOperationIds = operations
	.filter((op) => op.parameters.some((p) => p.in === 'query' && p.name === 'reseller'))
	.map((op) => op.id);

function normalizeResourceName(resource: string): string {
	return resource.trim();
}

function toTitleCase(input: string): string {
	const lowerWords = new Set([
		'a',
		'an',
		'and',
		'as',
		'at',
		'by',
		'for',
		'from',
		'in',
		'of',
		'on',
		'or',
		'the',
		'to',
		'with',
	]);

	const acronyms: Record<string, string> = {
		api: 'API',
		cdr: 'CDR',
		id: 'ID',
		ids: 'IDs',
		ip: 'IP',
		ips: 'IPs',
		jwt: 'JWT',
		mac: 'MAC',
		mfa: 'MFA',
		mms: 'MMS',
		sms: 'SMS',
		uid: 'UID',
		url: 'URL',
		urls: 'URLs',
	};

	const words = input
		.replace(/[_-]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.split(' ')
		.filter(Boolean);

	return words
		.map((raw, index) => {
			const cleaned = raw.trim();
			const lower = cleaned.toLowerCase();

			if (acronyms[lower]) {
				return acronyms[lower];
			}

			if (index > 0 && lowerWords.has(lower)) {
				return lower;
			}

			if (cleaned.toUpperCase() === cleaned && cleaned.length <= 5) {
				return cleaned;
			}

			return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
		})
		.join(' ');
}

function removeRedundantPrefix(label: string, resource: string): string {
	const trimmed = label.trim();
	const resourceVariants = new Set([
		resource,
		resource.replace(/\//g, ' '),
		resource.split('/')[0] ?? resource,
	]);

	for (const variant of resourceVariants) {
		const v = variant.trim();
		if (!v) {
			continue;
		}

		if (trimmed.toLowerCase().startsWith(`${v.toLowerCase()} `)) {
			return trimmed.slice(v.length + 1).trim();
		}
	}

	return trimmed;
}

function formatOperationLabel(resource: string, label: string): string {
	return toTitleCase(removeRedundantPrefix(label, resource));
}

function formatParameterLabel(name: string): string {
	return toTitleCase(name);
}

function normalizeArrayResponse(response: unknown): unknown[] {
	if (Array.isArray(response)) {
		return response;
	}

	if (response && typeof response === 'object') {
		const record = response as Record<string, unknown>;

		for (const key of ['items', 'data', 'domains', 'resellers']) {
			const value = record[key];
			if (Array.isArray(value)) {
				return value;
			}
		}
	}

	return [];
}

function getResourceOptions(): Options[] {
	const options: Options[] = [
		{
			name: 'Raw',
			value: 'raw',
		},
	];

	for (const resource of resources) {
		const override = resourceOverrides[resource];
		if (override?.hidden) {
			continue;
		}

		options.push({
			name: override?.displayName ?? normalizeResourceName(resource),
			value: resource,
		});
	}

	return options;
}

function getOperationOptionsForResource(resource: string): Options[] {
	const resourceOperations = operations
		.filter((o) => {
			const override = operationOverrides[o.id];
			const effectiveResource = override?.resource ?? o.resource;
			return effectiveResource === resource && !override?.hidden;
		})
		.map((o) => {
			const override = operationOverrides[o.id];
			const baseLabel = override?.displayName ?? o.summary ?? o.id;
			const label = formatOperationLabel(resource, baseLabel);
			return {
				name: label,
				value: o.id,
				action: label,
			};
		});

	resourceOperations.sort((a: Options, b: Options) => a.name.localeCompare(b.name));
	return resourceOperations;
}

function parameterName(operationId: string, location: string, name: string): string {
	return `${operationId}__${location}__${name}`;
}

function guessFieldType(schemaType: string | undefined): INodeProperties['type'] {
	if (schemaType === 'integer' || schemaType === 'number') {
		return 'number';
	}

	if (schemaType === 'boolean') {
		return 'boolean';
	}

	return 'string';
}

function toIDataObject(value: unknown): IDataObject {
	if (value === null || value === undefined) {
		return {};
	}

	if (typeof value === 'object' && !Array.isArray(value)) {
		return value as IDataObject;
	}

	return { value };
}

function parseJsonBodyParameter(value: unknown): unknown {
	if (value === null || value === undefined || value === '') {
		return {};
	}

	if (typeof value === 'string') {
		try {
			return JSON.parse(value);
		} catch {
			return value;
		}
	}

	return value;
}

function getFirstStringField(value: Record<string, unknown>, keys: string[]): string {
	for (const key of keys) {
		const entry = value[key];
		if (typeof entry === 'string') {
			const trimmed = entry.trim();
			if (trimmed) {
				return trimmed;
			}
		}
	}

	return '';
}

function buildOperationParameterFields(): INodeProperties[] {
	const fields: INodeProperties[] = [];

	for (const op of operations) {
		const override = operationOverrides[op.id];
		if (override?.hidden) {
			continue;
		}

		const effectiveResource = override?.resource ?? op.resource;
		const hasDomainPathParam = op.parameters.some((p) => p.in === 'path' && p.name === 'domain');
		const domainParamFieldName = hasDomainPathParam
			? parameterName(op.id, 'path', 'domain')
			: undefined;

		for (const param of op.parameters) {
			const isPathOrQuery = param.in === 'path' || param.in === 'query';
			if (!isPathOrQuery) {
				continue;
			}

			if (param.in === 'query' && param.name === 'reseller' && effectiveResource !== 'Resellers') {
				continue;
			}

			const isDomainParam = param.name === 'domain' && effectiveResource !== 'Domains';
			const isDomainScopedUserParam =
				param.in === 'path' &&
				param.name === 'user' &&
				Boolean(domainParamFieldName) &&
				effectiveResource !== 'Users';

			fields.push({
				displayName: formatParameterLabel(param.name),
				name: parameterName(op.id, param.in, param.name),
				type:
					isDomainParam || isDomainScopedUserParam
						? 'options'
						: guessFieldType(param.schemaType),
				typeOptions: isDomainParam
					? {
							loadOptionsMethod: 'getDomains',
						}
					: isDomainScopedUserParam
						? {
								loadOptionsMethod: 'getUsersForDomain',
								loadOptionsDependsOn: [domainParamFieldName as string],
							}
						: undefined,
				default: '',
				required: param.required,
				displayOptions: {
					show: {
						resource: [effectiveResource],
						operation: [op.id],
					},
				},
				description: param.description,
			});
		}

		if (op.hasRequestBody) {
			fields.push({
				displayName: 'Body',
				name: `${op.id}__body`,
				type: 'json',
				default: '{}',
				displayOptions: {
					show: {
						resource: [effectiveResource],
						operation: [op.id],
					},
				},
			});
		}
	}

	return fields;
}

export class NetSapiens implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'NetSapiens',
		name: 'netSapiens',
		icon: { light: 'file:NetSapiens.svg', dark: 'file:NetSapiens.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Interact with the NetSapiens API',
		defaults: {
			name: 'NetSapiens',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'netSapiensApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Refresh Dropdown Cache',
				name: 'refreshOptions',
				type: 'boolean',
				default: false,
				description: 'Whether to bypass cached dropdown values and fetch fresh options',
				noDataExpression: true,
			},
			{
				displayName: 'Reseller Name or ID',
				name: 'reseller',
				type: 'options',
				default: '',
				typeOptions: {
					loadOptionsMethod: 'getResellers',
				},
				displayOptions: {
					show: {
						operation: resellerAwareOperationIds,
					},
					hide: {
						resource: ['Resellers', 'raw'],
					},
				},
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: getResourceOptions(),
				default: '',
				noDataExpression: true,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [{ name: 'Raw API Request', value: 'rawRequest', action: 'Raw API request' }],
				default: 'rawRequest',
				displayOptions: {
					show: {
						resource: ['raw'],
					},
				},
				noDataExpression: true,
			},
			...resources.map((resource: string) => {
				const options = getOperationOptionsForResource(resource);

				return {
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					options,
					default: '',
					displayOptions: {
						show: {
							resource: [resource],
						},
					},
					noDataExpression: true,
				} as INodeProperties;
			}),
			{
				displayName: 'Method',
				name: 'rawMethod',
				type: 'options',
				default: 'GET',
				options: [
					{ name: 'DELETE', value: 'DELETE' },
					{ name: 'GET', value: 'GET' },
					{ name: 'PATCH', value: 'PATCH' },
					{ name: 'POST', value: 'POST' },
					{ name: 'PUT', value: 'PUT' },
				],
				displayOptions: {
					show: {
						resource: ['raw'],
						operation: ['rawRequest'],
					},
				},
			},
			{
				displayName: 'Endpoint',
				name: 'rawEndpoint',
				type: 'string',
				default: '/',
				placeholder: '/domains',
				displayOptions: {
					show: {
						resource: ['raw'],
						operation: ['rawRequest'],
					},
				},
			},
			{
				displayName: 'Query Parameters',
				name: 'rawQuery',
				type: 'fixedCollection',
				default: {},
				placeholder: 'Add Parameter',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'parameters',
						displayName: 'Parameters',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
				displayOptions: {
					show: {
						resource: ['raw'],
						operation: ['rawRequest'],
					},
				},
			},
			{
				displayName: 'Body',
				name: 'rawBody',
				type: 'json',
				default: '{}',
				displayOptions: {
					show: {
						resource: ['raw'],
						operation: ['rawRequest'],
					},
				},
			},
			...buildOperationParameterFields(),
		],
	};

	methods = {
		loadOptions: {
			async getResellers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = (await this.getCredentials('netSapiensApi')) as {
					server?: string;
					baseUrl?: string;
				};
				const baseUrl = resolveBaseUrl(credentials);
				const shouldRefresh = Boolean(this.getCurrentNodeParameter('refreshOptions') ?? false);

				const now = Date.now();
				const cached = resellersCacheByBaseUrl.get(baseUrl);
				if (!shouldRefresh && cached && cached.options.length && now - cached.fetchedAtMs < loadOptionsTtlMs) {
					return cached.options;
				}

				const url = `${baseUrl}/resellers`;
				const response = await netSapiensRequest(this, {
					method: toHttpRequestMethod('GET'),
					url,
				});

				const items = normalizeArrayResponse(response);

				const options: INodePropertyOptions[] = [];

				for (const item of items) {
					const value = item as Record<string, unknown>;
					const reseller = value.reseller;
					const description = value.description;

					if (typeof reseller !== 'string' || !reseller) {
						continue;
					}

					const name = typeof description === 'string' && description ? description : reseller;
					options.push({
						name,
						value: reseller,
					});
				}

				options.sort((a, b) => a.name.localeCompare(b.name));

				resellersCacheByBaseUrl.set(baseUrl, { fetchedAtMs: now, options });
				return options;
			},

			async getDomains(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = (await this.getCredentials('netSapiensApi')) as {
					server?: string;
					baseUrl?: string;
				};
				const baseUrl = resolveBaseUrl(credentials);
				const shouldRefresh = Boolean(this.getCurrentNodeParameter('refreshOptions') ?? false);

				const now = Date.now();
				const cached = domainsCacheByBaseUrl.get(baseUrl);
				if (!shouldRefresh && cached && cached.options.length && now - cached.fetchedAtMs < loadOptionsTtlMs) {
					return cached.options;
				}

				const url = `${baseUrl}/domains`;
				const response = await netSapiensRequest(this, {
					method: toHttpRequestMethod('GET'),
					url,
				});

				const items = normalizeArrayResponse(response);

				const options: INodePropertyOptions[] = [];

				for (const item of items) {
					const value = item as Record<string, unknown>;
					const domain = value.domain;

					if (typeof domain !== 'string' || !domain) {
						continue;
					}

					options.push({
						name: domain,
						value: domain,
					});
				}

				options.sort((a, b) => a.name.localeCompare(b.name));

				domainsCacheByBaseUrl.set(baseUrl, { fetchedAtMs: now, options });
				return options;
			},

			async getUsersForDomain(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = (await this.getCredentials('netSapiensApi')) as {
					server?: string;
					baseUrl?: string;
				};
				const baseUrl = resolveBaseUrl(credentials);

				const operationId = this.getCurrentNodeParameter('operation') as string | undefined;
				if (!operationId) {
					return [];
				}

				const domainParamName = parameterName(operationId, 'path', 'domain');
				const domainValue = this.getCurrentNodeParameter(domainParamName) as string | undefined;
				const domain = typeof domainValue === 'string' ? domainValue.trim() : '';

				if (!domain) {
					return [];
				}

				const shouldRefresh = Boolean(this.getCurrentNodeParameter('refreshOptions') ?? false);
				const cacheKey = `${baseUrl}::${domain}`;

				const now = Date.now();
				const cached = usersCacheByBaseUrlAndDomain.get(cacheKey);
				if (!shouldRefresh && cached && cached.options.length && now - cached.fetchedAtMs < loadOptionsTtlMs) {
					return cached.options;
				}

				const url = `${baseUrl}/domains/${encodeURIComponent(domain)}/users`;
				const response = await netSapiensRequest(this, {
					method: toHttpRequestMethod('GET'),
					url,
				});

				const items = normalizeArrayResponse(response);
				const options: INodePropertyOptions[] = [];

				for (const item of items) {
					const value = item as Record<string, unknown>;
					const rawUser =
						value.user ??
						value.id ??
						value.uid ??
						value.user_id ??
						value.userId ??
						value.userid ??
						value.userID;
					const userId =
						typeof rawUser === 'string' || typeof rawUser === 'number'
							? String(rawUser).trim()
							: '';

					if (!userId) {
						continue;
					}

					const serviceCode = getFirstStringField(value, [
						'service-code',
						'service_code',
						'serviceCode',
					]);
					const loginUsername = getFirstStringField(value, [
						'login-username',
						'login_username',
						'loginUsername',
						'login',
						'username',
					]);
					const firstName = getFirstStringField(value, [
						'name-first-name',
						'name_first_name',
						'firstName',
						'first_name',
					]);
					const lastName = getFirstStringField(value, [
						'name-last-name',
						'name_last_name',
						'lastName',
						'last_name',
					]);

					const fullName = [firstName, lastName].filter(Boolean).join(' ');

					let label = '';
					if (serviceCode) {
						label = `${userId} - ${serviceCode.toUpperCase()}`;
					} else {
						const parts = [userId];
						if (loginUsername) {
							parts.push(loginUsername);
						}
						if (fullName) {
							parts.push(fullName);
						}
						label = parts.join(' - ');
					}

					options.push({
						name: label,
						value: userId,
					});
				}

				options.sort((a, b) => a.name.localeCompare(b.name));
				usersCacheByBaseUrlAndDomain.set(cacheKey, { fetchedAtMs: now, options });
				return options;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = (await this.getCredentials('netSapiensApi')) as {
			server?: string;
			baseUrl?: string;
		};
		const baseUrl = resolveBaseUrl(credentials);

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			const resource = this.getNodeParameter('resource', itemIndex) as string;
			const operationId = this.getNodeParameter('operation', itemIndex) as string;

			try {
				if (resource === 'raw' && operationId === 'rawRequest') {
					const method = toHttpRequestMethod(this.getNodeParameter('rawMethod', itemIndex) as string);
					const endpoint = this.getNodeParameter('rawEndpoint', itemIndex) as string;
					const rawQuery = this.getNodeParameter('rawQuery', itemIndex, {}) as {
						parameters?: Array<{ name: string; value: string }>;
					};
					const body = parseJsonBodyParameter(
						this.getNodeParameter('rawBody', itemIndex, '{}') as unknown,
					);

					const qs: IDataObject = {};
					for (const entry of rawQuery.parameters ?? []) {
						if (!entry.name) {
							continue;
						}
						qs[entry.name] = entry.value;
					}

					const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

					const response = await netSapiensRequest(this, {
						method,
						url,
						qs,
						body: method === 'GET' || method === 'DELETE' ? undefined : body,
					});

					if (Array.isArray(response)) {
						for (const entry of response) {
							returnData.push({ json: toIDataObject(entry) });
						}
					} else {
						returnData.push({ json: toIDataObject(response) });
					}

					continue;
				}

				if (!operationId) {
					throw new NodeOperationError(this.getNode(), 'Please select an operation', { itemIndex });
				}

				const operation = operationMap[operationId as keyof typeof operationMap];
				if (!operation) {
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operationId}`, { itemIndex });
				}

				const override = operationOverrides[operation.id];
				const effectiveResource = override?.resource ?? operation.resource;

				if (effectiveResource !== resource) {
					throw new NodeOperationError(
						this.getNode(),
						'Selected operation does not belong to selected resource',
						{
							itemIndex,
						},
					);
				}

				const pathParams: Record<string, unknown> = {};
				const queryParams: Record<string, unknown> = {};

				const resellerSelection = this.getNodeParameter('reseller', itemIndex, '') as string;
				if (
					resellerSelection &&
					operation.parameters.some((p) => p.in === 'query' && p.name === 'reseller') &&
					effectiveResource !== 'Resellers'
				) {
					queryParams.reseller = resellerSelection;
				}

				for (const param of operation.parameters) {
					if (param.in !== 'path' && param.in !== 'query') {
						continue;
					}

					if (param.in === 'query' && param.name === 'reseller' && effectiveResource !== 'Resellers') {
						continue;
					}

					const value = this.getNodeParameter(
						parameterName(operation.id, param.in, param.name),
						itemIndex,
						'',
					) as unknown;

					if (param.in === 'path') {
						pathParams[param.name] = value;
					} else {
						if (value !== '' && value !== undefined && value !== null) {
							queryParams[param.name] = value;
						}
					}
				}

				const resolvedPath = replacePathParams(operation.path, pathParams);

				if (resolvedPath.includes('{')) {
					const unresolved = Array.from(resolvedPath.matchAll(/\{([^}]+)\}/g)).map((m) => m[1]);
					const unresolvedText = unresolved.length ? unresolved.join(', ') : resolvedPath;
					throw new NodeOperationError(
						this.getNode(),
						`Missing required path parameter(s): ${unresolvedText}`,
						{
							itemIndex,
						},
					);
				}
				const url = `${baseUrl}${resolvedPath}`;

				const body = operation.hasRequestBody
					? parseJsonBodyParameter(
							this.getNodeParameter(`${operation.id}__body`, itemIndex, '{}') as unknown,
						)
					: undefined;

				const response = await netSapiensRequest(this, {
					method: toHttpRequestMethod(operation.method),
					url,
					qs: Object.keys(queryParams).length ? (queryParams as IDataObject) : undefined,
					body: operation.method === 'GET' || operation.method === 'DELETE' ? undefined : body,
				});

				if (Array.isArray(response)) {
					for (const entry of response) {
						returnData.push({ json: toIDataObject(entry) });
					}
				} else {
					returnData.push({ json: toIDataObject(response) });
				}
			} catch (error) {
				if (error instanceof NodeOperationError) {
					throw error;
				}

				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex });
			}
		}

		return [returnData];
	}
}
