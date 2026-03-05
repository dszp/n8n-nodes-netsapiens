import type {
	IExecuteFunctions,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
} from 'n8n-workflow';

export type NetSapiensCredentials = {
	server?: string;
	baseUrl?: string;
};

export type NetSapiensOAuth2Credentials = {
	server: string;
	clientId: string;
	clientSecret: string;
	username: string;
	password: string;
};

// Token cache keyed by server+clientId+username
const tokenCache = new Map<
	string,
	{ accessToken: string; expiresAt: number }
>();

function tokenCacheKey(credentials: NetSapiensOAuth2Credentials): string {
	return `${credentials.server}|${credentials.clientId}|${credentials.username}`;
}

/**
 * Fetch an OAuth2 access token using the password grant, with caching.
 * Tries POST /ns-api/v2/tokens first, falls back to /ns-api/oauth2/token/ on 404.
 */
export async function getOAuth2Token(
	context: IExecuteFunctions | ILoadOptionsFunctions,
	credentials: NetSapiensOAuth2Credentials,
): Promise<string> {
	const key = tokenCacheKey(credentials);
	const cached = tokenCache.get(key);
	const now = Date.now();

	// Return cached token if still valid (with 60s buffer)
	if (cached && cached.expiresAt - 60_000 > now) {
		return cached.accessToken;
	}

	const server = credentials.server.trim();
	const qs = {
		grant_type: 'password',
		client_id: credentials.clientId,
		client_secret: credentials.clientSecret,
		username: credentials.username,
		password: credentials.password,
	};

	const v2Url = `https://${server}/ns-api/v2/tokens`;
	const legacyUrl = `https://${server}/ns-api/oauth2/token/`;

	let response: IDataObject;
	try {
		response = (await context.helpers.httpRequest.call(context, {
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
			// Fallback to legacy endpoint
			try {
				response = (await context.helpers.httpRequest.call(context, {
					method: 'POST',
					url: legacyUrl,
					qs,
					json: true,
				})) as IDataObject;
			} catch (fallbackError: unknown) {
				throwOAuth2Error(fallbackError, credentials.username);
				throw fallbackError; // unreachable but satisfies TypeScript
			}
		} else {
			throwOAuth2Error(error, credentials.username);
			throw error; // unreachable but satisfies TypeScript
		}
	}

	const accessToken = response.access_token as string;
	const expiresIn = (response.expires_in as number) || 3600;

	tokenCache.set(key, {
		accessToken,
		expiresAt: now + expiresIn * 1000,
	});

	return accessToken;
}

/**
 * Validate user credentials against the NetSapiens OAuth2 token endpoint.
 * Returns structured result — does NOT throw on auth failure.
 */
export async function validateUserCredentials(
	context: IExecuteFunctions | ILoadOptionsFunctions,
	server: string,
	clientId: string,
	clientSecret: string,
	username: string,
	password: string,
): Promise<IDataObject> {
	const trimmedServer = server.trim();
	const qs = {
		grant_type: 'password',
		client_id: clientId,
		client_secret: clientSecret,
		username,
		password,
	};

	const v2Url = `https://${trimmedServer}/ns-api/v2/tokens`;
	const legacyUrl = `https://${trimmedServer}/ns-api/oauth2/token/`;

	let response: IDataObject;
	try {
		response = (await context.helpers.httpRequest.call(context, {
			method: 'POST',
			url: v2Url,
			qs,
			json: true,
		})) as IDataObject;
	} catch (error: unknown) {
		const statusCode = getStatusCode(error);

		if (statusCode === 404) {
			// Fallback to legacy endpoint
			try {
				response = (await context.helpers.httpRequest.call(context, {
					method: 'POST',
					url: legacyUrl,
					qs,
					json: true,
				})) as IDataObject;
			} catch (fallbackError: unknown) {
				return buildValidationFailure(fallbackError, username);
			}
		} else {
			return buildValidationFailure(error, username);
		}
	}

	return {
		validated: true,
		username: (response.username as string) || username,
		user: response.user as string,
		domain: response.domain as string,
		territory: response.territory as string,
		scope: response.scope as string,
		displayName: response.displayName as string,
		uid: response.uid as string,
	};
}

function getStatusCode(error: unknown): number | undefined {
	if (error instanceof Error && 'statusCode' in error) {
		return (error as Error & { statusCode: number }).statusCode;
	}
	return undefined;
}

function buildValidationFailure(error: unknown, username: string): IDataObject {
	const statusCode = getStatusCode(error);
	let reason: string;
	if (statusCode === 401) {
		reason = 'Invalid credentials';
	} else if (statusCode === 403) {
		reason = 'Insufficient permissions';
	} else {
		const message =
			error instanceof Error ? error.message : 'Unknown error';
		reason = `Authentication request failed: ${message}`;
	}
	return { validated: false, username, reason };
}

function throwOAuth2Error(error: unknown, username: string): never {
	const statusCode = getStatusCode(error);
	if (statusCode === 401) {
		throw new Error(
			`Authentication failed for user '${username}'. Verify your OAuth2 credentials (client ID, client secret, username, and password) are correct.`,
		);
	}
	if (statusCode === 403) {
		throw new Error(
			`The authenticated user '${username}' does not have sufficient permissions for this operation. Check the user's scope and role in your NetSapiens administration portal.`,
		);
	}
	throw error;
}

export function toHttpRequestMethod(method: string): IHttpRequestMethods {
	const normalized = method.toUpperCase();

	if (
		normalized === 'GET' ||
		normalized === 'POST' ||
		normalized === 'PUT' ||
		normalized === 'PATCH' ||
		normalized === 'DELETE' ||
		normalized === 'HEAD'
	) {
		return normalized as IHttpRequestMethods;
	}

	throw new Error(`Unsupported HTTP method: ${method}`);
}

export function resolveBaseUrl(credentials: NetSapiensCredentials): string {
	if (credentials.baseUrl && credentials.baseUrl.trim()) {
		return credentials.baseUrl.trim().replace(/\/$/, '');
	}

	if (!credentials.server || !credentials.server.trim()) {
		throw new Error('NetSapiens credentials are missing the server');
	}

	return `https://${credentials.server.trim()}/ns-api/v2`;
}

export function replacePathParams(pathTemplate: string, pathParams: Record<string, unknown>): string {
	return pathTemplate.replace(/\{([^}]+)\}/g, (match, key: string) => {
		if (!(key in pathParams)) {
			return match;
		}

		const value = pathParams[key];
		if (value === undefined || value === null || value === '') {
			return match;
		}

		return encodeURIComponent(String(value));
	});
}

export async function netSapiensRequest(
	context: IExecuteFunctions | ILoadOptionsFunctions,
	requestOptions: {
		method: IHttpRequestMethods;
		url: string;
		qs?: IDataObject;
		body?: unknown;
		headers?: Record<string, string>;
		returnFullResponse?: boolean;
	},
): Promise<unknown> {
	// Get the bearer token from the credential and add it manually.
	// We don't use httpRequestWithAuthentication because the credential no longer
	// has an 'authenticate' property (removed to support both auth types in one credential).
	const creds = await context.getCredentials('netSapiensApi');
	const bearerToken = creds.bearerToken as string;

	const options: IHttpRequestOptions = {
		method: requestOptions.method,
		url: requestOptions.url,
		qs: requestOptions.qs,
		body: requestOptions.body as unknown as IDataObject,
		headers: {
			...requestOptions.headers,
			Authorization: `Bearer ${bearerToken}`,
		},
		returnFullResponse: requestOptions.returnFullResponse,
		json: true,
	};

	return await context.helpers.httpRequest.call(context, options);
}

export async function netSapiensOAuth2Request(
	context: IExecuteFunctions | ILoadOptionsFunctions,
	credentials: NetSapiensOAuth2Credentials,
	requestOptions: {
		method: IHttpRequestMethods;
		url: string;
		qs?: IDataObject;
		body?: unknown;
		headers?: Record<string, string>;
		returnFullResponse?: boolean;
	},
): Promise<unknown> {
	const token = await getOAuth2Token(context, credentials);

	const options: IHttpRequestOptions = {
		method: requestOptions.method,
		url: requestOptions.url,
		qs: requestOptions.qs,
		body: requestOptions.body as unknown as IDataObject,
		headers: {
			...requestOptions.headers,
			Authorization: `Bearer ${token}`,
		},
		returnFullResponse: requestOptions.returnFullResponse,
		json: true,
	};

	try {
		return await context.helpers.httpRequest.call(context, options);
	} catch (error: unknown) {
		const statusCode = getStatusCode(error);
		if (statusCode === 401) {
			// Token may have expired server-side; clear cache and retry once
			const key = tokenCacheKey(credentials);
			tokenCache.delete(key);
			const newToken = await getOAuth2Token(context, credentials);
			options.headers = {
				...requestOptions.headers,
				Authorization: `Bearer ${newToken}`,
			};
			return await context.helpers.httpRequest.call(context, options);
		}
		if (statusCode === 403) {
			throw new Error(
				`The authenticated user '${credentials.username}' does not have sufficient permissions for this operation. Check the user's scope and role in your NetSapiens administration portal.`,
			);
		}
		throw error;
	}
}

export async function netSapiensRequestWithoutAuthentication(
	context: IExecuteFunctions | ILoadOptionsFunctions,
	requestOptions: {
		method: IHttpRequestMethods;
		url: string;
		qs?: IDataObject;
		body?: unknown;
		headers?: Record<string, string>;
		returnFullResponse?: boolean;
	},
): Promise<unknown> {
	const options: IHttpRequestOptions = {
		method: requestOptions.method,
		url: requestOptions.url,
		qs: requestOptions.qs,
		body: requestOptions.body as unknown as IDataObject,
		headers: requestOptions.headers,
		returnFullResponse: requestOptions.returnFullResponse,
		json: true,
	};

	return await context.helpers.httpRequest.call(context, options);
}
