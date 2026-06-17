---
name: dynamic-workflow-mode
description: "Use when the user wants to design a temporary Claude dynamic-workflow harness or extract a repeatable adaptive-agent pattern into a reusable skill, including eval gates, control-pane checkpoints, and safe handoff artifacts."
origin: ECC
---

# Dynamic Workflow Mode

Use this skill when a coding agent should generate a task-local harness instead of following a static command flow. The goal is disciplined temporary harnesses, shared skill extraction, and observable checkpoints.

## When To Activate

- The user mentions dynamic workflows, custom/adaptive harnesses, harness-per-task, or Claude Code dynamic workflow mode.
- A task needs a custom loop, evaluator, crawler, fixture generator, watcher, or dashboard.
- Multiple agents need a repeatable process not yet captured as a skill.
- A workflow needs durable handoff artifacts, eval evidence, operator approval.

## Core Contract

Build a task-local harness only when it is cheaper and safer than manual steps. Define objective, inputs, outputs, eval, and handoff.

## Decision Tree

1. One-shot: keep inline.
2. Repeated with changing inputs: task-local harness.
3. Repeated across teammates or repos: extract to a shared skill.
4. External state, queueing, or approvals: add control-pane visibility first.
5. Safety risk: add eval and human merge gate before autonomous execution.

## Shared Skill Extraction

Promote a harness to a skill when at least two are true: it appears in multiple sessions/repos/teams; needs specific language, tool, or safety sequencing; failures repeat because operators skip gates; has a stable input/output contract; benefits from a control pane or team handoff. Write `skills/<name>/SKILL.md` first; add command shims only for legacy slash-entry surfaces.

## Control Pane Checkpoints

Record checkpoints when a task spans more than one session: plan, queue, run, gate, handoff. Prefer the ECC control pane or state-store scripts over untracked notes.

## Eval Gates

Every harness needs a pass/fail check tied to the outcome. Choose the cheapest reliable gate: code tests, UI smoke, agent fixture, research brief, or integration dry-run. Do not claim reusability until another teammate can rerun the eval.

## References

- Harness template, eval-gate table, and anti-patterns: [references/dynamic-workflow-mode-reference.md](references/dynamic-workflow-mode-reference.md)
