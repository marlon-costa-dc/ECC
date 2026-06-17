---
name: network-bgp-diagnostics
description: Use when diagnosing BGP sessions that are down, flapping, established
  with missing routes, or advertising unexpected prefixes, and when collecting read-only
  evidence around neighbor state, route exchange, prefix policy, AS path, and transport
  reachability.
origin: community
---

# Network BGP Diagnostics

Use this skill when a BGP session is down, flapping, established with missing routes, or advertising unexpected prefixes. The default workflow is read-only evidence collection; policy and reset actions belong in a reviewed change window.

## When to Use

- BGP neighbors are stuck in Idle, Connect, Active, OpenSent, or OpenConfirm.
- A session is Established but expected prefixes are missing.
- A route-map, prefix-list, max-prefix limit, or AS path policy may be filtering routes.
- You need before/after evidence for a BGP change.
- You are reviewing automation that parses BGP summary output.

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
