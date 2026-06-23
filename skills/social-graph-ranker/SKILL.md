---
name: social-graph-ranker
description: Weighted social-graph ranking for warm intro discovery, bridge scoring,
  and network gap analysis across X and LinkedIn. Use when the user wants the reusable
  graph-ranking engine itself, not the broader outreach or network-maintenance workflow
  layered on...
origin: ECC
---

# Social Graph Ranker

Canonical weighted graph-ranking layer for network-aware outreach.

## When to Use

- "who in my network is best positioned to introduce me?"
- "rank my mutuals by who can get me to these people"
- "map my graph against this ICP"
- "show me the bridge math"
- full lead generation and outbound sequencing -> use lead-intelligence
- pruning, rebalancing, and growing the network -> use connections-optimizer

## Workflow

1. Build the weighted target set.
2. Pull the user's graph from X, LinkedIn, or both.
3. Compute direct bridge scores.
4. Expand second-order candidates for the highest-value mutuals.
5. Rank by R(m).
6. Return:

For full details, examples, edge cases, and reference material, read `references/summary.md`.
