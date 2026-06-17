---
name: network-config-validation
description: Use when reviewing router and switch configuration before a change window or automation run, including checks for dangerous commands, duplicate addresses, subnet overlaps, stale references, management-plane exposure, and IOS-style security hygiene.
origin: community
---

# Network Config Validation

Use this skill to review network configuration before a change window or before an automation run touches production devices.

## When to Use

- Reviewing Cisco IOS or IOS-XE style snippets before deployment.
- Auditing generated config from scripts or templates.
- Looking for dangerous commands, duplicate IP addresses, or subnet overlaps.
- Checking whether ACLs, route-maps, prefix-lists, or line policies are referenced but not defined.
- Building lightweight pre-flight scripts for network automation.

## How It Works

Treat config validation as layered evidence, not as a complete parser. Regex checks are useful for pre-flight warnings, but final approval still needs a network engineer to review intent, platform syntax, and rollback steps.

Validate in this order: destructive commands, credential and management-plane exposure, duplicate addresses and overlapping subnets, stale references, and operational hygiene such as NTP, timestamps, logging, and banners.

## Validation Areas

**Dangerous commands**: flag `reload`, `erase startup-config|nvram|flash`, `format`, `no router bgp|ospf|eigrp`, `no interface <name>`, `aaa new-model`, and `crypto key zeroize|generate`.

**Duplicate IPs and subnet overlaps**: extract `ip address <addr> <mask>` lines per interface block, count IPs for duplicates, and test pairwise `ipaddress.ip_network.overlaps()`.

**Management plane**: parse `line vty` blocks as sections and confirm each allows SSH only, has an inbound `access-class`, and sets an explicit `exec-timeout`.

**Security hygiene**: reject default SNMP communities, SNMPv2 strings, SSH version 1, `enable password`, and local usernames with `password` instead of `secret`. Verify NTP, timestamps, logging, SNMPv3 priv group, and login banner are present.

Concrete Python helpers live in [references/api.md](references/api.md).

## Preflight Workflow

Run dangerous-command checks on the snippet, duplicate IP and overlap checks on the full candidate config, confirm every referenced ACL/route-map/prefix-list exists, confirm rollback and out-of-band access before management-plane changes, and use validation as a blocking gate before automation pushes generated config. Fail closed on dangerous commands and credentials; warn on best-practice gaps outside scope.

## Anti-Patterns

- Treating regex validation as a device parser.
- Applying generated config without a dry-run diff.
- Recommending SNMPv2 community strings as a monitoring requirement.
- Checking VTY blocks with regex that can accidentally span unrelated sections.
- Testing firewall behavior by disabling ACLs instead of reading counters/logs.

## See Also

- Agent: `network-config-reviewer`
- Agent: `network-troubleshooter`
- Skill: `network-interface-health`
