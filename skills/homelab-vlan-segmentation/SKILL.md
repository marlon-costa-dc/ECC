---
name: homelab-vlan-segmentation
description: Use when segmenting a home network into isolated VLANs for IoT, guest, trusted, and server traffic using UniFi, pfSense, OPNsense, or MikroTik, including switch trunk configuration, firewall rules, and wireless SSID mapping.
origin: community
---

# Homelab VLAN Segmentation

Split a home network into isolated VLANs so IoT devices, guests, and trusted PCs cannot talk to each other. VLANs add isolation only if firewall rules are added immediately after the VLANs are created.

## When to Use

- Setting up VLANs on a home network for the first time.
- Isolating IoT devices from trusted devices.
- Creating a guest Wi-Fi network that cannot reach home devices.
- Explaining how VLANs work to someone unfamiliar with the concept.
- Configuring trunk ports, access ports, and SSID-to-VLAN mapping.
- Troubleshooting inter-VLAN routing or firewall rule issues.

## Core Rules

- Add explicit block rules immediately after creating VLANs; inter-VLAN routing is open by default.
- Put DNS services in the Servers VLAN and allow port 53 from all VLANs before any RFC1918 block.
- Use a dedicated unused native VLAN (e.g., 999); do not let untagged traffic land in management.
- Use different Wi-Fi passwords per SSID.
- Test isolation after every rule change.
- Document VLAN ID, name, and subnet.

## Port Behavior

- Trunk: multiple VLANs tagged; switch-to-switch, switch-to-router, switch-to-AP.
- Access: one VLAN untagged; end devices.
- AP ports are trunks.

See [VLAN platform configuration reference](references/vlan-platform-configs.md) for design template, UniFi/pfSense/OPNsense/MikroTik steps, and firewall rules.

## Anti-Patterns

- Creating VLANs without adding firewall rules.
- Putting Pi-hole in the IoT VLAN.
- Using the management VLAN as native VLAN.
- Using the same Wi-Fi password for IoT and trusted SSIDs.
- Changing trunk ports or management VLANs without confirmed console access.

## See Also

- `homelab-network-setup`
- `homelab-pihole-dns`
- `homelab-wireguard-vpn`
- `homelab-network-readiness`
- `network-config-validation`
