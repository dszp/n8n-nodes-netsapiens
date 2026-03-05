# TODO

This file tracks ideas, potential enhancements, and follow-up work for `n8n-nodes-netsapiens`.

Nothing in this file is a commitment. Items may change, be re-prioritized, or be removed at any time.

## Node UX defaults

- Decide whether Authentication resources/actions should be hidden by default in the node UI.
- Decide whether `Raw -> Request` should remain the default resource/operation (or whether a specific resource/operation should be the default).
- Create and Update operations need to be implemented with UI options instead of raw JSON objects needing to be provided.
  - This has been started for certain operations, such as Music on Hold audio file upload/download, Greetings audio files, and Images operations in 0.2.3, but more remain.
- Consider whether the Validate User Credentials operation should support returning additional token metadata (e.g., scope, territory) in the output.

## Versioning / compatibility strategy

- Decide whether to introduce n8n node versioning to support both NetSapiens 44.x (current stable) and 45.x+ (new OpenAPI spec), keeping existing workflows stable while enabling newer endpoints.

## Feature ideas

- Implement [Event Subscriptions](https://docs.ns-api.com/docs/event-subscriptions-1) as webhook triggers in this node via the [subscriptions](https://docs.ns-api.com/reference/readsubscriptions) API endpoint.
- Implement [Synchronous Requests](https://docs.ns-api.com/docs/async-202-vs-sync-200) for creates on supported endpoints (a NetSapiens feature that returns the newly created resource immediately instead of a job ID).
- Add a way to easily review [CDR Field Mappings](https://docs.ns-api.com/docs/cdr-field-mappings) within the node for easy reference.
- Add a way to easily review [Application Mappings in Phone Numbers and Dial Rules](https://docs.ns-api.com/docs/application-mapping-in-phonenumbers-dialrules) within the node for easy reference.
- ~~Consider supporting access/refresh tokens for authentication via [`POST /tokens`](https://docs.ns-api.com/reference/post_tokens-1).~~ **Done** — OAuth2 password grant credential added with automatic token caching and refresh.

 - Auto Attendant -> Read Specific Auto Attendant: Filter the list of users so only auto-attendants are displayed.
 - Auto Attendant -> Read Specific Auto Attendant: Pull possible options for the Prompt field from the selected auto-attendant once selected, rather than requiring entry. Ensure the Prompt field is marked as required.
