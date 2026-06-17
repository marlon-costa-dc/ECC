---
name: frontend-patterns
description: 'Use this skill to use when building or reviewing React, Next.js, state
  management, performance optimization, accessibility, and UI best practices for frontend
  applications. DO NOT USE FOR: questions unrelated to frontend-patterns creating
  projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# frontend-patterns

**UTILITY SKILL**

## When to use
## What to do
1. Prefer composition; expose small, focused components.
2. Encapsulate reusable logic in custom hooks with stable references.
3. Choose state by scope: `useState` local, `useReducer`/`Context` shared, store global.
4. Fetch data with SWR/React Query or server components; keep loading/error explicit.
5. Memoize expensive computations/callbacks; lazy-load heavy routes and virtualize long lists.
6. Validate forms with Zod/yup; keep inputs controlled and wrap error-prone trees in boundaries.
7. Use Framer Motion and respect `prefers-reduced-motion`; add ARIA roles and focus restoration.

## Critical rules
- Never log/display credentials, tokens, PII, or payment data.
- Avoid third-party analytics/tracking without approval.
- Do not pass inline objects/functions to memoized children without stabilizing.

## Example
**Input:** a request.
**Output:** a concise response.

## USE FOR

- Requests about frontend patterns.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to frontend-patterns.
- creating projects or architecture from scratch.

## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.

## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
