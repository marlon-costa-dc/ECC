---
name: agent-introspection-debugging
description: 'Use this skill to use when an AI agent fails, produces wrong outputs,
  or enters a hidden repair loop and you need structured capture, diagnosis, contained
  recovery, and introspection reports. DO NOT USE FOR: questions unrelated to agent-introspection-debugging
  creating projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# agent-introspection-debugging

**UTILITY SKILL**

## What to do

1. **Capture failure.** Record error type, message, last successful step, failed tool, repeated pattern, and environment assumptions.
2. **Diagnose root cause.** Match to a known pattern (loop, context overflow, connection error, quota exhaustion, stale state, wrong hypothesis). Decide if it is logic, state, environment, or policy failure.
3. **Apply contained recovery.** Take the smallest reversible action: stop retries, trim low-signal context, verify world state, narrow scope to one command/file/test, switch to direct observation, or escalate when blocked.
4. **Write introspection report.** Document failure, root cause, recovery action, result, token/time burn risk, follow-up, and preventive change.

## Critical rules

- Do not retry blindly; capture first, then diagnose.
- Do not claim auto-healing actions like "reset agent state" unless performed through real tools.
- Always end with evidence that the situation is better or still blocked.

## Example templates

Capture:

Report:

## USE FOR

- Requests about agent introspection debugging.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to agent-introspection-debugging.
- creating projects or architecture from scratch.

## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.

## Example

**Input:** a request.
**Output:** a concise response.

## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
