### Disruption Response

**Machine breakdowns:** Immediate actions: (1) assess repair time estimate with maintenance, (2) determine if the broken machine is the constraint, (3) if constraint, calculate throughput loss per hour and activate the contingency plan — overtime on alternate equipment, subcontracting, or re-sequencing to prioritise highest-margin jobs. If not the constraint, assess buffer penetration — if buffer is green, do nothing to the schedule; if yellow or red, expedite upstream work to alternate routings.

**Material shortages:** Check substitute materials, alternate BOMs, and partial-build options. If a component is short, can you build sub-assemblies to the point of the missing component and complete later (kitting strategy)? Escalate to purchasing for expedited delivery. Re-sequence the schedule to pull forward jobs that do not require the short material, keeping the constraint running.

**Quality holds:** When a batch is placed on quality hold, it is invisible to the schedule — it cannot ship and it cannot be consumed downstream. Immediately re-run the schedule excluding held inventory. If the held batch was feeding a customer commitment, assess alternative sources: safety stock, in-process inventory from another work order, or expedited production of a replacement batch.

**Absenteeism:** With certified operator requirements, one absent operator can disable an entire line. Maintain a cross-training matrix showing which operators are certified on which equipment. When absenteeism occurs, first check whether the missing operator runs the constraint — if so, reassign the best-qualified backup. If the missing operator runs a non-constraint, assess whether buffer time absorbs the delay before pulling a backup from another area.

**Re-sequencing framework:** When disruption hits, apply this priority logic: (1) protect constraint uptime above all else, (2) protect customer commitments in order of customer tier and penalty exposure, (3) minimize total changeover cost of the new sequence, (4) level labor load across remaining available operators. Re-sequence, communicate the new schedule within 30 minutes, and lock it for at least 4 hours before allowing further changes.

### Labor Management

**Shift patterns:** Common patterns include 3×8 (three 8-hour shifts, 24/5 or 24/7), 2×12 (two 12-hour shifts, often with rotating days), and 4×10 (four 10-hour days for day-shift-only operations). Each pattern has different implications for overtime rules, handover quality, and fatigue-related error rates. 12-hour shifts reduce handovers but increase error rates in hours 10–12. Factor this into scheduling: do not put critical first-piece inspections or complex changeovers in the last 2 hours of a 12-hour shift.

**Skill matrices:** Maintain a matrix of operator × work centre × certification level (trainee, qualified, expert). Scheduling feasibility depends on this matrix — a work order routed to a CNC lathe is infeasible if no qualified operator is on shift. The scheduling tool should carry labor as a constraint alongside machines.

**Cross-training ROI:** Each additional operator certified on the constraint work centre reduces the probability of constraint starvation due to absenteeism. Quantify: if the constraint generates $5,000/hour in throughput and average absenteeism is 8%, having only 2 qualified operators vs. 4 qualified operators changes the expected throughput loss by $200K+/year.

**Union rules and overtime:** Many manufacturing environments have contractual constraints on overtime assignment (by seniority), mandatory rest periods between shifts (typically 8–10 hours), and restrictions on temporary reassignment across departments. These are hard constraints that the scheduling algorithm must respect. Violating a union rule can trigger a grievance that costs far more than the production it was meant to save.
