---
name: netmiko-ssh-automation
description: Use when writing or reviewing Python Netmiko automation that connects to network devices over SSH and needs read-only collection, bounded batch execution, structured parsing, guarded configuration changes, timeouts, and safe error handling.
origin: community
---

# Netmiko SSH Automation

Use this skill for Python automation that connects to routers, switches, or firewalls with Netmiko. Keep the default path read-only; config changes require a separate change window, peer review, and rollback plan.

## When to Use

- Collecting `show` command output across network devices.
- Building audit scripts for interface, routing, or config evidence.
- Adding timeouts and exception handling to SSH scripts.
- Parsing command output with TextFSM when a template exists.
- Reviewing automation before it touches production devices.

## Safety Defaults

- Start with read-only `send_command()` collection.
- Keep inventory small and explicit; never sweep address ranges.
- Use environment variables, a vault, or `getpass`; never hardcode credentials.
- Set connection, auth, banner, and command read timeouts.
- Limit concurrency so older devices are not overloaded.
- Require an explicit operator flag before `send_config_set()`.
- Do not call `save_config()` until the change is verified and approved.

## Read-Only Pattern

Open a `ConnectHandler` with `device_type`, `host`, `username`, `password`, optional `secret`, and explicit `conn_timeout`, `auth_timeout`, `banner_timeout`, and `read_timeout_override`. Handle `NetmikoAuthenticationException`, `NetmikoTimeoutException`, and `ReadTimeout`. Use `send_command()` for collection. Use documentation-range addresses in examples; keep real inventory in an ignored local file or secrets-managed system.

For batch collection, use `ThreadPoolExecutor` with low `max_workers` and return per-device results so one failure does not stop the batch. For structured parsing, pass `use_textfsm=True` with `raise_parsing_error=False`, and keep raw output alongside parsed results.

## Guarded Config

Put config changes behind an explicit operator flag such as `APPLY_NETWORK_CHANGES=1`. In dry-run mode, print candidate commands. In apply mode, capture `show running-config` before and after, push with `send_config_set()`, and verify behavior before saving startup config.

## Review Checklist

- Explicit inventory source and no credentials in source, logs, or exceptions.
- Timeouts set for connection, auth, banner, and command reads.
- Failures reported per device without stopping the whole batch.
- No broad scans or unbounded concurrency.
- Config changes behind a dry-run or explicit operator flag.
- `save_config()` separate from the initial push and tied to verification.

## Anti-Patterns

- Hardcoding passwords, enable secrets, or private keys.
- Sending config commands as the default code path.
- Running automation against a CIDR range.
- Logging full running configs without sanitization.
- Treating parser success as proof of correct device state.

## See Also

- Skill: `cisco-ios-patterns`
- Skill: `network-config-validation`
- Skill: `network-interface-health`
