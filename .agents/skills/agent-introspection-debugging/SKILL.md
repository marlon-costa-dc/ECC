---
name: agent-introspection-debugging
description: Use when an AI agent fails, produces wrong outputs, or enters a hidden repair loop and you need structured capture, diagnosis, contained recovery, and introspection reports.
---

# agent-introspection-debugging

Use this skill when an agent run is failing repeatedly, burning tokens without progress, looping on the same tools, or drifting from the intended task.

## When to use

- Maximum tool-call / loop-limit failures
- Repeated retries with no forward progress
- Context overflow, prompt drift, or degraded output quality
- Filesystem / environment state mismatch
- Recoverable tool failures that need diagnosis first

## What to do

1. **Capture failure.** Record error type, message, last successful step, failed tool, repeated pattern, and environment assumptions.
2. **Diagnose root cause.** Match to a known pattern (loop, context overflow, connection error, quota exhaustion, stale state, wrong hypothesis). Decide if it is logic, state, environment, or policy failure.
3. **Apply contained recovery.** Take the smallest reversible action: stop retries, trim low-signal context, verify world state, narrow scope to one command/file/test, switch to direct observation, or escalate when blocked.
4. **Write introspection report.** Document failure, root cause, recovery action, result, token/time burn risk, follow-up, and preventive change.

## Critical rules

- Do not retry blindly; capture first, then diagnose.
- Do not claim auto-healing actions like "reset agent state" unless performed through real tools.
- Always end with evidence that the situation is better or still blocked.
- Use `verification-loop` after code changes, `continuous-learning-v2` for repeatable patterns, `council` for decision ambiguity, and `workspace-surface-audit` for conflicting local state.

## Example templates

Capture:
```markdown
## Failure Capture
- Session / task:
- Goal:
- Error:
- Last successful step:
- Failed tool:
- Repeated pattern:
- Environment assumptions:
```

Report:
```markdown
## Agent Self-Debug Report
- Session / task:
- Failure:
- Root cause:
- Recovery action:
- Result: success | partial | blocked
- Token / time burn risk:
- Follow-up needed:
- Preventive change:
```
