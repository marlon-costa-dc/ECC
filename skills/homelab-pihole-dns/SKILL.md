---
name: homelab-pihole-dns
description: Use when installing or managing Pi-hole as a network-wide DNS ad blocker, configuring blocklists, DNS-over-HTTPS, local DNS records, DHCP integration, or troubleshooting broken DNS resolution on a home network.
origin: community
---

# Homelab Pi-hole DNS

Pi-hole is a network-wide DNS ad blocker that runs on a Raspberry Pi or any Linux host. Every device on the network gets ad and malware domain blocking automatically without browser extensions.

## When to Use

- Installing Pi-hole on a Raspberry Pi or Linux host.
- Configuring Pi-hole as the DNS server for a home network.
- Adding or managing blocklists.
- Setting up DNS-over-HTTPS (DoH) upstream resolvers.
- Creating local DNS records (e.g., `nas.home.arpa`, `pi.home.arpa`).
- Troubleshooting devices that lose internet access after Pi-hole is installed.
- Running Pi-hole alongside or instead of DHCP.

## Core Rules

- Give Pi-hole a static IP or DHCP reservation before installing.
- Set `PIHOLE_WEBPASSWORD` via a `.env` file or secret, never inline in the compose file.
- Keep a documented router fallback for rollback during setup.
- Use `.home.arpa` for local names (RFC 8375); avoid `.local` because it conflicts with mDNS/Bonjour.
- Schedule weekly gravity updates so blocklists do not become stale.

## Rollout

1. Router DHCP method (recommended): set Pi-hole IP as primary DNS in router DHCP settings; leave secondary blank or use a second Pi-hole.
2. Per-device DNS: useful for testing before network-wide rollout.
3. Pi-hole as DHCP server: disable router DHCP first — two DHCP servers cause conflicts.

See [Pi-hole reference](references/pihole-reference.md) for Docker and bare-metal install steps, blocklist URLs, DoH setup, local DNS examples, and troubleshooting commands.

## Anti-Patterns

- Depending on one Pi-hole without a recovery path.
- Installing Pi-hole without a static IP.
- Enabling Pi-hole DHCP without disabling the router's DHCP first.
- Never updating gravity.

## See Also

- `homelab-network-setup`
- `homelab-vlan-segmentation`
- `homelab-wireguard-vpn`
- `homelab-network-readiness`
