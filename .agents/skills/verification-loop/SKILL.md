---
name: verification-loop
description: Use this skill to verify work before declaring it done. Follow the build → type → lint → test → security → diff workflow and report the result with evidence.
---

# Verification Loop

**UTILITY SKILL**

Never claim completion without fresh, objective evidence.

## USE FOR:

- Verifying a feature, fix, or refactor before opening a PR or handing off.
- Running the full gate sequence after significant changes.
- Producing a verification report with counts and exit codes.

## DO NOT USE FOR:

- Skipping gates because "it should work".
- Declaring done when any check fails or is unverified.

## INVOKES:

- Build (`npm run build`, `pnpm build`, `make docs`, etc.).
- Type check (`tsc --noEmit`, `pyright`, `mypy`).
- Lint (`npm run lint`, `ruff check .`, `make lint`).
- Tests with coverage.
- Security scan (secrets, leftover logs, exposed PII).
- `git diff --stat` for diff review.

## FOR SINGLE OPERATIONS:

If the user only asks for one check, run just that check and report it.

## Workflow

1. Build — fix before continuing.
2. Type check — fix type errors.
3. Lint — fix warnings.
4. Tests — target ≥80% coverage; report pass/fail/count.
5. Security scan — grep secrets, exposed tokens, unsafe inputs.
6. Diff review — inspect every changed file.
7. Report: `READY` only when all gates pass.

## Examples:

- "Is this ready?" → run all gates → return verification report.
- "Just run tests" → run tests → report pass/fail/coverage.

## Troubleshooting:

- Gate fails → stop, paste output, fix root cause, rerun.
- Missing tool → install or hand the exact command to the user.
- Coverage drops → add tests before declaring ready.
