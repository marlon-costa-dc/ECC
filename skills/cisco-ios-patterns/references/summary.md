# Cisco IOS Patterns

Use this skill when reviewing Cisco IOS or IOS-XE snippets, building a change-window checklist, or explaining how to collect evidence from a router or switch without making the incident worse.

## When to Use

- Reviewing IOS or IOS-XE configuration before a planned change.
- Choosing read-only `show` commands for troubleshooting.
- Checking ACL wildcard masks and interface direction.
- Verifying that a change landed in running config and was saved intentionally.

## Operating Rules

Treat IOS examples as patterns, not paste-ready production changes. Confirm the platform, interface names, current config, rollback path, and out-of-band access before making changes on a real device.

Prefer this workflow: capture current state with read-only commands, review the exact candidate config, confirm management access cannot be locked out, apply the smallest change in a maintenance window, re-read state, compare to baseline, then save only after validation.

`running-config` is active memory. `startup-config` survives reload. Do not save a change just because a command was accepted; validate behavior first, then use `copy running-config startup-config` if approved.

## Read-Only Collection

Collect the specific section you need instead of dumping full config into a ticket when the config may contain secrets, customer names, or private topology. See [references/ios-commands.md](ios-commands.md) for the full command list, wildcard mask reference, interface hygiene example, and change-window verification commands.

## ACL Placement Review

Before applying an ACL to an interface, answer these questions:

- Which traffic direction is being filtered, `in` or `out`?
- Is management traffic sourced from a known jump host or management subnet?
- Is there an explicit permit for required routing, DNS, NTP, monitoring, or application traffic?
- Are hit counters available from a safe test source?
- Is there a rollback command and an active console or out-of-band path?

Do not test reachability by removing firewall or ACL protections. Read counters, logs, and route state first.

## Interface Hygiene

Use clear descriptions, explicit switchport mode, and documented native VLANs. On routed interfaces, confirm the mask, peer addressing, and routing process before assuming link state means forwarding is correct.

## Change-Window Verification

Use before/after checks that match the actual change. For routing changes, capture neighbor state and route tables before and after. For ACL changes, compare hit counters from a planned test source rather than relying on a generic ping.

## Anti-Patterns

- Applying a generated config without a device-specific diff.
- Saving configuration before post-change checks pass.
- Using a subnet mask where IOS expects a wildcard mask.
- Applying an ACL to the wrong interface direction.
- Troubleshooting by disabling ACLs, route policies, or authentication.
- Pasting full configs into public tools without sanitizing secrets and topology.

## See Also

- Agent: `network-config-reviewer`
- Agent: `network-troubleshooter`
- Skill: `network-config-validation`
- Skill: `network-interface-health`
