---
name: product-capability
description: Translate PRD intent, roadmap asks, or product discussions into an implementation-ready capability plan that exposes constraints, invariants, interfaces, and unresolved decisions before multi-service work starts.
---

# product-capability

## Quando usar
- A PRD, roadmap item, or product discussion exists but implementation constraints remain implicit.
- A feature crosses services, repos, or teams and needs a capability contract before coding.
- Architecture, data, lifecycle, or policy implications are still fuzzy despite clear product intent.
- Senior engineers keep restating hidden assumptions during review.
- You need a durable, harness-agnostic artifact that survives across sessions.

## O que fazer
1. **Restate the capability.** One sentence: who, what new capability exists, what outcome changes.
2. **Resolve constraints.** Business rules, scope, invariants, trust boundaries, data ownership, lifecycle, rollout, failure/recovery.
3. **Define the implementation contract.** SRS-style plan: summary, non-goals, actors/surfaces, states/transitions, interfaces, data, constraints, observability, open questions.
4. **Translate into execution.** Declare handoff state: ready, needs review, or needs clarification.
5. **Persist.** Update `PRODUCT.md`, `docs/product/`, or program-spec; create from template if none exists.

## Regras críticas
- Do not invent product truth; mark unresolved questions explicitly.
- Separate user-visible promises from implementation details.
- Call out fixed policy, architecture preference, or open items.
- Flag conflicts with repo constraints instead of smoothing over.
- Prefer one reusable artifact over scattered notes.

## Exemplo
```text
CAPABILITY: Operators schedule recurring compliance reports by email/webhook.
CONSTRAINTS: UTC generation, tenant timezone delivery, 90-day retention.
CONTRACT: Actors (operator, scheduler, generator, delivery), surfaces (UI, API, email/webhook), states (draft→scheduled→running→delivered/failed), data (schedule, run log, receipt).
NON-GOALS: Real-time streaming, custom templates.
OPEN QUESTIONS: Webhook retry/dead-letter.
HANDOFF: Needs architecture review on scheduler reliability.
```
