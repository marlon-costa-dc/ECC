---
name: source-command-feature-development
description: Use when scaffolding or running the /feature-development source command workflow for the everything-Codex repository, its feature pipeline, and acceptance gates.
---

# source-command-feature-development

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
