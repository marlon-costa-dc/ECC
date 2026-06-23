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

## Patterns

Open a `ConnectHandler` with explicit timeouts and handle `NetmikoAuthenticationException`, `NetmikoTimeoutException`, and `ReadTimeout`. Use `send_command()` for read-only collection, `ThreadPoolExecutor` with low `max_workers` for batches, and `use_textfsm=True` with `raise_parsing_error=False` for structured parsing. Keep raw output alongside parsed results. Use documentation-range addresses in examples; keep real inventory in an ignored local file or secrets-managed system.

Put config changes behind an explicit operator flag. In dry-run mode, print candidate commands. In apply mode, capture `show running-config` before and after, push with `send_config_set()`, and verify behavior before saving startup config. See [references/examples.md](examples.md) for concrete code.

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
