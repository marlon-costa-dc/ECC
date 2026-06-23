---
name: source-command-feature-development
description: 'Use this skill to workflow command scaffold for feature-development
  in everything-Codex. Use this skill when the user asks to run the migrated source
  command `feature-development`. DO NOT USE FOR: questions unrelated to source-command-feature-development
  creating projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# source-command-feature-development

**UTILITY SKILL**

Use this skill when the user asks to run the migrated source command `feature-development`.

## Command Template

# /feature-development

Use this workflow when working on **feature-development** in `everything-Codex`.

## Goal

Standard feature implementation workflow

## Common Files

- `manifests/*`
- `schemas/*`
- `**/*.test.*`
- `**/api/**`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Add feature implementation
- Add tests for feature
- Update documentation

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.

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
