---
paths:
  - "credentials/**/*.ts"
---

# n8n Credentials File Standards

Reference: https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/

## File Structure

```ts
import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class ExampleNodeApi implements ICredentialType {
  name = 'exampleNodeApi';
  displayName = 'Example Node API';
  documentationUrl = 'https://...';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },  // Required for API keys/secrets
      default: '',
    },
  ];
  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      header: {
        Authorization: '=Bearer {{$credentials.apiKey}}',
      },
    },
  };
  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials?.domain}}',
      url: '/test-endpoint',
    },
  };
}
```

## Key Properties

- **`name`**: Internal name for referencing from other code
- **`displayName`**: Name shown in n8n GUI
- **`documentationUrl`**: Link to credentials documentation
- **`properties`**: Array of credential fields (displayName, name, type, default)
- **`authenticate`**: How to inject auth data into requests
- **`test`**: Request to verify credentials work

## Authentication Types

All use `type: 'generic'` with `properties` containing one of:

| Method | Key | Use for |
|--------|-----|---------|
| `header` | Header key-value pairs | Bearer tokens, API keys in headers |
| `qs` | Query string parameters | API keys in URL params |
| `body` | Request body fields | Username/password in POST body |
| `auth` | Basic auth (requires `username`/`password` keys) | HTTP Basic Authentication |

## Verification Requirements

- **API keys and sensitive credentials must be password fields** (`typeOptions: { password: true }`)
- **Always include OAuth credential if available**
- Provide a `test` request to validate credentials
- All text in English only
