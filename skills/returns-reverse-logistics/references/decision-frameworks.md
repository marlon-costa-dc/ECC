# Returns & Reverse Logistics — Decision Frameworks

## Disposition Routing by Category and Condition

| Category | Grade A | Grade B | Grade C | Grade D |
|---|---|---|---|---|
| Consumer Electronics | Restock (test first) | Open box / Renewed | Refurb if ROI > 40%, else liquidate | Parts harvest or e-waste |
| Apparel | Restock if tags on | Repackage / outlet | Liquidate by weight | Textile recycling |
| Home & Furniture | Restock | Open box with discount | Liquidate (local, avoid shipping) | Donate or destroy |
| Health & Beauty | Restock if sealed | Destroy (regulation) | Destroy | Destroy |
| Books & Media | Restock | Restock (discount) | Liquidate | Recycle |
| Sporting Goods | Restock | Open box | Refurb if cost < 25% value | Parts or donate |
| Toys & Games | Restock if sealed | Open box | Liquidate | Donate (if safety-compliant) |

## Fraud Scoring Model

Score each return 0-100. Flag for review at 65+; hold refund at 80+.

| Signal | Points |
|---|---|
| Return rate > 30% (rolling 12 mo) | +15 |
| Item returned within 48 hours of delivery | +5 |
| High-value electronics, serial number mismatch | +40 |
| Return reason changed between initiation and receipt | +10 |
| Multiple returns same week | +10 |
| Return from address different from shipping address | +10 |
| Product weight differs > 5% from expected | +25 |
| Customer account < 30 days old | +10 |
| No-receipt return | +15 |
| Item in high-shrink category | +5 |

## Vendor Recovery ROI

Pursue when `(Expected credit × probability of collection) > (Labor + shipping + relationship cost)`.

- Claims > $500: always pursue
- Claims $200-500: pursue if functional RTV program and batchable
- Claims < $200: batch to threshold or offset against next PO
- Overseas vendors: raise minimum to $1,000; add 30% processing time

## Return Policy Exception Logic

Evaluate in order:

1. **Is the product defective?** Accept regardless of window or condition.
2. **Is this a high-value customer?** (top 10% by LTV) Accept; retention math favors the exception.
3. **Is the request reasonable to a neutral observer?**
4. **What is the disposition outcome?** Grade A cost is minimal; Grade C/D costs real margin.
5. **Does granting create precedent risk?** Publicized exceptions always create precedent.
