import type {
	IExecuteFunctions,
	IDataObject,
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
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

type RequestMode = 'sync' | 'asyncAck' | 'asyncEcho';

type DisplayOptionsShow = NonNullable<INodeProperties['displayOptions']>['show'];

type Options = INodePropertyOptions;

type CacheEntry = {
	fetchedAtMs: number;
	options: INodePropertyOptions[];
};

type ApiVersionCacheEntry = {
	fetchedAtMs: number;
	major?: number;
	raw?: string;
};

const resellersCacheByBaseUrl = new Map<string, CacheEntry>();
const domainsCacheByBaseUrl = new Map<string, CacheEntry>();
const usersCacheByBaseUrlAndDomain = new Map<string, CacheEntry>();
const apiVersionCacheByBaseUrl = new Map<string, ApiVersionCacheEntry>();

const loadOptionsTtlMs = 15 * 60 * 1000;

function parseApiVersionMajor(version: unknown): number | undefined {
	if (typeof version === 'number' && Number.isFinite(version)) {
		return Math.trunc(version);
	}
	if (typeof version !== 'string') {
		return undefined;
	}
	const trimmed = version.trim();
	if (!trimmed) {
		return undefined;
	}
	const majorText = trimmed.split('.')[0];
	const major = Number.parseInt(majorText, 10);
	return Number.isFinite(major) ? major : undefined;
}

async function getServerApiVersion(
	context: IExecuteFunctions,
	baseUrl: string,
	options?: { refresh?: boolean },
): Promise<ApiVersionCacheEntry> {
	const refresh = Boolean(options?.refresh);
	const now = Date.now();
	const cached = apiVersionCacheByBaseUrl.get(baseUrl);
	if (!refresh && cached && now - cached.fetchedAtMs < loadOptionsTtlMs) {
		return cached;
	}

	try {
		const url = `${baseUrl}/version`;
		const response = await netSapiensRequest(context, {
			method: toHttpRequestMethod('GET'),
			url,
		});
		const data = response as Record<string, unknown>;
		const raw =
			(typeof data?.apiversion === 'string' || typeof data?.apiversion === 'number')
				? String(data.apiversion)
				: (typeof data?.apiVersion === 'string' || typeof data?.apiVersion === 'number')
					? String(data.apiVersion)
					: (typeof data?.['api-version'] === 'string' || typeof data?.['api-version'] === 'number')
						? String(data['api-version'])
						: undefined;

		const major = parseApiVersionMajor(raw);
		const entry: ApiVersionCacheEntry = { fetchedAtMs: now, major, raw };
		apiVersionCacheByBaseUrl.set(baseUrl, entry);
		return entry;
	} catch {
		const entry: ApiVersionCacheEntry = { fetchedAtMs: now };
		apiVersionCacheByBaseUrl.set(baseUrl, entry);
		return entry;
	}
}

function operationKey(operationId: string, key: string): string {
	return `${operationId}__templated__${key}`;
}

function operationBodyFieldKey(operationId: string, fieldName: string): string {
	return operationKey(operationId, `body__${fieldName}`);
}

function optionalFieldsKey(operationId: string): string {
	return operationKey(operationId, 'optionalFields');
}

function requestModeKey(operationId: string): string {
	return operationKey(operationId, 'requestMode');
}

function shouldShowTemplatedField(resource: string, operationId: string): DisplayOptionsShow {
	return {
		resource: [resource],
		operation: [operationId],
	};
}

function toOptionalString(value: unknown): string | undefined {
	if (value === null || value === undefined) {
		return undefined;
	}
	if (typeof value === 'string') {
		const trimmed = value.trim();
		return trimmed ? trimmed : undefined;
	}
	if (typeof value === 'number' && Number.isFinite(value)) {
		return String(value);
	}
	return undefined;
}

function toOptionalNumberValue(value: unknown): number | undefined {
	if (value === null || value === undefined || value === '') {
		return undefined;
	}
	if (typeof value === 'number' && Number.isFinite(value)) {
		return value;
	}
	if (typeof value === 'string') {
		const parsed = Number(value);
		return Number.isFinite(parsed) ? parsed : undefined;
	}
	return undefined;
}

const templatedUserCreateId = 'CreateUser';
const templatedUserUpdateId = 'UpdateUser';
const templatedUserDeleteId = 'DeleteUser';

const templatedUserResource = 'Users';

const createUserRequiredFields = ['user', 'name-first-name', 'name-last-name', 'email-address', 'user-scope'];

const updateUserRequiredFields = ['name-first-name', 'name-last-name', 'email-address', 'user-scope'];

const userCommonFields: Array<{
	displayName: string;
	name: string;
	type: INodeProperties['type'];
	default: INodeProperties['default'];
	required?: boolean;
	description?: string;
	options?: Array<{ name: string; value: string }>;
	typeOptions?: INodeProperties['typeOptions'];
}> = [
	{
		displayName: 'User',
		name: 'user',
		type: 'string',
		default: '',
		description: 'User extension number',
		required: true,
	},
	{
		displayName: 'First Name',
		name: 'name-first-name',
		type: 'string',
		default: '',
		required: true,
	},
	{
		displayName: 'Last Name',
		name: 'name-last-name',
		type: 'string',
		default: '',
		required: true,
	},
	{
		displayName: 'Login Username',
		name: 'login-username',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Email Address',
		name: 'email-address',
		type: 'string',
		default: '',
		required: true,
	},
	{
		displayName: 'User Scope',
		name: 'user-scope',
		type: 'options',
		default: 'Basic User',
		required: true,
		options: [
			{ name: 'Advanced User', value: 'Advanced User' },
			{ name: 'Basic User', value: 'Basic User' },
			{ name: 'Call Center Agent', value: 'Call Center Agent' },
			{ name: 'Call Center Supervisor', value: 'Call Center Supervisor' },
			{ name: 'NDP', value: 'NDP' },
			{ name: 'No Portal', value: 'No Portal ' },
			{ name: 'Office Manager', value: 'Office Manager' },
			{ name: 'Reseller', value: 'Reseller' },
			{ name: 'Simple User', value: 'Simple User' },
			{ name: 'Site Manager', value: 'Site Manager' },
			{ name: 'Super User', value: 'Super User' },
		],
	},
	{
		displayName: 'Department',
		name: 'department',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Site',
		name: 'site',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Time Zone',
		name: 'time-zone',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Voicemail Login PIN',
		name: 'voicemail-login-pin',
		type: 'string',
		default: '',
		typeOptions: { password: true },
	},
	{
		displayName: 'Privacy',
		name: 'privacy',
		type: 'options',
		default: 'no',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Dial Plan',
		name: 'dial-plan',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Dial Policy',
		name: 'dial-policy',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Status Message',
		name: 'status-message',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Directory Name Number DTMF Mapping',
		name: 'directory-name-number-dtmf-mapping',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Voicemail User Control Enabled',
		name: 'voicemail-user-control-enabled',
		type: 'options',
		default: 'yes',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Phone Numbers To Allow Enabled',
		name: 'phone-numbers-to-allow-enabled',
		type: 'options',
		default: 'yes',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Phone Numbers To Reject Enabled',
		name: 'phone-numbers-to-reject-enabled',
		type: 'options',
		default: 'yes',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Call Screening Enabled',
		name: 'call-screening-enabled',
		type: 'options',
		default: 'yes',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Ring No Answer Timeout (Seconds)',
		name: 'ring-no-answer-timeout-seconds',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Language Token',
		name: 'language-token',
		type: 'string',
		default: 'en_US',
		typeOptions: { password: true },
	},
	{
		displayName: 'Limits: Max Data Storage (KB)',
		name: 'limits-max-data-storage-kilobytes',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Limits: Max Active Calls (Total)',
		name: 'limits-max-active-calls-total',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Directory Announce In Dial By Name Enabled',
		name: 'directory-annouce-in-dial-by-name-enabled',
		type: 'options',
		default: 'yes',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Directory Override Order Duplicate DTMF Mapping',
		name: 'directory-override-order-duplicate-dtmf-mapping',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Voicemail Greeting Index',
		name: 'voicemail-greeting-index',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Voicemail Enabled',
		name: 'voicemail-enabled',
		type: 'options',
		default: 'yes',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Voicemail Receive Broadcast Enabled',
		name: 'voicemail-receive-broadcast-enabled',
		type: 'options',
		default: 'yes',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Reject Anonymous Calls Enabled',
		name: 'reject-anonymous-calls-enabled',
		type: 'options',
		default: 'no',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Voicemail Playback Announce Date Time Received',
		name: 'voicemail-playback-announce-datetime-received',
		type: 'options',
		default: 'no',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Voicemail Playback Announce Caller ID',
		name: 'voicemail-playback-announce-caller-id',
		type: 'options',
		default: 'no',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Voicemail Playback Sort Newest To Oldest',
		name: 'voicemail-playback-sort-newest-to-oldest',
		type: 'options',
		default: 'yes',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Email: Send Alert New Voicemail CC List CSV',
		name: 'email-send-alert-new-voicemail-cc-list-csv',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Email: Send Alert New Voicemail Behavior',
		name: 'email-send-alert-new-voicemail-behavior',
		type: 'options',
		default: 'no',
		options: [
			{ name: 'Attnew', value: 'attnew' },
			{ name: 'Attsave', value: 'attsave' },
			{ name: 'Atttrash', value: 'atttrash' },
			{ name: 'Brief', value: 'brief' },
			{ name: 'Briefattnew', value: 'briefattnew' },
			{ name: 'Briefattsave', value: 'briefattsave' },
			{ name: 'Briefatttrash', value: 'briefatttrash' },
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Email: Send Alert New Voicemail Enabled',
		name: 'email-send-alert-new-voicemail-enabled',
		type: 'options',
		default: 'no',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Email: Send Alert New Missed Call Enabled',
		name: 'email-send-alert-new-missed-call-enabled',
		type: 'options',
		default: 'no',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Email: Send Alert Data Storage Limit Reached Enabled',
		name: 'email-send-alert-data-storage-limit-reached-enabled',
		type: 'options',
		default: 'no',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Caller ID Number',
		name: 'caller-id-number',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Caller ID Name',
		name: 'caller-id-name',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Caller ID Number (Emergency)',
		name: 'caller-id-number-emergency',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Area Code',
		name: 'area-code',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Directory Name Visible In List Enabled',
		name: 'directory-name-visible-in-list-enabled',
		type: 'options',
		default: 'yes',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Service Code',
		name: 'service-code',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Voicemail Transcription',
		name: 'voicemail-transcription-enabled',
		type: 'options',
		default: 'no',
		options: [
			{ name: 'Deepgram', value: 'Deepgram' },
			{ name: 'Google', value: 'Google' },
			{ name: 'Mutare', value: 'Mutare' },
			{ name: 'No', value: 'no' },
			{ name: 'Voicebase', value: 'Voicebase' },
		],
	},
	{
		displayName: 'Emergency Address ID',
		name: 'emergency-address-id',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Call Recordings Hide From Others Enabled',
		name: 'call-recordings-hide-from-others-enabled',
		type: 'options',
		default: 'no',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Music On Hold Randomized Enabled',
		name: 'music-on-hold-randomized-enabled',
		type: 'options',
		default: 'no',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
		],
	},
	{
		displayName: 'Music On Hold Comfort Message Repeat Interval (Seconds)',
		name: 'music-on-hold-comfort-message-repeat-interval-seconds',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Recording Configuration',
		name: 'recording-configuration',
		type: 'options',
		default: 'no',
		options: [
			{ name: 'No', value: 'no' },
			{ name: 'Yes', value: 'yes' },
			{ name: 'Yes With Transcription', value: 'yes-with-transcription' },
			{ name: 'Yes With Transcription And Sentiment', value: 'yes-with-transcription-and-sentiment' },
		],
	},
];

const numericUserFields = new Set([
	'area-code',
	'caller-id-number',
	'caller-id-number-emergency',
	'directory-name-number-dtmf-mapping',
	'directory-override-order-duplicate-dtmf-mapping',
	'limits-max-active-calls-total',
	'limits-max-data-storage-kilobytes',
	'music-on-hold-comfort-message-repeat-interval-seconds',
	'ring-no-answer-timeout-seconds',
	'voicemail-greeting-index',
	'voicemail-login-pin',
]);

function buildTemplatedUserFields(): INodeProperties[] {
	const fields: INodeProperties[] = [];

	fields.push({
		displayName: 'Request Mode',
		name: requestModeKey(templatedUserCreateId),
		type: 'options',
		default: 'sync',
		displayOptions: {
			show: shouldShowTemplatedField(templatedUserResource, templatedUserCreateId),
		},
		options: [
			{ name: 'Synchronous (Return Created Object)', value: 'sync' },
			{ name: 'Asynchronous (Return Acknowledgement)', value: 'asyncAck' },
			{ name: 'Asynchronous (Return Submitted Values)', value: 'asyncEcho' },
		],
		description:
			'Synchronous requests aim to return the created object (200). If the server returns 202, the request was accepted asynchronously.',
	});

	const optionalFieldsName = optionalFieldsKey(templatedUserCreateId);

	fields.push({
		displayName: 'Optional Fields',
		name: optionalFieldsName,
		type: 'multiOptions',
		default: [],
		displayOptions: {
			show: shouldShowTemplatedField(templatedUserResource, templatedUserCreateId),
		},
		options: userCommonFields
			.filter((f) => !createUserRequiredFields.includes(f.name))
			.map((f) => ({ name: f.displayName, value: f.name })),
		description: 'Select the optional fields to add to the form',
	});

	fields.push({
		displayName: 'Domain',
		name: parameterName(templatedUserCreateId, 'path', 'domain'),
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: shouldShowTemplatedField(templatedUserResource, templatedUserCreateId),
		},
		modes: [
			{
				displayName: 'Domain',
				name: 'list',
				type: 'list',
				placeholder: 'Select a domain...',
				typeOptions: {
					searchListMethod: 'searchDomains',
					searchable: true,
					searchFilterRequired: false,
				},
			},
			{
				displayName: 'Domain',
				name: 'name',
				type: 'string',
				placeholder: 'e.g. example.com',
			},
		],
	});

	for (const field of userCommonFields) {
		const isRequired = createUserRequiredFields.includes(field.name);
		const shouldShow = isRequired
			? shouldShowTemplatedField(templatedUserResource, templatedUserCreateId)
			: {
				...shouldShowTemplatedField(templatedUserResource, templatedUserCreateId),
				[optionalFieldsName]: [field.name],
			};

		if (field.name === 'time-zone') {
			fields.push({
				displayName: field.displayName,
				name: operationBodyFieldKey(templatedUserCreateId, field.name),
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				required: isRequired,
				displayOptions: { show: shouldShow },
				description:
					'Time zone identifier. Choose from list or enter manually if needed.',
				modes: [
					{
						displayName: 'Time Zone',
						name: 'list',
						type: 'list',
						placeholder: 'Select a time zone...',
						typeOptions: {
							searchListMethod: 'searchTimeZones',
							searchable: true,
							searchFilterRequired: false,
						},
					},
					{
						displayName: 'Time Zone',
						name: 'name',
						type: 'string',
						placeholder: 'e.g. America/New_York',
					},
				],
			});
			continue;
		}

		fields.push({
			displayName: field.displayName,
			name: operationBodyFieldKey(templatedUserCreateId, field.name),
			type: field.type,
			default: field.default,
			required: isRequired,
			displayOptions: { show: shouldShow },
			description: field.description,
			options: field.options,
			typeOptions: field.typeOptions,
		});
	}

	const updateOptionalFieldsName = optionalFieldsKey(templatedUserUpdateId);
	fields.push({
		displayName: 'Optional Fields',
		name: updateOptionalFieldsName,
		type: 'multiOptions',
		default: [],
		displayOptions: {
			show: shouldShowTemplatedField(templatedUserResource, templatedUserUpdateId),
		},
		options: userCommonFields
			.filter((f) => !updateUserRequiredFields.includes(f.name) && f.name !== 'user')
			.map((f) => ({ name: f.displayName, value: f.name })),
		description: 'Select the optional fields to add to the form',
	});

	fields.push({
		displayName: 'Domain',
		name: parameterName(templatedUserUpdateId, 'path', 'domain'),
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		displayOptions: {
			show: shouldShowTemplatedField(templatedUserResource, templatedUserUpdateId),
		},
		modes: [
			{
				displayName: 'Domain',
				name: 'list',
				type: 'list',
				placeholder: 'Select a domain...',
				typeOptions: {
					searchListMethod: 'searchDomains',
					searchable: true,
					searchFilterRequired: false,
				},
			},
			{
				displayName: 'Domain',
				name: 'name',
				type: 'string',
				placeholder: 'e.g. example.com',
			},
		],
	});

	fields.push({
		displayName: 'User',
		name: parameterName(templatedUserUpdateId, 'path', 'user'),
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		displayOptions: {
			show: shouldShowTemplatedField(templatedUserResource, templatedUserUpdateId),
		},
		description: 'User extension number',
		modes: [
			{
				displayName: 'User',
				name: 'list',
				type: 'list',
				placeholder: 'Select a user...',
				typeOptions: {
					searchListMethod: 'searchUsersForDomain',
					searchable: true,
					searchFilterRequired: false,
				},
			},
			{
				displayName: 'User',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 1001',
			},
		],
	});

	for (const field of userCommonFields) {
		if (field.name === 'user') {
			continue;
		}
		const isRequired = updateUserRequiredFields.includes(field.name);
		const shouldShow = isRequired
			? shouldShowTemplatedField(templatedUserResource, templatedUserUpdateId)
			: {
				...shouldShowTemplatedField(templatedUserResource, templatedUserUpdateId),
				[updateOptionalFieldsName]: [field.name],
			};

		const isOptionsField = field.type === 'options';
		const updateOptions = isOptionsField
			? [{ name: 'Use Current Value', value: '__USE_CURRENT__' }, ...(field.options ?? [])]
			: field.options;
		const updateDefault = isOptionsField ? '__USE_CURRENT__' : field.default;

		const updateDescription = isRequired
			? `${field.description ? `${field.description} ` : ''}Required. Leave empty to keep the current value`
			: field.description;

		if (field.name === 'time-zone') {
			fields.push({
				displayName: field.displayName,
				name: operationBodyFieldKey(templatedUserUpdateId, field.name),
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				required: isRequired,
				displayOptions: { show: shouldShow },
				description:
					'Time zone identifier. Choose from list or enter manually if needed.',
				modes: [
					{
						displayName: 'Time Zone',
						name: 'list',
						type: 'list',
						placeholder: 'Select a time zone...',
						typeOptions: {
							searchListMethod: 'searchTimeZones',
							searchable: true,
							searchFilterRequired: false,
						},
					},
					{
						displayName: 'Time Zone',
						name: 'name',
						type: 'string',
						placeholder: 'e.g. America/New_York',
					},
				],
			});
			continue;
		}

		fields.push({
			displayName: field.displayName,
			name: operationBodyFieldKey(templatedUserUpdateId, field.name),
			type: field.type,
			default: updateDefault,
			required: isRequired,
			displayOptions: { show: shouldShow },
			description: updateDescription,
			options: updateOptions,
			typeOptions: field.typeOptions,
		});
	}

	fields.push({
		displayName: 'Domain',
		name: parameterName(templatedUserDeleteId, 'path', 'domain'),
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		displayOptions: {
			show: shouldShowTemplatedField(templatedUserResource, templatedUserDeleteId),
		},
		modes: [
			{
				displayName: 'Domain',
				name: 'list',
				type: 'list',
				placeholder: 'Select a domain...',
				typeOptions: {
					searchListMethod: 'searchDomains',
					searchable: true,
					searchFilterRequired: false,
				},
			},
			{
				displayName: 'Domain',
				name: 'name',
				type: 'string',
				placeholder: 'e.g. example.com',
			},
		],
	});

	fields.push({
		displayName: 'User',
		name: parameterName(templatedUserDeleteId, 'path', 'user'),
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		displayOptions: {
			show: shouldShowTemplatedField(templatedUserResource, templatedUserDeleteId),
		},
		description: 'User extension number',
		modes: [
			{
				displayName: 'User',
				name: 'list',
				type: 'list',
				placeholder: 'Select a user...',
				typeOptions: {
					searchListMethod: 'searchUsersForDomain',
					searchable: true,
					searchFilterRequired: false,
				},
			},
			{
				displayName: 'User',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 1001',
			},
		],
	});

	return fields;
}

function shouldUseTemplatedUserOperation(resource: string, operationId: string): boolean {
	if (resource !== templatedUserResource) {
		return false;
	}
	return (
		operationId === templatedUserCreateId ||
		operationId === templatedUserUpdateId ||
		operationId === templatedUserDeleteId
	);
}

function toRequestMode(value: unknown): RequestMode {
	if (value === 'asyncAck' || value === 'asyncEcho' || value === 'sync') {
		return value;
	}
	return 'sync';
}

function toAcknowledgement(statusCode: number | undefined): IDataObject {
	const code = typeof statusCode === 'number' ? statusCode : undefined;
	return {
		accepted: code === 202 ? true : undefined,
		acknowledged: code ? code >= 200 && code < 300 : true,
		statusCode: code,
	};
}

function buildTemplatedBody(
	context: IExecuteFunctions,
	itemIndex: number,
	operationId: string,
	requiredFields: string[],
	options: {
		includeSynchronous?: boolean;
		requestMode?: RequestMode;
		readOnlyFields?: Set<string>;
	},
): IDataObject {
	const selected = new Set<string>();
	for (const key of requiredFields) {
		selected.add(key);
	}
	const optional = context.getNodeParameter(optionalFieldsKey(operationId), itemIndex, []) as string[];
	for (const key of optional) {
		selected.add(key);
	}

	const body: IDataObject = {};
	for (const fieldName of selected) {
		if (options.readOnlyFields?.has(fieldName)) {
			continue;
		}
		const raw = context.getNodeParameter(operationBodyFieldKey(operationId, fieldName), itemIndex, '') as unknown;
		const normalizedRaw =
			raw && typeof raw === 'object' && 'value' in (raw as IDataObject)
				? extractLocatorValue(raw)
				: raw;
		const fieldDef = userCommonFields.find((f) => f.name === fieldName);
		if (!fieldDef) {
			continue;
		}

		let value: unknown;
		if (raw === '__USE_CURRENT__') {
			value = undefined;
		} else if (numericUserFields.has(fieldName)) {
			value = toOptionalNumberValue(normalizedRaw);
		} else {
			value = toOptionalString(normalizedRaw);
		}
		if (value === undefined) {
			continue;
		}
		body[fieldName] = value as IDataObject[''];
	}

	for (const requiredField of requiredFields) {
		if (body[requiredField] === undefined) {
			throw new NodeOperationError(
				context.getNode(),
				`Missing required field: ${requiredField}`,
				{ itemIndex },
			);
		}
	}

	if (options.includeSynchronous) {
		body.synchronous = options.requestMode === 'sync' ? 'yes' : 'no';
	}

	return body;
}

function isFullHttpResponse(value: unknown): value is { statusCode: number; body: unknown } {
	return Boolean(value) && typeof value === 'object' && 'statusCode' in (value as IDataObject);
}

function getErrorText(error: unknown): string {
	if (!error) {
		return '';
	}
	if (typeof error === 'string') {
		return error;
	}
	if (error instanceof Error) {
		return error.message;
	}
	if (typeof error === 'object') {
		const value = error as Record<string, unknown>;
		const parts = [value.errorMessage, value.errorDescription, value.message]
			.filter((v): v is string => typeof v === 'string' && Boolean(v.trim()))
			.map((v) => v.trim());
		return parts.join(' | ');
	}
	return '';
}

function isExpressionLikeValue(value: string): boolean {
	const trimmed = value.trim();
	if (!trimmed) {
		return false;
	}

	return trimmed.startsWith('=') || trimmed.includes('{{');
}

function extractLocatorValue(value: unknown): string {
	if (typeof value === 'string' || typeof value === 'number') {
		return String(value);
	}

	if (value && typeof value === 'object' && 'value' in value) {
		const raw = (value as { value?: unknown }).value;
		if (typeof raw === 'string' || typeof raw === 'number') {
			return String(raw);
		}
	}

	return '';
}

const resellerAwareOperationIds = operations
	.filter((op) => op.parameters.some((p) => p.in === 'query' && p.name === 'reseller'))
	.map((op) => op.id);

function isOffsetPaginationOperation(op: (typeof operations)[number]): boolean {
	if (op.method !== 'GET') {
		return false;
	}

	const start = op.parameters.find((p) => p.in === 'query' && p.name === 'start');
	const limit = op.parameters.find((p) => p.in === 'query' && p.name === 'limit');
	if (!start || !limit) {
		return false;
	}

	const startDescription = (start.description ?? '').toLowerCase();
	if (start.schemaType === 'string' || startDescription.includes('timestamp')) {
		return false;
	}

	return true;
}

const offsetPaginatedOperationIds = new Set(
	operations.filter((op) => isOffsetPaginationOperation(op)).map((op) => op.id),
);

function isLimitOnlyPaginationOperation(op: (typeof operations)[number]): boolean {
	if (op.method !== 'GET') {
		return false;
	}

	const limit = op.parameters.find((p) => p.in === 'query' && p.name === 'limit');
	if (!limit) {
		return false;
	}

	const start = op.parameters.find((p) => p.in === 'query' && p.name === 'start');
	if (start) {
		return false;
	}

	if (limit.schemaType === 'string') {
		return false;
	}

	return true;
}

const limitOnlyPaginatedOperationIds = new Set(
	operations.filter((op) => isLimitOnlyPaginationOperation(op)).map((op) => op.id),
);

const limitOnlyReturnAllLimit = 100000;

function paginationParamName(operationId: string, name: string): string {
	return `${operationId}__pagination__${name}`;
}

function toOptionalNumber(value: unknown): number | undefined {
	if (value === null || value === undefined || value === '') {
		return undefined;
	}
	if (typeof value === 'number' && Number.isFinite(value)) {
		return value;
	}
	if (typeof value === 'string') {
		const parsed = Number(value);
		return Number.isFinite(parsed) ? parsed : undefined;
	}
	return undefined;
}

async function requestAllPages(
	context: IExecuteFunctions,
	request: {
		url: string;
		qs?: IDataObject;
		limit?: number;
	},
): Promise<IDataObject[]> {
	const pageSize = typeof request.limit === 'number' && request.limit > 0 ? request.limit : 100;
	const aggregated: IDataObject[] = [];
	let start = 0;
	let loops = 0;

	while (loops < 1000) {
		loops++;
		const response = await netSapiensRequest(context, {
			method: toHttpRequestMethod('GET'),
			url: request.url,
			qs: {
				...(request.qs ?? {}),
				start,
				limit: pageSize,
			},
		});

		const normalized = normalizeArrayResponse(response);
		if (
			loops === 1 &&
			normalized.length === 0 &&
			response !== null &&
			response !== undefined &&
			!Array.isArray(response)
		) {
			return [toIDataObject(response)];
		}

		const page = normalized.map((entry) => toIDataObject(entry));
		for (const entry of page) {
			aggregated.push(entry);
		}

		if (page.length < pageSize) {
			break;
		}
		start += page.length;
	}

	return aggregated;
}

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

function formatDomainLabel(value: Record<string, unknown>, domain: string): string {
	const description = getFirstStringField(value, [
		'description',
		'desc',
		'note',
		'notes',
	]);

	if (!description) {
		return domain;
	}

	return `${domain} - ${description}`;
}

function formatUserLabel(value: Record<string, unknown>, userId: string): string {
	const serviceCode = getFirstStringField(value, ['service-code', 'service_code', 'serviceCode']);
	const subscriberType = getFirstStringField(value, [
		'subscriber-type',
		'subscriber_type',
		'subscriberType',
		'type',
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

	if (serviceCode) {
		return `${userId} - ${serviceCode.toUpperCase()}`;
	}

	const parts = [userId];
	if (subscriberType) {
		parts.push(subscriberType);
	}
	if (loginUsername) {
		parts.push(loginUsername);
	}
	if (fullName) {
		parts.push(fullName);
	}

	return parts.join(' - ');
}

function buildOperationParameterFields(): INodeProperties[] {
	const fields: INodeProperties[] = [];

	for (const op of operations) {
		const override = operationOverrides[op.id];
		if (override?.hidden) {
			continue;
		}

		const effectiveResource = override?.resource ?? op.resource;
		if (op.id === 'SearchUsers') {
			const message =
				'Only the first 100 results are returned. Use "Get Users in Domain" to return all users with pagination.';
			fields.push({
				displayName: message,
				name: `${op.id}__notice__paginationInfo`,
				type: 'notice',
				default: '',
				displayOptions: {
					show: {
						resource: [effectiveResource],
						operation: [op.id],
					},
				},
				description: message,
			});
		}
		if (op.id === 'GetUsers') {
			const message =
				'This operation can return all users using pagination. "Search for Users in Domain" supports Site filtering but returns a maximum of 100 results.';
			fields.push({
				displayName: message,
				name: `${op.id}__notice__paginationInfo`,
				type: 'notice',
				default: '',
				displayOptions: {
					show: {
						resource: [effectiveResource],
						operation: [op.id],
					},
				},
				description: message,
			});
		}
		const hasDomainPathParam = op.parameters.some((p) => p.in === 'path' && p.name === 'domain');
		const domainParamFieldName = hasDomainPathParam
			? parameterName(op.id, 'path', 'domain')
			: undefined;

		for (const param of op.parameters) {
			const isPathOrQuery = param.in === 'path' || param.in === 'query';
			if (!isPathOrQuery) {
				continue;
			}
			if (
				(op.id === templatedUserCreateId || op.id === templatedUserUpdateId || op.id === templatedUserDeleteId) &&
				param.in === 'path' &&
				((op.id === templatedUserCreateId && param.name === 'domain') ||
					(op.id !== templatedUserCreateId && (param.name === 'domain' || param.name === 'user')))
			) {
				continue;
			}

			if (param.in === 'query' && param.name === 'reseller' && effectiveResource !== 'Resellers') {
				continue;
			}
			if (
				offsetPaginatedOperationIds.has(op.id) &&
				param.in === 'query' &&
				(param.name === 'start' || param.name === 'limit')
			) {
				continue;
			}

			const isDomainParam = param.in === 'path' && param.name === 'domain';
			const isDomainScopedUserParam =
				param.in === 'path' &&
				param.name === 'user' &&
				Boolean(domainParamFieldName) &&
				effectiveResource !== 'Users';

			const fieldDisplayOptions = {
				show: {
					resource: [effectiveResource],
					operation: [op.id],
				},
			};
			const fieldName = parameterName(op.id, param.in, param.name);

			if (op.id === 'GetAuditlog' && param.in === 'query' && param.name === 'target-domain') {
				fields.push({
					displayName: 'Target Domain',
					name: fieldName,
					type: 'resourceLocator',
					default: { mode: 'list', value: '' },
					required: param.required,
					displayOptions: fieldDisplayOptions,
					description: param.description,
					modes: [
						{
							displayName: 'Target Domain',
							name: 'list',
							type: 'list',
							placeholder: 'Select a domain...',
							typeOptions: {
								searchListMethod: 'searchDomains',
								searchable: true,
								searchFilterRequired: false,
							},
						},
						{
							displayName: 'Target Domain',
							name: 'name',
							type: 'string',
							placeholder: 'e.g. example.com',
						},
					],
				});
				continue;
			}

			if (op.id === 'GetAuditlog' && param.in === 'query' && param.name === 'target-user') {
				fields.push({
					displayName: 'Target User',
					name: fieldName,
					type: 'resourceLocator',
					default: { mode: 'list', value: '' },
					required: param.required,
					displayOptions: fieldDisplayOptions,
					description: param.description,
					modes: [
						{
							displayName: 'Target User',
							name: 'list',
							type: 'list',
							placeholder: 'Select a user...',
							typeOptions: {
								searchListMethod: 'searchUsersForDomain',
								searchable: true,
								searchFilterRequired: false,
							},
						},
						{
							displayName: 'Target User',
							name: 'id',
							type: 'string',
							placeholder: 'e.g. 1001',
						},
					],
				});
				continue;
			}

			if (
				op.id === 'GetAuditlog' &&
				param.in === 'query' &&
				(param.name === 'datetime-start' || param.name === 'datetime-end')
			) {
				fields.push({
					displayName: formatParameterLabel(param.name),
					name: fieldName,
					type: 'dateTime',
					default: '',
					required: param.required,
					displayOptions: fieldDisplayOptions,
					description: param.description,
				});
				continue;
			}

			if (limitOnlyPaginatedOperationIds.has(op.id) && param.in === 'query' && param.name === 'limit') {
				const returnAllName = paginationParamName(op.id, 'returnAll');
				fields.push({
					displayName: 'Return All Results',
					name: returnAllName,
					type: 'boolean',
					default: true,
					displayOptions: fieldDisplayOptions,
					description: 'Whether to fetch all results by increasing the API limit',
				});
				fields.push({
					displayName: formatParameterLabel(param.name),
					name: fieldName,
					type: guessFieldType(param.schemaType),
					default: '',
					required: param.required,
					displayOptions: {
						show: {
							resource: [effectiveResource],
							operation: [op.id],
							[returnAllName]: [false],
						},
					},
					description: param.description,
				});
				continue;
			}

			if (isDomainParam) {
				fields.push({
					displayName: formatParameterLabel(param.name),
					name: fieldName,
					type: 'resourceLocator',
					default: { mode: 'list', value: '' },
					required: param.required,
					displayOptions: fieldDisplayOptions,
					description: param.description,
					modes: [
						{
							displayName: 'Domain',
							name: 'list',
							type: 'list',
							placeholder: 'Select a domain...',
							typeOptions: {
								searchListMethod: 'searchDomains',
								searchable: true,
								searchFilterRequired: false,
							},
						},
						{
							displayName: 'Domain',
							name: 'name',
							type: 'string',
							placeholder: 'e.g. example.com',
						},
					],
				});
				continue;
			}

			if (isDomainScopedUserParam) {
				fields.push({
					displayName: formatParameterLabel(param.name),
					name: fieldName,
					type: 'resourceLocator',
					default: { mode: 'list', value: '' },
					required: param.required,
					displayOptions: fieldDisplayOptions,
					description: param.description,
					modes: [
						{
							displayName: 'User',
							name: 'list',
							type: 'list',
							placeholder: 'Select a user...',
							typeOptions: {
								searchListMethod: 'searchUsersForDomain',
								searchable: true,
								searchFilterRequired: false,
							},
						},
						{
							displayName: 'User',
							name: 'id',
							type: 'string',
							placeholder: 'e.g. 1001',
						},
					],
				});
				continue;
			}

			fields.push({
				displayName: formatParameterLabel(param.name),
				name: fieldName,
				type: guessFieldType(param.schemaType),
				default: '',
				required: param.required,
				displayOptions: fieldDisplayOptions,
				description: param.description,
			});
		}

		if (offsetPaginatedOperationIds.has(op.id)) {
			const returnAllName = paginationParamName(op.id, 'returnAll');
			fields.push({
				displayName: 'Return All Results',
				name: returnAllName,
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						resource: [effectiveResource],
						operation: [op.id],
					},
				},
				description: 'Whether to fetch all results by paging through the API',
			});

			fields.push({
				displayName: 'Start',
				name: paginationParamName(op.id, 'start'),
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: [effectiveResource],
						operation: [op.id],
						[returnAllName]: [false],
					},
				},
			});
			fields.push({
				displayName: 'Limit',
				name: paginationParamName(op.id, 'limit'),
				type: 'number',
				default: 100,
				displayOptions: {
					show: {
						resource: [effectiveResource],
						operation: [op.id],
						[returnAllName]: [false],
					},
				},
			});
		}

		if (op.hasRequestBody) {
			if (op.id === templatedUserCreateId || op.id === templatedUserUpdateId) {
				continue;
			}
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
			...buildTemplatedUserFields(),
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
				let baseUrl = '';
				try {
					const credentials = (await this.getCredentials('netSapiensApi')) as {
						server?: string;
						baseUrl?: string;
					};
					baseUrl = resolveBaseUrl(credentials);
				} catch {
					return [];
				}
				const shouldRefresh = Boolean(this.getCurrentNodeParameter('refreshOptions') ?? false);

				const now = Date.now();
				const cached = domainsCacheByBaseUrl.get(baseUrl);
				if (!shouldRefresh && cached && cached.options.length && now - cached.fetchedAtMs < loadOptionsTtlMs) {
					return cached.options;
				}

				let items: unknown[];
				try {
					const url = `${baseUrl}/domains`;
					const page = await netSapiensRequest(this, {
						method: toHttpRequestMethod('GET'),
						url,
						qs: { start: 0, limit: 100 },
					});
					items = normalizeArrayResponse(page);

					if (items.length === 100) {
						let start = 100;
						while (start < 100000) {
							const nextPage = await netSapiensRequest(this, {
								method: toHttpRequestMethod('GET'),
								url,
								qs: { start, limit: 100 },
							});
							const nextItems = normalizeArrayResponse(nextPage);
							items.push(...nextItems);
							if (nextItems.length < 100) {
								break;
							}
							start += nextItems.length;
						}
					}
				} catch {
					return cached?.options ?? [];
				}

				const options: INodePropertyOptions[] = [];

				for (const item of items) {
					const value = item as Record<string, unknown>;
					const domain = value.domain;

					if (typeof domain !== 'string' || !domain) {
						continue;
					}
					const name = formatDomainLabel(value, domain);

					options.push({
						name,
						value: domain,
					});
				}

				options.sort((a, b) => a.name.localeCompare(b.name));

				domainsCacheByBaseUrl.set(baseUrl, { fetchedAtMs: now, options });
				return options;
			},

			async getUsersForDomain(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				let baseUrl = '';
				try {
					const credentials = (await this.getCredentials('netSapiensApi')) as {
						server?: string;
						baseUrl?: string;
					};
					baseUrl = resolveBaseUrl(credentials);
				} catch {
					return [];
				}

				let operationId: string | undefined;
				try {
					operationId = this.getCurrentNodeParameter('operation') as string | undefined;
				} catch {
					return [];
				}
				if (!operationId) {
					return [];
				}

				const domainParamName = parameterName(operationId, 'path', 'domain');
				let domainParam: unknown;
				try {
					domainParam = this.getCurrentNodeParameter(domainParamName, { rawExpressions: true });
				} catch {
					return [];
				}
				const domain = extractLocatorValue(domainParam).trim();

				if (!domain || isExpressionLikeValue(domain)) {
					return [];
				}

				const shouldRefresh = Boolean(this.getCurrentNodeParameter('refreshOptions') ?? false);
				const cacheKey = `${baseUrl}::${domain}`;

				const now = Date.now();
				const cached = usersCacheByBaseUrlAndDomain.get(cacheKey);
				if (!shouldRefresh && cached && cached.options.length && now - cached.fetchedAtMs < loadOptionsTtlMs) {
					return cached.options;
				}

				let response: unknown;
				try {
					const url = `${baseUrl}/domains/${encodeURIComponent(domain)}/users`;
					response = await netSapiensRequest(this, {
						method: toHttpRequestMethod('GET'),
						url,
					});
				} catch {
					return cached?.options ?? [];
				}

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

					const label = formatUserLabel(value, userId);

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
		listSearch: {
			async searchDomains(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				let baseUrl = '';
				try {
					const credentials = (await this.getCredentials('netSapiensApi')) as {
						server?: string;
						baseUrl?: string;
					};
					baseUrl = resolveBaseUrl(credentials);
				} catch {
					return { results: [] };
				}
				const shouldRefresh = Boolean(this.getCurrentNodeParameter('refreshOptions') ?? false);
				const now = Date.now();
				const cached = domainsCacheByBaseUrl.get(baseUrl);

				let options: INodePropertyOptions[] = [];
				if (!shouldRefresh && cached && cached.options.length && now - cached.fetchedAtMs < loadOptionsTtlMs) {
					options = cached.options;
				} else {
					let items: unknown[];
					try {
						const url = `${baseUrl}/domains`;
						const page = await netSapiensRequest(this, {
							method: toHttpRequestMethod('GET'),
							url,
							qs: { start: 0, limit: 100 },
						});
						items = normalizeArrayResponse(page);

						if (items.length === 100) {
							let start = 100;
							while (start < 100000) {
								const nextPage = await netSapiensRequest(this, {
									method: toHttpRequestMethod('GET'),
									url,
									qs: { start, limit: 100 },
								});
								const nextItems = normalizeArrayResponse(nextPage);
								items.push(...nextItems);
								if (nextItems.length < 100) {
									break;
								}
								start += nextItems.length;
							}
						}
					} catch {
						options = cached?.options ?? [];
						items = [];
					}

					const next: INodePropertyOptions[] = [];
					for (const item of items) {
						const value = item as Record<string, unknown>;
						const domain = value.domain;
						if (typeof domain !== 'string' || !domain) {
							continue;
						}
						const name = formatDomainLabel(value, domain);
						next.push({ name, value: domain });
					}

					next.sort((a, b) => a.name.localeCompare(b.name));
					domainsCacheByBaseUrl.set(baseUrl, { fetchedAtMs: now, options: next });
					options = next;
				}

				const normalizedFilter = typeof filter === 'string' ? filter.trim().toLowerCase() : '';
				const results = options
					.filter((entry: INodePropertyOptions) => {
						if (!normalizedFilter) {
							return true;
						}
						return entry.name.toLowerCase().includes(normalizedFilter);
					})
					.slice(0, 200)
					.map(
						(entry: INodePropertyOptions): INodeListSearchItems => ({
							name: entry.name,
							value: entry.value,
						}),
					);

				return { results };
			},

			async searchUsersForDomain(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				let baseUrl = '';
				try {
					const credentials = (await this.getCredentials('netSapiensApi')) as {
						server?: string;
						baseUrl?: string;
					};
					baseUrl = resolveBaseUrl(credentials);
				} catch {
					return { results: [] };
				}

				let operationId: string | undefined;
				try {
					operationId = this.getCurrentNodeParameter('operation') as string | undefined;
				} catch {
					return { results: [] };
				}
				if (!operationId) {
					return { results: [] };
				}

				const domainParamNames = [
					parameterName(operationId, 'path', 'domain'),
					parameterName(operationId, 'query', 'target-domain'),
				];
				let domainParam: unknown;
				for (const domainParamName of domainParamNames) {
					try {
						domainParam = this.getCurrentNodeParameter(domainParamName, { rawExpressions: true });
					} catch {
						continue;
					}
					if (domainParam !== undefined && domainParam !== null && domainParam !== '') {
						break;
					}
				}
				const domain = extractLocatorValue(domainParam).trim();
				if (!domain || isExpressionLikeValue(domain)) {
					return { results: [] };
				}

				const shouldRefresh = Boolean(this.getCurrentNodeParameter('refreshOptions') ?? false);
				const cacheKey = `${baseUrl}::${domain}`;
				const now = Date.now();
				const cached = usersCacheByBaseUrlAndDomain.get(cacheKey);

				let options: INodePropertyOptions[] = [];
				if (!shouldRefresh && cached && cached.options.length && now - cached.fetchedAtMs < loadOptionsTtlMs) {
					options = cached.options;
				} else {
					let response: unknown;
					try {
						const url = `${baseUrl}/domains/${encodeURIComponent(domain)}/users`;
						response = await netSapiensRequest(this, {
							method: toHttpRequestMethod('GET'),
							url,
						});
					} catch {
						options = cached?.options ?? [];
					}

					if (response !== undefined) {
						const items = normalizeArrayResponse(response);
						const next: INodePropertyOptions[] = [];

						for (const item of items) {
							const value = item as Record<string, unknown>;
							const rawUser =
								value.user ??
								value.id ??
								value.uid ??
								value.userId ??
								value.userID ??
								value.user_id ??
								value.userid ??
								value.userID;
							const userId =
								typeof rawUser === 'string' || typeof rawUser === 'number'
									? String(rawUser).trim()
									: '';
							if (!userId) {
								continue;
							}

							const label = formatUserLabel(value, userId);

							next.push({ name: label, value: userId });
						}

						next.sort((a, b) => a.name.localeCompare(b.name));
						usersCacheByBaseUrlAndDomain.set(cacheKey, { fetchedAtMs: now, options: next });
						options = next;
					}
				}

				const normalizedFilter = typeof filter === 'string' ? filter.trim().toLowerCase() : '';
				const results = options
					.filter((entry: INodePropertyOptions) => {
						if (!normalizedFilter) {
							return true;
						}
						return entry.name.toLowerCase().includes(normalizedFilter);
					})
					.slice(0, 200)
					.map(
						(entry: INodePropertyOptions): INodeListSearchItems => ({
							name: entry.name,
							value: entry.value,
						}),
					);

				return { results };
			},

			async searchTimeZones(
				this: ILoadOptionsFunctions,
				filter?: string,
			): Promise<INodeListSearchResult> {
				const normalizedFilter = typeof filter === 'string' ? filter.trim().toLowerCase() : '';
				let timeZones: string[] = [];
				try {
					timeZones = (Intl as unknown as { supportedValuesOf?: (key: string) => string[] })
						.supportedValuesOf?.('timeZone')
						?.slice() ?? [];
				} catch {
					timeZones = [];
				}

				if (timeZones.length === 0) {
					timeZones = [
						'UTC',
						'America/New_York',
						'America/Chicago',
						'America/Denver',
						'America/Los_Angeles',
						'America/Phoenix',
						'Europe/London',
						'Europe/Berlin',
						'Australia/Sydney',
						'Asia/Tokyo',
					];
				}

				timeZones.sort((a, b) => a.localeCompare(b));
				const results = timeZones
					.filter((tz) => (normalizedFilter ? tz.toLowerCase().includes(normalizedFilter) : true))
					.slice(0, 200)
					.map((tz) => ({ name: tz, value: tz }));

				return { results };
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

				if (operation.id === 'GetAuditlog') {
					const shouldRefresh = Boolean(this.getNodeParameter('refreshOptions', itemIndex, false));
					const apiVersion = await getServerApiVersion(this, baseUrl, { refresh: shouldRefresh });
					if (typeof apiVersion.major === 'number' && apiVersion.major < 45) {
						const raw = apiVersion.raw ? ` (${apiVersion.raw})` : '';
						throw new NodeOperationError(
							this.getNode(),
							`Audit Log is not supported by this NetSapiens server (API version < 45${raw}).`,
							{
								itemIndex,
								description:
									'Your server does not implement the Audit Log endpoint used by this operation. Upgrade the server/API to version 45+ or remove this operation from the workflow.',
							},
						);
					}
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
					if (
						offsetPaginatedOperationIds.has(operation.id) &&
						param.in === 'query' &&
						(param.name === 'start' || param.name === 'limit')
					) {
						continue;
					}

					const value = this.getNodeParameter(
						parameterName(operation.id, param.in, param.name),
						itemIndex,
						'',
					) as unknown;
					const effectiveValue =
						param.name === 'domain' ||
						param.name === 'user' ||
						param.name === 'target-domain' ||
						param.name === 'target-user'
							? (extractLocatorValue(value) || '')
							: value;

					if (param.in === 'path') {
						pathParams[param.name] = effectiveValue;
					} else {
						if (effectiveValue !== '' && effectiveValue !== undefined && effectiveValue !== null) {
							queryParams[param.name] = effectiveValue;
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

				if (shouldUseTemplatedUserOperation(resource, operation.id)) {
					const requestMode =
						operation.id === templatedUserCreateId
							? toRequestMode(this.getNodeParameter(requestModeKey(templatedUserCreateId), itemIndex))
							: undefined;

					const userUpdateReadOnlyFields = new Set<string>([
						'user-presence-status',
						'active-calls-total-current',
						'account-status',
						'created-datetime',
						'last-modified-datetime',
					]);

					const method = toHttpRequestMethod(operation.method);
					let body: IDataObject | undefined;
					if (operation.id === templatedUserCreateId) {
						body = buildTemplatedBody(this, itemIndex, templatedUserCreateId, createUserRequiredFields, {
							includeSynchronous: true,
							requestMode,
						});
					} else if (operation.id === templatedUserUpdateId) {
						body = buildTemplatedBody(this, itemIndex, templatedUserUpdateId, updateUserRequiredFields, {
							includeSynchronous: false,
							readOnlyFields: userUpdateReadOnlyFields,
						});
					}

					const requestOptions = {
						method,
						url,
						qs: Object.keys(queryParams).length ? (queryParams as IDataObject) : undefined,
						body: method === 'GET' || method === 'DELETE' ? undefined : body,
						returnFullResponse: true,
					} as const;

					let response: unknown;
					try {
						response = await netSapiensRequest(this, requestOptions);
					} catch (error) {
						if (operation.id === templatedUserCreateId && requestMode === 'sync') {
							const fallbackBody = buildTemplatedBody(
								this,
								itemIndex,
								templatedUserCreateId,
								createUserRequiredFields,
								{
									includeSynchronous: true,
									requestMode: 'asyncAck',
								},
							);
							try {
								response = await netSapiensRequest(this, {
									...requestOptions,
									body: fallbackBody,
								});
							} catch {
								throw error;
							}
						} else {
							throw error;
						}
					}

					const statusCode = isFullHttpResponse(response)
						? (response as unknown as { statusCode: number }).statusCode
						: undefined;
					const responseBody = isFullHttpResponse(response)
						? (response as unknown as { body: unknown }).body
						: response;

					if (operation.id === templatedUserDeleteId) {
						returnData.push({ json: { ...toAcknowledgement(statusCode), response: toIDataObject(responseBody) } });
						continue;
					}

					if (operation.id === templatedUserUpdateId) {
						if (statusCode === 200 && responseBody && typeof responseBody === 'object') {
							returnData.push({ json: toIDataObject(responseBody) });
						} else {
							returnData.push({
								json: { ...toAcknowledgement(statusCode), response: toIDataObject(responseBody) },
							});
						}
						continue;
					}

					if (operation.id === templatedUserCreateId) {
						if (requestMode === 'sync') {
							if (statusCode === 200 && responseBody && typeof responseBody === 'object') {
								returnData.push({ json: toIDataObject(responseBody) });
							} else {
								returnData.push({
									json: { ...toAcknowledgement(statusCode), response: toIDataObject(responseBody) },
								});
							}
							continue;
						}

						if (requestMode === 'asyncEcho') {
							const submitted = buildTemplatedBody(
								this,
								itemIndex,
								templatedUserCreateId,
								createUserRequiredFields,
								{ includeSynchronous: true, requestMode: 'asyncAck' },
							);
							returnData.push({
								json: {
									...submitted,
									...toAcknowledgement(statusCode),
								},
							});
							continue;
						}

						returnData.push({
							json: { ...toAcknowledgement(statusCode), response: toIDataObject(responseBody) },
						});
						continue;
					}
				}

				const body = operation.hasRequestBody
					? parseJsonBodyParameter(
							this.getNodeParameter(`${operation.id}__body`, itemIndex, '{}') as unknown,
						)
					: undefined;

				if (limitOnlyPaginatedOperationIds.has(operation.id) && operation.method === 'GET') {
					const returnAll = Boolean(
						this.getNodeParameter(paginationParamName(operation.id, 'returnAll'), itemIndex, true),
					);
					if (returnAll) {
						queryParams.limit = limitOnlyReturnAllLimit;
					}
				}

				if (offsetPaginatedOperationIds.has(operation.id) && operation.method === 'GET') {
					const returnAll = Boolean(
						this.getNodeParameter(paginationParamName(operation.id, 'returnAll'), itemIndex, true),
					);

					if (returnAll) {
						const aggregated = await requestAllPages(this, {
							url,
							qs: Object.keys(queryParams).length ? (queryParams as IDataObject) : undefined,
						});

						for (const entry of aggregated) {
							returnData.push({ json: entry });
						}
						continue;
					}

					const manualStart = toOptionalNumber(
						this.getNodeParameter(paginationParamName(operation.id, 'start'), itemIndex, 0),
					);
					const manualLimit = toOptionalNumber(
						this.getNodeParameter(paginationParamName(operation.id, 'limit'), itemIndex, 100),
					);
					if (manualStart !== undefined) {
						queryParams.start = manualStart;
					}
					if (manualLimit !== undefined) {
						queryParams.limit = manualLimit;
					}
				}

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

				if (operationId === 'GetAuditlog') {
					const shouldRefresh = Boolean(this.getNodeParameter('refreshOptions', itemIndex, false));
					const apiVersion = await getServerApiVersion(this, baseUrl, { refresh: shouldRefresh });
					const errorText = getErrorText(error);
					if (/no\s+route\s+found\s*\[92\]/i.test(errorText) || /no\s+route\s+found/i.test(errorText)) {
						const versionText = apiVersion.raw
							? ` Detected API version: ${apiVersion.raw}.`
							: ' Unable to detect API version from /version.';
						throw new NodeOperationError(
							this.getNode(),
							'Audit Log is not supported by this NetSapiens server.',
							{
								itemIndex,
								description: `The server returned "No Route Found" for the Audit Log endpoint. This operation requires NetSapiens API version 45+.${versionText}`,
							},
						);
					}
				}

				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex });
			}
		}

		return [returnData];
	}
}
