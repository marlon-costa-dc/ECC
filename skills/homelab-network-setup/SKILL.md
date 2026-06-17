---
name: homelab-network-setup
description: Use when designing or redesigning a home or small-lab network, including gateway, switch, and access point roles, IP ranges, DHCP reservations, DNS naming, cabling, and common beginner mistakes.
origin: community
---

# Homelab Network Setup

Design a home or small-lab network that can grow without needing a full rebuild.

## When to Use

- Planning a new home network or replacing an ISP-router-only setup.
- Choosing gateway, switch, and access point roles.
- Designing IP ranges, DHCP scopes, static reservations, and DNS.
- Preparing for future VLANs, Pi-hole, NAS, lab servers, or VPN access.
- Troubleshooting double NAT, unstable Wi-Fi, or changing server addresses.

## Core Rules

- Separate roles: modem/ONT → gateway/router → managed switch → wired APs, servers, clients.
- Pick a gateway matching skill and feature needs: ISP router for basic, UniFi for UI, OPNsense/pfSense for flexibility, MikroTik for advanced.
- Avoid `192.168.1.0/24` when VPN is planned.
- Use `home.arpa` for local names; avoid `.local` due to mDNS/Bonjour conflict.
- Reserve DHCP addresses for anything you SSH into, monitor, or expose.
- Prefer wired AP backhaul; label cables and keep a port map.

## IP Plan Example

```text
192.168.10.0/24 trusted
192.168.20.0/24 iot
192.168.30.0/24 servers
192.168.40.0/24 guest
192.168.99.0/24 management

Gateway .1
Reserved .2-.49
DHCP .50-.240
```

## Anti-Patterns

- Double NAT without a reason or documentation.
- Using `192.168.1.0/24` when VPN access is planned.
- Dynamic addresses for NAS, Pi-hole, Home Assistant, or other service hosts.
- Flat networks with cameras, smart plugs, laptops, and servers on the same trust boundary.

## See Also

- `homelab-network-readiness`
- `homelab-vlan-segmentation`
- `homelab-pihole-dns`
- `homelab-wireguard-vpn`
- `network-interface-health`
- `network-config-validation`
