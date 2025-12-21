# TODO

This file tracks ideas, potential enhancements, and follow-up work for `n8n-nodes-netsapiens`.

Nothing in this file is a commitment. Items may change, be re-prioritized, or be removed at any time.

## Packaging and documentation

- Replace temporary icons (`nodes/NetSapiens/NetSapiens.svg` and `nodes/NetSapiens/NetSapiens.dark.svg`) with the official NetSapiens SVG logo(s).
- Decide whether to ship and/or reference a PNG logo (a `nodes/NetSapiens/NetSapiens.png` exists currently).
- Update `package.json` `repository.url` to the real GitHub repository URL.
- Update the credential `documentationUrl` in `credentials/NetSapiensApi.credentials.ts` to the final documentation URL.

## Node UX defaults

- Decide whether Authentication resources/actions should be hidden by default in the node UI.
- Decide whether `Raw -> Request` should remain the default resource/operation (or whether a specific resource/operation should be the default).
- Create and Update operations need to be implemented with UI options instead of raw JSON objects needing to be provided.

## Versioning / compatibility strategy

- Decide whether to introduce n8n node versioning to support both NetSapiens 44.x (current stable) and 45.x+ (new OpenAPI spec), keeping existing workflows stable while enabling newer endpoints.

## Feature ideas

- Implement [Event Subscriptions](https://docs.ns-api.com/docs/event-subscriptions-1) as webhook triggers in this node via the [subscriptions](https://docs.ns-api.com/reference/readsubscriptions) API endpoint.
- Implement [Synchronous Requests](https://docs.ns-api.com/docs/async-202-vs-sync-200) for creates on supported endpoints (a NetSapiens feature that returns the newly created resource immediately instead of a job ID).
- Add a way to easily review [CDR Field Mappings](https://docs.ns-api.com/docs/cdr-field-mappings) within the node for easy reference.
- Add a way to easily review [Application Mappings in Phone Numbers and Dial Rules](https://docs.ns-api.com/docs/application-mapping-in-phonenumbers-dialrules) within the node for easy reference.
- Consider supporting access/refresh tokens for authentication via [`POST /tokens`](https://docs.ns-api.com/reference/post_tokens-1).
