---
name: click-path-audit
description: Use when the user needs to trace every user-facing button or touchpoint
  through its full state-change sequence to find bugs where functions individually work
  but cancel each other out, produce a wrong final state, or leave the UI in an inconsistent
  state.
origin: community
---

# /click-path-audit — Behavioural Flow Audit

Find bugs that static code reading misses: state interaction side effects, race conditions between sequential calls, and handlers that silently undo each other.

## When to Use

- After systematic debugging finds "no bugs" but users report broken UI
- After modifying any Zustand store action (check all callers)
- After any refactor that touches shared state
- Before release, on critical user flows
- When a button "does nothing" — this is THE tool for that

## Workflow

1. IDENTIFY the handler (onClick, onSubmit, onChange, etc.)
2. TRACE every function call in the handler, IN ORDER
3. For EACH function call:
4. CHECK: Does any later call UNDO a state change from an earlier call?
5. CHECK: Is the FINAL state what the user expects from the button label?
6. CHECK: Are there race conditions (async calls that resolve in wrong order)?

For full details, examples, edge cases, and reference material, read `references/summary.md`.
