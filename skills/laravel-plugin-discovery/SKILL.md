---
name: laravel-plugin-discovery
description: "Use when finding, evaluating, or comparing Laravel packages via the LaraPlugins.io MCP server to check package health, Laravel/PHP compatibility, vendor reputation, and maintenance status."
origin: ECC
---

# Laravel Plugin Discovery

## When to Activate

- Finding Laravel packages for a specific feature (auth, permissions, admin panels, etc.).
- Checking whether a package is actively maintained.
- Verifying Laravel or PHP version compatibility.
- Assessing package health before adding it to a project.

## MCP Configuration

Add to `~/.claude.json` under `mcpServers`:

```json
"laraplugins": {
  "type": "http",
  "url": "https://laraplugins.io/mcp/plugins"
}
```

No API key is required.

## Core Workflow

1. **Search** with `SearchPluginTool` using keywords and filters.
2. **Evaluate** promising packages with `GetPluginDetailsTool`.
3. **Prefer** healthy packages from reputable vendors matching the target Laravel/PHP versions.

See [references/mcp-guide.md](references/mcp-guide.md) for tool parameters, example queries, response interpretation, filtering best practices, and common use cases.

## Related Skills

- `laravel-patterns` — Laravel architecture and patterns
- `laravel-tdd` — Test-driven development for Laravel
- `laravel-security` — Laravel security best practices
- `documentation-lookup` — General library documentation lookup via Context7
