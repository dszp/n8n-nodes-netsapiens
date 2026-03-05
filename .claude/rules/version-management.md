# Version Management

## Version Bump Checklist

When bumping the package version (in `package.json`), **always** update these files in the same change:

1. **`package.json`** — `"version"` field (primary source of truth)
2. **`nodes/NetSapiens/NetSapiens.node.json`** — `"nodeVersion"` field (must match `package.json` version)

Both versions must stay in sync. The codex `nodeVersion` controls how n8n's node panel displays the version.

## How to Bump

- Use `npm version patch|minor|major` or edit `package.json` manually
- Immediately update `NetSapiens.node.json` `nodeVersion` to match
- Never commit a version change in `package.json` without updating `nodeVersion`
