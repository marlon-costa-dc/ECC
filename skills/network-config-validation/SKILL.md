---
name: network-config-validation
description: Use when reviewing router and switch configuration before a change window
  or automation run, including checks for dangerous commands, duplicate addresses,
  subnet overlaps, stale references, management-plane exposure, and IOS-style security
  hygiene.
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

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
