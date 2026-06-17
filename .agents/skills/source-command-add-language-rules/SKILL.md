---
name: source-command-add-language-rules
description: 'Use this skill to use when scaffolding or running the /add-language-rules
  source command for the everything-Codex repository, its language-rule pipeline,
  and validation steps. DO NOT USE FOR: questions unrelated to source-command-add-language-rules
  creating projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# source-command-add-language-rules

**UTILITY SKILL**

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

## USE FOR

- Requests about source command add language rules.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to source-command-add-language-rules.
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
