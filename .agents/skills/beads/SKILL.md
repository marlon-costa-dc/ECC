---
name: beads
description: 'Use this skill to use when working in a repository that uses bd or Beads
  for durable project task tracking, dependencies, blocker management, handoff, or
  shared work memory. DO NOT USE FOR: questions unrelated to beads creating projects
  or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# beads

**UTILITY SKILL**

## Quando usar
- User asks to find ready work, claim or close tasks, create follow-up work, inspect blockers, or recover project context.
- Repository uses `bd` or Beads as the durable project task system.

## O que fazer
1. Prime Beads context: `bd prime` (or `bd where` if empty).
2. Find work: `bd ready`, `bd list --status=open`, `bd list --status=in_progress`.
3. Inspect: `bd show <id>`.
4. Claim: `bd update <id> --claim`.
5. Create follow-up tasks when new work is discovered:
   ```bash
   bd create "Short title" --description="Why and what needs to be done" --type=task --priority=2
   ```
6. Close only when complete: `bd close <id> --reason="Completed"`.

## Regras críticas
- Use Beads as the shared source of truth for project work; do not create markdown TODO files when Beads is available.
- Never use `bd edit` (interactive); prefer `bd update` flags or `--json` for programmatic parsing.
- Do not auto-close or mutate tasks unless the work is actually complete.
- Keep agent-local plans scoped to the current turn; persist shared state in Beads.

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
