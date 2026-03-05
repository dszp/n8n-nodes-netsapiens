---
paths:
  - "nodes/**/*.ts"
  - "credentials/**/*.ts"
  - "transport/**/*.ts"
  - "overrides/**/*.ts"
  - "tools/**/*.ts"
---

# n8n Node Code Standards

Reference: https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards/

## Core Rules

- **Write in TypeScript** with proper typing
- **Use the n8n linter**: Must pass `npm run lint` before publishing
- **No external runtime dependencies** (required for community node verification)
- **No environment variables or filesystem access** — pass all data through node parameters
- **English language only** — all interface text, docs, error messages, and README

## Data Handling (Programmatic Nodes)

- **Never mutate incoming data** from `this.getInputData()` — all nodes share it
- Clone incoming data before modifying, then return the new data
- Exception: if only changing binary data, reuse the JSON item reference

## Resource/Operation Pattern

```ts
properties: [
  {
    displayName: 'Resource',
    name: 'resource',
    type: 'options',
    options: [
      { name: 'Resource One', value: 'resourceOne' },
    ],
    default: 'resourceOne',
  },
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: { resource: ['resourceOne'] },
    },
    options: [
      { name: 'Create', value: 'create', description: 'Create an instance of Resource One' },
    ],
  },
]
```

## Reuse Internal Parameter Names

Use the same `value` (internal name) for equivalent fields across operations. This preserves user data when switching operations. Control visibility with `displayOptions` so only one field shows at a time.

## Node File Structure

Required:
- `package.json` at root
- `nodes/` directory with `<NodeName>.node.ts` (base file)
- `nodes/<NodeName>/<NodeName>.node.json` (codex file — metadata)
- `credentials/` directory with `<NodeName>.credentials.ts`

Recommended modular structure:
- `actions/` — resource subdirectories with operation files
- `transport/` — HTTP communication implementation
- `methods/` — dynamic parameter functions (loadOptions, etc.)

## Codex File Format

```json
{
  "node": "n8n-nodes-base.nodeName",
  "nodeVersion": "1.0",
  "codexVersion": "1.0",
  "categories": ["Communication"],
  "resources": {
    "credentialDocumentation": [{ "url": "..." }],
    "primaryDocumentation": [{ "url": "..." }]
  }
}
```

Valid categories: Data & Storage, Finance & Accounting, Marketing & Content, Productivity, Miscellaneous, Sales, Development, Analytics, Communication, Utility

## Verification Guidelines

For community node verification (https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines/):
- npm package repo URL must match GitHub repo
- Package author must match between npm and repo
- Git link in npm must work and repo must be public
- License must be MIT
- Must pass: `npx @n8n/scan-community-package n8n-nodes-PACKAGE`
- Clear documentation (README, usage examples, auth details)
