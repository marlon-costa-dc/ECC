---
name: agent-architecture-audit
description: Use when an agent or LLM-powered application is being released to production, degrading after wrapper changes, behaving inconsistently, or producing confident wrong answers; it diagnoses wrapper regression, memory contamination, tool discipline failures, hidden repair loops, and rendering corruption across the 12-layer agent stack.
origin: oh-my-agent-check
---

# Agent Architecture Audit

Diagnostic for agent systems where wrapper layers, memory, tools, or transport silently corrupt answers.

## When to Activate

Mandatory before shipping any agent/LLM feature, when the model works in a playground but breaks in the wrapper, when behavior degrades after adding prompt/tool/memory layers, or when hidden retry/repair loops are suspected.

Do not use for general debugging (`agent-introspection-debugging`), code review (language reviewer), security scanning (`security-review`), benchmarking (`agent-eval`), or new feature work (workflow skill).

## The 12-Layer Stack

Any layer can corrupt the answer:

1. System prompt
2. Session history
3. Long-term memory
4. Distillation
5. Active recall
6. Tool selection
7. Tool execution
8. Tool interpretation
9. Answer shaping
10. Platform rendering
11. Hidden repair loops
12. Persistence

## Failure Patterns

- Wrapper regression
- Memory contamination
- Tool discipline failure
- Rendering/transport corruption
- Hidden agent layers

## Audit Workflow

1. Scope — target, entrypoints, model stack, symptoms, layers
2. Evidence — loop, router, memory admission, prompts, configs, logs
3. Failure mapping — symptom, mechanism, layer, root cause, evidence, confidence
4. Fix strategy — code-first: gate tools, remove hidden repair agents, reduce duplication, tighten memory/distillation, reduce rendering mutation, use typed JSON

## Severity

Rate findings `critical`, `high`, `medium`, or `low` (see reference for meanings and actions).

## Output

Severity-ranked findings, architecture diagnosis, ordered code-first fix plan.

## References

- Report schema, search patterns, diagnostic questions, severity guide: [references/audit-reference.md](references/audit-reference.md)
- Related: `agent-introspection-debugging`, `agent-eval`, `security-review`, `autonomous-agent-harness`, `agent-harness-construction`
