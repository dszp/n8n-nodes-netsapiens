import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class NetSapiensApi implements ICredentialType {
	name = 'netSapiensApi';

	displayName = 'NetSapiens API';

	icon: Icon = {
		light: 'file:../nodes/NetSapiens/NetSapiens.svg',
		dark: 'file:../nodes/NetSapiens/NetSapiens.dark.svg',
	};

	documentationUrl = 'https://github.com/<...>/n8n-nodes-<...>?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Server',
			name: 'server',
			type: 'string',
			default: '',
			description: 'Hostname for your NetSapiens environment (without protocol)',
			required: true,
			placeholder: 'example.netsapiens.com',
		},
		{
			displayName: 'Bearer Token',
			name: 'bearerToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			description: 'Optional override. If empty, https://{server}/ns-api/v2 is used.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.bearerToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL:
				'={{$credentials.baseUrl ? $credentials.baseUrl : ("https://" + $credentials.server + "/ns-api/v2")}}',
			url: '/domains',
			method: 'GET',
		},
	};
}
