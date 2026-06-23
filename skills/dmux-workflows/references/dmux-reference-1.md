# dmux Workflows Reference

Detailed workflow patterns, worktree integration, helper usage, and troubleshooting for `dmux-workflows`.

## Workflow Patterns

### Research + Implement

Split research and implementation into parallel tracks:

```
Pane 1 (Research): "Research best practices for rate limiting in Node.js.
  Check current libraries, compare approaches, and write findings to
  /tmp/rate-limit-research.md"

Pane 2 (Implement): "Implement rate limiting middleware for our Express API.
  Start with a basic token bucket, we'll refine after research completes."
```

### Multi-File Feature

Parallelize work across independent files:

```
Pane 1: "Create the database schema and migrations for the billing feature"
Pane 2: "Build the billing API endpoints in src/api/billing/"
Pane 3: "Create the billing dashboard UI components"
```

### Test + Fix Loop

Run tests in one pane, fix in another:

```
Pane 1 (Watcher): "Run the test suite in watch mode. When tests fail,
  summarize the failures."

Pane 2 (Fixer): "Fix failing tests based on the error output from pane 1"
```

### Cross-Harness

Use different AI tools for different tasks:

```
Pane 1 (Claude Code): "Review the security of the auth module"
Pane 2 (Codex): "Refactor the utility functions for performance"
Pane 3 (Claude Code): "Write E2E tests for the checkout flow"
```

### Code Review Pipeline

Parallel review perspectives:

```
Pane 1: "Review src/api/ for security vulnerabilities"
Pane 2: "Review src/api/ for performance issues"
Pane 3: "Review src/api/ for test coverage gaps"
```

## Git Worktree Integration

For tasks that touch overlapping files:

```bash
git worktree add -b feat/auth ../feature-auth HEAD
git worktree add -b feat/billing ../feature-billing HEAD

# Run agents in separate worktrees
# Pane 1: cd ../feature-auth && claude
# Pane 2: cd ../feature-billing && claude

# Merge branches when done
git merge feat/auth
git merge feat/billing
```

## Complementary Tools

- **dmux** — tmux pane management for parallel agent sessions.
- **Superset** — Terminal IDE for 10+ parallel agents.
- **Claude Code Task tool** — Programmatic parallelism within a session.
- **Codex multi-agent** — Codex-specific parallel work.

## ECC Helper

ECC includes a helper for external tmux-pane orchestration with separate git worktrees:

```bash
node scripts/orchestrate-worktrees.js plan.json --execute
```

Example `plan.json`:

```json
{
  "sessionName": "skill-audit",
  "baseRef": "HEAD",
  "launcherCommand": "codex exec --cwd {worktree_path} --task-file {task_file}",
  "workers": [
    { "name": "docs-a", "task": "Fix skills 1-4 and write handoff notes." },
    { "name": "docs-b", "task": "Fix skills 5-8 and write handoff notes." }
  ]
}
```

The helper creates one branch-backed git worktree per worker, optionally overlays `seedPaths` from the main checkout, writes per-worker `task.md`, `handoff.md`, and `status.md` files under `.orchestration/<session>/`, starts a tmux session with one pane per worker, and leaves the main pane free.

Use `seedPaths` when workers need dirty or untracked files not yet in `HEAD`:

```json
{
  "sessionName": "workflow-e2e",
  "seedPaths": [
    "scripts/orchestrate-worktrees.js",
    "scripts/lib/tmux-worktree-orchestrator.js",
    ".claude/plan/workflow-e2e-test.json"
  ],
  "launcherCommand": "bash {repo_root}/scripts/orchestrate-codex-worker.sh {task_file} {handoff_file} {status_file}",

> Continued in [`dmux-reference-2.md`](dmux-reference-2.md)
