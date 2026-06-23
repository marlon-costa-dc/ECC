---
name: autonomous-agent-harness
description: Use when the user wants to turn Claude Code into a persistent autonomous agent system with scheduled operations, task queuing, persistent memory, computer use, and MCP tools as a replacement for standalone frameworks such as Hermes or AutoGPT.
origin: ECC
---

# Autonomous Agent Harness

Turn Claude Code into a persistent, self-directing agent system using only native features and MCP servers.

## Consent and Safety Boundaries

- Run autonomous or scheduled work only when explicitly requested and scoped by the user.
- Do not create schedules, recurring jobs, external actions, purchases, posts, or account changes without explicit approval.
- Prefer dry-run plans before enabling persistent behavior; document cadence, owner, stop condition, and rollback.

## When to Use

- User wants an agent that runs continuously or on a schedule.
- Setting up automated workflows that trigger periodically.
- Building a personal AI assistant that remembers context across sessions.
- User says "run this every day", "check on this regularly", "keep monitoring".
- Wants to replicate functionality from Hermes, AutoGPT, or similar autonomous agent frameworks.
- Needs computer use combined with scheduled execution.

## Workflow

1. Understand the request and confirm scope.
2. Execute the canonical workflow for this skill.
3. Report results and next steps.

For full details, examples, edge cases, and reference material, read `references/summary.md`.
