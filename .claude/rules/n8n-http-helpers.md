---
paths:
  - "transport/**/*.ts"
  - "nodes/**/*.ts"
---

# n8n HTTP Request Helpers

Reference: https://docs.n8n.io/integrations/creating-nodes/build/reference/http-helpers/

Programmatic style only (not declarative nodes).

## Basic Usage

```ts
// Without authentication
const response = await this.helpers.httpRequest(options);

// With credential authentication
const response = await this.helpers.httpRequestWithAuthentication.call(
  this,
  'credentialTypeName',  // e.g., 'netSapiensApi'
  options,
);
```

Always use the built-in helper instead of external HTTP libraries (no added dependencies).

## Request Options

```ts
{
  url: string;                    // Required
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD';  // Default: GET
  headers?: object;               // Key-value pairs
  body?: FormData | Array | string | number | object | Buffer | URLSearchParams;
  qs?: object;                    // Query string parameters
  arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma';  // Default: indices
  auth?: { username: string; password: string };  // Basic auth (prefer httpRequestWithAuthentication)
  disableFollowRedirect?: boolean;
  encoding?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
  skipSslCertificateValidation?: boolean;
  returnFullResponse?: boolean;   // Returns { body, headers, statusCode, statusMessage }
  proxy?: { host: string; port: string | number; auth?: {...}; protocol?: string };
  timeout?: number;
  json?: boolean;
}
```

## Body Content Types

| Body type | Content-Type (auto-set) |
|-----------|------------------------|
| Plain JS object | `application/json` |
| `Buffer` | (set manually for file uploads) |
| `FormData` | `multipart/form-data` |
| `URLSearchParams` | `application/x-www-form-urlencoded` |

Override auto content-type by setting a `content-type` header explicitly.

## Array Format Options

For query strings with arrays like `{ IDs: [15, 17] }`:
- `indices` (default): `IDs[0]=15&IDs[1]=17`
- `brackets`: `IDs[]=15&IDs[]=17`
- `repeat`: `IDs=15&IDs=17`
- `comma`: `IDs=15,17`

## Migration from Deprecated API

The old `this.helpers.request(options)` (request-promise library) was removed in n8n v1.

Key changes:
- `uri` → `url`
- `encoding: null` → `encoding: 'arraybuffer'`
- `rejectUnauthorized: false` → `skipSslCertificateValidation: true`
- `resolveWithFullResponse` → `returnFullResponse`
- Use `body` according to content-type headers

## Example Reference

See the [Mattermost node](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Mattermost/v1/MattermostV1.node.ts) for a full implementation example.
