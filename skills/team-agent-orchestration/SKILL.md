---
name: team-agent-orchestration
description: Run team-based orchestration for agent squads using work items, ownership,
  agent Kanban, merge gates, and control pane handoffs.
origin: ECC
---

# Team Agent Orchestration

Use this skill when agents are being managed like a team rather than a single assistant. The purpose is to make team-based orchestration reliable: clear work items, explicit ownership, agent Kanban state, branch isolation, control pane...

## When to Use

- The task spans multiple agents, tools, harnesses, branches, or worktrees.
- The user mentions team orchestration, agent Kanban, squad, conductor, control pane, manager, desktop app, Zellij, tmux, Hermes, Devin, Codex, Claude Code, or multi-agent work.
- A project needs shared workflow state across people and agents.
- Existing agent fan-out is producing output but not mergeable product.

## Workflow

1. Put the task-local harness under the card owner.
2. Store inputs and outputs on the card.
3. Require an eval before moving from Running to Review.
4. Promote the harness to a shared skill only after repeat use.

For full details, examples, edge cases, and reference material, read `references/summary.md`.
