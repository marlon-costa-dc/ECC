# Local ECC Extension Layer

This directory holds **project-specific** extensions to ECC.

## What goes here

- Agents, skills, commands, hooks, rules, or MCP configs that are **specific to this repository or workflow**.
- Artifacts that are **not generic enough** for `~/.ai-hub`.

## What does NOT go here

- Generic MCP server definitions → `~/.ai-hub/mcp/registry.json`.
- Cross-project hook wrappers → `~/.ai-hub/hooks/`.
- Shared memory config → `~/.ai-hub/memory/`.
- Canonical ECC agents/skills/commands → `agents/`, `skills/`, `commands/` at repo root.

## Naming convention

Prefix every artifact with `local-` to avoid collisions with ECC core.
