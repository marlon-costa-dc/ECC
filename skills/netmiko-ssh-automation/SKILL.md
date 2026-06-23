---
name: netmiko-ssh-automation
description: Use when writing or reviewing Python Netmiko automation that connects
  to network devices over SSH and needs read-only collection, bounded batch execution,
  structured parsing, guarded configuration changes, timeouts, and safe error handling.
origin: community
---

# Netmiko SSH Automation

Use this skill for Python automation that connects to routers, switches, or firewalls with Netmiko. Keep the default path read-only; config changes require a separate change window, peer review, and rollback plan.

## When to Use

- Collecting show command output across network devices.
- Building audit scripts for interface, routing, or config evidence.
- Adding timeouts and exception handling to SSH scripts.
- Parsing command output with TextFSM when a template exists.
- Reviewing automation before it touches production devices.

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
