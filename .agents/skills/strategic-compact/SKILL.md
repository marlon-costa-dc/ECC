---
name: strategic-compact
description: 'Use this skill to use when context usage is high and you want to trigger
  manual compaction at logical task boundaries instead of arbitrary or mid-sentence
  auto-compaction. DO NOT USE FOR: questions unrelated to strategic-compact creating
  projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# strategic-compact

**UTILITY SKILL**

## Quando usar
- Sessions approaching context limits (160k+ on 200k window, 250k+ on 1M window)
- Multi-phase tasks (research → plan → implement → test)
- Switching between unrelated tasks or after a major milestone
- Responses slowing down or losing coherence
- After a failed approach before trying a new one

## O que fazer
1. Monitor context size and tool-call count via the `suggest-compact.js` hook
2. Suggest `/compact` at logical boundaries, never mid-task
3. Persist critical state to files, memory, or TodoWrite before compacting
4. Run `/compact` with a concise summary (e.g., `/compact focus on auth middleware`)
5. Resume from surviving context (CLAUDE.md, TodoWrite, memory, git state)

## Regras críticas
- Compact AFTER exploration/planning and BEFORE executing the next phase
- NEVER compact mid-implementation where file paths and partial state are active
- Always save important context to disk or memory before invoking `/compact`
- Use window-scaled thresholds: 160k tokens for 200k windows, 250k for 1M windows
- Re-remind every additional 60k tokens or 25 tool calls after the first suggestion

## USE FOR

- Requests about strategic compact.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to strategic-compact.
- creating projects or architecture from scratch.

## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.

## Critical rules

- Prefer canonical sources.
- Require evidence before claiming success.

## Example

**Input:** a request.
**Output:** a concise response.

## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
