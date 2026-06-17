# Laravel Plugin Discovery: MCP Guide

## Tools

### SearchPluginTool

Search packages by keyword, health score, vendor, and version compatibility.

| Parameter | Type | Description |
|-----------|------|-------------|
| `text_search` | string | Keyword (e.g. "permission", "admin", "api") |
| `health_score` | string | `Healthy`, `Medium`, `Unhealthy`, or `Unrated` |
| `laravel_compatibility` | string | Laravel version: `"5"` through `"13"` |
| `php_compatibility` | string | PHP version: `"7.4"`, `"8.0"`, `"8.1"`, `"8.2"`, `"8.3"`, `"8.4"`, `"8.5"` |
| `vendor_filter` | string | Vendor name (e.g. "spatie", "laravel") |
| `page` | number | Page number for pagination |

### GetPluginDetailsTool

Fetch detailed metrics, readme content, and version history.

| Parameter | Type | Description |
|-----------|------|-------------|
| `package` | string | Full Composer package name (e.g. "spatie/laravel-permission") |
| `include_versions` | boolean | Include version history |

## Example Queries

Find authentication packages:

```
SearchPluginTool({
  text_search: "authentication",
  health_score: "Healthy"
})
```

Find Laravel 12 compatible admin panels:

```
SearchPluginTool({
  text_search: "admin panel",
  laravel_compatibility: "12"
})
```

Get package details:

```
GetPluginDetailsTool({
  package: "spatie/laravel-permission",
  include_versions: true
})
```

Filter by vendor:

```
SearchPluginTool({
  vendor_filter: "spatie",
  health_score: "Healthy"
})
```

Combined filter:

```
SearchPluginTool({
  text_search: "permission",
  health_score: "Healthy",
  laravel_compatibility: "12"
})
```

## Health Score Bands

| Band | Meaning |
|------|---------|
| `Healthy` | Active maintenance, recent updates |
| `Medium` | Occasional updates, may need attention |
| `Unhealthy` | Abandoned or infrequently maintained |
| `Unrated` | Not yet assessed |

Prefer `Healthy` packages for production.

## Version Notes

| Version | Notes |
|---------|-------|
| `13` | Latest Laravel |
| `12` | Current stable |
| `11` | Still widely used |
| `10` | Legacy but common |
| `5`-`9` | Deprecated |

Match the target project's Laravel version.

## Response Interpretation

### Search Results

Each result includes:

- Package name (e.g. `spatie/laravel-permission`)
- Brief description
- Health status indicator
- Laravel version support badges

### Package Details

The detailed response includes:

- **Health Score**: numeric or band indicator
- **Last Activity**: last update date
- **Laravel Support**: version compatibility matrix
- **PHP Support**: PHP version compatibility
- **Risk Score**: vendor trust indicators
- **Version History**: recent release timeline

## Common Use Cases

| Scenario | Recommended Approach |
|----------|---------------------|
| "What package for auth?" | Search "auth" with `health_score: "Healthy"` |
| "Is spatie/package maintained?" | Get details and check health score |
| "Need Laravel 12 packages" | Search with `laravel_compatibility: "12"` |
| "Find admin panel packages" | Search "admin panel" and review results |
| "Check vendor reputation" | Search by vendor, then get details |

## Best Practices

1. Always filter by health for production projects.
2. Match the target Laravel and PHP versions.
3. Prefer packages from known, reputable vendors.
4. Review `GetPluginDetailsTool` output before recommending.
5. The MCP is free; no API key is required.
