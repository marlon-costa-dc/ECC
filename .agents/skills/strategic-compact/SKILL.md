---
name: strategic-compact
description: Use when context usage is high and you want to trigger manual compaction at logical task boundaries instead of arbitrary or mid-sentence auto-compaction.
---

# strategic-compact

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
