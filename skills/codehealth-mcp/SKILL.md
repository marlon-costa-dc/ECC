---
name: codehealth-mcp
description: Use when the user wants to review code quality, refactor a file, verify
  that AI edits did not degrade maintainability, or add a structural maintainability
  gate before a commit or pull request. Pairs with coding-standards, plankton-code-quality,
  verification-loop, and tdd-workflow.
origin: community
---

# Code Health MCP (CodeScene)

Structural maintainability feedback for AI-assisted coding. Complements style/lint skills (`coding-standards`, `plankton-code-quality`) with **design-level** health scores and regression gates.

## When to Use

- User asks to **review code quality**, **refactor** a file, or check if **AI changes degraded** maintainability
- Before editing a **hotspot**, legacy module, or unfamiliar file
- Before **commit** or **pull request** when you need a maintainability safeguard
- After a large agent-written diff — verify Code Health did not regress
- Pair with `verification-loop`, `tdd-workflow`, or `/quality-gate` as a structural check (not a replacement for tests/lint)

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
