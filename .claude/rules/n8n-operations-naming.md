---
paths:
  - "nodes/**/*.ts"
  - "overrides/**/*.ts"
  - "generated/**/*.ts"
---

# n8n Operations Naming & UX Conventions

Reference: https://docs.n8n.io/integrations/creating-nodes/build/reference/ux-guidelines/

## Operation Name/Action/Description

| Property | Where shown | Case | Guidelines |
|----------|-------------|------|------------|
| `name` | Dropdown when node is open | Title Case | Don't repeat resource if visible above. Specify object if not the resource (e.g., "Get Columns" on Table resource) |
| `action` | Node selection panel | Sentence case | Include resource. Omit articles (a, an, the). OK to repeat resource here. |
| `description` | Sub-text below name in dropdown | Sentence case | Add more info than name. Use alternative wording for clarity. |

## CRUD Vocabulary

| Operation | Description template |
|-----------|---------------------|
| **Create** | Create a new `<RESOURCE>` |
| **Create or Update** | Create a new `<RESOURCE>` or update an existing one (upsert) — always a separate operation |
| **Delete** | Delete a `<RESOURCE>` permanently (use "permanently" only if true) |
| **Get** | Retrieve a `<RESOURCE>` |
| **Get Many** | Retrieve a list of `<RESOURCE>`s |
| **Update** | Update one or more `<RESOURCE>`s |
| **Clear** | Delete all the `<CHILD_ELEMENT>`s inside the `<RESOURCE>` |
| **Insert/Append** | Insert `<CHILD_ELEMENT>`(s) in a `<RESOURCE>` (use "insert" for database nodes) |

When operating on a child element (not the resource itself), **always specify the object**: e.g., "Delete Rows", "Get Record", "Get Many Records".

## Delete Operation Output

Return `{"deleted": true}` to confirm success.

## Boolean Descriptions

Start with "Whether..." (e.g., "Whether to include archived items").

## Placeholders

Start with "e.g." using camelCase for demo content:
- Image: `e.g. https://example.com/image.png`
- Email: `e.g. nathan@example.com`
- Name: `e.g. Nathan Smith`
- Search: `e.g. automation`

## Referring to Parameters in Copy

Wrap parameter/field names in single quotes: "Please fill the 'name' parameter"

## Error Messages

### Philosophy
Tell the user: (1) what happened, (2) how to solve it.

### Error Message (title)
- Include `displayName` of the triggering parameter when available
- Append `[Item X]` for item-specific errors
- Avoid words: "error", "problem", "failure", "mistake"

### Error Description (details)
- Guide users to the next step to get unstuck
- Explain what to change in node configuration
- Same word avoidance as above

## Sorting Options

For "Get Many" operations, add sorting in a dedicated collection below the "Options" collection. Follow Airtable Record:Search pattern.

## CRUD Operations to Include

Try to include for each resource: Create, Create or Update (upsert), Delete, Get, Get Many, Update.
