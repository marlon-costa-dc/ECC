---
name: network-interface-health
description: Use when diagnosing network symptoms that might be caused by a physical link, switch port, cable, transceiver, duplex setting, or congested interface, including CRCs, drops, errors, flapping, speed negotiation, and counter trends on routers, switches, and Linux hosts.
origin: community
---

# Network Interface Health

Use this skill when a network symptom might be caused by a physical link, switch port, cable, transceiver, duplex setting, or congested interface.

## When to Use

- A host or VLAN has packet loss, latency spikes, or intermittent reachability.
- A switch or router interface shows CRCs, runts, giants, drops, resets, or flaps.
- You need to compare both ends of a link before replacing hardware.
- A change window needs before/after interface counter evidence.
- Monitoring reports rising `ifInErrors`, `ifOutErrors`, or `ifOutDiscards`.

## How It Works

Interface counters are evidence, but the trend matters more than the absolute number. Capture a baseline, wait a measurement interval, capture again, then compare increments.

On IOS use `show interfaces <interface>`, `show interfaces <interface> status`, and `show logging | include <interface>|changed state|line protocol`. On Linux use `ip -s link show <interface>`, `ethtool <interface>`, and `ethtool -S <interface>`. See [references/counter-reference.md](references/counter-reference.md) for counter meanings and common causes.

## Diagnosis Flow

**CRCs or input errors**: confirm counters are incrementing, check both ends of the link, replace cable or clean/replace optics, confirm matching speed/duplex, and check logs for flap events.

**Drops**: separate input from output drops, compare rate against capacity, check QoS and queue counters, and prove congestion before tuning queues.

**Duplex and speed**: prefer auto-negotiation when both sides support it. If one side must be fixed, configure both sides explicitly. Never mix fixed speed/duplex on one side with auto on the other. Check with `show interfaces <interface> | include duplex|speed`.

## Anti-Patterns

- Clearing counters before saving a baseline.
- Looking at only one side of a link.
- Assuming all historical CRCs are active problems without a time window.
- Mixing auto-negotiation on one side with fixed speed/duplex on the other.
- Treating output drops as a cable problem before checking congestion.

## See Also

- Agent: `network-troubleshooter`
- Skill: `network-config-validation`
- Skill: `homelab-network-setup`
