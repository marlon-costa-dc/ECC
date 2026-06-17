---
name: ai-regression-testing
description: Use when the user needs automated regression testing for AI-assisted development workflows, including sandbox-mode API testing without database dependencies, /bug-check-style reviews, and catching systematic blind spots where the same model writes and reviews code.
origin: ECC
---

# AI Regression Testing

Testing patterns specifically designed for AI-assisted development, where the same model writes code and reviews it — creating systematic blind spots that only automated tests can catch.

## When to Use

- AI agent (Claude Code, Cursor, Codex) has modified API routes or backend logic.
- A bug was found and fixed — need to prevent re-introduction.
- Project has a sandbox/mock mode that can be leveraged for DB-free testing.
- Running /bug-check or similar review commands after code changes.
- Multiple code paths exist (sandbox vs production, feature flags, etc.).

## Workflow

1. Understand the request and confirm scope.
2. Execute the canonical workflow for this skill.
3. Report results and next steps.

For full details, examples, edge cases, and reference material, read `references/summary.md`.
