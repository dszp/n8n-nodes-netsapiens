---
paths:
  - "nodes/**/*.ts"
  - "overrides/**/*.ts"
---

# n8n Node UI Standards

Reference: https://docs.n8n.io/integrations/creating-nodes/plan/node-ui-design/
UI elements reference: https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/

## Text Case Rules

| Element | Case |
|---------|------|
| Node name, Parameter names, Drop-down values, Subtitles | Title Case |
| Descriptions, Hints, Tooltips, Info boxes | Sentence case |

- Info boxes: No period for single sentence. Always use period for multiple sentences. Can include links (open in new tab).
- Tooltips: Same period rules as info boxes. Only add if it contains useful information.

## Terminology

- Use the **service's GUI terminology** (not API jargon). E.g., Notion "blocks" not "paragraphs".
- If API and GUI terms differ, prefer the GUI term. Add a hint if users may need the API term.
- Don't use technical jargon when simpler alternatives exist.
- Be consistent — pick one term (e.g., "directory" or "folder") and stick with it.

## Field Layout

### Required Fields
- Order: most important → least important, broad scope → narrow scope
- Example: Document → Page → Text to Insert

### Optional Fields
- Order alphabetically
- If a field has a default, load it with that value and explain in the description (e.g., "Defaults to false")
- Group dependent optional fields together under a single option
- Group by theme if there are many optional fields

### Showing/Hiding Fields
- Resources, operations, and required fields: displayed when node opens
- Optional fields: hidden in "Optional fields" section
- **Progressive disclosure**: hide dependent fields until their prerequisites have values
  - E.g., hide "Date to filter by" until "Filter by date" toggle is enabled

## Help Types

1. **Info boxes** (yellow): Essential information only. Don't overuse — rarity makes them stand out.
2. **Parameter hints**: Text below input field. Use when info box would be excessive.
3. **Node hints**: Help in input/output panel or node details view.
4. **Tooltips**: Appear on hover over ? icon. Don't just copy API descriptions — improve them for users.
5. **Placeholder text**: Example content in empty fields. Start with "e.g." using camelCase for demo values.

## Toggles vs Lists

- **Toggle**: When the false state is obvious (e.g., "Simplify Output?" — not simplifying is clear)
- **Dropdown list**: When the alternative is unclear (e.g., "Append?" — what happens if you don't?)

## Subtitles

Set based on main parameter values:
```ts
subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
```

## Resource Locators

- Use Resource Locator component whenever possible for selecting single items
- Default option should be "From list" (if available)
- Name field `<Record name> Name or ID` (e.g., "Workspace Name or ID")
- Tooltip: "Choose a name from the list, or specify an ID using an expression"
- Handle users providing more than needed (full URL when only ID required, absolute path when relative needed)

## IDs

Provide two ways to specify a record:
1. Pre-populated list via `loadOptions`
2. Direct ID entry

## Dates and Timestamps

Use ISO timestamp strings. Support all ISO 8601 formats.

## JSON Input

Support two input methods:
1. Typing JSON directly (parse the resulting string)
2. Using an expression that returns JSON

## Binary Data Fields

Don't use terms "binary data" or "binary property". Use descriptive names:
- "Input Data Field Name"
- "Output Data Field Name"

## Simplify Response

For endpoints returning 10+ fields, add a toggle:
- **Name**: Simplify
- **Description**: Whether to return a simplified version of the response instead of the raw data
- Select the most useful fields (max 10), sort most-used first
- In Simplify mode, flatten nested fields
