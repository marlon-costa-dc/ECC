---
name: strategic-compact
description: Suggests manual context compaction at logical intervals to preserve context
  through task phases rather than arbitrary auto-compaction.
origin: ECC
---

# Strategic Compact Skill

Suggests manual `/compact` at strategic points in your workflow rather than relying on arbitrary auto-compaction.

## When to Use

- Running long sessions that approach context limits (200K+ tokens)
- Working on multi-phase tasks (research → plan → implement → test)
- Switching between unrelated tasks within the same session
- After completing a major milestone and starting new work
- When responses slow down or become less coherent (context pressure)

## Workflow

1. **Context size (primary)** — Reads the latest usage record from the session transcript (transcript_path in the hook payload) and sums input_tokens + cache_read_input_tokens + cache_creation_input_tokens (the true context size of the turn). Suggests /compact at a window-scaled threshold — 160k tokens on a 200k window, 250k on a 1M window (detected from a [1m] model marker, or inferred when observed tokens already exceed 200k) — and re-reminds after every additional 60k tokens of context growth
2. **Tool-call count (secondary)** — Counts tool invocations in session; suggests at a configurable threshold (default: 50 calls), then every 25 calls after

For full details, examples, edge cases, and reference material, read `references/summary.md`.
