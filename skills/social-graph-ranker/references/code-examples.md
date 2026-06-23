# Code Examples

## Example 1

```text
B(m) = Σ_{t ∈ T} w(t) · λ^(d(m,t) - 1)
```

## Example 2

```text
B_ext(m) = B(m) + α · Σ_{m' ∈ N(m) \\ M} Σ_{t ∈ T} w(t) · λ^(d(m',t))
```

## Example 3

```text
R(m) = B_ext(m) · (1 + β · engagement(m))
```

## Example 4

```text
SOCIAL GRAPH RANKING
====================

Priority Set:
Platforms:
Decay Model:

Top Bridges
- mutual / connection
  base_score:
  extended_score:
  best_targets:
  path_summary:
  recommended_action:

Conditional Paths
- mutual / connection
  reason:
  extra hop cost:

No Warm Path
- target
  recommendation: direct outreach / fill graph gap
```
