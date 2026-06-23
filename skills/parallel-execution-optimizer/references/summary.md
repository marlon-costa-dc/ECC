# Parallel Execution Optimizer

Use this skill when speed comes from doing independent work at the same time:
repo inspection, file reads, API checks, browser checks, build/test lanes,
deploy readbacks, or multi-worktree implementation passes.

## Core Pattern

Turn urgency into a dependency graph before acting.

1. Define the objective and done signal.
2. Split work into lanes.
3. Mark each lane as parallel, sequential, or gated.
4. Run independent reads/checks together.
5. Keep writes isolated by file, worktree, branch, service, or dataset.
6. Merge only after evidence shows the lanes are compatible.
7. End with a verification table, not a vague speed claim.

## Lane Matrix

Before a large push, write a compact matrix:

[See code example 1 in `code-examples.md`]

Only run lanes in parallel when their write surfaces do not collide.

## Execution Rules

- Batch file reads, searches, status checks, and metadata queries.
- Use isolated worktrees for large unrelated implementation lanes.
- Start long-running tests, builds, backfills, and deploys in separate sessions,
  then poll them deliberately.
- If a lane discovers a blocker that changes the plan, pause dependent lanes
  and update the matrix.
- Never let a background process outlive the turn unless the user explicitly
  asked for a continuing service.
- Do not parallelize destructive commands, migrations, writes to the same table,
  or live customer-impacting deploys without an explicit gate.

## Output Shape

Use this when reporting:

[See code example 2 in `code-examples.md`]

## Failure Modes

- More concurrency that creates conflicting edits.
- Benchmarking the tool instead of the task.
- Treating "fast" as done before correctness is proven.
- Forgetting to poll running sessions.
- Hiding skipped checks behind a success summary.
