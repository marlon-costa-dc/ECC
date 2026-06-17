---
name: source-command-add-language-rules
description: 'Use this skill to workflow command scaffold for add-language-rules in
  everything-Codex. Use this skill when the user asks to run the migrated source command
  `add-language-rules`. DO NOT USE FOR: questions unrelated to source-command-add-language-rules
  creating projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# source-command-add-language-rules

**UTILITY SKILL**

Use this skill when the user asks to run the migrated source command `add-language-rules`.

## Command Template

# /add-language-rules

Use this workflow when working on **add-language-rules** in `everything-Codex`.

## Goal

Adds a new programming language to the rules system, including coding style, hooks, patterns, security, and testing guidelines.

## Common Files

- `rules/*/coding-style.md`
- `rules/*/hooks.md`
- `rules/*/patterns.md`
- `rules/*/security.md`
- `rules/*/testing.md`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create a new directory under rules/{language}/
- Add coding-style.md, hooks.md, patterns.md, security.md, and testing.md files with language-specific content
- Optionally reference or link to related skills

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.

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
