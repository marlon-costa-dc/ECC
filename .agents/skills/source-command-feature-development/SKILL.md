---
name: source-command-feature-development
description: 'Use this skill to use when scaffolding or running the /feature-development
  source command workflow for the everything-Codex repository, its feature pipeline,
  and acceptance gates. DO NOT USE FOR: questions unrelated to source-command-feature-development
  creating projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# source-command-feature-development

**UTILITY SKILL**

## Quando usar
- User asks to run the migrated source command `feature-development`.
- Working on feature development in `everything-Codex`.

## O que fazer
1. Read current state and identify failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for the files you touched.
4. Summarize what changed and what still needs review.

## Regras críticas
- Treat this as a scaffold, not a hard-coded script.
- Add or update tests and docs alongside the implementation.
- Update the command if the workflow evolves materially.

## Exemplo
- `/feature-development` → follow the sequence above, then report results.

## USE FOR

- Requests about source command feature development.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to source-command-feature-development.
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
