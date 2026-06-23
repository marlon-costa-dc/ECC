---
name: dmux-workflows
description: Use when the user wants to run multiple AI agent sessions in parallel across Claude Code, Codex, OpenCode, or other harnesses using the dmux tmux pane manager for multi-agent development workflows.
origin: ECC
---

# dmux Workflows

Orchestrate parallel AI agent sessions using dmux, a tmux pane manager for agent harnesses.

## When to Activate

- Running multiple agent sessions in parallel.
- Coordinating work across Claude Code, Codex, and other harnesses.
- Complex tasks that benefit from divide-and-conquer parallelism.
- User says "run in parallel", "split this work", "use dmux", or "multi-agent".

## What is dmux

dmux is a tmux-based orchestration tool that manages AI agent panes:
- Press `n` to create a new pane with a prompt.
- Press `m` to merge pane output back to the main session.
- Supports: Claude Code, Codex, OpenCode, Cline, Gemini, Qwen.

Install from [github.com/standardagents/dmux](https://github.com/standardagents/dmux).

## Quick Start

```bash
# Start dmux session
dmux

# Create agent panes (press 'n' in dmux, then type prompt)
# Pane 1: "Implement the auth middleware in src/auth/"
# Pane 2: "Write tests for the user service"
# Pane 3: "Update API documentation"

# Press 'm' to merge results back
```

## Best Practices

1. **Independent tasks only.** Don't parallelize tasks that depend on each other's output.
2. **Clear boundaries.** Each pane should work on distinct files or concerns.
3. **Merge strategically.** Review pane output before merging to avoid conflicts.
4. **Use git worktrees.** For file-conflict-prone work, use separate worktrees per pane.
5. **Resource awareness.** Each pane uses API tokens — keep total panes under 5-6.

For detailed workflow patterns, worktree integration, the ECC orchestration helper, and troubleshooting, see [references/dmux-reference.md](references/dmux-reference-1.md).
