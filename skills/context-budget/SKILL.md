---
name: context-budget
description: Audits Claude Code context window consumption across agents, skills,
  MCP servers, and rules. Identifies bloat, redundant components, and produces prioritized
  token-savings recommendations.
origin: ECC
---

# Context Budget

Analyze token overhead across every loaded component in a Claude Code session and surface actionable optimizations to reclaim context space.

## When to Use

- Session performance feels sluggish or output quality is degrading
- You've recently added many skills, agents, or MCP servers
- You want to know how much context headroom you actually have
- Planning to add more components and need to know if there's room
- Running /context-budget command (this skill backs it)

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
