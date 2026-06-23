---
name: returns-reverse-logistics
description: Use when handling product returns, reverse logistics, refund decisions, return fraud detection, warranty claims, vendor recovery, or disposition routing across retail, e-commerce, and omnichannel environments.
origin: ECC
---

# Returns & Reverse Logistics

Senior returns operations expertise spanning RMA, receiving/inspection, grading, disposition, refund processing, fraud detection, vendor recovery (RTV), and warranty claims.

## When to Use

- Processing return requests and determining RMA eligibility
- Inspecting returned goods and assigning condition grades
- Routing disposition decisions (restock, refurbish, liquidate, scrap, RTV)
- Investigating return fraud patterns or policy abuse
- Managing warranty claims and vendor recovery chargebacks

## How It Works

1. Validate eligibility against policy (window, condition, category restrictions)
2. Issue RMA with prepaid label or drop-off instructions
3. Receive and inspect item; assign grade A through D
4. Route to optimal disposition channel based on recovery economics
5. Process refund or exchange; flag anomalies for fraud review
6. Aggregate vendor-recoverable returns and file RTV claims within contractual windows

## Decision Frameworks

- **Grading:** Grade A-D drives restock, open box, liquidation, salvage/parts, or destruction
- **Disposition routing:** restock as new → open box → refurbish → liquidate → donate → destroy
- **Fraud scoring:** 0-100 model; flag at 65+, hold refund at 80+
- **Vendor recovery ROI:** pursue when expected credit exceeds labor, shipping, and relationship cost
- **Exception logic:** defective → high-value customer → reasonable request → disposition cost → precedent risk

## Key Guardrails

- Recovery math, not policy alone, should drive disposition
- Fraud detection must minimize friction for legitimate customers
- Do not miss vendor RTV claim windows (often 90 days)
- Recalled products route to recall program, not standard returns

## References

- [Core Knowledge](references/core-knowledge.md): returns policy, inspection/grading, disposition, fraud detection, vendor recovery, warranty
- [Decision Frameworks](references/decision-frameworks.md): disposition routing by category, fraud scoring, vendor recovery ROI, exception logic
- [Operations Reference](references/operations-reference.md): examples, edge cases, communication templates, escalation protocols, KPIs, guardrails
