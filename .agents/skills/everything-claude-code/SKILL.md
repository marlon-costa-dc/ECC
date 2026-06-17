---
name: everything-claude-code
description: 'Use this skill to use when working in the everything-claude-code JavaScript
  repository on conventions, commits, patterns, repository-specific workflows, and
  contributor guardrails. DO NOT USE FOR: questions unrelated to everything-claude-code
  creating projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# everything-claude-code

**UTILITY SKILL**

## When to use
- Making changes to this repository
- Adding new features, rules, skills, agents, or workflows
- Writing tests or commits

## What to do
1. Use Conventional Commits (`feat`, `fix`, `test`, `docs`, `chore`).
2. Follow the hybrid module organization and existing patterns.
3. Use relative imports and mixed exports.
4. Add tests for new features; aim for 80%+ coverage.
5. Handle errors with try-catch blocks and user-friendly messages.

## Critical rules
- Files and functions: `camelCase`; classes: `PascalCase`; constants: `SCREAMING_SNAKE_CASE`.
- Test files must use the `*.test.js` pattern.
- Do not skip tests for new features.
- Do not write vague commit messages.
- Do not deviate from established patterns without discussion.

## Example
```text
feat(rules): add C# language support
```

```typescript
import { Button } from '../components/Button'
```

## USE FOR

- Requests about everything claude code.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to everything-claude-code.
- creating projects or architecture from scratch.

## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.

## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
