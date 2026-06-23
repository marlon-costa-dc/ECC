---
name: customer-billing-ops
description: Use when the user needs to help a customer, inspect subscription state, manage refunds, triage churn, or operate revenue-impacting billing workflows through connected billing tools such as Stripe.
origin: ECC
---

# Customer Billing Ops

Use this skill for real customer operations, not generic payment API design.

## When to Use

- Customer reports billing is broken, requests a refund, or cannot cancel
- Investigating duplicate subscriptions, accidental charges, failed renewals, or churn risk
- Reviewing plan mix, active subscriptions, yearly vs monthly conversion, or team-seat confusion
- Auditing support complaints that touch subscriptions, invoices, refunds, or payment methods

## Guardrails

- Never expose secret keys, full card details, or unnecessary customer PII
- Do not refund blindly; classify the issue first
- Distinguish accidental duplicate purchase, deliberate multi-seat purchase, broken product value, failed checkout, and missing self-serve controls
- For annual plans, team plans, and prorated states, verify the contract shape before acting

## Workflow

1. **Identify the customer** from the strongest identifier: email, Stripe customer ID, subscription ID, invoice ID, or mapped support email.
2. **Classify the issue** before acting:

| Case | Typical action |
|---|---|
| Duplicate personal subscription | cancel extras, consider refund |
| Real multi-seat/team intent | preserve seats, clarify billing model |
| Failed payment / incomplete checkout | recover via portal or update payment method |
| Missing self-serve controls | provide portal, cancellation path, or invoice access |
| Product failure or trust break | refund, apologize, log product issue |

3. **Take the safest reversible action first**: restore self-serve, fix duplicate/broken state, refund only the affected charge, document, and follow up.
4. **Call out product gaps** such as missing portal, usage visibility, plan explanation, cancellation flow, or duplicate-subscription guard.
5. **Handoff**: customer state, action taken, revenue impact, follow-up text, and backlog issue.

## Output Format

```text
CUSTOMER — identifiers
BILLING STATE — subscriptions / invoices / anomalies
DECISION — classification / rationale
ACTION — refund / cancel / portal / no-op
FOLLOW-UP — customer message
PRODUCT GAP — fix item
```
