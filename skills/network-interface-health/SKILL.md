---
name: network-interface-health
description: Use when diagnosing network symptoms that might be caused by a physical
  link, switch port, cable, transceiver, duplex setting, or congested interface, including
  CRCs, drops, errors, flapping, speed negotiation, and counter trends on routers,
  switches, and...
origin: community
---

# Network Interface Health

Use this skill when a network symptom might be caused by a physical link, switch port, cable, transceiver, duplex setting, or congested interface.

## When to Use

- A host or VLAN has packet loss, latency spikes, or intermittent reachability.
- A switch or router interface shows CRCs, runts, giants, drops, resets, or flaps.
- You need to compare both ends of a link before replacing hardware.
- A change window needs before/after interface counter evidence.
- Monitoring reports rising ifInErrors, ifOutErrors, or ifOutDiscards.

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
