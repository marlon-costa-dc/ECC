---
name: intent-driven-development
description: Turn ambiguous or high-impact product and engineering changes into scoped,
  verifiable acceptance criteria before or alongside implementation. Use when a user
  asks to clarify a feature, define acceptance criteria, de-risk a...
---

# Intent-Driven Development

Produce useful acceptance criteria without turning specification into ceremony. Inspect available context first, expose genuine ambiguity, and choose verification methods that fit the work and its risk.

## When to Use

- User asks to clarify a feature, define acceptance criteria, or de-risk a change before implementation
- Request touches security, authentication, persistent data, migrations, external APIs, or compliance
- User wants to prepare a handoff artifact for another agent or team
- Request is ambiguous enough that the expected outcome is not yet observable or testable
- User explicitly invokes this skill with /intent-driven-development

## Workflow

1. **Inspect context first** — reads the repository, docs, schemas, and test infrastructure for technical facts before asking any question, while treating product/business constraints as something only the user or a product artifact can supply
2. **Choose depth** — selects Quick Capture (3-7 criteria, low/moderate risk) or Full Acceptance Brief (security, data, migration, cross-system changes) based on the risk profile
3. **Ask minimally** — only asks questions whose answers cannot be inferred and that materially change scope or behavior
4. **Write observable criteria** — each AC-NNN describes a starting condition, trigger, expected outcome, prohibited side effect, verification method, and priority; no vague words like "correctly" or "securely" without evidence
5. **Proceed or hand off** — for clear requests with no blocking risks, records criteria and continues; for risky changes, presents blockers and waits for confirmation
6. **Handle revision** — if an AC fails mid-implementation due to architectural constraints, marks it [revised], updates scope or verification method, increments the revision number, and re-presents only the changed criteria

For full details, examples, edge cases, and reference material, read `references/summary.md`.
