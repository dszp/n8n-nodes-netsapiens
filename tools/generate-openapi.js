const fs = require('fs');
const path = require('path');

/**
 * @typedef {('GET'|'POST'|'PUT'|'PATCH'|'DELETE'|'HEAD'|'OPTIONS'|'TRACE')} HttpMethod
 */

/**
 * @typedef {('path'|'query'|'header')} ParameterLocation
 */

/**
 * @typedef {{
 *  name: string;
 *  in: ParameterLocation;
 *  required: boolean;
 *  description?: string;
 *  schemaType?: string;
 * }} GeneratedOpenApiParameter
 */

/**
 * @typedef {{
 *  id: string;
 *  method: HttpMethod;
 *  path: string;
 *  resource: string;
 *  summary?: string;
 *  description?: string;
 *  parameters: GeneratedOpenApiParameter[];
 *  hasRequestBody: boolean;
 * }} GeneratedOpenApiOperation
 */

/**
 * @param {string} value
 * @returns {value is string}
 */
function isHttpMethod(value) {
	return (
		value === 'get' ||
		value === 'post' ||
		value === 'put' ||
		value === 'patch' ||
		value === 'delete' ||
		value === 'head' ||
		value === 'options' ||
		value === 'trace'
	);
}

/**
 * @param {string} value
 * @returns {HttpMethod}
 */
function toHttpMethod(value) {
	return value.toUpperCase();
}

/**
 * @param {string} pathKey
 */
function normalizePath(pathKey) {
	const index = pathKey.indexOf('#');
	return index >= 0 ? pathKey.slice(0, index) : pathKey;
}

/**
 * @param {any} param
 */
function schemaTypeFromParameter(param) {
	const schema = param && typeof param === 'object' ? param.schema : undefined;
	const typeValue = schema && typeof schema === 'object' ? schema.type : undefined;

	if (Array.isArray(typeValue)) {
		return typeValue[0];
	}

	if (typeof typeValue === 'string') {
		return typeValue;
	}

	return undefined;
}

/**
 * @param {HttpMethod} method
 * @param {string} pathTemplate
 */
function stableFallbackId(method, pathTemplate) {
	const normalized = pathTemplate
		.replace(/\{[^}]+\}/g, 'By')
		.replace(/[^a-zA-Z0-9]+/g, ' ')
		.trim()
		.split(' ')
		.filter(Boolean)
		.map((p) => p.charAt(0).toUpperCase() + p.slice(1))
		.join('');

	return `${method.charAt(0)}${method.slice(1).toLowerCase()}${normalized}`;
}

/**
 * @param {GeneratedOpenApiParameter[]} params
 * @returns {GeneratedOpenApiParameter[]}
 */
function dedupeParameters(params) {
	const seen = new Set();
	const results = [];

	for (const param of params) {
		const key = `${param.in}:${param.name}`;
		if (seen.has(key)) {
			continue;
		}

		seen.add(key);
		results.push(param);
	}

	return results;
}

/**
 * @param {unknown} value
 */
function toTs(value) {
	return JSON.stringify(value, null, 2);
}

const packageRoot = path.resolve(process.cwd());

/**
 * @param {string[]} argv
 * @returns {string | undefined}
 */
function getSpecArg(argv) {
	const flag = '--spec';

	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		if (arg === flag) {
			const next = argv[i + 1];
			return next && !next.startsWith('-') ? next : undefined;
		}
		if (arg.startsWith(`${flag}=`)) {
			const value = arg.slice(flag.length + 1);
			return value ? value : undefined;
		}
	}

	return undefined;
}

// const defaultSpecPath = path.join(packageRoot, 'openapi', 'NetSapiens.v2.3.1.0.openapi.json');
const defaultSpecPath = path.join(packageRoot, 'openapi', 'netsapiens-api-v2-v45.0.json');
const specArgValue = getSpecArg(process.argv.slice(2));
const specPath = specArgValue
	? path.resolve(packageRoot, specArgValue)
	: defaultSpecPath;
const outPath = path.join(packageRoot, 'generated', 'openapi.ts');

if (!fs.existsSync(specPath)) {
	throw new Error(`OpenAPI spec not found at ${specPath}`);
}

const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));

const usedIds = new Map();
/** @type {GeneratedOpenApiOperation[]} */
const operations = [];

const paths = spec && typeof spec === 'object' ? spec.paths : undefined;
for (const [pathKey, pathItem] of Object.entries(paths ?? {})) {
	if (!pathItem) {
		continue;
	}

	const normalizedPath = normalizePath(pathKey);

	const pathLevelParameters = Array.isArray(pathItem.parameters) ? pathItem.parameters : [];

	for (const [methodKey, operationCandidate] of Object.entries(pathItem)) {
		if (!isHttpMethod(methodKey)) {
			continue;
		}

		const operation = operationCandidate;
		const tag = Array.isArray(operation.tags) && operation.tags.length > 0 ? operation.tags[0] : 'Other';

		const opMethod = toHttpMethod(methodKey);
		const opId = (operation.operationId && String(operation.operationId).trim()) ||
			stableFallbackId(opMethod, normalizedPath);

		const currentCount = usedIds.get(opId) ?? 0;
		usedIds.set(opId, currentCount + 1);
		const uniqueId = currentCount === 0 ? opId : `${opId}_${currentCount + 1}`;

		const opParameters = Array.isArray(operation.parameters) ? operation.parameters : [];

		/** @type {GeneratedOpenApiParameter[]} */
		const parameters = [];

		for (const param of [...pathLevelParameters, ...opParameters]) {
			const location = param.in;
			if (location !== 'path' && location !== 'query' && location !== 'header') {
				continue;
			}

			parameters.push({
				name: param.name,
				in: location,
				required: Boolean(param.required) || location === 'path',
				description: param.description,
				schemaType: schemaTypeFromParameter(param),
			});
		}

		const hasRequestBody = Boolean(operation.requestBody);

		operations.push({
			id: uniqueId,
			method: opMethod,
			path: normalizedPath,
			resource: tag,
			summary: operation.summary,
			description: operation.description,
			parameters: dedupeParameters(parameters),
			hasRequestBody,
		});
	}
}

const resources = Array.from(new Set(operations.map((o) => o.resource))).sort((a, b) =>
	a.localeCompare(b),
);
const operationMap = Object.fromEntries(operations.map((o) => [o.id, o]));

fs.mkdirSync(path.dirname(outPath), { recursive: true });

const output =
	`export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'TRACE';\n` +
	`\n` +
	`export type ParameterLocation = 'path' | 'query' | 'header';\n` +
	`\n` +
	`export type GeneratedOpenApiParameter = {\n` +
	`  name: string;\n` +
	`  in: ParameterLocation;\n` +
	`  required: boolean;\n` +
	`  description?: string;\n` +
	`  schemaType?: string;\n` +
	`};\n` +
	`\n` +
	`export type GeneratedOpenApiOperation = {\n` +
	`  id: string;\n` +
	`  method: HttpMethod;\n` +
	`  path: string;\n` +
	`  resource: string;\n` +
	`  summary?: string;\n` +
	`  description?: string;\n` +
	`  parameters: GeneratedOpenApiParameter[];\n` +
	`  hasRequestBody: boolean;\n` +
	`};\n` +
	`\n` +
	`export const resources: readonly string[] = ${toTs(resources)};\n` +
	`\n` +
	`export const operations: readonly GeneratedOpenApiOperation[] = ${toTs(operations)};\n` +
	`\n` +
	`export const operationMap: Record<string, GeneratedOpenApiOperation> = ${toTs(operationMap)};\n`;

fs.writeFileSync(outPath, output, 'utf8');
console.log(`Generated ${outPath} with ${operations.length} operations`);
