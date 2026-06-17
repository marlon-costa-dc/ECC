# Homelab VLAN Platform Configuration Reference

Platform-specific VLAN details for the `homelab-vlan-segmentation` skill.

## Design Template

| VLAN | Name | Subnet | Purpose |
| --- | --- | --- | --- |
| 10 | trusted | 192.168.10.0/24 | PCs, phones, laptops |
| 20 | iot | 192.168.20.0/24 | Smart home devices |
| 30 | servers | 192.168.30.0/24 | NAS, Pi, self-hosted |
| 40 | guest | 192.168.40.0/24 | Visitor Wi-Fi |
| 99 | management | 192.168.99.0/24 | Network gear web UIs |

## Example Topology

UniFi Dream Machine + managed switch + two APs:

- SSID "Home" → VLAN 10; SSID "IoT" → VLAN 20; SSID "Guest" → VLAN 40
- Port 1 → trunk to router (tagged 10,20,30,40,99)
- Port 2 → trunk to APs (tagged 10,20,40)
- Port 3-4 → access VLAN 30 (NAS, Pi-hole)
- Firewall: IoT → Trusted BLOCK; IoT → Servers BLOCK except Pi-hole DNS; Guest → Local BLOCK

## UniFi Configuration

Create networks under Settings → Networks:

```text
Name: IoT
Purpose: Corporate
VLAN ID: 20
Network: 192.168.20.0/24
Gateway IP: 192.168.20.1
DHCP: Enable
DHCP Range: 192.168.20.100 – 192.168.20.254
```

Map SSIDs under Settings → WiFi. Enable Guest Policy for the Guest network.

Traffic rules under Settings → Traffic & Security:

- Block IoT → Trusted
- Allow IoT → Internet
- Block Guest → Local Networks

## pfSense / OPNsense Configuration

Create VLANs under Interfaces → Assignments → VLANs, then assign each to an interface and enable it with the gateway IP.

DHCP: Services → DHCP Server → select the VLAN interface and set range and DNS.

Firewall rules on the IoT interface (top-down, first match wins):

1. Allow IoT → Pi-hole DNS (UDP/TCP, IoT net → 192.168.30.2:53)
2. Block IoT → RFC1918
3. Allow IoT → Internet

On Trusted interface: allow all. Insert specific exceptions before the RFC1918 block rule.

## MikroTik Configuration

```text
/interface bridge
add name=bridge vlan-filtering=yes

/interface bridge port
add bridge=bridge interface=ether1 frame-types=admit-only-vlan-tagged
add bridge=bridge interface=ether2 pvid=10 frame-types=admit-only-untagged-and-priority-tagged
add bridge=bridge interface=ether3 pvid=20 frame-types=admit-only-untagged-and-priority-tagged

/interface bridge vlan
add bridge=bridge tagged=ether1 untagged=ether2 vlan-ids=10
add bridge=bridge tagged=ether1 untagged=ether3 vlan-ids=20

/interface vlan
add interface=bridge name=vlan10 vlan-id=10
add interface=bridge name=vlan20 vlan-id=20

/ip address
add interface=vlan10 address=192.168.10.1/24
add interface=vlan20 address=192.168.20.1/24

/ip pool
add name=pool-trusted ranges=192.168.10.100-192.168.10.254
add name=pool-iot ranges=192.168.20.100-192.168.20.254

/ip dhcp-server
add interface=vlan10 address-pool=pool-trusted name=dhcp-trusted
add interface=vlan20 address-pool=pool-iot name=dhcp-iot

/ip dhcp-server network
add address=192.168.10.0/24 gateway=192.168.10.1
add address=192.168.20.0/24 gateway=192.168.20.1

/ip firewall filter
add chain=forward src-address=192.168.20.0/24 dst-address=192.168.10.0/24 action=drop comment="Block IoT to Trusted"
```
