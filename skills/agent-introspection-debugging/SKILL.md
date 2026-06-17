---
name: agent-introspection-debugging
description: Use when an agent run is failing repeatedly, burning tokens without progress, looping on the same tools, drifting from the intended task, or hitting context growth and prompt drift, so the failure is captured, diagnosed, recovered with a small reversible action, and reported.
origin: ECC
---

# Agent Introspection Debugging

Structured self-debugging for agent runtime failures: capture, diagnose, recover, report.

## When to Activate

- Maximum tool call / loop-limit failures
- Repeated retries with no forward progress
- Context growth or prompt drift degrading output
- Environment state mismatch vs. expectation
- Recoverable tool failures that need diagnosis first

Do not use for feature verification (`verification-loop`), framework-specific debugging when a narrower skill exists, or runtime promises the harness cannot enforce.

## Four-Phase Loop

1. **Failure Capture** — record error, last tool calls, active goal, repeated pattern, context pressure, environment assumptions
2. **Root-Cause Diagnosis** — match to a known pattern before changing anything; ask whether it is logic/state/environment/policy and what the smallest reversible validation is
3. **Contained Recovery** — stop blind retries, trim low-signal context, re-check filesystem/branch/process state, narrow scope to one command/file/test, switch to direct observation, or escalate
4. **Introspection Report** — document failure, root cause, action, result, burn risk, follow-up, and preventive change

## Recovery Heuristics

1. Restate the real objective
2. Verify world state instead of trusting memory
3. Shrink the failing scope
4. Run one discriminating check
5. Only then retry

## Integration with ECC

- `verification-loop` after recovery if code changed
- `continuous-learning-v2` when the pattern should become an instinct/skill
- `council` for decision ambiguity
- `workspace-surface-audit` for conflicting local state or repo drift

## Output Standard

Always provide the failure pattern, root-cause hypothesis, recovery action, and evidence that the situation is now better or still blocked.

## References

- Capture/diagnosis/report templates and pattern table: [references/debugging-reference.md](references/debugging-reference.md)
