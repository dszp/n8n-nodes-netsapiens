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

## Multiple Auth Types: Performance-Safe Pattern

**CRITICAL**: Do NOT use credential `displayOptions` on the node's `credentials` array (e.g.,
`displayOptions: { show: { authentication: ['apiKey'] } }`) combined with an `authentication`
node parameter. This causes severe frontend performance degradation in nodes with large property
counts (100+), because n8n's frontend re-evaluates all credential displayOptions conditions on
every UI interaction (dropdown click, parameter change, etc.).

### Wrong (causes slowdowns):
```ts
// In node description — DO NOT DO THIS for nodes with many properties
credentials: [
  { name: 'myApi', required: true, displayOptions: { show: { authentication: ['apiKey'] } } },
  { name: 'myOAuth2Api', required: true, displayOptions: { show: { authentication: ['oAuth2'] } } },
],
properties: [
  { displayName: 'Authentication', name: 'authentication', type: 'options', ... },
  // ...hundreds of other properties
]
```

### Correct (single credential with auth type toggle inside):
```ts
// In credential file — auth type selection INSIDE the credential
properties: [
  {
    displayName: 'Authentication Method',
    name: 'authType',
    type: 'options',
    options: [
      { name: 'API Key', value: 'apiKey' },
      { name: 'OAuth2', value: 'oAuth2' },
    ],
    default: 'apiKey',
  },
  // API Key fields with displayOptions: { show: { authType: ['apiKey'] } }
  // OAuth2 fields with displayOptions: { show: { authType: ['oAuth2'] } }
];

// In node description — single credential, NO displayOptions
credentials: [{ name: 'myApi', required: true, testedBy: 'testMyCredential' }],
```

Credential-level `displayOptions` (within the credential dialog) are safe because they are only
evaluated when the credential dialog is open, not during node panel rendering.

When using this pattern:
- Remove `authenticate` from the credential — handle auth manually in the transport layer
- Use `testedBy` on the credential pointing to a `credentialTest` method on the node for
  auth-type-aware testing logic
- In the transport layer, read `authType` from the credential to route to the correct auth flow

## Verification Requirements

- **API keys and sensitive credentials must be password fields** (`typeOptions: { password: true }`)
- **Always include OAuth credential if available**
- Provide a `test` request or `testedBy` method to validate credentials
- All text in English only
