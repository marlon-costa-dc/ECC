# Cisco IOS Command Reference

Command patterns referenced from [../SKILL.md](../SKILL.md).

## Read-Only Collection

Collect the specific section you need instead of dumping full config into a ticket when the config may contain secrets, customer names, or private topology.

```text
show version
show inventory
show processes cpu sorted
show memory statistics
show logging
show running-config | section line vty
show running-config | section interface
show running-config | section router bgp
show ip interface brief
show interfaces
show interfaces status
show vlan brief
show mac address-table
show spanning-tree
show ip route
show ip protocols
show ip access-lists
show route-map
show ip prefix-list
```

## Wildcard Masks

IOS ACL and many routing statements use wildcard masks, not subnet masks.

```text
Subnet mask       Wildcard mask
255.255.255.255   0.0.0.0
255.255.255.252   0.0.0.3
255.255.255.0     0.0.0.255
255.255.0.0       0.0.255.255
```

Review wildcard masks before deployment. A subnet mask accidentally used as a wildcard can match far more traffic than intended.

```text
ip access-list extended WEB-IN
  10 permit tcp 192.0.2.0 0.0.0.255 any eq 443
  999 deny ip any any log
```

Every ACL has an implicit deny at the end. Add an explicit logged deny when the operational goal includes observing misses, and confirm logging volume is safe.

## Interface Hygiene

```text
interface GigabitEthernet0/1
 description UPLINK-TO-CORE
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30
 switchport trunk native vlan 999
 no shutdown
```

Use clear descriptions, explicit switchport mode, and documented native VLANs. On routed interfaces, confirm the mask, peer addressing, and routing process before assuming link state means forwarding is correct.

## Change-Window Verification

Use before/after checks that match the actual change.

```text
show running-config | section interface GigabitEthernet0/1
show interfaces GigabitEthernet0/1
show logging | include GigabitEthernet0/1|changed state|line protocol
show ip route <prefix>
show ip access-lists <name>
```

For routing changes, also capture neighbor state and route tables before and after the change. For ACL changes, compare hit counters from a planned test source rather than relying on a generic ping.
