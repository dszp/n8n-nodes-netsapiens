import type {
	IAuthenticateGeneric,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IDataObject,
	IHttpRequestHelper,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class NetSapiensApi implements ICredentialType {
	name = 'netSapiensApi';

	displayName = 'NetSapiens API';

	icon: Icon = {
		light: 'file:../nodes/NetSapiens/NetSapiens.svg',
		dark: 'file:../nodes/NetSapiens/NetSapiens.dark.svg',
	};

	documentationUrl = 'https://github.com/dszp/n8n-nodes-netsapiens?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Authentication Method',
			name: 'authType',
			type: 'options',
			options: [
				{
					name: 'API Key (Bearer Token)',
					value: 'apiKey',
				},
				{
					name: 'OAuth2 (Password Grant)',
					value: 'oAuth2',
				},
			],
			default: 'apiKey',
			description: 'How to authenticate with the NetSapiens API',
		},
		{
			displayName: 'Server',
			name: 'server',
			type: 'string',
			default: '',
			description: 'Hostname for your NetSapiens environment (without protocol)',
			required: true,
			placeholder: 'e.g. example.netsapiens.com',
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
			displayOptions: {
				show: {
					authType: ['apiKey'],
				},
			},
		},
		{
			displayName: 'Base URL Override',
			name: 'baseUrl',
			type: 'string',
			default: '',
			description: 'Optional override. If empty, https://{server}/ns-api/v2 is used.',
			displayOptions: {
				show: {
					authType: ['apiKey'],
				},
			},
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			description:
				'OAuth2 client identifier. Format varies by installation (e.g. 12345.apiscripts, productapi.companyname).',
			required: true,
			placeholder: 'e.g. appname.territory',
			displayOptions: {
				show: {
					authType: ['oAuth2'],
				},
			},
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'OAuth2 client secret',
			required: true,
			displayOptions: {
				show: {
					authType: ['oAuth2'],
				},
			},
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			description:
				'User login for OAuth2 authentication. Typically user@domain or user@0000.territory.service, but format may vary by installation.',
			required: true,
			placeholder: 'e.g. user@domain.12345.service',
			displayOptions: {
				show: {
					authType: ['oAuth2'],
				},
			},
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Password for the OAuth2 user',
			required: true,
			displayOptions: {
				show: {
					authType: ['oAuth2'],
				},
			},
		},
	];

	// For OAuth2, fetch an access token before the test request.
	// This runs before authenticate + test, making the token available as _accessToken.
	async preAuthentication(
		this: IHttpRequestHelper,
		credentials: ICredentialDataDecryptedObject,
	): Promise<IDataObject> {
		if (credentials.authType !== 'oAuth2') {
			return {};
		}

		const server = ((credentials.server as string) || '').trim();
		if (!server) {
			return {};
		}

		const qs = {
			grant_type: 'password',
			client_id: credentials.clientId as string,
			client_secret: credentials.clientSecret as string,
			username: credentials.username as string,
			password: credentials.password as string,
		};

		const v2Url = `https://${server}/ns-api/v2/tokens`;
		const legacyUrl = `https://${server}/ns-api/oauth2/token/`;

		let response: IDataObject;
		try {
			response = (await this.helpers.httpRequest({
				method: 'POST',
				url: v2Url,
				qs,
				json: true,
			})) as IDataObject;
		} catch (error: unknown) {
			const statusCode =
				error instanceof Error && 'statusCode' in error
					? (error as Error & { statusCode: number }).statusCode
					: undefined;

			if (statusCode === 404) {
				response = (await this.helpers.httpRequest({
					method: 'POST',
					url: legacyUrl,
					qs,
					json: true,
				})) as IDataObject;
			} else {
				throw error;
			}
		}

		return { _accessToken: response.access_token as string };
	}

	// Conditionally set the Authorization header based on auth type.
	// For API key: uses the bearerToken directly.
	// For OAuth2: uses the _accessToken fetched by preAuthentication.
	// NOTE: This is only applied when using httpRequestWithAuthentication or during
	// credential testing. Our transport layer uses httpRequest directly and adds
	// the Authorization header manually, so this does not interfere with normal requests.
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization:
					'={{$credentials.authType === "oAuth2" ? "Bearer " + ($credentials._accessToken || "") : "Bearer " + ($credentials.bearerToken || "")}}',
			},
		},
	};

	// Test connectivity.
	// For API key: GET /domains with the Bearer token (via authenticate).
	// For OAuth2: POST /tokens with credentials as qs params. This is self-sufficient
	// and does NOT depend on preAuthentication, which may not run reliably in dev mode.
	// A successful token response (200) confirms the OAuth2 credentials are valid.
	test: ICredentialTestRequest = {
		request: {
			baseURL:
				'={{($credentials.authType === "apiKey" && ($credentials.baseUrl || "").trim()) ? ($credentials.baseUrl || "").trim().replace(/\\/$/, "") : "https://" + ($credentials.server || "").trim() + "/ns-api/v2"}}',
			url: '={{$credentials.authType === "oAuth2" ? "/tokens" : "/domains"}}',
			method: '={{$credentials.authType === "oAuth2" ? "POST" : "GET"}}' as 'GET',
			qs: {
				grant_type:
					'={{$credentials.authType === "oAuth2" ? "password" : ""}}',
				client_id:
					'={{$credentials.authType === "oAuth2" ? ($credentials.clientId || "") : ""}}',
				client_secret:
					'={{$credentials.authType === "oAuth2" ? ($credentials.clientSecret || "") : ""}}',
				username:
					'={{$credentials.authType === "oAuth2" ? ($credentials.username || "") : ""}}',
				password:
					'={{$credentials.authType === "oAuth2" ? ($credentials.password || "") : ""}}',
			},
		},
	};
}
