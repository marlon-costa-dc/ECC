---
name: config-gc
description: Use when the user wants to clean up, audit, or slim down a Claude Code
  configuration by scanning skills, memory, hooks, permissions, MCP servers, and caches
  for redundant, stale, orphaned, or low-value items. Requires human confirmation before
  removing any candidate.
origin: ECC
---

# Config GC — Garbage Collection for Claude Code Setups

Borrowed from runtime garbage collection: periodically scan for objects that are no longer referenced, redundant, expired, or low-value, and reclaim the space. The critical difference: **here, collection requires a human in the loop.**

> Configs emitidos aqui ficam portáveis (${HOME}/relativo, nunca caminho absoluto); empurrar governança/self-config a repos externos exige autorização explícita do operador (AGENTS.md R10 / .ai-hub ADR-0001) — guardrail nunca contornado.

## When to Use

- The user asks to clean up, audit, or slim down their Claude Code configuration
- The user complains about too many skills, noisy hooks, or slow session startup
- A monthly/periodic config review is due
- After installing a large skill pack (e.g. this repo), to reconcile overlaps with existing setup

## Workflow

1. **Scan** all channels (or the subset the user names). Collect candidates with: path, channel, signal that flagged it, size, last-modified.
2. **Rank** by confidence (broken/orphaned = high; merely old = low) and present as a numbered table. Cap each run at ~20 candidates — GC is periodic, not exhaustive.
3. **Confirm one by one.** For each candidate show the evidence, then ask `[y/n/skip]`. The user can stop at any point.
4. **Soft-delete confirmed items**: prefer `.disabled` rename for skills/hooks and `_gc_trash/<date>/` move for files. Permission entries live in JSON (no comments possible): back up the settings file, record each removed entry verbatim in `gc_log.md`, then remove it from the `allow` array with `jq`. Only hard-delete when the user explicitly asks.
5. **Log** the run to `~/.claude/gc_log.md`: timestamp, items actioned, undo instructions.
6. **Report**: reclaimed size, channels still healthy, suggested next review date.

For full details, examples, edge cases, and reference material, read `references/summary.md`.
