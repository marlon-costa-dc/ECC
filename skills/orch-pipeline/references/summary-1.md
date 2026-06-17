| Phase | Primary | Fallback / escalation |
|-------|---------|----------------------|
| Intake / understand | `code-explorer` | trace existing paths before a tweak, fix, or refactor |
| Plan | `planner` | `architect`, `code-architect` for structural calls |
| Implement | `tdd-guide` (or `tdd-workflow` skill) | `build-error-resolver` / `/build-fix` on build breaks |
| Review | `code-reviewer` / `/code-review` | language reviewer (`python-reviewer`, `typescript-reviewer`, …) |
| Security | `security-reviewer` | — |
| MVP inner loop | `/gan-build "<brief>" --skip-planner` | drives `gan-generator` → `gan-evaluator`; tune `--max-iterations` / `--pass-threshold` |

Match the language reviewer to the repo (see the repo's own `CLAUDE.md`).

## Security-review trigger

Pull in `security-reviewer` when the diff touches any of: authentication or
authorization, user-input handling, database queries, file-system paths,
external API calls, cryptography, or secrets / credentials. (Per `rules/common/security.md`.)

## Handoff artifacts

The pipeline carries no hidden state — the planning docs *are* the handoff:

- `task_list` (from Plan) drives the Implement loop.
- Larger work may also emit PRD / architecture / system_design under the repo's
  `docs/` per `rules/common/development-workflow.md`.
- Review findings (CRITICAL / HIGH) must be resolved before Gate 2.

## Verification

- size tier was stated and matched the work
- Gate 1 (plan) and Gate 2 (commit) were both honored
- `security-reviewer` ran iff a security trigger was touched
- commits are conventional and scoped to one logical change
- new / changed behavior has tests; coverage ≥ 80% per `rules/common/testing.md`
