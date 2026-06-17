---
name: homelab-network-readiness
description: Use when preparing to change a home or small-lab network that mixes VLANs, local DNS filtering, firewall rules, DHCP scopes, or WireGuard-style remote access and a readiness review is needed before touching router or VPN configuration.
origin: community
---

# Homelab Network Readiness

Use this skill before changing a home or small-lab network that mixes VLANs, local DNS filtering, firewall rules, and remote VPN access. This is a planning and review skill; do not produce router, firewall, or VPN configuration unless the target platform, current topology, rollback path, console access, and maintenance window are all known.

## When to Use

- Segmenting a flat network into trusted, IoT, guest, server, or management VLANs.
- Moving DHCP clients to a local DNS resolver like Pi-hole or AdGuard Home.
- Adding WireGuard, Tailscale, OpenVPN, or router-native VPN access.
- Reviewing lockout risk for gateway, switch, AP, DNS, or VPN.
- Building a staged migration plan with validation evidence.

## Safety Rules

- Keep the first answer read-only: inventory, risks, plan, validation, and rollback.
- Do not expose gateway, DNS, SSH, NAS, or VPN management UIs to the public internet.
- Do not provide firewall/NAT/VLAN/DHCP/VPN commands without confirmed platform and rollback.
- Require console access before changing management VLANs, trunk ports, or DHCP/DNS.
- Keep a working internet fallback before pointing the whole network at a new DNS or VPN.

See [readiness reference](references/readiness-reference.md) for trust-zone planning, inventory tables, DNS filtering steps, remote-access modes, change sequence, checklist, and anti-patterns.

## Anti-Patterns

- Segmenting before knowing which ports and SSIDs carry which VLANs.
- Moving the admin workstation off the only reachable management network.
- Pointing all DHCP scopes at a Pi-hole before testing fallback DNS.
- Publishing NAS, DNS, router, or hypervisor management to the internet.

## See Also

- `homelab-network-setup`
- `homelab-vlan-segmentation`
- `homelab-pihole-dns`
- `homelab-wireguard-vpn`
- `network-config-validation`
