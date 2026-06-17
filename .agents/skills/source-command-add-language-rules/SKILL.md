---
name: source-command-add-language-rules
description: Use when scaffolding or running the /add-language-rules source command for the everything-Codex repository, its language-rule pipeline, and validation steps.
---

# source-command-add-language-rules

## Quando usar
- User asks to run the migrated source command `add-language-rules`.
- Adding a new programming language to the rules system in `everything-Codex`.

## O que fazer
1. Understand the current state and failure mode before editing.
2. Create or update files under `rules/{language}/` with language-specific content.
3. Make the smallest coherent change that satisfies the workflow goal.
4. Run the most relevant verification for touched files.
5. Summarize what changed and what still needs review.

## Regras críticas
- Only touch files under `rules/{language}/` (coding-style.md, hooks.md, patterns.md, security.md, testing.md).
- Treat this as a scaffold, not a hard-coded script.
- Update this skill if the workflow evolves materially.

## Exemplo (se necessário)
- Create `rules/python/coding-style.md`, `rules/python/patterns.md`, etc.
