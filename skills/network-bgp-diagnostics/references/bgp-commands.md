# BGP Diagnostics Command Reference

Command patterns referenced from [../SKILL.md](../SKILL.md).

## Read-Only Triage

Identify the neighbor, address family, VRF, and local/remote ASNs; capture summary state and last reset reason; prove reachability; check route policy references; compare advertised, received, and installed routes where supported.

```text
show bgp summary
show bgp neighbors <peer>
show ip route <peer>
show tcp brief | include <peer>|:179
show logging | include BGP|<peer>
show running-config | section router bgp
show ip prefix-list
show route-map
```

Use platform-specific address-family commands when the device uses VRFs, IPv6, VPNv4, or EVPN. Do not assume global IPv4 unicast.

## Transport Checks

```text
ping <peer> source <local-source>
traceroute <peer> source <local-source>
show ip route <peer>
show bgp neighbors <peer> | include BGP state|Last reset|Local host|Foreign host
```

If the peer is sourced from a loopback, confirm both directions route to the loopback addresses and that the neighbor config uses the expected update source. Avoid disabling ACLs or firewall policy as a diagnostic shortcut.

## Route Policy Checks

```text
show bgp neighbors <peer> advertised-routes
show bgp neighbors <peer> routes
show ip prefix-list <name>
show route-map <name>
show bgp <prefix>
```

Some platforms require additional configuration before `received-routes` is available. Do not add that configuration during incident triage unless the operator approves the change.

## AS Path And Prefix Review

```text
show bgp regexp _65001_
show bgp regexp ^65001$
show bgp <prefix>
show bgp neighbors <peer> advertised-routes | include Network|Path|<prefix>
```

Use AS-path regex carefully. `_65001_` matches AS 65001 as a token. Plain `65001` can match longer ASNs or unrelated text.
