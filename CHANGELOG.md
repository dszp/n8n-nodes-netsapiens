# Changelog

All notable changes to the n8n-nodes-netsapiens project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.2.1] - 2025-12-22

### Added

- Added UI notices to clarify that "Search for Users in Domain" returns a maximum of 100 users, and to point users to "Get Users in Domain" for complete lists using pagination.

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