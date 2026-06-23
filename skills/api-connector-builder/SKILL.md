---
name: api-connector-builder
description: Use when adding a new API connector, provider, or integration to a project that already has an established integration pattern, so the new surface matches the repo's existing architecture instead of inventing a second one.
origin: ECC direct-port adaptation
version: "1.0.0"
metadata:
  adrs: []
---

# API Connector Builder

Add repo-native API integrations by matching the host project's existing connector pattern.

## When to Use

- "Build a Jira connector for this project"
- "Add a Slack provider following the existing pattern"
- "Create a new integration for this API"
- "Build a plugin that matches the repo's connector style"

## Guardrails

- Do not invent a new integration architecture when the repo already has one
- Start from existing in-repo connectors, not vendor docs alone
- Do not stop at transport code if the repo expects registry wiring, tests, and docs
- Do not cargo-cult old connectors if the repo has a newer current pattern

## Workflow

1. **Learn the house style**: inspect at least 2 existing connectors and map layout, abstractions, config, retry/pagination, registry hooks, and tests
2. **Narrow the integration**: define auth flow, entities, core operations, pagination/rate limits, and webhook or polling model
3. **Build in repo-native layers**: config/schema, client/transport, mapping, entrypoint, registration, and tests
4. **Validate against the source pattern**: the new connector should look obvious in the codebase

## Reference Layouts

```text
providers/existing_provider/__init__.py, provider.py, config.py
integrations/existing/client.py, models.py, connector.py
src/integrations/existing/index.ts, client.ts, types.ts, test.ts
```

## Quality Checklist

- [ ] Matches an existing in-repo integration pattern
- [ ] Config validation exists
- [ ] Auth and error handling are explicit
- [ ] Pagination/retry behavior follows repo norms
- [ ] Registry/discovery wiring is complete
- [ ] Tests mirror the host repo's style
- [ ] Docs/examples updated if expected

## Related Skills

- `backend-patterns`, `mcp-server-patterns`, `github-ops`
