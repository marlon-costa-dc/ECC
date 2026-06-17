---
name: beads
description: 'Use this skill to use when working in a repository that uses bd or Beads
  for durable project task tracking, issue dependencies, blocker management, multi-session
  handoff, or shared work memory. Trigger when the user asks to find ready work, claim
  or close tasks, create follow-up work, inspect. DO NOT USE FOR: questions unrelated
  to beads creating projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# Beads

**UTILITY SKILL**

## Core CLI Workflow

1. Find work:


2. Inspect before editing:


3. Claim work atomically:


4. Create durable follow-up work when implementation reveals new tasks:


5. Close completed work:


## What Belongs In Beads

Use Beads for:

- shared project tasks
- blockers and dependencies
- discovered follow-up work
- work that must survive thread reset, compaction, or handoff
- status that another person or agent should be able to resume

Use agent-local planning tools only for the current turn's execution checklist. Do not treat them as shared project state.

## Rules

- Do not create markdown TODO files as the source of truth when Beads is available.
- Do not use `bd edit`; it opens an interactive editor. Use `bd update` flags instead.
- Prefer `--json` when parsing `bd` output programmatically.
- If hooks are installed, `bd prime` may already be injected. Run it manually when context is missing.
- Do not auto-close or mutate tasks unless the work is actually complete.

## USE FOR

- Requests about beads.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to beads.
- creating projects or architecture from scratch.

## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.

## Critical rules

- Prefer canonical sources.
- Require evidence before claiming success.

## Example

**Input:** a request.
**Output:** a concise response.

## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
