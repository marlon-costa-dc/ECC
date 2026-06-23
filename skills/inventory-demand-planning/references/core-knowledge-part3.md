### Promotional Planning

**Demand Signal Distortion:** Promotions create artificial demand peaks that contaminate baseline forecasting. Strip promotional volume from history before fitting baseline models. Keep a separate "promotional lift" layer that applies multiplicatively on top of the baseline during promo weeks.

**Lift Estimation Methods:** (1) Year-over-year comparison of promoted vs. non-promoted periods for the same item. (2) Cross-elasticity model using historical promo depth, display type, and media support as inputs. (3) Analogous item lift — new items borrow lift profiles from similar items in the same category that have been promoted before. Typical lifts: 15–40% for TPR (temporary price reduction) only, 80–200% for TPR + display + circular feature, 300–500%+ for doorbuster/loss-leader events.

**Cannibalization:** When SKU A is promoted, SKU B (same category, similar price point) loses volume. Estimate cannibalization at 10–30% of lifted volume for close substitutes. Ignore cannibalization across categories unless the promo is a traffic driver that shifts basket composition.

**Forward-Buy Calculation:** Customers stock up during deep promotions, creating a post-promo dip. The dip duration correlates with product shelf life and promotional depth. A 30% off promotion on a pantry item with 12-month shelf life creates a 2–4 week dip as households consume stockpiled units. A 15% off promotion on a perishable produces almost no dip.

**Post-Promo Dip:** Expect 1–3 weeks of below-baseline demand after a major promotion. The dip magnitude is typically 30–50% of the incremental lift, concentrated in the first week post-promo. Failing to forecast the dip leads to excess inventory and markdowns.

### ABC/XYZ Classification

**ABC (Value):** A = top 20% of SKUs driving 80% of revenue/margin. B = next 30% driving 15%. C = bottom 50% driving 5%. Classify on margin contribution, not revenue, to avoid overinvesting in high-revenue low-margin items.

**XYZ (Predictability):** X = CV of demand < 0.5 (highly predictable). Y = CV 0.5–1.0 (moderately predictable). Z = CV > 1.0 (erratic/lumpy). Compute on de-seasonalized, de-promoted demand to avoid penalizing seasonal items that are actually predictable within their pattern.

**Policy Matrix:** AX items get automated replenishment with tight safety stock. AZ items need human review every cycle — they're high-value but erratic. CX items get automated replenishment with generous review periods. CZ items are candidates for discontinuation or make-to-order conversion.

### Seasonal Transition Management

**Buy Timing:** Seasonal buys (e.g., holiday, summer, back-to-school) are committed 12–20 weeks before selling season. Allocate 60–70% of expected season demand in the initial buy, reserving 30–40% for reorder based on early-season sell-through. This "open-to-buy" reserve is your hedge against forecast error.

**Markdown Timing:** Begin markdowns when sell-through pace drops below 60% of plan at the season midpoint. Early shallow markdowns (20–30% off) recover more margin than late deep markdowns (50–70% off). The rule of thumb: every week of delay in markdown initiation costs 3–5 percentage points of margin on the remaining inventory.

**Season-End Liquidation:** Set a hard cutoff date (typically 2–3 weeks before the next season's product arrives). Everything remaining at cutoff goes to outlet, liquidator, or donation. Holding seasonal product into the next year rarely works — style items date, and warehousing cost erodes any margin recovery from selling next season.
