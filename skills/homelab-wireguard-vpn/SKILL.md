---
name: homelab-wireguard-vpn
description: Use when setting up a WireGuard VPN server and peers for remote access to a home network, generating keypairs, configuring split tunneling or full tunnel routing, and troubleshooting connection issues on mobile or laptop clients.
origin: community
---

# Homelab WireGuard VPN

WireGuard is a fast, modern VPN protocol for remote access to a home network. It is simpler to configure than OpenVPN and faster than most alternatives.

## When to Use

- Setting up a WireGuard server on a Raspberry Pi, Linux host, pfSense, or router.
- Generating WireGuard keypairs and writing peer config files.
- Configuring remote access from a phone or laptop to a home network.
- Explaining split tunneling versus full tunnel routing.
- Troubleshooting WireGuard connections that will not come up.
- Automating peer configuration generation for multiple clients.

## Core Rules

- Generate a unique keypair for every client device; never reuse or share keys.
- Keep private keys out of version control and chat logs; store key files with mode 600.
- Scope iptables forwarding rules to the `wg0` interface and direction; do not use a blanket `FORWARD ACCEPT`.
- Set `PersistentKeepalive = 25` on mobile clients behind NAT.
- Use split tunneling (`AllowedIPs = <home subnets>`) for mobile to avoid routing all traffic through slow home upload.
- Use DDNS if the ISP assigns a dynamic IP; store credentials in env files, not inline.

See [WireGuard reference](references/wireguard-reference.md) for server and client config examples, key-generation script, split/full tunnel modes, DDNS options, and troubleshooting steps.

## Anti-Patterns

- Storing private keys in version control or sharing them.
- Using `AllowedIPs = 0.0.0.0/0` on mobile without considering home upload speed.
- Not setting `PersistentKeepalive` on mobile clients.
- Opening port 51820 in the firewall but forgetting IP forwarding on the server.
- Sharing a keypair across multiple client devices.
- Using a broad `FORWARD ACCEPT` iptables rule.

## See Also

- `homelab-network-setup`
- `homelab-vlan-segmentation`
- `homelab-pihole-dns`
- `homelab-network-readiness`
