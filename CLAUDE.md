# CLAUDE.md - n8n-nodes-netsapiens

## Project Overview

n8n community node for the NetSapiens VoIP/PBX REST API (ns-api v2). Published to npm as `n8n-nodes-netsapiens`. Licensed MIT. Author: David Szpunar.

- **Type**: Programmatic n8n node (not declarative) — chosen for REST API integration with custom logic, file uploads, pagination, and OpenAPI code generation
- **Node API Version**: 1 (stable)
- **Package manager**: npm
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
  README.md                         # provenance + refresh instructions — read this first
  netsapiens-api-v2-core-44.4.10.json # build-exact, from a live core — the v44 BASELINE
  netsapiens-api-v2-docs-v44.3.json # docs.ns-api.com v44.3 branch
  netsapiens-api-v2-docs-v44.4.json # docs.ns-api.com v44.4 branch (= site default)
  netsapiens-api-v2-docs-v45.0.json # docs.ns-api.com v45.0 branch — the generation TARGET
  NetSapiens.v2.3.1.0.openapi.json  # legacy archive — NOT a valid v44 baseline
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
npm install          # Install dependencies
npm run build        # Generate openapi.ts + compile (npm run generate && n8n-node build)
npm run generate     # Regenerate generated/openapi.ts from OpenAPI spec
npm run dev          # Launch n8n locally with this node loaded
npm run lint         # Run n8n node linter (eslint-plugin-n8n-nodes-base)
npm run lint:fix     # Auto-fix lint issues
npm run release      # Publish release via release-it
```

## Architecture & Key Patterns

### OpenAPI Code Generation Pipeline
1. OpenAPI JSON spec lives in `openapi/`
2. `tools/generate-openapi.ts` parses the spec and generates `generated/openapi.ts`
3. `overrides/operations.overrides.ts` provides display name corrections and visibility overrides
4. `NetSapiens.node.ts` imports generated operations/resources and applies overrides at runtime
5. **Never edit `generated/openapi.ts` directly** — regenerate via `npm run generate`

### Where the OpenAPI Specs Come From

Any NetSapiens server with API v2 enabled self-publishes its own spec — matching that server's
exact release — under a fixed path. Substitute the server hostname:

```
https://<ns-server>/ns-api/webroot/openapi/           # Swagger/Redoc browser UI
https://<ns-server>/ns-api/webroot/openapi/openapi.json  # the raw spec
```

A core-served spec is the only source with a **build-exact** `info.version` (e.g. `"44.4.10"`),
but only for the build that server is running right now — a core stops serving its old spec the
moment it upgrades, so snapshot before upgrading. Save as
`openapi/netsapiens-api-v2-core-<info.version>.json`. The `servers` block is generic
(`https://{server}/ns-api/v2`, default `ns-api.com`) and does not embed the source hostname.

Pull from **our own manager portal**, not a partner's — the node has to match the release we
run. Ask for the hostname; it is deliberately not recorded here. Verified 2026-07-27: ours served
44.4.10, byte-identical to a partner core on the same build.

### Docs-Site Specs (per version branch)

`docs.ns-api.com` is a ReadMe project with real version branches. Swept 2026-07-27, exactly
three exist — **v44.3, v44.4, v45.0** (43.0, 44.0–44.2, 45.1, 46.0 all 404). Each publishes a
full OpenAPI JSON:

```
https://docs.ns-api.com/<branch>/openapi/netsapiens-api-v2.json   # e.g. /v45.0/openapi/...
https://docs.ns-api.com/openapi/netsapiens-api-v2.json            # no branch = default (44.4)
```

These give **history** across releases, which a core server cannot. The tradeoff: branches are
minor-level, so `info.version` in every docs spec is a stripped `"1.0.0"` and a branch covers a
span of builds. Use the core for truth, the docs branches for cross-version comparison.

Also per branch: `https://docs.ns-api.com/<branch>/llms.txt` indexes every guide and endpoint,
with per-endpoint markdown (including the endpoint's OpenAPI fragment) at
`https://docs.ns-api.com/<branch>/reference/{operationId}.md`.

**Cloudflare rate-limits this host.** A burst of requests returns `429` with
`cf-mitigated: challenge` — easy to misread as `404` and wrongly conclude a branch or path does
not exist. Space requests ~25s apart when sweeping, and re-test a known-good URL before trusting
any negative result.

### Version Coverage & Marking Endpoints by Release

Compare specs to determine which endpoints exist on which NetSapiens release, so operations can
be marked "not on 44" / "not on 45" rather than silently 404-ing at runtime.

`tools/generate-openapi.js` sets `minApiVersion: 45` on any operation missing from the **v44
baseline spec**, and `NetSapiens.node.ts` renders that as "May require NetSapiens API v45+".

**The baseline must be a real v44 core spec.** It used to be `NetSapiens.v2.3.1.0.openapi.json`,
which predates 44 by a wide margin, so everything added between 2.3.1.0 and 44.4.10 was flagged
v45-only: **65 false positives** against a live 44.4.10 core (certificates, timeframes,
number-filters, video, firebase, holidays, transcriptions, messagesessions, …). Fixed
2026-07-27 by repointing the baseline to `netsapiens-api-v2-core-44.4.10.json`.

Verified against a live 44.4.10 core after the fix: **0 false positives, 0 false negatives**
(v45-flagged ops 199 → 134). Re-run that check after any spec refresh.

Op counts (method+path pairs, Apidog `#N` suffixes stripped):

| spec | paths | ops | role |
|---|---|---|---|
| `netsapiens-api-v2-core-44.4.10.json` | 239 | 354 | **v44 baseline** |
| `netsapiens-api-v2-docs-v44.3.json` | 239 | 354 | reference |
| `netsapiens-api-v2-docs-v44.4.json` | 293 | 362 | reference |
| `netsapiens-api-v2-docs-v45.0.json` | 329 | 481 | **generation target** |
| `NetSapiens.v2.3.1.0.openapi.json` | — | 254 | archive only |

**A live 44.4.10 core is operation-identical to the docs `v44.3` branch**, *not* `v44.4`. The
v44.4 branch runs 8 ops ahead of any 44.4.10 box, so it is not a safe floor for "does 44 have
this" — always baseline on the core spec.

44 vs 45 (core 44.4.10 vs docs v45.0): **7 44-only**, **134 45-only**.
- 44-only: `/routecon` (GET/POST/PUT/DELETE), `PUT|DELETE /routes`, `DELETE /routes/frm/{forward_request_match}` — replaced in 45 by `/routes/{route-id}` and `/routes/{route-id}/routecon/{index}`.
- 45-only: conferences, dialpolicy, phoneconfiguration/phonetemplates, deviceprofiles, video, `/auditlog`, `/accesslog`, and many `/count` and `/list` variants. Includes `GET /domains/{domain}/devices`, which a 44.4.10 core does **not** serve.

### Public NetSapiens Docs MCP Server

- Endpoint: `https://docs.ns-api.com/mcp` (streamable HTTP, no auth, stateless — no session
  header). Tools: `list-endpoints`, `get-endpoint`, `search-endpoints`, `execute-request`,
  `get-server-variables`. Also wired up as the connected `netsapiens-api` MCP server.
- **Pin the branch with `?branch=<version>`** — e.g. `https://docs.ns-api.com/mcp?branch=45.0`.
  Verified: `44.3`, `44.4`, `45.0` each return distinct payloads; an unknown branch fails with
  `-32000 Bad Request`. Note the branch value has **no `v` prefix** here, unlike the docs URL path.
- **The unbranched endpoint currently resolves to 44.4** — its `list-endpoints` output is
  byte-identical to `?branch=44.4`, as is `llms.txt`. Do not read `serverInfo.version`, which is
  a constant `44.4` on every branch and is not a branch indicator.
- The connected `netsapiens-api` MCP uses the bare URL, so it answers from 44.4 today. That is
  close to a 44.4.10 core but will silently drift if ReadMe promotes 45.0 to default — pin it
  to `?branch=44.4` (or `45.0`) rather than relying on the default.
- Caveat: the docs v44.4 branch is ahead of a real 44.4.10 box (see version coverage above), so
  MCP answers can describe endpoints a 44.4.10 server does not have.

### Credential Authentication
- Single credential type (`netSapiensApi`) with auth type toggle inside the credential dialog
- **API Key**: Uses bearer token auth via `Authorization: Bearer {token}` header; tested against `GET /domains`
- **OAuth2 (Password Grant)**: Uses `POST /ns-api/v2/tokens` with automatic token caching/refresh; tested by POSTing directly to the tokens endpoint
- Base URL defaults to `https://{server}/ns-api/v2` with optional override (API key only)
- Restricted OAuth2 users fall back to `/domains/~` and `/domains/~/users/~` for dropdown data

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
- Must pass lint before publishing: `npm run lint`

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

- **CI** (`.github/workflows/ci.yml`): Runs lint + build on PRs and pushes to main (Node 22)
- **Release** (`.github/workflows/release-publish.yml`): Publishes to npm on GitHub Release using OIDC trusted publishing with provenance
- **No automated tests** — testing is manual via `npm run dev` against NetSapiens instances

## Key Documentation Links

- n8n Node Development: https://docs.n8n.io/integrations/creating-nodes/overview/
- n8n Node Build Reference: https://github.com/n8n-io/n8n-docs/tree/main/docs/integrations/creating-nodes/build/reference
- n8n UI Elements: https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/
- n8n HTTP Helpers: https://docs.n8n.io/integrations/creating-nodes/build/reference/http-helpers/
- n8n Verification Guidelines: https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines/
- n8n Code Standards: https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards/
- NetSapiens API Docs: https://docs.ns-api.com/ — branches: `/v44.3`, `/v44.4`, `/v45.0`
- NetSapiens Docs MCP: https://docs.ns-api.com/mcp?branch=45.0 — page: https://docs.ns-api.com/v45.0/docs/mcp-1
- Per-branch OpenAPI: `https://docs.ns-api.com/<branch>/openapi/netsapiens-api-v2.json`
- Per-branch LLM index: `https://docs.ns-api.com/<branch>/llms.txt`
- Per-server OpenAPI spec: `https://<ns-server>/ns-api/webroot/openapi/openapi.json`
- NetSapiens Event Subscriptions: https://docs.ns-api.com/docs/event-subscriptions-1
- NetSapiens Developer Sandbox: https://docs.ns-api.com/docs/developer-sandbox-ns-apicom

## Development Notes

- Tested with NetSapiens version 44.3.2, 44.4.10, and 45.0
- Minimum n8n version: 2.0.3+
- The docs v45.0 spec has roughly double the operations of the legacy 2.3.1.0 spec (481 vs 254)
- `Raw -> Request` operation allows calling arbitrary endpoints not yet implemented as dedicated operations
- See `TODO.md` for feature ideas and roadmap items
- See `CHANGELOG.md` for version history
