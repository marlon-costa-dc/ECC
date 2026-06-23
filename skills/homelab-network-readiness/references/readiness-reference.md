# Homelab Network Readiness Reference

Expanded checklists for the `homelab-network-readiness` skill.

## Required Inventory

| Area | Questions |
| --- | --- |
| Internet edge | What is the modem or ONT? Is the ISP router bridged or still routing? |
| Gateway | What routes, firewalls, handles DHCP, and terminates VPNs? |
| Switching | Which switch ports are uplinks, access ports, trunks, or unmanaged? |
| Wi-Fi | Which SSIDs map to which networks, and are APs wired or mesh? |
| Addressing | What subnets exist today, and which ranges conflict with VPN sites? |
| DNS/DHCP | Which service currently hands out leases and resolver addresses? |
| Management | How will the operator reach the gateway, switch, and AP after changes? |
| Recovery | What can be reverted locally if DNS, DHCP, VLANs, or VPN routes break? |

## Trust-Zone Plan

| Zone | Typical contents | Default policy |
| --- | --- | --- |
| Trusted | Laptops, phones, admin workstations | Reach shared services and management only when needed |
| Servers | NAS, Home Assistant, lab hosts, DNS resolver | Accept narrow inbound flows from trusted clients |
| IoT | TVs, smart plugs, cameras, speakers | Internet access plus explicit exceptions only |
| Guest | Visitor devices | Internet-only, no LAN reachability |
| Management | Gateway, switches, APs, controllers | Reachable only from trusted admin devices |
| VPN | Remote clients | Same or narrower access than trusted clients |

## DNS Filtering Readiness

1. Give the resolver a reserved address before using it in DHCP options.
2. Confirm it can resolve public DNS and local `home.arpa` names.
3. Keep the gateway or a second resolver available as a temporary fallback.
4. Test one client or one VLAN before changing every DHCP scope.
5. Document which networks may bypass filtering and why.
6. Check that blocking rules do not break captive portals, work VPNs, firmware updates, or medical/security devices.

Validation evidence:

```text
Client gets expected DHCP lease
Client receives expected DNS resolver
Public DNS lookup succeeds
Local home.arpa lookup succeeds
Blocked test domain is blocked only where intended
Gateway and DNS admin interfaces are not reachable from guest or IoT networks
```

## Remote Access Readiness

| Mode | Use when | Risk notes |
| --- | --- | --- |
| Split tunnel to one subnet | Remote admin for NAS or lab hosts | Keep route list narrow |
| Split tunnel to trusted services | Access selected apps by IP or DNS | Requires precise firewall rules |
| Full tunnel | Untrusted networks or travel | More bandwidth and DNS responsibility |
| Overlay VPN | Simpler remote access with identity controls | Still needs ACL review |

Do not recommend port forwarding until the operator confirms the VPN endpoint is patched, the forwarded port goes only to the VPN service, dynamic DNS and CGNAT status are understood, peer keys can be revoked, and logs verify connections.

## Change Sequence

1. Snapshot the current topology, IP plan, DHCP settings, DNS settings, and firewall rules.
2. Reserve infrastructure addresses for gateway, DNS, controller, APs, NAS, and VPN endpoint.
3. Create the new zone or VLAN without moving critical devices.
4. Move one test client and validate DHCP, DNS, routing, internet, and block behavior.
5. Add narrow firewall exceptions for required flows.
6. Move one low-risk device group.
7. Add VPN access with the narrowest route and firewall policy that satisfies the use case.
8. Document final state, known exceptions, and rollback commands or UI steps.

## Review Checklist

- Each network has a reason to exist and a clear trust boundary.
- No management interface is reachable from guest, IoT, or the public internet.
- DNS failure does not take down the operator's ability to recover locally.
- DHCP scope changes were tested on one client before broad rollout.
- VPN clients receive only the routes and DNS settings they need.
- Firewall rules are default-deny between zones, with named exceptions.
- The operator can still reach gateway, switch, AP, DNS, and VPN admin surfaces.
- Rollback is documented in the same vocabulary as the chosen platform UI or CLI.

## Anti-Patterns

- Segmenting networks before knowing which switch ports and SSIDs carry which VLANs.
- Moving the admin workstation off the only reachable management network.
- Pointing all DHCP scopes at a Pi-hole before testing fallback DNS.
- Publishing NAS, DNS, router, or hypervisor management directly to the internet.
- Treating VPN access as equivalent to full trusted-LAN access.
- Adding allow-all firewall rules temporarily and forgetting to remove them.
- Copying commands from another vendor or firmware version without checking syntax.
