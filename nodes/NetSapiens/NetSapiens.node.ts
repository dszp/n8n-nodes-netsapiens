import type {
	IExecuteFunctions,
	IDataObject,
	ILoadOptionsFunctions,
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
	netSapiensRequestWithoutAuthentication,
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
const sitesCacheByBaseUrlAndDomain = new Map<string, CacheEntry>();
const emergencyAddressesCacheByBaseUrlAndDomain = new Map<string, CacheEntry>();
const holidayCountriesCacheByBaseUrl = new Map<string, CacheEntry>();
const holidayRegionsCacheByBaseUrl = new Map<string, CacheEntry>();
const wsServersCacheByBaseUrl = new Map<string, CacheEntry>();
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

const validateJwtOperationId = 'ValidateJwt';
const authenticationJwtResource = 'Authentication/JWT (JSON Web Token)';
const validateJwtTokenParamName = `${validateJwtOperationId}__token`;

const templatedUserResource = 'Users';

const createUserRequiredFields = ['user', 'name-first-name', 'name-last-name', 'email-address', 'user-scope'];

const updateUserRequiredFields = ['name-first-name', 'name-last-name', 'email-address', 'user-scope'];

// --- Media templated operation constants (MOH, Greetings, Hold Messages) ---

const mediaTtsOperationIds = new Set([
	'CreateMohDomainTTS', 'UpdateMohDomainTTS',
	'CreateMohUserTTS', 'UpdateMohUserTTS',
	'CreateGreetingTTS', 'UpdateGreetingTTS',
]);

const mediaUploadOperationIds = new Set([
	// MOH (Base64 ops renamed to "Upload")
	'CreateMohDomainBase64', 'UpdateMohDomainBase64',
	'CreateMohUserBase64', 'UpdateMohUserBase64',
	// Greetings (Base64 ops renamed to "Upload")
	'CreateGreetingBase64', 'UpdateGreetingBase64',
	// Hold Messages (FileUpload ops — no Base64 alternative exists)
	'CreateMsgDomainFileUpload', 'UpdateMsgDomainFileUpload',
	'PostDomainsByUsersByMsg', 'UpdateMsgUserFileUpload',
]);

// Hold Message upload ops only support multipart (no Base64 JSON fallback)
const mediaMultipartOnlyIds = new Set([
	'CreateMsgDomainFileUpload', 'UpdateMsgDomainFileUpload',
	'PostDomainsByUsersByMsg', 'UpdateMsgUserFileUpload',
]);

const mediaCreateOperationIds = new Set([
	'CreateMohDomainTTS', 'CreateMohDomainBase64',
	'CreateMohUserTTS', 'CreateMohUserBase64',
	'CreateGreetingTTS', 'CreateGreetingBase64',
	'CreateMsgDomainFileUpload', 'PostDomainsByUsersByMsg',
]);

const mediaDeleteOperationIds = new Set([
	'DeleteMohDomain', 'DeleteMohUser',
	'DeleteGreeting',
	'DeleteMsgDomain', 'DeleteMsgUser',
]);

const mediaAllTemplatedIds = new Set([...mediaTtsOperationIds, ...mediaUploadOperationIds]);

// Operations whose `index` path parameter should offer a dynamic dropdown
const mediaIndexDropdownOperationIds = new Set([
	// Update + Delete for MOH Domain
	'UpdateMohDomainTTS', 'UpdateMohDomainBase64', 'DeleteMohDomain',
	// Update + Delete for MOH User
	'UpdateMohUserTTS', 'UpdateMohUserBase64', 'DeleteMohUser',
	// Update + Delete for Greetings
	'UpdateGreetingTTS', 'UpdateGreetingBase64', 'DeleteGreeting',
	// Update + Delete for Hold Messages Domain
	'UpdateMsgDomainFileUpload', 'DeleteMsgDomain',
	// Update + Delete for Hold Messages User
	'UpdateMsgUserFileUpload', 'DeleteMsgUser',
]);

// Maps an operation ID to the Read endpoint path segment for fetching existing media items
function getMediaReadPathSegment(operationId: string): string {
	if (operationId.includes('MohDomain') || operationId.includes('MohUser')) return 'moh';
	if (operationId.includes('Greeting')) return 'greetings';
	if (operationId.includes('MsgDomain') || operationId.includes('MsgUser')) return 'msg';
	return '';
}

// Whether a media operation requires a user path parameter for its Read endpoint
function mediaReadRequiresUser(operationId: string): boolean {
	return operationId.includes('MohUser') || operationId.includes('Greeting') ||
		operationId.includes('MsgUser');
}

// --- Image templated operation constants ---
const imageUploadOperationIds = new Set([
	'CreateImageBase64', 'UpdateImageBase64',
]);

function isImageTemplatedOperation(operationId: string): boolean {
	return imageUploadOperationIds.has(operationId);
}

function isMediaTemplatedOperation(operationId: string): boolean {
	return mediaAllTemplatedIds.has(operationId);
}

function getMediaResource(operationId: string): string {
	if (operationId.includes('MohDomain')) return 'Media/Music on Hold/Domain';
	if (operationId.includes('MohUser')) return 'Media/Music on Hold/User';
	if (operationId.includes('Greeting')) return 'Media/Greetings';
	if (operationId.includes('MsgDomain')) return 'Media/Hold Messages/Domain';
	if (operationId.includes('MsgUser') || operationId === 'PostDomainsByUsersByMsg') return 'Media/Hold Messages/User';
	return '';
}

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

		if (field.name === 'site') {
			fields.push({
				displayName: field.displayName,
				name: operationBodyFieldKey(templatedUserCreateId, field.name),
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				required: isRequired,
				displayOptions: { show: shouldShow },
				description: 'Site within the selected domain. Choose from list or enter manually.',
				modes: [
					{
						displayName: 'Site',
						name: 'list',
						type: 'list',
						placeholder: 'Select a site...',
						typeOptions: {
							searchListMethod: 'searchSitesForDomain',
							searchable: true,
							searchFilterRequired: false,
						},
					},
					{
						displayName: 'Site',
						name: 'name',
						type: 'string',
						placeholder: 'e.g. Headquarters',
					},
				],
			});
			continue;
		}

		if (field.name === 'emergency-address-id') {
			fields.push({
				displayName: field.displayName,
				name: operationBodyFieldKey(templatedUserCreateId, field.name),
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				required: isRequired,
				displayOptions: { show: shouldShow },
				description: 'Emergency address identifier. Choose from list or enter manually.',
				modes: [
					{
						displayName: 'Emergency Address',
						name: 'list',
						type: 'list',
						placeholder: 'Select an emergency address...',
						typeOptions: {
							searchListMethod: 'searchEmergencyAddressesForDomain',
							searchable: true,
							searchFilterRequired: false,
						},
					},
					{
						displayName: 'Emergency Address ID',
						name: 'id',
						type: 'string',
						placeholder: 'e.g. 12345',
					},
				],
			});
			continue;
		}

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

		if (field.name === 'site') {
			fields.push({
				displayName: field.displayName,
				name: operationBodyFieldKey(templatedUserUpdateId, field.name),
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				required: isRequired,
				displayOptions: { show: shouldShow },
				description: 'Site within the selected domain. Choose from list or enter manually.',
				modes: [
					{
						displayName: 'Site',
						name: 'list',
						type: 'list',
						placeholder: 'Select a site...',
						typeOptions: {
							searchListMethod: 'searchSitesForDomain',
							searchable: true,
							searchFilterRequired: false,
						},
					},
					{
						displayName: 'Site',
						name: 'name',
						type: 'string',
						placeholder: 'e.g. Headquarters',
					},
				],
			});
			continue;
		}

		if (field.name === 'emergency-address-id') {
			fields.push({
				displayName: field.displayName,
				name: operationBodyFieldKey(templatedUserUpdateId, field.name),
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				required: isRequired,
				displayOptions: { show: shouldShow },
				description: 'Emergency address identifier. Choose from list or enter manually.',
				modes: [
					{
						displayName: 'Emergency Address',
						name: 'list',
						type: 'list',
						placeholder: 'Select an emergency address...',
						typeOptions: {
							searchListMethod: 'searchEmergencyAddressesForDomain',
							searchable: true,
							searchFilterRequired: false,
						},
					},
					{
						displayName: 'Emergency Address ID',
						name: 'id',
						type: 'string',
						placeholder: 'e.g. 12345',
					},
				],
			});
			continue;
		}

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

// --- Media field builder (MOH, Greetings, Hold Messages) ---

function buildMediaFields(): INodeProperties[] {
	const fields: INodeProperties[] = [];

	// Helper to build displayOptions for a media operation
	const mohShow = (opId: string): DisplayOptionsShow => ({
		resource: [getMediaResource(opId)],
		operation: [opId],
	});

	// Helper for conditional show (adds extra condition on top of resource+operation)
	const mohShowWith = (opId: string, extra: Record<string, string[]>): DisplayOptionsShow => ({
		...mohShow(opId),
		...extra,
	});

	// --- TTS operations ---
	for (const opId of mediaTtsOperationIds) {
		const isCreate = mediaCreateOperationIds.has(opId);

		fields.push({
			displayName: 'Synchronous',
			name: operationBodyFieldKey(opId, 'synchronous'),
			type: 'options',
			default: 'yes',
			required: true,
			displayOptions: { show: mohShow(opId) },
			description: 'Whether to wait for a 200 response or receive a 202 acknowledgement',
			options: [
				{ name: 'Yes', value: 'yes' },
				{ name: 'No', value: 'no' },
			],
		});

		fields.push({
			displayName: 'Script',
			name: operationBodyFieldKey(opId, 'script'),
			type: 'string',
			default: '',
			required: true,
			displayOptions: { show: mohShow(opId) },
			description: 'Text-to-speech content or description of the audio',
			typeOptions: { rows: 3 },
		});

		if (isCreate) {
			fields.push({
				displayName: 'Index',
				name: operationBodyFieldKey(opId, 'index'),
				type: 'string',
				default: '',
				placeholder: 'e.g. 2 (leave empty for auto-assign)',
				displayOptions: { show: mohShow(opId) },
				description: 'MOH index position. 0 = intro greeting. Leave empty for auto-assignment.',
				validateType: 'number',
			});
		}

		fields.push({
			displayName: 'Voice Language',
			name: operationBodyFieldKey(opId, 'voice_language'),
			type: 'string',
			default: 'en-US',
			displayOptions: { show: mohShow(opId) },
			description: 'Language code for TTS voice (e.g. en-US, es-MX, fr-CA)',
		});

		fields.push({
			displayName: 'Voice ID',
			name: operationBodyFieldKey(opId, 'voice_id'),
			type: 'string',
			default: 'en-US-Wavenet-C',
			displayOptions: { show: mohShow(opId) },
			description: 'TTS voice identifier',
		});
	}

	// --- Upload operations (consolidated Base64 + FileUpload) ---
	for (const opId of mediaUploadOperationIds) {
		const isCreate = mediaCreateOperationIds.has(opId);
		const fileSourceKey = operationBodyFieldKey(opId, 'fileSource');

		fields.push({
			displayName: 'Synchronous',
			name: operationBodyFieldKey(opId, 'synchronous'),
			type: 'options',
			default: 'yes',
			required: true,
			displayOptions: { show: mohShow(opId) },
			description: 'Whether to wait for a 200 response or receive a 202 acknowledgement',
			options: [
				{ name: 'Yes', value: 'yes' },
				{ name: 'No', value: 'no' },
			],
		});

		fields.push({
			displayName: 'Script',
			name: operationBodyFieldKey(opId, 'script'),
			type: 'string',
			default: '',
			required: true,
			displayOptions: { show: mohShow(opId) },
			description: 'Description of the audio file',
		});

		if (isCreate) {
			fields.push({
				displayName: 'Index',
				name: operationBodyFieldKey(opId, 'index'),
				type: 'string',
				default: '',
				placeholder: 'e.g. 2 (leave empty for auto-assign)',
				displayOptions: { show: mohShow(opId) },
				description: 'MOH index position. 0 = intro greeting. Leave empty for auto-assignment.',
				validateType: 'number',
			});
		}

		fields.push({
			displayName: 'Convert',
			name: operationBodyFieldKey(opId, 'convert'),
			type: 'options',
			default: 'yes',
			displayOptions: { show: mohShow(opId) },
			description: 'Whether the API should convert the file format for playback compatibility',
			options: [
				{ name: 'Yes', value: 'yes' },
				{ name: 'No', value: 'no' },
			],
		});

		fields.push({
			displayName: 'File Source',
			name: fileSourceKey,
			type: 'options',
			default: 'binaryData',
			required: true,
			displayOptions: { show: mohShow(opId) },
			description: 'How to provide the audio file',
			options: [
				{ name: 'Binary Data From Previous Node', value: 'binaryData' },
				{ name: 'Base64 Text Input', value: 'base64Text' },
			],
		});

		fields.push({
			displayName: 'Binary Property',
			name: operationBodyFieldKey(opId, 'binaryProperty'),
			type: 'string',
			default: 'data',
			displayOptions: { show: mohShowWith(opId, { [fileSourceKey]: ['binaryData'] }) },
			description: 'Name of the binary property from a previous node containing the audio file',
		});

		fields.push({
			displayName: 'Encoding',
			name: operationBodyFieldKey(opId, 'encoding'),
			type: 'string',
			default: '',
			displayOptions: { show: mohShow(opId) },
			description: 'MIME type of the audio file (e.g. audio/wav, audio/mp3). Leave empty to auto-detect from binary data.',
		});

		fields.push({
			displayName: 'Base64 File',
			name: operationBodyFieldKey(opId, 'base64_file'),
			type: 'string',
			default: '',
			displayOptions: { show: mohShowWith(opId, { [fileSourceKey]: ['base64Text'] }) },
			description: 'Base64-encoded audio file content. Use an n8n expression to reference data from a previous node without pasting large values.',
			typeOptions: { rows: 3 },
		});
	}

	return fields;
}

// --- Image field builder ---

function buildImageFields(): INodeProperties[] {
	const fields: INodeProperties[] = [];

	const imgShow = (opId: string): DisplayOptionsShow => ({
		resource: ['Images'],
		operation: [opId],
	});

	const imgShowWith = (opId: string, extra: Record<string, string[]>): DisplayOptionsShow => ({
		...imgShow(opId),
		...extra,
	});

	for (const opId of imageUploadOperationIds) {
		const fileSourceKey = operationBodyFieldKey(opId, 'fileSource');

		fields.push({
			displayName: 'File Source',
			name: fileSourceKey,
			type: 'options',
			default: 'binaryData',
			required: true,
			displayOptions: { show: imgShow(opId) },
			description: 'How to provide the image file',
			options: [
				{ name: 'Binary Data From Previous Node', value: 'binaryData' },
				{ name: 'Base64 Text Input', value: 'base64Text' },
			],
		});

		fields.push({
			displayName: 'Binary Property',
			name: operationBodyFieldKey(opId, 'binaryProperty'),
			type: 'string',
			default: 'data',
			displayOptions: { show: imgShowWith(opId, { [fileSourceKey]: ['binaryData'] }) },
			description: 'Name of the binary property from a previous node containing the image file',
		});

		fields.push({
			displayName: 'Filetype (Encoding)',
			name: operationBodyFieldKey(opId, 'filetype'),
			type: 'string',
			default: '',
			required: true,
			displayOptions: { show: imgShow(opId) },
			description: 'MIME type of the image file (e.g. image/png, image/jpeg). Leave empty to auto-detect from binary data.',
		});

		fields.push({
			displayName: 'Base64 File',
			name: operationBodyFieldKey(opId, 'base64_file'),
			type: 'string',
			default: '',
			displayOptions: { show: imgShowWith(opId, { [fileSourceKey]: ['base64Text'] }) },
			description: 'Base64-encoded image file content. Use an n8n expression to reference data from a previous node without pasting large values.',
			typeOptions: { rows: 3 },
		});

		fields.push({
			displayName: 'Description',
			name: operationBodyFieldKey(opId, 'description'),
			type: 'string',
			default: '',
			displayOptions: { show: imgShow(opId) },
			description: 'A description of the image file to indicate what it is used for',
		});

		fields.push({
			displayName: 'Reseller',
			name: operationBodyFieldKey(opId, 'reseller'),
			type: 'string',
			default: '*',
			displayOptions: { show: imgShow(opId) },
			description: 'The reseller or territory the image file applies to. Defaults to "*" (all).',
		});

		fields.push({
			displayName: 'Domain',
			name: operationBodyFieldKey(opId, 'domain'),
			type: 'string',
			default: '*',
			displayOptions: { show: imgShow(opId) },
			description: 'The domain the image file applies to. Defaults to "*" (all).',
		});

		fields.push({
			displayName: 'Server',
			name: operationBodyFieldKey(opId, 'server'),
			type: 'string',
			default: '*',
			displayOptions: { show: imgShow(opId) },
			description: 'The server the image file applies to. Defaults to "*" (all).',
		});
	}

	return fields;
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

function getHttpStatusCode(error: unknown): number | undefined {
	if (!error || typeof error !== 'object') {
		return undefined;
	}

	const record = error as Record<string, unknown>;
	const directCandidates = [record.statusCode, record.httpCode, record.code];
	for (const candidate of directCandidates) {
		if (typeof candidate === 'number' && Number.isFinite(candidate)) {
			return candidate;
		}
		if (typeof candidate === 'string') {
			const parsed = Number.parseInt(candidate.trim(), 10);
			if (Number.isFinite(parsed)) {
				return parsed;
			}
		}
	}

	const response = record.response;
	if (response && typeof response === 'object') {
		const responseStatus = (response as Record<string, unknown>).status;
		if (typeof responseStatus === 'number' && Number.isFinite(responseStatus)) {
			return responseStatus;
		}
	}

	const cause = record.cause;
	if (cause && typeof cause === 'object') {
		const causeCode = getHttpStatusCode(cause);
		if (typeof causeCode === 'number') {
			return causeCode;
		}
	}

	return undefined;
}

function isAuthFailureStatus(statusCode: number | undefined, errorText: string): boolean {
	if (statusCode === 401 || statusCode === 403) {
		return true;
	}

	return /status\s+code\s+401/i.test(errorText) || /status\s+code\s+403/i.test(errorText);
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
	if (name.toLowerCase() === 'callid') {
		return 'Call ID';
	}
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

	if (resource === authenticationJwtResource) {
		resourceOperations.push({
			name: 'Validate JWT',
			value: validateJwtOperationId,
			action: 'Validate JWT',
		});
	}

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

function isLikelyDateTimeParam(name: string): boolean {
	const normalized = name.trim().toLowerCase();
	if (!normalized) {
		return false;
	}

	if (normalized.includes('datetime') || normalized.includes('date')) {
		return true;
	}

	if (
		normalized.includes('start_time') ||
		normalized.includes('end_time') ||
		normalized.includes('start-time') ||
		normalized.includes('end-time')
	) {
		return true;
	}

	return false;
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

function toEpochSeconds(value: unknown): number | undefined {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return Math.trunc(value);
	}

	if (typeof value === 'string') {
		const parsed = Number.parseInt(value.trim(), 10);
		if (Number.isFinite(parsed)) {
			return parsed;
		}
	}

	return undefined;
}

function withJwtExpirationValidation(value: unknown): IDataObject {
	const output = toIDataObject(value);
	const expSeconds = toEpochSeconds(output.exp);
	const nowSeconds = Math.trunc(Date.now() / 1000);

	output.jwtValidationCheckedAt = new Date().toISOString();

	if (expSeconds === undefined) {
		output.jwtIsUnexpired = false;
		output.jwtValidationReason = 'Missing or invalid exp claim';
		return output;
	}

	const expiresInSeconds = expSeconds - nowSeconds;
	output.jwtIsUnexpired = expiresInSeconds > 0;
	output.jwtExpiresAt = new Date(expSeconds * 1000).toISOString();
	output.jwtExpiresInSeconds = expiresInSeconds;

	if (expiresInSeconds <= 0) {
		output.jwtValidationReason = 'Token exp is in the past';
	}

	return output;
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

	fields.push({
		displayName: 'JSON Web Token (ns_t)',
		name: validateJwtTokenParamName,
		type: 'string',
		default: '',
		required: true,
		typeOptions: {
			password: true,
		},
		description:
			'JWT token value to validate. Used only for this request and sent as Authorization: Bearer &lt;token&gt;.',
		displayOptions: {
			show: {
				resource: [authenticationJwtResource],
				operation: [validateJwtOperationId],
			},
		},
	});

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
		const hasTargetDomainQueryParam = op.parameters.some((p) => p.in === 'query' && p.name === 'target-domain');
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

			if (param.in === 'path' && param.name === 'reseller') {
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
							displayName: 'Reseller',
							name: 'list',
							type: 'list',
							placeholder: 'Select a reseller...',
							typeOptions: {
								searchListMethod: 'searchResellers',
								searchable: true,
								searchFilterRequired: false,
							},
						},
						{
							displayName: 'Reseller',
							name: 'id',
							type: 'string',
							placeholder: 'e.g. WLP',
						},
					],
				});
				continue;
			}

			if ((param.in === 'path' || param.in === 'query') && param.name === 'server') {
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
							displayName: 'Server',
							name: 'list',
							type: 'list',
							placeholder: 'Select a server...',
							typeOptions: {
								searchListMethod: 'searchWsServers',
								searchable: true,
								searchFilterRequired: false,
							},
						},
						{
							displayName: 'Server',
							name: 'name',
							type: 'string',
							placeholder: 'e.g. core1-iad.ucaas.network',
						},
					],
				});
				continue;
			}

			if (effectiveResource === 'Connections' && param.in === 'query' && param.name === 'domain') {
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

			if (op.id === 'GetHolidaysByBy' && param.in === 'path' && param.name === 'country') {
				fields.push({
					displayName: 'Country',
					name: fieldName,
					type: 'resourceLocator',
					default: { mode: 'list', value: '' },
					required: param.required,
					displayOptions: fieldDisplayOptions,
					description: param.description,
					modes: [
						{
							displayName: 'Country',
							name: 'list',
							type: 'list',
							placeholder: 'Select a country...',
							typeOptions: {
								searchListMethod: 'searchHolidayCountries',
								searchable: true,
								searchFilterRequired: false,
							},
						},
						{
							displayName: 'Country',
							name: 'code',
							type: 'string',
							placeholder: 'e.g. US',
						},
					],
				});
				continue;
			}

			if (op.id === 'GetHolidaysByByBy' && param.in === 'path' && param.name === 'country') {
				fields.push({
					displayName: 'Country',
					name: fieldName,
					type: 'resourceLocator',
					default: { mode: 'list', value: '' },
					required: param.required,
					displayOptions: fieldDisplayOptions,
					description: param.description,
					modes: [
						{
							displayName: 'Country',
							name: 'list',
							type: 'list',
							placeholder: 'Select a country...',
							typeOptions: {
								searchListMethod: 'searchHolidayCountries',
								searchable: true,
								searchFilterRequired: false,
							},
						},
						{
							displayName: 'Country',
							name: 'code',
							type: 'string',
							placeholder: 'e.g. US',
						},
					],
				});
				continue;
			}

			if (op.id === 'GetHolidaysByByBy' && param.in === 'path' && param.name === 'region') {
				fields.push({
					displayName: 'Region',
					name: fieldName,
					type: 'resourceLocator',
					default: { mode: 'list', value: '' },
					required: param.required,
					displayOptions: fieldDisplayOptions,
					description: param.description,
					typeOptions: {
						loadOptionsDependsOn: [parameterName(op.id, 'path', 'country')],
					},
					modes: [
						{
							displayName: 'Region',
							name: 'list',
							type: 'list',
							placeholder: 'Select a region...',
							typeOptions: {
								searchListMethod: 'searchHolidayRegions',
								searchable: true,
								searchFilterRequired: false,
							},
						},
						{
							displayName: 'Region',
							name: 'code',
							type: 'string',
							placeholder: 'e.g. US-NY',
						},
					],
				});
				continue;
			}

			if (
				(param.in === 'path' || param.in === 'query') &&
				param.name === 'site' &&
				(hasDomainPathParam || hasTargetDomainQueryParam)
			) {
				fields.push({
					displayName: 'Site',
					name: fieldName,
					type: 'resourceLocator',
					default: { mode: 'list', value: '' },
					required: param.required,
					displayOptions: fieldDisplayOptions,
					description: param.description,
					modes: [
						{
							displayName: 'Site',
							name: 'list',
							type: 'list',
							placeholder: 'Select a site...',
							typeOptions: {
								searchListMethod: 'searchSitesForDomain',
								searchable: true,
								searchFilterRequired: false,
							},
						},
						{
							displayName: 'Site',
							name: 'name',
							type: 'string',
							placeholder: 'e.g. Headquarters',
						},
					],
				});
				continue;
			}

			if (param.in === 'query' && isLikelyDateTimeParam(param.name)) {
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

			if (param.in === 'query' && param.name === 'type' && effectiveResource === 'CDR (Call History)') {
				fields.push({
					displayName: 'Type',
					name: fieldName,
					type: 'resourceLocator',
					default: { mode: 'list', value: '' },
					required: param.required,
					displayOptions: fieldDisplayOptions,
					description: param.description,
					modes: [
						{
							displayName: 'Type',
							name: 'list',
							type: 'list',
							placeholder: 'Select a type (optional)...',
							typeOptions: {
								searchListMethod: 'searchCdrTypes',
								searchable: true,
								searchFilterRequired: false,
							},
						},
						{
							displayName: 'Type',
							name: 'custom',
							type: 'string',
							placeholder: 'e.g. Inbound or 0',
						},
					],
				});
				continue;
			}

			if (param.in === 'query' && param.name === 'group' && op.id === 'GetDomainsByCdrs_2') {
				fields.push({
					displayName: 'Group (Department)',
					name: fieldName,
					type: guessFieldType(param.schemaType),
					default: '',
					required: param.required,
					displayOptions: fieldDisplayOptions,
					description: param.description,
				});
				continue;
			}

			if (param.in === 'query' && param.name === 'type' && effectiveResource === 'Call Traces & Cradle to Grave') {
				fields.push({
					displayName: 'Type',
					name: fieldName,
					type: 'options',
					default: 'csv',
					required: param.required,
					displayOptions: fieldDisplayOptions,
					description: param.description,
					options: [
						{ name: 'Call Trace', value: 'call_trace' },
						{ name: 'Cradle to Grave', value: 'cradle_to_grave' },
						{ name: 'CSV', value: 'csv' },
					],
				});
				continue;
			}

			if (param.in === 'query' && param.name === 'download' && effectiveResource === 'Call Traces & Cradle to Grave') {
				fields.push({
					displayName: 'Download',
					name: fieldName,
					type: 'options',
					default: '',
					required: param.required,
					displayOptions: fieldDisplayOptions,
					description: 'Choose whether to download the file or return Base64 in JSON',
					options: [
						{ name: 'Base64 in JSON', value: '' },
						{ name: 'Download File', value: 'yes' },
					],
				});
				continue;
			}

			if (op.id === 'GetAccesslog' && param.in === 'query' && param.name === 'target-domain') {
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

			if (op.id === 'GetAccesslog' && param.in === 'query' && param.name === 'target-user') {
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

			// Media operations: dynamic dropdown for the index path parameter
			if (param.in === 'path' && param.name === 'index' && mediaIndexDropdownOperationIds.has(op.id)) {
				fields.push({
					displayName: 'Index',
					name: fieldName,
					type: 'resourceLocator',
					default: { mode: 'list', value: '' },
					required: param.required,
					displayOptions: fieldDisplayOptions,
					description: 'Select an existing media item to update/delete, or enter an index manually',
					modes: [
						{
							displayName: 'From List',
							name: 'list',
							type: 'list',
							placeholder: 'Select a media item...',
							typeOptions: {
								searchListMethod: 'searchMediaItems',
								searchable: false,
								searchFilterRequired: false,
							},
						},
						{
							displayName: 'Index',
							name: 'id',
							type: 'string',
							placeholder: 'e.g. 2',
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
			if (isMediaTemplatedOperation(op.id)) {
				continue;
			}
			if (isImageTemplatedOperation(op.id)) {
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
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				displayOptions: {
					show: {
						operation: resellerAwareOperationIds,
					},
					hide: {
						resource: ['Resellers', 'raw'],
					},
				},
				description: 'Choose from the list, or enter an ID manually',
				modes: [
					{
						displayName: 'Reseller',
						name: 'list',
						type: 'list',
						placeholder: 'Select a reseller...',
						typeOptions: {
							searchListMethod: 'searchResellers',
							searchable: true,
							searchFilterRequired: false,
						},
					},
					{
						displayName: 'Reseller',
						name: 'id',
						type: 'string',
						placeholder: 'e.g. WLP',
					},
				],
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
			...buildMediaFields(),
			...buildImageFields(),
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

					const name = typeof description === 'string' && description ? `${description} - ${reseller}` : reseller;
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
			async searchDomains(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
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

					if (items.length) {
						const next: INodePropertyOptions[] = [];
						for (const item of items) {
							const value = item as Record<string, unknown>;
							const domain = typeof value.domain === 'string' ? value.domain.trim() : '';
							if (!domain) {
								continue;
							}
							next.push({ name: formatDomainLabel(value, domain), value: domain });
						}
						next.sort((a, b) => a.name.localeCompare(b.name));
						domainsCacheByBaseUrl.set(baseUrl, { fetchedAtMs: now, options: next });
						options = next;
					}
				}

				const normalizedFilter = typeof filter === 'string' ? filter.trim().toLowerCase() : '';
				const results = options
					.filter((entry) => (normalizedFilter ? entry.name.toLowerCase().includes(normalizedFilter) : true))
					.slice(0, 200)
					.map((entry) => ({ name: entry.name, value: entry.value }));

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
					parameterName(templatedUserCreateId, 'path', 'domain'),
					parameterName(templatedUserUpdateId, 'path', 'domain'),
					parameterName(templatedUserDeleteId, 'path', 'domain'),
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
						response = undefined;
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
							next.push({ name: formatUserLabel(value, userId), value: userId });
						}
						next.sort((a, b) => a.name.localeCompare(b.name));
						usersCacheByBaseUrlAndDomain.set(cacheKey, { fetchedAtMs: now, options: next });
						options = next;
					}
				}

				const normalizedFilter = typeof filter === 'string' ? filter.trim().toLowerCase() : '';
				const results = options
					.filter((entry) => (normalizedFilter ? entry.name.toLowerCase().includes(normalizedFilter) : true))
					.slice(0, 200)
					.map((entry) => ({ name: entry.name, value: entry.value }));

				return { results };
			},

			async searchSitesForDomain(
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
					parameterName(templatedUserCreateId, 'path', 'domain'),
					parameterName(templatedUserUpdateId, 'path', 'domain'),
					parameterName(templatedUserDeleteId, 'path', 'domain'),
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
				const cached = sitesCacheByBaseUrlAndDomain.get(cacheKey);

				let options: INodePropertyOptions[] = [];
				if (!shouldRefresh && cached && cached.options.length && now - cached.fetchedAtMs < loadOptionsTtlMs) {
					options = cached.options;
				} else {
					let response: unknown;
					try {
						const url = `${baseUrl}/domains/${encodeURIComponent(domain)}/sites/list`;
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
						next.push({ name: 'No Site Selected', value: '' });
						for (const item of items) {
							if (typeof item === 'string') {
								const site = item.trim();
								if (site) {
									next.push({ name: site, value: site });
								}
								continue;
							}
							const value = item as Record<string, unknown>;
							const rawSite = value.site ?? value.name ?? value.id;
							const site =
								typeof rawSite === 'string' || typeof rawSite === 'number'
									? String(rawSite).trim()
									: '';
							if (!site) {
								continue;
							}
							next.push({ name: site, value: site });
						}
						const head = next.shift();
						next.sort((a, b) => a.name.localeCompare(b.name));
						if (head) {
							next.unshift(head);
						}
						sitesCacheByBaseUrlAndDomain.set(cacheKey, { fetchedAtMs: now, options: next });
						options = next;
					}
				}

				const normalizedFilter = typeof filter === 'string' ? filter.trim().toLowerCase() : '';
				const results = options
					.filter((entry) => (normalizedFilter ? entry.name.toLowerCase().includes(normalizedFilter) : true))
					.slice(0, 200)
					.map((entry) => ({ name: entry.name, value: entry.value }));

				return { results };
			},

			async searchEmergencyAddressesForDomain(
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
					parameterName(templatedUserCreateId, 'path', 'domain'),
					parameterName(templatedUserUpdateId, 'path', 'domain'),
					parameterName(templatedUserDeleteId, 'path', 'domain'),
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
				const cached = emergencyAddressesCacheByBaseUrlAndDomain.get(cacheKey);

				let options: INodePropertyOptions[] = [];
				if (!shouldRefresh && cached && cached.options.length && now - cached.fetchedAtMs < loadOptionsTtlMs) {
					options = cached.options;
				} else {
					let response: unknown;
					try {
						const url = `${baseUrl}/domains/${encodeURIComponent(domain)}/addresses`;
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
							const rawId =
								value['emergency-address-id'] ??
								value.emergency_address_id ??
								value.emergencyAddressId ??
								value.address_id ??
								value.addressId ??
								value.id;
							const id =
								typeof rawId === 'string' || typeof rawId === 'number' ? String(rawId).trim() : '';
							if (!id) {
								continue;
							}
							const description = typeof value.description === 'string' ? value.description.trim() : '';
							const location = getFirstStringField(value, ['location', 'name', 'label', 'address-name', 'addressName']);
							const address1 = getFirstStringField(value, [
								'address1',
								'address-1',
								'street',
								'street1',
								'street_1',
							]);
							const city = getFirstStringField(value, ['city', 'town']);
							const state = getFirstStringField(value, ['state', 'province', 'region']);
							const postalCode = getFirstStringField(value, ['zip', 'postal', 'postal-code', 'postalCode']);
							const parts = [description || location, address1, [city, state, postalCode].filter(Boolean).join(' ')].filter(
								(part) => Boolean(part),
							);
							const label = parts.length ? `${id} - ${parts.join(' - ')}` : id;
							next.push({ name: label, value: id });
						}
						next.sort((a, b) => a.name.localeCompare(b.name));
						emergencyAddressesCacheByBaseUrlAndDomain.set(cacheKey, { fetchedAtMs: now, options: next });
						options = next;
					}
				}

				const normalizedFilter = typeof filter === 'string' ? filter.trim().toLowerCase() : '';
				const results = options
					.filter((entry) => (normalizedFilter ? entry.name.toLowerCase().includes(normalizedFilter) : true))
					.slice(0, 200)
					.map((entry) => ({ name: entry.name, value: entry.value }));

				return { results };
			},

			async searchCdrTypes(this: ILoadOptionsFunctions, filter?: string): Promise<INodeListSearchResult> {
				const options: INodePropertyOptions[] = [
					{ name: 'Inbound', value: 'Inbound' },
					{ name: 'Outbound', value: 'Outbound' },
					{ name: 'On-net', value: 'On-net' },
					{ name: 'Off-net', value: 'Off-net' },
					{ name: 'Missed', value: 'Missed' },
					{ name: 'Received', value: 'Received' },
					{ name: '0', value: '0' },
					{ name: '1', value: '1' },
					{ name: '2', value: '2' },
					{ name: '3', value: '3' },
				];
				const normalizedFilter = typeof filter === 'string' ? filter.trim().toLowerCase() : '';
				const results = options
					.filter((entry) => (normalizedFilter ? entry.name.toLowerCase().includes(normalizedFilter) : true))
					.map((entry) => ({ name: entry.name, value: entry.value }));
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

			async searchHolidayCountries(
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
				const cached = holidayCountriesCacheByBaseUrl.get(baseUrl);

				let options: INodePropertyOptions[] = [];
				if (!shouldRefresh && cached && cached.options.length && now - cached.fetchedAtMs < loadOptionsTtlMs) {
					options = cached.options;
				} else {
					let response: unknown;
					try {
						const url = `${baseUrl}/holidays/countries`;
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
							const iso = value['iso-3166'];
							const code = typeof iso === 'string' ? iso.trim() : '';
							if (!code) {
								continue;
							}
							const countryName = typeof value.country_name === 'string' ? value.country_name.trim() : '';
							const flag = typeof value.flag_unicode === 'string' ? value.flag_unicode.trim() : '';
							const nameParts = [code, countryName, flag].filter((part) => Boolean(part));
							next.push({ name: nameParts.join(' - '), value: code });
						}
						holidayCountriesCacheByBaseUrl.set(baseUrl, { fetchedAtMs: now, options: next });
						options = next;
					}
				}

				const normalizedFilter = typeof filter === 'string' ? filter.trim().toLowerCase() : '';
				const results = options
					.filter((entry) => (normalizedFilter ? entry.name.toLowerCase().includes(normalizedFilter) : true))
					.slice(0, 500)
					.map((entry) => ({ name: entry.name, value: entry.value }));

				return { results };
			},

			async searchHolidayRegions(
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

				let countryParam: unknown;
				try {
					countryParam = this.getCurrentNodeParameter(parameterName(operationId, 'path', 'country'), {
						rawExpressions: true,
					});
				} catch {
					countryParam = undefined;
				}
				const selectedCountry = extractLocatorValue(countryParam).trim();
				const selectedCountryPrefix = selectedCountry ? `${selectedCountry} - ` : '';

				const shouldRefresh = Boolean(this.getCurrentNodeParameter('refreshOptions') ?? false);
				const now = Date.now();
				const cached = holidayRegionsCacheByBaseUrl.get(baseUrl);

				let options: INodePropertyOptions[] = [];
				if (!shouldRefresh && cached && cached.options.length && now - cached.fetchedAtMs < loadOptionsTtlMs) {
					options = cached.options;
				} else {
					let response: unknown;
					try {
						const url = `${baseUrl}/holidays/regions`;
						response = await netSapiensRequest(this, {
							method: toHttpRequestMethod('GET'),
							url,
						});
					} catch {
						options = cached?.options ?? [];
					}

					if (response !== undefined) {
						const next: INodePropertyOptions[] = [];

						const isLikelyCountryMap = (value: unknown): value is Record<string, unknown> => {
							if (!value || typeof value !== 'object' || Array.isArray(value)) {
								return false;
							}
							const record = value as Record<string, unknown>;
							const entries = Object.entries(record);
							return entries.some(
								([key, child]) => /^[A-Z]{2}$/i.test(key.trim()) && !!child && typeof child === 'object',
							);
						};

						let regionRoot: Record<string, unknown> | undefined;
						if (Array.isArray(response)) {
							regionRoot = response.find((item) => isLikelyCountryMap(item)) as
								| Record<string, unknown>
								| undefined;
						} else if (isLikelyCountryMap(response)) {
							regionRoot = response;
						} else if (response && typeof response === 'object') {
							const record = response as Record<string, unknown>;
							const candidates: unknown[] = [];
							for (const key of ['regions', 'region', 'supportedRegions', 'supported-regions']) {
								candidates.push(record[key]);
							}
							for (const key of ['items', 'data']) {
								const value = record[key];
								if (Array.isArray(value)) {
									candidates.push(value.find((item) => item && typeof item === 'object'));
								}
							}
							regionRoot = candidates.find((candidate) => isLikelyCountryMap(candidate)) as
								| Record<string, unknown>
								| undefined;
						}

						const countryMaps = regionRoot ? Object.entries(regionRoot) : [];
						for (const [countryCodeRaw, regionsRaw] of countryMaps) {
							const countryCode = countryCodeRaw.trim();
							if (!countryCode || !regionsRaw || typeof regionsRaw !== 'object') {
								continue;
							}
							const regionEntries = Object.entries(regionsRaw as Record<string, unknown>);
							for (const [regionCodeRaw, regionNameRaw] of regionEntries) {
								const regionCode = regionCodeRaw.trim();
								if (!regionCode) {
									continue;
								}
								const regionName =
									typeof regionNameRaw === 'string' ? regionNameRaw.trim() : String(regionNameRaw ?? '').trim();
								next.push({
									name: `${countryCode} - ${regionCode} - ${regionName}`,
									value: regionCode,
								});
							}
						}

						holidayRegionsCacheByBaseUrl.set(baseUrl, { fetchedAtMs: now, options: next });
						options = next;
					}
				}

				const normalizedFilter = typeof filter === 'string' ? filter.trim().toLowerCase() : '';
				const results = options
					.filter((entry) => {
						if (selectedCountryPrefix && !entry.name.startsWith(selectedCountryPrefix)) {
							return false;
						}
						if (!normalizedFilter) {
							return true;
						}
						return entry.name.toLowerCase().includes(normalizedFilter);
					})
					.slice(0, 500)
					.map((entry) => ({ name: entry.name, value: entry.value }));

				return { results };
			},
			async searchResellers(
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
				const cached = resellersCacheByBaseUrl.get(baseUrl);

				let options: INodePropertyOptions[] = [];
				if (!shouldRefresh && cached && cached.options.length && now - cached.fetchedAtMs < loadOptionsTtlMs) {
					options = cached.options;
				} else {
					let response: unknown;
					try {
						const url = `${baseUrl}/resellers`;
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
							const reseller = typeof value.reseller === 'string' ? value.reseller.trim() : '';
							if (!reseller) {
								continue;
							}
							const description = typeof value.description === 'string' ? value.description.trim() : '';
							const name = description && description !== reseller ? `${description} - ${reseller}` : reseller;
							next.push({ name, value: reseller });
						}
						next.sort((a, b) => a.name.localeCompare(b.name));
						resellersCacheByBaseUrl.set(baseUrl, { fetchedAtMs: now, options: next });
						options = next;
					}
				}

				const normalizedFilter = typeof filter === 'string' ? filter.trim().toLowerCase() : '';
				const results = options
					.filter((entry) => (normalizedFilter ? entry.name.toLowerCase().includes(normalizedFilter) : true))
					.slice(0, 200)
					.map((entry) => ({ name: entry.name, value: entry.value }));

				return { results };
			},

			async searchWsServers(
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
				const cached = wsServersCacheByBaseUrl.get(baseUrl);

				let options: INodePropertyOptions[] = [];
				if (!shouldRefresh && cached && cached.options.length && now - cached.fetchedAtMs < loadOptionsTtlMs) {
					options = cached.options;
				} else {
					let response: unknown;
					try {
						const url = `${baseUrl}/configurations/${encodeURIComponent('WS_SERVERS')}`;
						response = await netSapiensRequest(this, {
							method: toHttpRequestMethod('GET'),
							url,
						});
					} catch {
						options = cached?.options ?? [];
					}

					if (response !== undefined) {
						const items = normalizeArrayResponse(response);
						const first = items.find((item) => item && typeof item === 'object') as Record<string, unknown> | undefined;
						const raw = first?.['config-value'];
						const rawValue = typeof raw === 'string' ? raw : '';
						const servers = rawValue
							.split(',')
							.map((v) => v.trim())
							.filter(Boolean);
						const next: INodePropertyOptions[] = servers.map((server) => ({ name: server, value: server }));
						wsServersCacheByBaseUrl.set(baseUrl, { fetchedAtMs: now, options: next });
						options = next;
					}
				}

				const normalizedFilter = typeof filter === 'string' ? filter.trim().toLowerCase() : '';
				const results = options
					.filter((entry) => (normalizedFilter ? entry.name.toLowerCase().includes(normalizedFilter) : true))
					.slice(0, 200)
					.map((entry) => ({ name: entry.name, value: entry.value }));

				return { results };
			},

			async searchMediaItems(
				this: ILoadOptionsFunctions,
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
				if (!operationId || !mediaIndexDropdownOperationIds.has(operationId)) {
					return { results: [] };
				}

				// Resolve domain parameter
				const domainParamNames = [
					parameterName(operationId, 'path', 'domain'),
				];
				let domainParam: unknown;
				for (const name of domainParamNames) {
					try {
						domainParam = this.getCurrentNodeParameter(name, { rawExpressions: true });
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

				// Resolve user parameter if needed
				let user = '';
				if (mediaReadRequiresUser(operationId)) {
					const userParamNames = [
						parameterName(operationId, 'path', 'user'),
					];
					let userParam: unknown;
					for (const name of userParamNames) {
						try {
							userParam = this.getCurrentNodeParameter(name, { rawExpressions: true });
						} catch {
							continue;
						}
						if (userParam !== undefined && userParam !== null && userParam !== '') {
							break;
						}
					}
					user = extractLocatorValue(userParam).trim();
					if (!user || isExpressionLikeValue(user)) {
						return { results: [] };
					}
				}

				// Build Read endpoint URL
				const pathSegment = getMediaReadPathSegment(operationId);
				if (!pathSegment) {
					return { results: [] };
				}

				let readUrl: string;
				if (mediaReadRequiresUser(operationId)) {
					readUrl = `${baseUrl}/domains/${encodeURIComponent(domain)}/users/${encodeURIComponent(user)}/${pathSegment}`;
				} else {
					readUrl = `${baseUrl}/domains/${encodeURIComponent(domain)}/${pathSegment}`;
				}

				let response: unknown;
				try {
					response = await netSapiensRequest(this, {
						method: toHttpRequestMethod('GET'),
						url: readUrl,
					});
				} catch {
					return { results: [] };
				}

				const items = normalizeArrayResponse(response);
				const results: Array<{ name: string; value: string }> = [];

				for (const item of items) {
					const value = item as Record<string, unknown>;
					const ordinalOrder = value['ordinal-order'];
					if (ordinalOrder === undefined || ordinalOrder === null) {
						continue;
					}
					const index = String(ordinalOrder);

					// Build descriptive label
					const parts: string[] = [`Index ${index}`];
					const filename = value['filename'] ?? value['file-name'];
					if (typeof filename === 'string' && filename) {
						parts.push(filename);
					}
					const script = value['file-script-text'];
					if (typeof script === 'string' && script) {
						parts.push(`"${script}"`);
					}
					const duration = value['file-duration-seconds'];
					if (duration !== undefined && duration !== null && duration !== '') {
						parts.push(`${duration}s`);
					}

					results.push({
						name: parts.join(' - '),
						value: index,
					});
				}

				// Sort by index numerically
				results.sort((a, b) => Number(a.value) - Number(b.value));

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

				if (resource === authenticationJwtResource && operationId === validateJwtOperationId) {
					const providedJwt = String(
						this.getNodeParameter(validateJwtTokenParamName, itemIndex, ''),
					).trim();
					const normalizedJwt = providedJwt.replace(/^Bearer\s+/i, '').trim();

					if (!normalizedJwt) {
						throw new NodeOperationError(this.getNode(), 'JSON Web Token (ns_t) is required', {
							itemIndex,
						});
					}

					try {
						const response = await netSapiensRequestWithoutAuthentication(this, {
							method: toHttpRequestMethod('GET'),
							url: `${baseUrl}/jwt`,
							headers: {
								Authorization: `Bearer ${normalizedJwt}`,
							},
						});

						if (Array.isArray(response)) {
							for (const entry of response) {
								returnData.push({ json: withJwtExpirationValidation(entry) });
							}
						} else {
							returnData.push({ json: withJwtExpirationValidation(response) });
						}
					} catch (error) {
						const statusCode = getHttpStatusCode(error);
						const errorText = getErrorText(error);
						if (isAuthFailureStatus(statusCode, errorText)) {
							const now = new Date().toISOString();
							returnData.push({
								json: {
									jwtIsUnexpired: false,
									jwtValidationCheckedAt: now,
									jwtValidationReason:
										statusCode === 403
											? 'JWT rejected by API (403 Forbidden)'
											: 'JWT rejected by API (401 Unauthorized)',
									statusCode,
								},
							});
						} else {
							throw error;
						}
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

				const resellerRaw = this.getNodeParameter('reseller', itemIndex, '') as unknown;
				const resellerSelection =
					typeof resellerRaw === 'string' ? resellerRaw : extractLocatorValue(resellerRaw);
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
						value && typeof value === 'object' && 'value' in (value as IDataObject)
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

				// --- Media templated operations (MOH, Greetings, Hold Messages) ---
				if (isMediaTemplatedOperation(operation.id)) {
					const method = toHttpRequestMethod(operation.method);
					const mediaBody: IDataObject = {};

					// Common field: synchronous
					const synchronous = this.getNodeParameter(
						operationBodyFieldKey(operation.id, 'synchronous'), itemIndex, 'no',
					) as string;
					mediaBody.synchronous = synchronous;

					// Common field: script
					const script = toOptionalString(
						this.getNodeParameter(operationBodyFieldKey(operation.id, 'script'), itemIndex, '') as unknown,
					);
					if (script) {
						mediaBody.script = script;
					}

					// Common field: index (Create operations only)
					if (mediaCreateOperationIds.has(operation.id)) {
						const index = toOptionalNumberValue(
							this.getNodeParameter(operationBodyFieldKey(operation.id, 'index'), itemIndex, '') as unknown,
						);
						if (index !== undefined) {
							mediaBody.index = index;
						}
					}

					if (mediaTtsOperationIds.has(operation.id)) {
						// --- TTS path ---
						if (!script) {
							throw new NodeOperationError(this.getNode(), 'Script is required for TTS operations', { itemIndex });
						}

						const voiceLanguage = toOptionalString(
							this.getNodeParameter(operationBodyFieldKey(operation.id, 'voice_language'), itemIndex, 'en-US') as unknown,
						);
						if (voiceLanguage) {
							mediaBody.voice_language = voiceLanguage;
						}

						const voiceId = toOptionalString(
							this.getNodeParameter(operationBodyFieldKey(operation.id, 'voice_id'), itemIndex, 'en-US-Wavenet-C') as unknown,
						);
						if (voiceId) {
							mediaBody.voice_id = voiceId;
						}

						const response = await netSapiensRequest(this, {
							method,
							url,
							qs: Object.keys(queryParams).length ? (queryParams as IDataObject) : undefined,
							body: mediaBody,
							returnFullResponse: true,
						});

						const responseBody = isFullHttpResponse(response)
							? (response as unknown as { body: unknown }).body
							: response;
						returnData.push({ json: toIDataObject(responseBody) });
						continue;
					}

					if (mediaUploadOperationIds.has(operation.id)) {
						// --- Upload path ---
						const convert = toOptionalString(
							this.getNodeParameter(operationBodyFieldKey(operation.id, 'convert'), itemIndex, 'no') as unknown,
						);
						if (convert) {
							mediaBody.convert = convert;
						}

						const fileSource = this.getNodeParameter(
							operationBodyFieldKey(operation.id, 'fileSource'), itemIndex, 'binaryData',
						) as string;

						const encodingParam = toOptionalString(
							this.getNodeParameter(operationBodyFieldKey(operation.id, 'encoding'), itemIndex, '') as unknown,
						);

						if (fileSource === 'binaryData') {
							// Binary Data path → multipart/form-data upload (avoids JSON body size limits)
							const binaryProperty = this.getNodeParameter(
								operationBodyFieldKey(operation.id, 'binaryProperty'), itemIndex, 'data',
							) as string;

							const items = this.getInputData();
							const item = items[itemIndex];
							if (!item.binary || !item.binary[binaryProperty]) {
								throw new NodeOperationError(
									this.getNode(),
									`No binary data found in property "${binaryProperty}". Make sure the previous node outputs binary data.`,
									{ itemIndex },
								);
							}

							const binaryData = item.binary[binaryProperty];
							const binaryBuffer = await this.helpers.getBinaryDataBuffer(itemIndex, binaryProperty);

							// Auto-detect encoding from binary metadata if user left it empty
							const fileContentType = encodingParam || binaryData.mimeType || 'application/octet-stream';
							const fileName = binaryData.fileName || 'upload.wav';

							// Build multipart/form-data body manually (no external dependencies)
							const boundary = `----n8nMohBoundary${Date.now()}`;
							const parts: Buffer[] = [];

							const addTextField = (name: string, value: string) => {
								parts.push(Buffer.from(
									`--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`,
								));
							};

							// File field
							parts.push(Buffer.from(
								`--${boundary}\r\nContent-Disposition: form-data; name="File"; filename="${fileName}"\r\nContent-Type: ${fileContentType}\r\n\r\n`,
							));
							parts.push(binaryBuffer);
							parts.push(Buffer.from('\r\n'));

							// Text fields
							addTextField('synchronous', synchronous);
							if (script) {
								addTextField('script', script);
							}
							if (convert) {
								addTextField('convert', convert);
							}
							if (mediaCreateOperationIds.has(operation.id)) {
								const index = toOptionalNumberValue(
									this.getNodeParameter(operationBodyFieldKey(operation.id, 'index'), itemIndex, '') as unknown,
								);
								if (index !== undefined) {
									addTextField('index', String(index));
								}
							}

							// Closing boundary
							parts.push(Buffer.from(`--${boundary}--\r\n`));

							const multipartBody = Buffer.concat(parts);

							// NetSapiens API only accepts multipart/form-data via POST, even for updates
							const multipartMethod = 'POST' as const;

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'netSapiensApi',
								{
									method: multipartMethod,
									url,
									qs: Object.keys(queryParams).length ? (queryParams as IDataObject) : undefined,
									body: multipartBody,
									headers: {
										'Content-Type': `multipart/form-data; boundary=${boundary}`,
									},
									json: false,
									returnFullResponse: true,
								},
							);

							const statusCode = isFullHttpResponse(response)
								? (response as unknown as { statusCode: number }).statusCode
								: undefined;
							let responseBody = isFullHttpResponse(response)
								? (response as unknown as { body: unknown }).body
								: response;

							// Parse JSON response if returned as string (json: false)
							if (typeof responseBody === 'string') {
								try {
									responseBody = JSON.parse(responseBody);
								} catch {
									// Keep as string if not valid JSON
								}
							}

							if (statusCode === 200 || statusCode === 202) {
								returnData.push({ json: toIDataObject(responseBody) });
							} else {
								returnData.push({ json: { statusCode, response: toIDataObject(responseBody) } });
							}
							continue;
						}

						// Base64 Text path
						const base64File = toOptionalString(
							this.getNodeParameter(operationBodyFieldKey(operation.id, 'base64_file'), itemIndex, '') as unknown,
						);

						if (mediaMultipartOnlyIds.has(operation.id)) {
							// Multipart-only ops (Hold Messages): convert base64 text to binary, send multipart
							if (!base64File) {
								throw new NodeOperationError(
									this.getNode(),
									'Base64 file data is required for this operation',
									{ itemIndex },
								);
							}
							const fileContentType = encodingParam || 'application/octet-stream';
							const fileBuffer = Buffer.from(base64File, 'base64');

							const boundary = `----n8nMediaBoundary${Date.now()}`;
							const parts: Buffer[] = [];

							const addField = (name: string, value: string) => {
								parts.push(Buffer.from(
									`--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`,
								));
							};

							parts.push(Buffer.from(
								`--${boundary}\r\nContent-Disposition: form-data; name="File"; filename="upload.wav"\r\nContent-Type: ${fileContentType}\r\n\r\n`,
							));
							parts.push(fileBuffer);
							parts.push(Buffer.from('\r\n'));

							addField('synchronous', synchronous);
							if (script) {
								addField('script', script);
							}
							if (convert) {
								addField('convert', convert);
							}
							if (mediaCreateOperationIds.has(operation.id)) {
								const index = toOptionalNumberValue(
									this.getNodeParameter(operationBodyFieldKey(operation.id, 'index'), itemIndex, '') as unknown,
								);
								if (index !== undefined) {
									addField('index', String(index));
								}
							}

							parts.push(Buffer.from(`--${boundary}--\r\n`));

							const multipartBody = Buffer.concat(parts);

							// NetSapiens API only accepts multipart/form-data via POST, even for updates
							const multipartMethod = 'POST' as const;

							const response = await this.helpers.httpRequestWithAuthentication.call(
								this,
								'netSapiensApi',
								{
									method: multipartMethod,
									url,
									qs: Object.keys(queryParams).length ? (queryParams as IDataObject) : undefined,
									body: multipartBody,
									headers: {
										'Content-Type': `multipart/form-data; boundary=${boundary}`,
									},
									json: false,
									returnFullResponse: true,
								},
							);

							let responseBody = isFullHttpResponse(response)
								? (response as unknown as { body: unknown }).body
								: response;
							if (typeof responseBody === 'string') {
								try {
									responseBody = JSON.parse(responseBody);
								} catch {
									// Keep as string
								}
							}
							returnData.push({ json: toIDataObject(responseBody) });
							continue;
						}

						// JSON path (MOH, Greetings): send base64 data via JSON endpoint
						if (base64File) {
							mediaBody.base64_file = base64File;
						}
						if (encodingParam) {
							mediaBody.encoding = encodingParam;
						}

						const response = await netSapiensRequest(this, {
							method,
							url,
							qs: Object.keys(queryParams).length ? (queryParams as IDataObject) : undefined,
							body: mediaBody,
							returnFullResponse: true,
						});

						const responseBody = isFullHttpResponse(response)
							? (response as unknown as { body: unknown }).body
							: response;
						returnData.push({ json: toIDataObject(responseBody) });
						continue;
					}
				}

				// --- Image templated operations ---
				if (isImageTemplatedOperation(operation.id)) {
					const method = toHttpRequestMethod(operation.method);
					const imageBody: IDataObject = {};

					const fileSource = this.getNodeParameter(
						operationBodyFieldKey(operation.id, 'fileSource'), itemIndex, 'binaryData',
					) as string;

					const filetypeParam = toOptionalString(
						this.getNodeParameter(operationBodyFieldKey(operation.id, 'filetype'), itemIndex, '') as unknown,
					);
					const descriptionParam = toOptionalString(
						this.getNodeParameter(operationBodyFieldKey(operation.id, 'description'), itemIndex, '') as unknown,
					);
					const resellerParam = toOptionalString(
						this.getNodeParameter(operationBodyFieldKey(operation.id, 'reseller'), itemIndex, '*') as unknown,
					);
					const domainParam = toOptionalString(
						this.getNodeParameter(operationBodyFieldKey(operation.id, 'domain'), itemIndex, '*') as unknown,
					);
					const serverParam = toOptionalString(
						this.getNodeParameter(operationBodyFieldKey(operation.id, 'server'), itemIndex, '*') as unknown,
					);

					if (fileSource === 'binaryData') {
						// Binary Data path → multipart/form-data upload
						const binaryProperty = this.getNodeParameter(
							operationBodyFieldKey(operation.id, 'binaryProperty'), itemIndex, 'data',
						) as string;

						const inputItems = this.getInputData();
						const item = inputItems[itemIndex];
						if (!item.binary || !item.binary[binaryProperty]) {
							throw new NodeOperationError(
								this.getNode(),
								`No binary data found in property "${binaryProperty}". Make sure the previous node outputs binary data.`,
								{ itemIndex },
							);
						}

						const binaryData = item.binary[binaryProperty];
						const binaryBuffer = await this.helpers.getBinaryDataBuffer(itemIndex, binaryProperty);
						const fileContentType = filetypeParam || binaryData.mimeType || 'application/octet-stream';
						const fileName = binaryData.fileName || 'upload.png';

						const boundary = `----n8nImageBoundary${Date.now()}`;
						const parts: Buffer[] = [];

						const addTextField = (name: string, value: string) => {
							parts.push(Buffer.from(
								`--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`,
							));
						};

						// File field
						parts.push(Buffer.from(
							`--${boundary}\r\nContent-Disposition: form-data; name="File"; filename="${fileName}"\r\nContent-Type: ${fileContentType}\r\n\r\n`,
						));
						parts.push(binaryBuffer);
						parts.push(Buffer.from('\r\n'));

						// Optional fields
						if (resellerParam) addTextField('reseller', resellerParam);
						if (domainParam) addTextField('domain', domainParam);
						if (serverParam) addTextField('server', serverParam);
						if (descriptionParam) addTextField('description', descriptionParam);

						parts.push(Buffer.from(`--${boundary}--\r\n`));

						const multipartBody = Buffer.concat(parts);

						// NetSapiens API only accepts multipart/form-data via POST
						const multipartMethod = 'POST' as const;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'netSapiensApi',
							{
								method: multipartMethod,
								url,
								qs: Object.keys(queryParams).length ? (queryParams as IDataObject) : undefined,
								body: multipartBody,
								headers: {
									'Content-Type': `multipart/form-data; boundary=${boundary}`,
								},
								json: false,
								returnFullResponse: true,
							},
						);

						const statusCode = isFullHttpResponse(response)
							? (response as unknown as { statusCode: number }).statusCode
							: undefined;
						let responseBody = isFullHttpResponse(response)
							? (response as unknown as { body: unknown }).body
							: response;

						if (typeof responseBody === 'string') {
							try {
								responseBody = JSON.parse(responseBody);
							} catch {
								// Keep as string
							}
						}

						if (statusCode === 200 || statusCode === 202) {
							returnData.push({ json: toIDataObject(responseBody) });
						} else {
							returnData.push({ json: { statusCode, response: toIDataObject(responseBody) } });
						}
						continue;
					}

					// Base64 Text path → JSON body
					const base64File = toOptionalString(
						this.getNodeParameter(operationBodyFieldKey(operation.id, 'base64_file'), itemIndex, '') as unknown,
					);
					if (base64File) {
						imageBody.base64_file = base64File;
					}
					if (filetypeParam) {
						imageBody.filetype = filetypeParam;
					}
					if (descriptionParam) {
						imageBody.description = descriptionParam;
					}
					if (resellerParam) {
						imageBody.reseller = resellerParam;
					}
					if (domainParam) {
						imageBody.domain = domainParam;
					}
					if (serverParam) {
						imageBody.server = serverParam;
					}

					const response = await netSapiensRequest(this, {
						method,
						url,
						qs: Object.keys(queryParams).length ? (queryParams as IDataObject) : undefined,
						body: imageBody,
						returnFullResponse: true,
					});

					const responseBody = isFullHttpResponse(response)
						? (response as unknown as { body: unknown }).body
						: response;
					returnData.push({ json: toIDataObject(responseBody) });
					continue;
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
				const errorText = getErrorText(error);
				const statusCode = getHttpStatusCode(error);

				if (operationId === validateJwtOperationId && isAuthFailureStatus(statusCode, errorText)) {
					const now = new Date().toISOString();
					returnData.push({
						json: {
							jwtIsUnexpired: false,
							jwtValidationCheckedAt: now,
							jwtValidationReason:
								statusCode === 403
									? 'JWT rejected by API (403 Forbidden)'
									: 'JWT rejected by API (401 Unauthorized)',
							statusCode,
						},
					});
					continue;
				}

				// Media Delete returns 404 "not found index for removal" on success
				if (
					mediaDeleteOperationIds.has(operationId) &&
					statusCode === 404 &&
					/not found index for removal/i.test(errorText)
				) {
					returnData.push({
						json: {
							success: true,
							message: 'Item deleted successfully',
							operationId,
							statusCode,
						},
					});
					continue;
				}

				const isNoRouteFound =
					/no\s+route\s+found\s*\[92\]/i.test(errorText) || /no\s+route\s+found/i.test(errorText);

				if (operationId === 'GetAuditlog') {
					const shouldRefresh = Boolean(this.getNodeParameter('refreshOptions', itemIndex, false));
					const apiVersion = await getServerApiVersion(this, baseUrl, { refresh: shouldRefresh });
					if (isNoRouteFound) {
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

				if (isNoRouteFound) {
					const shouldRefresh = Boolean(this.getNodeParameter('refreshOptions', itemIndex, false));
					const apiVersion = await getServerApiVersion(this, baseUrl, { refresh: shouldRefresh });
					const versionText = apiVersion.raw
						? ` Detected API version: ${apiVersion.raw}.`
						: ' Unable to detect API version from /version.';

					const operationDetails = operationMap[operationId as keyof typeof operationMap];
					const method = operationDetails ? operationDetails.method : operationId;
					const path = operationDetails ? operationDetails.path : '';

					throw new NodeOperationError(
						this.getNode(),
						'This NetSapiens server does not support the requested endpoint.',
						{
							itemIndex,
							description: `The server returned "No Route Found [92]" for ${method} ${path}.${versionText}`,
						},
					);
				}

				if (error instanceof NodeOperationError) {
					throw error;
				}

				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex });
			}
		}

		return [returnData];
	}
}
