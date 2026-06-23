| **9.0–10.0** | Green — healthy | Safer to extend; still prefer vertical slices |
| **4.0–8.9** | Yellow — debt | Tread carefully; no drive-by refactors |
| **1.0–3.9** | Red — severe debt | Narrow scope only |

### 4. Run the feedback loop

**Before touching a file**

1. Run `code_health_review` on the target path.
2. Record baseline score and listed code smells.
3. Plan the smallest change that addresses the task.

Scope by score: **below 5** — minimal diff only; **5–7** — no broad refactors; **above 7** — safer to refactor, still verify after each edit.

**After each change**

1. Run `code_health_score` on the same file.
2. Compare to the baseline from `code_health_review`.
3. If the score **regressed**, fix before continuing. Never mark the task done while the score is lower than when you started.

**Before every commit** — run `pre_commit_code_health_safeguard` on the repository path.

**Before a PR** — run `analyze_change_set` against the base branch (e.g. `main`).

## Examples

### Example: Flask maintainability improvement

On `pallets/flask`, an agent loop using only standalone tools:

1. `code_health_review` on a target module (baseline **4.82**)
2. Targeted refactor addressing listed smells
3. `code_health_score` after each edit
4. `pre_commit_code_health_safeguard` before commit
5. `analyze_change_set` before PR

Result: Code Health **4.82 → 9.1** (free standalone token only).

### Example: AGENTS.md enforcement block

Paste into the project `AGENTS.md` or `CLAUDE.md`:

---

For additional details, continue reading `summary-1.md`.
