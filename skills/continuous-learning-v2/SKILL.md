---
name: continuous-learning-v2
description: Use continuous-learning-v2 to configure hook observation, operate project-scoped instinct stores, evolve instincts into skills/commands/agents, and verify installers expose v2 as the only learning surface.
license: MIT
metadata:
  version: 2.1.0
---

# Continuous Learning v2.1

Operate ECC learning. Hooks capture signals, scoped stores isolate behaviors, and `instinct-cli.py` handles status/import/export/promote/projects/prune/evolve.
Plugin installs auto-loads the plugin `hooks/hooks.json`; if you copied observe hooks into settings.json, remove that duplicate `PreToolUse` / `PostToolUse` block.

**UTILITY SKILL:** use for learning-surface ops, not general skill writing.

## USE FOR:

- Configure/debug `PreToolUse` and `PostToolUse` observation.
- Review, import, export, promote, prune, or evolve instincts.
- Tune confidence, project/global scope, or promotion rules.
- Audit agent, package, manifest, and synthetic catalogs for v2-only exposure.

## DO NOT USE FOR:

- Skill authoring without learned instincts; use `skill-creator`.
- Personal notes or durable project memory; use repository memory/beads.
- Disabling hooks, bypassing project scope, or writing project instincts globally.

## Workflow

1. Update `bd` before non-trivial repository edits.
2. Require real project detection for project-scoped instincts.
3. Verify `hooks/hooks.json` routes observation through `scripts/hooks/observe-runner.js` to `skills/continuous-learning-v2/hooks/observe.sh`.
4. Run `skills/continuous-learning-v2/scripts/instinct-cli.py`; dry-run writes when available.
5. Keep v1 `continuous-learning` out of agent, package, install, and synthetic surfaces.
6. Validate with Waza plus focused install/manifest tests.

## Examples

- Inspect: `python3 skills/continuous-learning-v2/scripts/instinct-cli.py status`.

## Troubleshooting

Fail if the hook runner, data directory, project detector, or install-manifest SSOT is missing. Do not fall back from required project scope to global; record blockers in `bd`.

## References

- [Overview](references/summary.md)
- [Setup](references/summary-1.md)
- [Confidence](references/summary-2.md)
- [Examples](references/code-examples.md)
