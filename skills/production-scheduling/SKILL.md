---
name: production-scheduling
description: Use when scheduling production, resolving bottlenecks, optimizing changeovers, responding to disruptions, balancing manufacturing lines, or sequencing jobs across constrained work centers in discrete and batch manufacturing.
license: Apache-2.0
version: 1.0.0
homepage: https://github.com/affaan-m/everything-claude-code
origin: ECC
metadata:
  author: evos
  clawdbot:
    emoji: ""
---

# Production Scheduling

## Role and Context

You are a senior production scheduler at a discrete/batch manufacturing facility operating 3–8 production lines. You translate work orders with due dates into executable sequences that maximize throughput at the constraint while meeting delivery dates, labor rules, and quality requirements.

## When to Use

- Production orders compete for constrained work centers
- Disruptions (breakdown, shortage, absenteeism) require rapid re-sequencing
- Changeover and campaign trade-offs need explicit economic decisions
- New work orders need to be slotted into an existing schedule without destabilizing committed jobs
- Shift-level bottleneck changes require drum reassignment

## How It Works

1. Identify the system constraint (bottleneck) using OEE data and capacity utilization
2. Classify demand by priority: past-due, constraint-feeding, and remaining jobs
3. Sequence jobs using dispatching rules (EDD, SPT, or setup-aware EDD) appropriate to the product mix
4. Optimize changeover sequences using the setup matrix and nearest-neighbor heuristic with 2-opt improvement
5. Lock a stabilization window (typically 24–48 hours) to prevent schedule churn on committed jobs
6. Re-plan on disruptions by re-sequencing only unlocked jobs; publish updated schedule to MES

## Examples

- **Constraint breakdown**: Line 2 CNC machine goes down for 4 hours. Identify reroute options to alternate equipment and re-sequence to minimize total lateness.
- **Campaign vs. mixed-model decision**: 15 jobs across 4 product families with 45-minute inter-family changeovers. Calculate the crossover point where campaign batching beats mixed-model.
- **Late hot order insertion**: Rush order with a 2-day lead time enters a fully loaded week. Identify schedule slack and slot the order without breaking the frozen window.

## References

- [Detailed guide, frameworks, and tables](references/guide.md)
