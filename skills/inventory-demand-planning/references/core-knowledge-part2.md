### Safety Stock Calculation

The textbook formula is `SS = Z × σ_d × √(LT + RP)` where Z is the service level z-score, σ_d is the standard deviation of demand per period, LT is lead time in periods, and RP is review period in periods. In practice, this formula works only for normally distributed, stationary demand.

**Service Level Targets:** 95% service level (Z=1.65) is standard for A-items. 99% (Z=2.33) for critical/A+ items where stockout cost dwarfs holding cost. 90% (Z=1.28) is acceptable for C-items. Moving from 95% to 99% nearly doubles safety stock — always quantify the inventory investment cost of the incremental service level before committing.

**Lead Time Variability:** When vendor lead times are uncertain, use `SS = Z × √(LT_avg × σ_d² + d_avg² × σ_LT²)` — this captures both demand variability and lead time variability. Vendors with coefficient of variation (CV) on lead time > 0.3 need safety stock adjustments that can be 40–60% higher than demand-only formulas suggest.

**Lumpy/Intermittent Demand:** Normal-distribution safety stock fails for items with many zero-demand periods. Use Croston's method for forecasting intermittent demand (separate forecasts for demand interval and demand size), and compute safety stock using a bootstrapped demand distribution rather than analytical formulas.

**New Products:** No demand history means no σ_d. Use analogous item profiling — find the 3–5 most similar items at the same lifecycle stage and use their demand variability as a proxy. Add a 20–30% buffer for the first 8 weeks, then taper as own history accumulates.

### Reorder Logic

**Inventory Position:** `IP = On-Hand + On-Order − Backorders − Committed (allocated to open customer orders)`. Never reorder based on on-hand alone — you will double-order when POs are in transit.

**Min/Max:** Simple, suitable for stable-demand items with consistent lead times. Min = average demand during lead time + safety stock. Max = Min + EOQ. When IP drops to Min, order up to Max. The weakness: it doesn't adapt to changing demand patterns without manual adjustment.

**Reorder Point / EOQ:** ROP = average demand during lead time + safety stock. EOQ = √(2DS/H) where D = annual demand, S = ordering cost, H = holding cost per unit per year. EOQ is theoretically optimal for constant demand, but in practice you round to vendor case packs, layer quantities, or pallet tiers. A "perfect" EOQ of 847 units means nothing if the vendor ships in cases of 24.

**Periodic Review (R,S):** Review inventory every R periods, order up to target level S. Better when you consolidate orders to a vendor on fixed days (e.g., Tuesday orders for Thursday pickup). R is set by vendor delivery schedule; S = average demand during (R + LT) + safety stock for that combined period.

**Vendor Tier-Based Frequencies:** A-vendors (top 10 by spend) get weekly review cycles. B-vendors (next 20) get bi-weekly. C-vendors (remaining) get monthly. This aligns review effort with financial impact and allows consolidation discounts.
