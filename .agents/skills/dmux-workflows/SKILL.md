---
name: dmux-workflows
description: Use when orchestrating parallel AI agent sessions with dmux, a tmux pane manager for Claude Code, Codex, OpenCode, and similar harnesses, including pane layout and sync patterns.
---

# dmux-workflows

## Quando usar
- Running multiple agent sessions in parallel
- Coordinating work across Claude Code, Codex, OpenCode, Cline, Gemini, or Qwen
- Complex tasks that benefit from divide-and-conquer parallelism
- User says "run in parallel", "split this work", "use dmux", or "multi-agent"

## O que fazer
1. **Install and start**: `npm install -g dmux` then run `dmux`
2. **Create panes**: Press `n` and enter a prompt for each independent task
3. **Run agents**: Each pane executes its own agent session concurrently
4. **Merge results**: Press `m` to pull pane output back into the main session
5. **Integrate**: Resolve conflicts, combine outputs, and commit as a single logical change

## Regras críticas
- Only parallelize independent tasks; avoid pane-to-pane dependencies
- Give each pane a distinct file or concern to reduce conflicts
- Review pane output before merging to avoid bad integration
- Use git worktrees when panes touch overlapping files
- Keep total panes under 5–6; each pane consumes full API tokens
- Prefer Claude Code Task tool or Codex multi-agent for in-process parallelism inside one session

## Exemplo
```
Pane 1: "Implement auth middleware in src/auth/"
Pane 2: "Write tests for the user service"
Pane 3: "Update API documentation for the new endpoints"

# Press m to merge all pane outputs back when done
```
