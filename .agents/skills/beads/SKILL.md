---
name: beads
description: Use when working in a repository that uses bd or Beads for durable project task tracking, dependencies, blocker management, handoff, or shared work memory.
---

# beads

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
