# Parallel via worktrees
continuous-claude --prompt "Add tests" --max-runs 5 --worktree tests-worker &
continuous-claude --prompt "Refactor code" --max-runs 5 --worktree refactor-worker &
wait
```

### Cross-Iteration Context: SHARED_TASK_NOTES.md

The critical innovation: a `SHARED_TASK_NOTES.md` file persists across iterations:

```markdown
## Progress
- [x] Added tests for auth module (iteration 1)
- [x] Fixed edge case in token refresh (iteration 2)
- [ ] Still need: rate limiting tests, error boundary tests

## Next Steps
- Focus on rate limiting module next
- The mock setup in tests/helpers.ts can be reused
```

Claude reads this file at iteration start and updates it at iteration end. This bridges the context gap between independent `claude -p` invocations.

### CI Failure Recovery

When PR checks fail, Continuous Claude automatically:
1. Fetches the failed run ID via `gh run list`
2. Spawns a new `claude -p` with CI fix context
3. Claude inspects logs via `gh run view`, fixes code, commits, pushes
4. Re-waits for checks (up to `--ci-retry-max` attempts)

### Completion Signal

Claude can signal "I'm done" by outputting a magic phrase:

```bash
continuous-claude \
  --prompt "Fix all bugs in the issue tracker" \
  --completion-signal "CONTINUOUS_CLAUDE_PROJECT_COMPLETE" \
  --completion-threshold 3  # Stops after 3 consecutive signals
```

Three consecutive iterations signaling completion stops the loop, preventing wasted runs on finished work.

### Key Configuration

| Flag | Purpose |
|------|---------|
| `--max-runs N` | Stop after N successful iterations |
| `--max-cost $X` | Stop after spending $X |
| `--max-duration 2h` | Stop after time elapsed |
| `--merge-strategy squash` | squash, merge, or rebase |
| `--worktree <name>` | Parallel execution via git worktrees |
| `--disable-commits` | Dry-run mode (no git operations) |
| `--review-prompt "..."` | Add reviewer pass per iteration |
| `--ci-retry-max N` | Auto-fix CI failures (default: 1) |

---

## 5. The De-Sloppify Pattern

**An add-on pattern for any loop.** Add a dedicated cleanup/refactor step after each Implementer step.

### The Problem

When you ask an LLM to implement with TDD, it takes "write tests" too literally:
- Tests that verify TypeScript's type system works (testing `typeof x === 'string'`)
- Overly defensive runtime checks for things the type system already guarantees
- Tests for framework behavior rather than business logic
- Excessive error handling that obscures the actual code

### Why Not Negative Instructions?

Adding "don't test type systems" or "don't add unnecessary checks" to the Implementer prompt has downstream effects:
- The model becomes hesitant about ALL testing
- It skips legitimate edge case tests
- Quality degrades unpredictably

### The Solution: Separate Pass

Instead of constraining the Implementer, let it be thorough. Then add a focused cleanup agent:

```bash
# Step 1: Implement (let it be thorough)
claude -p "Implement the feature with full TDD. Be thorough with tests."

# Step 2: De-sloppify (separate context, focused cleanup)
claude -p "Review all changes in the working tree. Remove:
- Tests that verify language/framework behavior rather than business logic
- Redundant type checks that the type system already enforces
- Over-defensive error handling for impossible states
- Console.log statements
- Commented-out code

Keep all business logic tests. Run the test suite after cleanup to ensure nothing breaks."
```

### In a Loop Context

```bash
for feature in "${features[@]}"; do
  # Implement
  claude -p "Implement $feature with TDD."

# De-sloppify
  claude -p "Cleanup pass: review changes, remove test/code slop, run tests."

# Verify
  claude -p "Run build + lint + tests. Fix any failures."

# Commit
  claude -p "Commit with message: feat: add $feature"
done
```

### Key Insight

> Rather than adding negative instructions which have downstream quality effects, add a separate de-sloppify pass. Two focused agents outperform one constrained agent.

---

## 6. Ralphinho / RFC-Driven DAG Orchestration

**The most sophisticated pattern.** An RFC-driven, multi-agent pipeline that decomposes a spec into a dependency DAG, runs each unit through a tiered quality pipeline, and lands them via an agent-driven merge queue. Created by enitrat (credit: @enitrat).

### Architecture Overview

---

Continue in `summary-3.md`.
