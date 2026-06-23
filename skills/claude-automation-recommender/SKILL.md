---
name: claude-automation-recommender
description: Use when analyzing a codebase to recommend automations (MCP servers, skills, hooks, subagents). ECC fork that redirects to the canonical automation-audit-ops skill.
origin: ECC fork (supersedes external claude-automation-recommender)
---

# Claude Automation Recommender (ECC fork)

ECC-canonical entry point. Defer to the **`automation-audit-ops`** skill — the maintained ECC implementation for auditing and recommending automations (MCP servers, skills, hooks, subagents, plugins).

> Sujeito à lei no-bypass (AGENTS.md §0 / ADR-001 resolver-nunca-esconder): corrigir na raiz, verificar verde com evidência fresca, nunca mascarar/pular/adiar-como-pronto.

## When to Use

- Recommending automations or auditing a codebase's automation surface.

## Workflow

Use the `automation-audit-ops` skill. This fork exists only to keep the `claude-automation-recommender` name resolving to the ECC implementation instead of the external plugin copy.
