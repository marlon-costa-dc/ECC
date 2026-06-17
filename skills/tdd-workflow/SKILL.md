---
name: tdd-workflow
description: Use when writing new features, fixing bugs, or refactoring code to enforce test-driven development with unit, integration, and end-to-end tests and at least 80% coverage.
origin: ECC
---

# TDD Workflow

Enforces test-driven development for every production change.

## When to Activate

- Writing new features, APIs, components, or functions
- Fixing bugs
- Refactoring existing code

## Core Rules

1. **Tests first.** Write or update a failing test before production code.
2. **RED must be validated.** Compile and run the test; confirm it fails for the intended reason before fixing.
3. **GREEN before refactor.** Only refactor after the test passes.
4. **Coverage ≥80%.** Unit + integration + E2E combined.
5. **Git checkpoints.** On Git repos, commit RED (`test:`), GREEN (`fix:`), and refactor (`refactor:`) stages on the current branch.

## Workflow

| Step | Action | Evidence |
|---|---|---|
| 1 | Write user journey / test case | Failing test exists |
| 2 | Validate RED | Test compiles and fails for intended reason |
| 3 | Implement minimal fix | Production code change |
| 4 | Validate GREEN | Same test target passes |
| 5 | Refactor | Tests still green |
| 6 | Verify coverage | `npm run test:coverage` ≥80% |

See [`references/tdd-reference.md`](references/tdd-reference.md) for test patterns, mocking examples, coverage config, file layout, and anti-patterns.
