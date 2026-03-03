# Changelog

All notable changes to the n8n-nodes-netsapiens project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.2.3] - 2026-03-02

### Added

- Added dedicated UI fields for all **Music on Hold** (Domain and User), **Greetings**, and **Hold Messages** (Domain and User) Create and Update operations, replacing the generic JSON Body input.
- Added consolidated "Upload" operations that support both **Binary Data from Previous Node** (multipart/form-data) and **Base64 Text Input** file sources via a File Source selector across all media resources.
- Added auto-detection of audio file encoding (MIME type) from binary metadata when the Encoding field is left empty.
- Added proper TTS operation fields (MOH and Greetings): Script, Voice Language, Voice ID, Index, and Synchronous.
- Added proper Upload operation fields: Script, Index, Convert, File Source, Binary Property, Encoding, Base64 File, and Synchronous.
- Added graceful handling of Media Delete operations (MOH, Greetings, Hold Messages) where the API returns 404 "not found index for removal" on successful deletion — now returns a success response instead of throwing an error.
- Added dynamic **Index** dropdown for all media Update and Delete operations that fetches existing items via the Read endpoint, showing ordinal-order, filename, script text, and duration. Manual index entry is also available.
- Added dedicated UI fields for **Images** Create and Update operations with File Source selector (Binary Data / Base64 Text), Filetype, Description, Reseller, Domain, and Server fields.
- Consolidated Images `FileUpload` and `Base64` Update operations into a single "Upload" operation.

### Changed

- Consolidated separate Base64 and FileUpload operations into single "Upload" operations for MOH (Domain and User) and Greetings, providing a cleaner UI.
- Renamed Hold Messages FileUpload operations to "Upload" display names (no Base64 alternative exists for Hold Messages).
- Hidden redundant individual FileUpload operations for MOH, Greetings, and Images via operation overrides.
- Binary file uploads use manual multipart/form-data encoding via Node.js `Buffer` (no external dependencies), avoiding server-side JSON body size limits that prevented large file uploads via base64-encoded JSON.
- Hold Messages base64 text input is automatically converted to binary and sent via multipart (since the API only supports multipart for these resources).
- All multipart file uploads use POST regardless of the operation's nominal HTTP method, since the NetSapiens API rejects PUT with multipart/form-data ("Missing action" error).
- Changed default for **Synchronous** to "Yes" across all media TTS and Upload operations.
- Changed default for **Convert** to "Yes" for all media Upload operations.

## [0.2.2] - 2026-02-24

### Added

- Added a custom **Authentication/JWT (JSON Web Token) -> Validate JWT** operation.
- Added a required **JSON Web Token (ns_t)** input for Validate JWT to validate a supplied JWT via `GET /jwt`.
- Added per-item JWT expiration output metadata on Validate JWT responses:
  - `jwtIsUnexpired`
  - `jwtExpiresAt`
  - `jwtExpiresInSeconds`
  - `jwtValidationCheckedAt`
  - `jwtValidationReason` (when applicable)

### Changed

- Validate JWT now sends the provided JWT value in the request `Authorization` header for that single request and does not rely on credential-auth injection for that call.
- Validate JWT input now accepts both raw token values and values prefixed with `Bearer `.

### Fixed

- Improved Validate JWT error handling so `401/403` auth failures return structured validation output instead of failing node execution.
- Improved HTTP status extraction for nested and variant n8n error payload shapes to make auth-failure handling more reliable.

## [0.2.1] - 2025-12-25

### Added

- Added UI notices to clarify that "Search for Users in Domain" returns a maximum of 100 users (but allows for site filtering), and to point users to "Get Users in Domain" for complete lists using pagination, and vice versa.
- Added support for showing Domain Description field in domain dropdowns to make choosing the correct one easier.
- Added cached holiday country and region dropdown selectors for Timeframes/Holiday Information operations.
- Added a cached WS_SERVERS-based Server dropdown (with manual entry) for call/CDR related operations.
- Added "No Site Selected" option to Site dropdowns.
- Improved Emergency Address dropdown labels to display more identifying details than only the ID.

### Changed

- Renamed resource "Connections" to "Connections (Trunks)".
- Updated reseller selection UX to use searchable dropdowns with manual entry (including Quotas reseller path parameter).
- Renamed any "Callid" field display label to "Call ID" across the node.

### Fixed

- Added friendly global error handling for "No Route Found [92]" responses (including server version when available).
- Improved "No Route Found [92]" detection to also trigger when the underlying HTTP layer returns a NodeOperationError.
- Fixed typo in generated resource display name so the UI shows "Audit Log" instead of "Aduit Log".
- Fixed Holiday Region dropdown to populate correctly from the "Read List of Supported Regions" response.
- Improved resourceLocator value extraction in execute() for path and query parameters.

## [0.2.0] - 2025-12-22

### Added

- Updated bundled OpenAPI spec used for generated operations to the one from NetSapiens for server version 45.0. This more than doubles the available API endpoints, though not all will work with older server versions. Version bumped to 0.2.0 because of this.
- Customized Audit Log "Read Audit Log" operation fields (target domain/user dropdowns with manual fallback, and datetime start/end inputs).
- Improved user dropdown/search labels to include more identifying details when available.
- Added support for `start`/`limit` pagination by defaulting to return all results, while allowing manual paging controls (enabled automatic pagination).
- Added generic support for limit-only operations (query `limit` without `start`) by defaulting to return all results while allowing manual limits (improved automatic pagination).

### Fixed

- Added Audit Log server compatibility checks (using `/version` API version when available) to show a clearer "unsupported on this server" error when the endpoint is not implemented.
- Updated auto-pagination behavior to return a single item for non-array responses (for example, count-style endpoints).
- Updated Domain and User parameter dropdown behavior to fail gracefully when dynamic values or missing execution context prevent option loading.

### Changed

- Updated domain dropdown option loading to page through `/domains` when pagination is required.

## [0.1.3] - 2025-12-21

### Changed

- Added author email to metadata.

## [0.1.2] - 2025-12-21

### Changed

- Cleanup in `README.md` file and expanded TOC.
- Update `package.json` to include author URL.

## [0.1.1] - 2025-12-21

### Added

- Minor metadata updates and modified publishing workflow.

## [0.1.0] - 2025-12-21

### Added

- Initial release of the NetSapiens API community node.