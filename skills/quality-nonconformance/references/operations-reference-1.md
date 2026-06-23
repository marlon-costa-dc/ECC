# Quality & Non-Conformance — Operations Reference

## Examples

- **Incoming inspection failure:** lot fails AQL sampling due to dimensional deviation; contain, notify supplier, find tooling-wear root cause, suspend skip-lot, issue SCAR.
- **SPC signal:** X-bar chart shows 9 consecutive points above center line; decide whether to stop the line for assignable-cause investigation.
- **Customer complaint CAPA:** automotive OEM reports field failures; build 8D, perform fault tree, identify escape point, design verification testing.

## Key Guardrails

- Human error is never a root cause; "retrain the operator" is the weakest corrective action
- Closing a CAPA at verification without validation is a common audit finding
- "In spec" is not the same as "in control"
- Do not adjust a stable process for common-cause variation

## Key Edge Cases

1. **Customer-reported field failure with no internal detection:** Check whether the inspection plan covers the actual failure mode; field failures often expose coverage gaps.
2. **Falsified supplier CoCs:** Quarantine all supplier material including WIP and finished goods; reportable event in aerospace (counterfeit prevention) and potentially medical devices.
3. **In-control SPC but rising complaints:** Process may be statistically capable but not functionally capable for the customer's assembly; collaborate on true requirements.
4. **Already-shipped non-conformance:** Extend containment to customer's stock, WIP, and downstream customers; safety-critical issues require immediate notification.
5. **CAPA addressing a symptom:** If defect recurs, restart RCA assuming the first investigation was insufficient.
6. **Multiple root causes:** Use Ishikawa or FTA to capture interactions; corrective actions must address all contributing causes.
7. **Intermittent defect:** Increase sample size and monitoring; check environmental correlations; use Gauge R&R with nested factors.
8. **Non-conformance discovered during audit:** Acknowledge, document, and treat as an NCR with formal investigation and CAPA.

## Communication Patterns

Match tone to audience:

- **Routine NCR, internal:** direct and factual
- **Management reporting:** summarize impact first, then details
- **Supplier SCAR:** professional, specific, documented, never accusatory
- **Customer notification:** lead with what you know, containment taken, customer actions needed, resolution timeline
- **Regulatory response:** factual, accountable, structured per expectation (e.g., FDA Form 483 response)

### Key Templates

- **NCR Notification (internal):** `NCR-{number}: {part_number} — {defect_summary}` — what, spec violated, quantity, containment, scope
- **SCAR to Supplier:** `SCAR-{number}: PO# {po_number} — Response Required by {date}` — part, lot, spec, data, quantity, impact, response format
- **Customer Quality Notification:** containment, traceability, recommended actions, corrective-action timeline, contact

## Escalation Protocols

| Trigger | Action | Timeline |
|---|---|---|
| Safety-critical non-conformance | Notify VP Quality and Regulatory | Within 1 hour |
| Field failure or customer complaint | Assign investigator, notify account team | Within 4 hours |
| Repeat NCR (same failure mode, 3+) | Mandatory CAPA, management review | Within 24 hours |
| Supplier falsified documentation | Quarantine all material, notify regulatory and legal | Immediately |
| Non-conformance on shipped product | Initiate customer notification, containment | Within 4 hours |
| External audit finding | Management review, response plan | Within 48 hours |
| CAPA overdue > 30 days | Escalate to Quality Director | Within 1 week |
| NCR backlog > 50 open items | Process review, resource allocation | Within 1 week |

**Escalation chain:** Quality Engineer → Supervisor (4h) → Manager (24h) → Director (48h) → VP Quality (72h+ or safety-critical)

## Performance Indicators

| Metric | Target | Red Flag |
|---|---|---|
| NCR closure time (median) | < 15 business days | > 30 business days |

> Continued in [`operations-reference-2.md`](operations-reference-2.md)
