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
	},
): Promise<unknown> {
	const options: IHttpRequestOptions = {
		method: requestOptions.method,
		url: requestOptions.url,
		qs: requestOptions.qs,
		body: requestOptions.body as unknown as IDataObject,
		headers: requestOptions.headers,
		json: true,
	};

	return await context.helpers.httpRequestWithAuthentication.call(context, 'netSapiensApi', options);
}
