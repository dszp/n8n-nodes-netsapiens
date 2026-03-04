# CLAUDE.md - n8n-nodes-netsapiens

## Project Overview

n8n community node for the NetSapiens VoIP/PBX REST API (ns-api v2). Published to npm as `n8n-nodes-netsapiens`. Licensed MIT. Author: David Szpunar.

- **Type**: Programmatic n8n node (not declarative) — chosen for REST API integration with custom logic, file uploads, pagination, and OpenAPI code generation
- **Node API Version**: 1 (stable)
- **Package manager**: pnpm (v9.15.4)
- **TypeScript target**: ES2019, strict mode enabled
- **Current version**: Check `package.json` for latest

## Repository Structure

```
credentials/                  # Credential definitions
  NetSapiensApi.credentials.ts  # Bearer token auth, optional base URL override
nodes/NetSapiens/
  NetSapiens.node.ts          # Main node (~5000+ lines) - all node logic
  NetSapiens.node.json        # Codex metadata (category: Communication)
  NetSapiens.svg / .dark.svg  # Node icons (light/dark theme)
generated/
  openapi.ts                  # AUTO-GENERATED from OpenAPI spec - do NOT edit manually
openapi/
  netsapiens-api-v2-v45.0.json  # Latest NetSapiens 45.0 API spec
  NetSapiens.v2.3.1.0.openapi.json  # Original API spec
  changes.diff.json           # Diff between specs
overrides/
  operations.overrides.ts     # UI customizations for generated operations
transport/
  request.ts                  # HTTP request helpers (auth, URL building, params)
tools/
  generate-openapi.ts         # OpenAPI-to-TypeScript code generator
```

## Key Commands

```bash
pnpm install          # Install dependencies
pnpm run build        # Generate openapi.ts + compile (npm run generate && n8n-node build)
pnpm run generate     # Regenerate generated/openapi.ts from OpenAPI spec
pnpm run dev          # Launch n8n locally with this node loaded
pnpm run lint         # Run n8n node linter (eslint-plugin-n8n-nodes-base)
pnpm run lint:fix     # Auto-fix lint issues
pnpm run release      # Publish release via release-it
```

## Architecture & Key Patterns

### OpenAPI Code Generation Pipeline
1. OpenAPI JSON spec lives in `openapi/`
2. `tools/generate-openapi.ts` parses the spec and generates `generated/openapi.ts`
3. `overrides/operations.overrides.ts` provides display name corrections and visibility overrides
4. `NetSapiens.node.ts` imports generated operations/resources and applies overrides at runtime
5. **Never edit `generated/openapi.ts` directly** — regenerate via `pnpm run generate`

### Credential Authentication
- Uses bearer token (API key) auth via `Authorization: Bearer {token}` header
- Credentials tested against `GET /domains` endpoint
- Base URL defaults to `https://{server}/ns-api/v2` with optional override
- OAuth is NOT yet implemented (see `oauth-support` branch for WIP)

### Transport Layer (`transport/request.ts`)
- `netSapiensRequest()` — authenticated HTTP requests via n8n's credential system
- `netSapiensRequestWithoutAuthentication()` — for JWT validation (uses token from input)
- `resolveBaseUrl()` — builds URL from credentials with override support
- `replacePathParams()` — URL parameter substitution with encoding

### Node Feature Highlights
- **Caching**: Multiple `Map` caches (domains, users, sites, resellers, etc.) with 15-minute TTL for dropdown/loadOptions data
- **Pagination**: Offset-based (`start`/`limit`) and limit-only, with auto-pagination
- **File uploads**: Multipart/form-data via manual `Buffer.concat` (no external deps) and Base64 JSON fallback
- **Dynamic dropdowns**: Resource locators for domains, users, sites, resellers, WS servers, emergency addresses, time zones, holiday countries/regions
- **Media operations**: Music on Hold, Greetings, Hold Messages with TTS generation and file upload support
- **JWT validation**: Custom operation that validates a JWT token against the API
- **Async requests**: Handles 202 responses for asynchronous API operations
- **Error handling**: Server version compat checks, graceful 404 on media delete, "No Route Found [92]" detection

### Operation Override System
`overrides/operations.overrides.ts` controls:
- **Resource name corrections** (e.g., `'Aduit Log'` -> `'Audit Log'`)
- **Operation visibility** (`hidden: true` to hide redundant operations)
- **Display name customization** (e.g., renaming `Base64` operations to `Upload`)
- Applied at runtime when building the node's property list

## Code Style & Conventions

### Formatting (`.prettierrc.js`)
- Tabs (width 2), semicolons, single quotes, trailing commas (all)
- Print width: 100, LF line endings
- Arrow parens: always

### Linting
- ESLint with `eslint-plugin-n8n-nodes-base` — n8n-specific rules
- Must pass lint before publishing: `pnpm run lint`

### TypeScript
- Strict mode with all checks enabled (`noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, etc.)
- `useUnknownInCatchVariables: false` (exception)
- Incremental compilation, declaration files, source maps

## n8n Node Development Rules

Detailed n8n development standards are in `.claude/rules/` (auto-loaded when editing relevant files):

- @.claude/rules/n8n-ui-standards.md — UI text case, terminology, field layout, progressive disclosure
- @.claude/rules/n8n-code-standards.md — data handling, file structure, verification guidelines
- @.claude/rules/n8n-operations-naming.md — CRUD vocabulary, operation naming, error messages
- @.claude/rules/n8n-credentials.md — credential file structure, auth types
- @.claude/rules/n8n-http-helpers.md — HTTP request helpers, request options, body types

Full reference also available in `.windsurf/rules/n8n-nodes-building-guide.md`.

## CI/CD

- **CI** (`.github/workflows/ci.yml`): Runs lint + build on PRs and pushes to main (Node 22, pnpm 9.15.4)
- **Release** (`.github/workflows/release-publish.yml`): Publishes to npm on GitHub Release using OIDC trusted publishing with provenance
- **No automated tests** — testing is manual via `pnpm run dev` against NetSapiens instances

## Key Documentation Links

- n8n Node Development: https://docs.n8n.io/integrations/creating-nodes/overview/
- n8n Node Build Reference: https://github.com/n8n-io/n8n-docs/tree/main/docs/integrations/creating-nodes/build/reference
- n8n UI Elements: https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/
- n8n HTTP Helpers: https://docs.n8n.io/integrations/creating-nodes/build/reference/http-helpers/
- n8n Verification Guidelines: https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines/
- n8n Code Standards: https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards/
- NetSapiens API Docs: https://docs.ns-api.com/
- NetSapiens Event Subscriptions: https://docs.ns-api.com/docs/event-subscriptions-1
- NetSapiens Developer Sandbox: https://docs.ns-api.com/docs/developer-sandbox-ns-apicom

## Development Notes

- Tested with NetSapiens version 44.3.2 and 45.0
- Minimum n8n version: 2.0.3+
- The OpenAPI v45.0 spec has roughly double the endpoints of the original spec
- `Raw -> Request` operation allows calling arbitrary endpoints not yet implemented as dedicated operations
- See `TODO.md` for feature ideas and roadmap items
- See `CHANGELOG.md` for version history
