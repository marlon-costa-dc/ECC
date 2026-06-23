# Returns & Reverse Logistics — Operations Reference

## Examples

- **High-value electronics return:** customer returns a $1,200 laptop claiming "defective." Inspection reveals cosmetic damage inconsistent with the claim. Grade, assess refurbishment cost vs vendor RTV recovery, and evaluate fraud flag.
- **Serial returner detection:** account shows 47% return rate across 23 orders in 6 months. Analyze pattern against fraud indicators, calculate net margin contribution, and recommend policy action.
- **Warranty claim dispute:** customer files warranty claim 11 months into a 12-month warranty; product shows signs of misuse. Build evidence package, apply exclusion criteria, and draft customer communication.

## Key Guardrails

- Recovery math, not policy alone, should drive disposition
- Fraud detection must minimize friction for legitimate customers
- Do not miss vendor RTV claim windows (often 90 days)
- Recalled products route to recall program, not standard returns

## Key Edge Cases

1. **High-value electronics with firmware wiped:** grading must look beyond clean software state to battery cycle count and use evidence.
2. **Hazmat return with improper packaging:** accepting creates regulatory liability; refusing creates CX problem. Cannot go through standard parcel shipping.
3. **Cross-border return with duty implications:** duty drawback requires documentation the customer likely lacks; shipping may exceed product value.
4. **Influencer bulk return post-content-creation:** within policy but brand value extracted; restocking complicated by public unboxing content.
5. **Warranty claim on customer-modified product:** modification may or may not void warranty for the claimed defect.
6. **Serial returner who is also high-value:** banning loses profit; accepting encourages behavior. Requires nuanced LTV-based segmentation.
7. **Return of recalled product:** route to recall program, not standard returns.
8. **Gift receipt where current price exceeds purchase price:** refund at purchase price; customer may expect shelf price.

## Communication Patterns

- **Standard refund confirmation:** warm, efficient; lead with resolution amount and timeline
- **Denial of return:** empathetic but clear; explain policy, offer alternatives, provide escalation path
- **Fraud investigation hold:** neutral, factual; "additional time to process"; never say "fraud" to customer
- **Restocking fee explanation:** transparent; explain what it covers and confirm net refund before processing
- **Vendor RTV claim:** professional, evidence-based; include defect data, photos, volumes by SKU, agreement reference

### Key Templates

- **RMA approval:** `Return Approved — Order #{order_id}` — RMA number, shipping instructions, refund timeline, condition requirements
- **Refund confirmation:** lead with amount and payment method; state business-day timeline
- **Fraud hold notice:** "Your return is being reviewed by our processing team. We expect an update within [X] business days."

## Escalation Protocols

| Trigger | Action | Timeline |
|---|---|---|
| Return value > $5,000 | Supervisor approval before refund | Before processing |
| Fraud score ≥ 80 | Hold refund, route to fraud review | Immediately |
| Simultaneous chargeback filed | Halt return processing, coordinate with payments | Within 1 hour |
| Product identified as recalled | Route to recall coordinator; do not process as return | Immediately |
| Vendor defect rate exceeds 5% for SKU | Notify merchandise and vendor management | Within 24 hours |
| Third policy exception in 12 months | Manager review before granting | Before processing |
| Suspected counterfeit in return stream | Pull, photograph, notify LP and brand protection | Immediately |
| Regulated product (pharma, hazmat, medical device) | Route to compliance | Immediately |

**Escalation chain:** Returns Associate → Team Lead (2h) → Returns Manager (8h) → Director of Operations (24h) → VP (48h+ or single item > $25K)

## Performance Indicators

| Metric | Target | Red Flag |
|---|---|---|
| Return processing time (receipt to refund) | < 48 hours | > 96 hours |
| Inspection accuracy (grade agreement on audit) | > 95% | < 88% |

> Continued in [`operations-reference-2.md`](operations-reference-2.md)
