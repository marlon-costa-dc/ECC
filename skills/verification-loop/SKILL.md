---
name: verification-loop
description: Use when Claude Code sessions require comprehensive verification before committing, merging, or releasing code, covering builds, types, lint, tests, security scans, and diff review.
origin: ECC
---

# Verification Loop

Run a quality gate before any commit, PR, or release.

## When to Use

- After a feature or significant change
- Before creating a PR
- After refactoring
- When a gate is suspected to be red

## Phases

| # | Phase | Command | Stop if red |
|---|---|---|---|
| 1 | Build | `npm run build` / `pnpm build` | Yes |
| 2 | Type check | `npx tsc --noEmit` / `pyright .` | Yes |
| 3 | Lint | `npm run lint` / `ruff check .` | Yes |
| 4 | Tests | `npm run test -- --coverage` | Yes |
| 5 | Security scan | `gitleaks detect`, `grep` for secrets/API keys | Yes |
| 6 | Diff review | `git diff --stat`, review every changed file | Yes |

## Report Format

```
VERIFICATION REPORT
==================
Build:     [PASS/FAIL]
Types:     [PASS/FAIL] (X errors)
Lint:      [PASS/FAIL] (X warnings)
Tests:     [PASS/FAIL] (X/Y passed, Z% coverage)
Security:  [PASS/FAIL] (X issues)
Diff:      [X files changed]
Overall:   [READY/NOT READY] for PR
```

Complements PostToolUse hooks by providing a structured final gate.
