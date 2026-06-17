### OEE — Overall Equipment Effectiveness

**Calculation:** OEE = Availability × Performance × Quality. Availability = (Planned Production Time − Downtime) / Planned Production Time. Performance = (Ideal Cycle Time × Total Pieces) / Operating Time. Quality = Good Pieces / Total Pieces. World-class OEE is 85%+; typical discrete manufacturing runs 55–65%.

**Planned vs. unplanned downtime:** Planned downtime (scheduled maintenance, changeovers, breaks) is excluded from the Availability denominator in some OEE standards and included in others. Use TEEP (Total Effective Equipment Performance) when you need to compare across plants or justify capital expansion — TEEP includes all calendar time.

**Availability losses:** Breakdowns and unplanned stops. Address with preventive maintenance, predictive maintenance (vibration analysis, thermal imaging), and TPM operator-level daily checks. Target: unplanned downtime < 5% of scheduled time.

**Performance losses:** Speed losses and micro-stops. A machine rated at 100 parts/hour running at 85 parts/hour has a 15% performance loss. Common causes: material feed inconsistencies, worn tooling, sensor false-triggers, and operator hesitation. Track actual cycle time vs. standard cycle time per job.

**Quality losses:** Scrap and rework. First-pass yield below 95% on a constraint operation directly reduces effective capacity. Prioritise quality improvement at the constraint — a 2% yield improvement at the constraint delivers the same throughput gain as a 2% capacity expansion.

### ERP/MES Interaction Patterns

**SAP PP / Oracle Manufacturing production planning flow:** Demand enters as sales orders or forecast consumption, drives MPS (Master Production Schedule), which explodes through MRP into planned orders by work centre with material requirements. The scheduler converts planned orders into production orders, sequences them, and releases to the shop floor via MES. Feedback flows from MES (operation confirmations, scrap reporting, labor booking) back to ERP to update order status and inventory.

**Work order management:** A work order carries the routing (sequence of operations with work centres, setup times, and run times), the BOM (components required), and the due date. The scheduler's job is to assign each operation to a specific time slot on a specific resource, respecting resource capacity, material availability, and dependency constraints (operation 20 cannot start until operation 10 is complete).

**Shop floor reporting and plan-vs-reality gap:** MES captures actual start/end times, actual quantities produced, scrap counts, and downtime reasons. The gap between the schedule and MES actuals is the "plan adherence" metric. Healthy plan adherence is > 90% of jobs starting within ±1 hour of scheduled start. Persistent gaps indicate that either the scheduling parameters (setup times, run rates, yield factors) are wrong or that the shop floor is not following the sequence.

**Closing the loop:** Every shift, compare scheduled vs. actual at the operation level. Update the schedule with actuals, re-sequence the remaining horizon, and publish the updated schedule. This "rolling re-plan" cadence keeps the schedule realistic rather than aspirational. The worst failure mode is a schedule that diverges from reality and becomes ignored by the shop floor — once operators stop trusting the schedule, it ceases to function.
