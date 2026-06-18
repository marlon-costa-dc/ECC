---
name: skill-creator
description: Use when the user wants to create, build, or fork a skill. ECC fork that redirects to the canonical skill-scout (search-first) skill and the /skill-create command.
origin: ECC fork (supersedes external skill-creator)
---

# Skill Creator (ECC fork)

ECC-canonical entry point. Defer to the **`skill-scout`** skill — it searches existing local, marketplace, GitHub, and web skill sources before creating anything (search-first). To then author the skill, use the `/skill-create` command.

> Sujeito à lei no-bypass (AGENTS.md §0 / ADR-001 resolver-nunca-esconder): corrigir na raiz, verificar verde com evidência fresca, nunca mascarar/pular/adiar-como-pronto.

## When to Use

- Creating, building, forking, or finding a skill for a workflow.

## Workflow

Use `skill-scout` first (search-first), then the `/skill-create` command. This fork exists only to keep the `skill-creator` name resolving to the ECC implementation instead of the external plugin copy.
