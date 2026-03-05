# n8n-nodes-netsapiens

This is an n8n community node. It lets you interact with the NetSapiens API in your n8n workflows.

NetSapiens is a Voice over IP (VoIP) phone switch software provider that provides a REST API (the `ns-api`) that can be used to manage and query resources in a NetSapiens environment.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

- [n8n-nodes-netsapiens](#n8n-nodes-netsapiens)
	- [Installation](#installation)
		- [n8n Cloud](#n8n-cloud)
		- [Self-Hosted n8n](#self-hosted-n8n)
	- [Operations](#operations)
	- [Credentials](#credentials)
	- [Compatibility](#compatibility)
	- [Usage](#usage)
		- [Basic usage](#basic-usage)
		- [Raw request](#raw-request)
		- [Development](#development)
	- [Resources](#resources)
	- [Changelog](#changelog)
	- [TODO](#todo)
	- [Attribution](#attribution)
	- [License](#license)

## Installation

### n8n Cloud

Not yet verified for use with n8n Cloud.

### Self-Hosted n8n

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

```bash
# From your n8n installation directory
npm install n8n-nodes-netsapiens
# Restart n8n
```

You can install this node as a community node on your self-hosted [n8n](https://n8n.io) instance from the UI (if community nodes are enabled) since it's [published to npm](https://www.npmjs.com/package/n8n-nodes-netsapiens) as `n8n-nodes-netsapiens`, with the following steps:

1. In your n8n instance, go to **Settings** → **Community Nodes**
2. Click **Install** and enter: `n8n-nodes-netsapiens`
3. Click **Install** to add the node to your instance

## Operations

This node is primarily driven by a bundled OpenAPI specification. In most cases you:

- **Select a resource** (an API grouping)
- **Select an operation** (an API endpoint action)

The node then renders fields for the endpoint parameters.

In addition, the node includes a **Raw -> Request** operation that lets you call arbitrary endpoints directly when you need full control.

The node also includes a custom **Authentication/JWT (JSON Web Token) -> Validate JWT** operation. This operation accepts a token input (`JSON Web Token (ns_t)`) and validates it against `GET /jwt` using that provided token for the request.

The node also includes a custom **Authentication/User Credentials -> Validate** operation. This operation validates a username and password against the NetSapiens OAuth2 token endpoint, returning a structured success or failure result without using the token for subsequent API calls.

NetSapiens provides the [API JSON Schema](https://docs.ns-api.com/docs/download-full-api-json-schema-file) as part of their documentation, which this node uses to generate the basic node interface. The node also implements a number of overrides to handle NetSapiens-specific details and add additional functionality and affordances.

Read operations are substantially better tested and usable than write calls, which may require build custom JSON objects for crate and update requests initially.

## Credentials

This node supports two authentication methods within a single **NetSapiens API** credential, selectable via the **Authentication Method** dropdown:

### API Key (Bearer Token) — default

Uses [API Keys](https://docs.ns-api.com/docs/api-keys) (bearer tokens) as the authentication method.

- **Server**: Your NetSapiens API hostname (without protocol)
- **Bearer Token**: An API key (bearer token) used for API requests
- **Base URL Override** (optional): Override the full base URL. If empty, the node defaults to `https://{server}/ns-api/v2`.

Obtain an API key from your NetSapiens provider if you are a Reseller user, or obtain the API key directly from your NetSapiens instance if you have administrator access.

Only NetSapiens API version 2 supports API keys, and this node only connects to API version 2 endpoints (though the API key would be valid for API version 1 as well, for versions of NetSapiens that support API version 2 credentials).

### OAuth2 (Password Grant)

Uses the OAuth2 password grant flow (`POST /ns-api/v2/tokens`) to obtain an access token using client credentials and a username/password.

- **Server**: Your NetSapiens API hostname (without protocol)
- **Client ID**: OAuth2 client identifier. Format varies by installation (e.g., `86716.apiscripts`, `teammateapi.uptimetm`).
- **Client Secret**: OAuth2 client secret
- **Username**: User login for OAuth2 authentication. Typically `user@domain` or `user@0000.territory.service`, but format may vary by installation.
- **Password**: Password for the OAuth2 user

The node automatically manages token caching and refresh. Tokens are cached and reused until they expire (with a 60-second buffer), at which point a new token is fetched automatically. If the v2 token endpoint is not available, the node falls back to the legacy `/ns-api/oauth2/token/` endpoint.

OAuth2 credentials support restricted users — domain and user dropdowns automatically fall back to the user's own domain/user when the account lacks permission to list all domains or users.

JWT credential-login flows are not supported as node credentials, though the node includes a dedicated **Validate JWT** operation that accepts a JWT value as input for one request.

NetSapiens, as of this writing, runs a [Developer Sandbox](https://docs.ns-api.com/docs/developer-sandbox-ns-apicom) where you can test API usage if you would like.

NetSapiens provides an [API v1 Migration to v2 reference](https://docs.ns-api.com/docs/v1-migration-to-v2) to review so you can determine differences between the API versions if you're familiar with version 1.

## Compatibility

- **Minimum n8n version**: Developed and tested with version `2.0.3+` but will likely work with several prior versions.
- **Tested with**: Local development via `n8n-node dev`
- **Tested with**: NetSapiens Version 44.3.2

**Note:** The OpenAPI spec used to implement this node is not from a well-defined version, though it's older than 45.0 and likely is for a version of 44.x when API v2 was introduced. The 45.0 spec provided by NetSapiens has a substantial numer of changes and additions and this node may not be fully compatible with it until it's updated in the future (however, you can use the Raw API Request option to make calls to endpoints that are not yet implemented).

## Usage

### Basic usage

- **Resource**: Select an API resource grouping.
- **Operation**: Select the specific endpoint action.
- **Parameters**:
	- Path and query parameters appear as node fields.
	- If the endpoint has a request body, a **Body** JSON field is shown.

### Raw request

If you need an endpoint that is not represented (or you want full control), use the Raw API request:

- **Resource**: `Raw`
- **Operation**: `Raw API Request`

Then set:

- **Method**
- **Endpoint** (for example: `/domains`)
- **Query Parameters**
- **Body** (for non-GET/non-DELETE requests)

### Development

From `n8n-nodes-netsapiens/`:

- `npm install` installs dependencies.
- `npm run generate` regenerates `generated/openapi.ts` from `openapi/NetSapiens.v2.3.1.0.openapi.json`.
- `npm run build` runs code generation and builds the node.
- `npm run dev` runs the node in development mode directly, launching n8n, or:
- Use `npm link` to link the node to n8n (and then `npm link n8n-nodes-netsapiens` in your n8n instance `config` directory and restart n8n).

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [NetSapiens API documentation](https://docs.ns-api.com/)
* There's a public [NetSapiens MCP server](https://docs.ns-api.com/v45.0/docs/mcp-1) starting with version 45.0 for testing at `https://docs.ns-api.com/mcp?branch=45.0`. No authentication is required.

## Changelog

For a version history of changes and updates, see the [CHANGELOG.md](CHANGELOG.md) file.

## TODO

See [TODO.md](TODO.md).

## Attribution

NetSapiens is A Crexendo Company and they own the trademarks and intellectual property rights to the NetSapiens brand. This node is not affiliated with NetSapiens or Crexendo in any way and is provided as a service to the n8n community.

## License

MIT