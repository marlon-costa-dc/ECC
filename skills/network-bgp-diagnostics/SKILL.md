---
name: network-bgp-diagnostics
description: Use when diagnosing BGP sessions that are down, flapping, established with missing routes, or advertising unexpected prefixes, and when collecting read-only evidence around neighbor state, route exchange, prefix policy, AS path, and transport reachability.
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

## Read-Only Triage Flow

1. Identify the neighbor, address family, VRF, and local/remote ASNs.
2. Capture summary state and last reset reason with `show bgp summary` and `show bgp neighbors <peer>`.
3. Prove reachability to the peer source address with `ping`/`traceroute` sourced from the update source and `show ip route <peer>`.
4. Check route policy references with `show ip prefix-list`, `show route-map`, and `show running-config | section router bgp`.
5. Compare advertised, received, and installed routes where supported with `show bgp neighbors <peer> advertised-routes` and `show bgp neighbors <peer> routes`.

Use platform-specific address-family commands when the device uses VRFs, IPv6, VPNv4, or EVPN. Do not assume global IPv4 unicast. Some platforms require extra configuration before `received-routes` is available; do not add that during incident triage unless approved.

## State Interpretation

- **Established with prefixes**: inspect policy and table selection.
- **Established, zero prefixes**: check inbound policy, max-prefix, advertised routes, and AFI/SAFI.
- **Active**: TCP not completing; check routing, source, ACLs, and reachability.
- **Connect**: TCP in progress; check path and remote listener.
- **OpenSent/OpenConfirm**: TCP works; check ASN, auth, timers, capabilities, and logs.
- **Idle**: neighbor disabled, missing config, blocked by policy, or in backoff.

## Transport And Policy Checks

If the peer is sourced from a loopback, confirm both directions route to the loopback addresses and that the neighbor config uses the expected update source. Avoid disabling ACLs or firewall policy as a diagnostic shortcut. Read `show bgp neighbors <peer> | include BGP state|Last reset|Local host|Foreign host`, `show tcp brief | include <peer>|:179`, and `show logging | include BGP|<peer>`.

## AS Path And Prefix Review

Use `show bgp regexp _65001_`, `show bgp regexp ^65001$`, `show bgp <prefix>`, and `show bgp neighbors <peer> advertised-routes | include Network|Path|<prefix>`. Use AS-path regex carefully: `_65001_` matches AS 65001 as a token, while plain `65001` can match longer ASNs or unrelated text.

## Change-Window Only

These actions can affect routing and should not be suggested as automatic diagnostics:

- Clearing a BGP session.
- Changing neighbor authentication, timers, update source, route-maps, or prefix-lists.
- Enabling additional received-route storage.
- Relaxing firewall, ACL, or control-plane policy.

If a reset is approved, prefer the least disruptive soft or route-refresh option and document exactly why it is safe.

## Anti-Patterns

- Assuming `Active` always means the remote side is down.
- Ignoring VRF, address family, or update-source differences.
- Using broad AS-path regex without token boundaries.
- Hard-resetting a peer before reading last reset reason and logs.
- Treating missing `received-routes` output as proof that no routes arrived.

## See Also

- Skill: `cisco-ios-patterns`
- Skill: `network-config-validation`
- Skill: `network-interface-health`
