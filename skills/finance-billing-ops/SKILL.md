---
name: finance-billing-ops
description: Use when the user needs revenue truth, pricing comparisons, duplicate-charge diagnosis, team-billing verification, or a code-backed understanding of billing behavior instead of generic payments advice.
origin: ECC
---

# Finance Billing Ops

Use this skill for operator truth: revenue state, pricing decisions, team billing, and code-backed billing behavior. Broader than `customer-billing-ops`, which is for customer remediation.

## When to Use

- User asks for Stripe sales, refunds, MRR, or recent customer activity
- User asks whether team billing, per-seat billing, or quota stacking is real in code
- User wants competitor pricing comparisons or pricing-model benchmarks
- The question mixes revenue facts with product implementation truth

## Cross-References

`customer-billing-ops` for remediation; `research-ops` for market evidence; `market-research` for pricing recommendations; `github-ops` for code/backlog truth; `verification-loop` for proving checkout or entitlement behavior.

## Guardrails

- Distinguish live data from saved snapshots
- Separate revenue fact, customer impact, code-backed product truth, and recommendation
- Do not say "per seat" unless the entitlement path enforces it
- Do not assume duplicate subscriptions imply duplicate value

## Workflow

1. **Start from fresh billing evidence.** Prefer live data; otherwise state the snapshot timestamp. Normalize paid sales, active subscriptions, failed checkouts, refunds, and disputes.
2. **Separate customer incidents from product truth.** Classify duplicate checkout, real team intent, broken self-serve, unmet value, or failed payment before asking whether team billing, seat counting, or checkout logic really exist.
3. **Inspect code-backed behavior** when needed: checkout, pricing page, entitlement calculation, seat/quota handling, installation vs usage logic, billing portal support.
4. **End with a decision and product gap.** Report snapshot, diagnosis, product truth, recommended action, and exact follow-up item.

## Output Format

```text
SNAPSHOT — timestamp / revenue / subscriptions / anomalies
CUSTOMER IMPACT — who is affected / what happened
PRODUCT TRUTH — what code does vs what the site claims
DECISION — refund / preserve / convert / no-op
PRODUCT GAP — exact follow-up item to build or fix
```

Avoid conflating failed attempts with net revenue or inferring team billing from marketing.
