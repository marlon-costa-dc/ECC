# Intent-Driven Development

Produce useful acceptance criteria without turning specification into ceremony. Inspect
available context first, expose genuine ambiguity, and choose verification methods that fit
the work and its risk.

## When to Activate

- User asks to clarify a feature, define acceptance criteria, or de-risk a change before implementation
- Request touches security, authentication, persistent data, migrations, external APIs, or compliance
- User wants to prepare a handoff artifact for another agent or team
- Request is ambiguous enough that the expected outcome is not yet observable or testable
- User explicitly invokes this skill with `/intent-driven-development`

Do not activate for trivial edits, straightforward one-line fixes, active debugging sessions,
code review requests, or implementation requests whose acceptance conditions are already clear.

## How It Works

1. **Inspect context first** — reads the repository, docs, schemas, and test infrastructure for technical facts before asking any question, while treating product/business constraints as something only the user or a product artifact can supply
2. **Choose depth** — selects Quick Capture (3-7 criteria, low/moderate risk) or Full Acceptance Brief (security, data, migration, cross-system changes) based on the risk profile
3. **Ask minimally** — only asks questions whose answers cannot be inferred and that materially change scope or behavior
4. **Write observable criteria** — each AC-NNN describes a starting condition, trigger, expected outcome, prohibited side effect, verification method, and priority; no vague words like "correctly" or "securely" without evidence
5. **Proceed or hand off** — for clear requests with no blocking risks, records criteria and continues; for risky changes, presents blockers and waits for confirmation
6. **Handle revision** — if an AC fails mid-implementation due to architectural constraints, marks it `[revised]`, updates scope or verification method, increments the revision number, and re-presents only the changed criteria

## Examples

**Quick Capture — "Add CSV export to the dashboard"**

[See code example 1 in `code-examples.md`]

**Full Acceptance Brief trigger — "Migrate user auth to OAuth"**

Auth change + external dependency + existing session data → Full Brief with Risk Review table,
blocking decisions on session invalidation strategy, and explicit rollback AC.

**Existing spec review — user pastes a PRD**

Skill reviews it for missing scope boundaries, unverifiable requirements ("the system shall be fast"),
and silent assumptions, then returns corrected or supplemental criteria without restarting discovery.

## Operating Rules

---

For additional details, continue reading `summary-1.md`, `summary-2.md`, `summary-3.md`.
