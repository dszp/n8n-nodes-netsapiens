# OpenAPI spec snapshots

Provenance for every spec in this folder, and how to refresh them.

## Files

| File | Source | `info.version` | Paths | Ops | Role |
| --- | --- | --- | --- | --- | --- |
| `netsapiens-api-v2-core-44.4.10.json` | live core, `/ns-api/webroot/openapi/openapi.json` | **44.4.10** (build-exact) | 239 | 354 | **v44 baseline** for version flagging |
| `netsapiens-api-v2-docs-v44.3.json` | `docs.ns-api.com` v44.3 branch | `1.0.0` (stripped) | 239 | 354 | historical reference |
| `netsapiens-api-v2-docs-v44.4.json` | `docs.ns-api.com` v44.4 branch | `1.0.0` (stripped) | 293 | 362 | historical reference |
| `netsapiens-api-v2-docs-v45.0.json` | `docs.ns-api.com` v45.0 branch | `1.0.0` (stripped) | 329 | 481 | **generation target** |
| `NetSapiens.v2.3.1.0.openapi.json` | legacy, unattributed | 2.3.1.0 | — | 254 | archive only — **do not use as a v44 baseline** |
| `changes.diff.{json,yaml}` | derived | — | — | — | old diff artifacts |

Op counts are method+path pairs after stripping Apidog `#N` suffixes.

An earlier `netsapiens-api-v2-v45.0.json` was removed: it came from an unofficial source, carried
a stripped `1.0.0` version, and was 11 ops behind the docs v45.0 branch. Recoverable from git
history if ever needed.

## Two sources, answering different questions

**Core-served — build-exact, no history.** Every NetSapiens core publishes its own spec:

```
https://<ns-server>/ns-api/webroot/openapi/openapi.json
```

Only source with a true build number in `info.version`. A core stops serving its old spec the
moment it upgrades, so **snapshot before upgrading or it is unrecoverable**.

Verified 2026-07-27: our own manager portal and one partner core both served **44.4.10**, and the
two payloads were byte-identical. The committed snapshot is from our own core. The `servers`
block is generic (`https://{server}/ns-api/v2`), so no hostname is embedded in the spec.

Hostnames are deliberately not recorded in this repo — ask for the target when pulling.

**docs.ns-api.com — branch-versioned, historical.** A ReadMe project with real version branches:

```
https://docs.ns-api.com/<branch>/openapi/netsapiens-api-v2.json   # e.g. /v45.0/...
https://docs.ns-api.com/openapi/netsapiens-api-v2.json            # no branch = default (44.4)
https://docs.ns-api.com/<branch>/llms.txt                         # full guide+endpoint index
https://docs.ns-api.com/<branch>/reference/{operationId}.md       # per-endpoint, with OpenAPI fragment
```

Branches available (swept 2026-07-27, everything else 404s): **v44.3, v44.4, v45.0**.
Granularity is minor-level, and `info.version` is stripped to `1.0.0` — a branch covers a span of
builds and cannot identify one.

Cloudflare rate-limits this host aggressively. A burst of requests returns `429` with
`cf-mitigated: challenge`, which is easy to misread as `404` and conclude a branch does not
exist. Space requests ~25s apart when sweeping.

## Version flagging

`tools/generate-openapi.js` marks an operation `minApiVersion: 45` when it is absent from the v44
baseline. **The baseline must be a real v44 core spec.** It previously used
`NetSapiens.v2.3.1.0.openapi.json`, which predates 44 by a wide margin, so 65 operations a live
44.4.10 core actually serves were labelled "may require v45+" — certificates, timeframes,
number-filters, video, firebase, holidays, transcriptions, messagesessions, and more.

With `netsapiens-api-v2-core-44.4.10.json` as the baseline, flags verify clean against a live
44.4.10 core: **0 false positives, 0 false negatives** (v45-flagged ops: 199 → 134).

Use the core spec, not `docs-v44.4`, as the baseline. A live 44.4.10 core is operation-identical
to the **v44.3** docs branch; the v44.4 branch runs 8 ops ahead of any 44.4.10 box, so it would
reintroduce optimistic flags.

## Refreshing

```bash
# 1. build-exact snapshot from our own core (do this BEFORE any upgrade)
#    <ns-server> = our manager portal hostname, not recorded here
curl -o openapi/netsapiens-api-v2-core-<version>.json \
  https://<ns-server>/ns-api/webroot/openapi/openapi.json

# 2. docs branch snapshot
curl -o openapi/netsapiens-api-v2-docs-v<branch>.json \
  https://docs.ns-api.com/v<branch>/openapi/netsapiens-api-v2.json

# 3. repoint tools/generate-openapi.js (defaultSpecPath / baselineSpecPath), then
npm run generate && npm run lint
```

Apidog `#N` path suffixes (`/tokens#1`, `/jwt#2`) are an authoring convention for multiple
examples on one path+method — not part of the real path. `normalizePath()` strips them; anything
consuming these specs directly must do the same.
