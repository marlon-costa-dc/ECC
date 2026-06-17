---
name: everything-claude-code
description: Use when working in the everything-claude-code JavaScript repository on conventions, commits, patterns, repository-specific workflows, and contributor guardrails.
---

# everything-claude-code

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
