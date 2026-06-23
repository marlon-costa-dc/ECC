Chain composition rules:
1. **Primary tag selection**: when a step matches multiple tags, the **first one in table order** (top of the table = highest priority) is the primary; the rest are secondaries. Composition rules 2 and 3 below handle specific multi-tag combinations explicitly; otherwise, append secondary chains in tag table order.
2. `impl` + `security` → `tdd-guide,<lang>-reviewer,security-reviewer`.
3. `impl` + `db` → `tdd-guide,database-reviewer,<lang>-reviewer`.
4. **Deduplicate** the resulting chain (preserve first occurrence). E.g. `review` + `lang=unknown` would yield `code-reviewer,code-reviewer` after rule 5; deduplication collapses it to `code-reviewer`.
5. `<lang>-reviewer` resolves to `code-reviewer` when `lang=unknown`.
6. `<lang>-build-resolver` resolves to `build-error-resolver` when `lang=unknown`. **Special case**: if Phase 0 set `pytorch=true`, use `pytorch-build-resolver` for `build` chains regardless of `<lang>`. There is no `python-build-resolver`; `--lang=python` without `pytorch=true` resolves to `build-error-resolver`.
7. **Zero-tag steps**: if no trigger word matches, set chain to `code-reviewer` and write `no tag matched; default review-only chain` under "Chain rationale".
8. Chain length ≤ 4 after deduplication. If exceeded, drop weakest tag (`lookup` and `docs` first).
9. Do not pair `planner` and `architect` in an `impl` chain (token waste). Pair them only on `design` steps.
10. Steps tagged `impl`, `refactor`, or `migration` end with a **reviewer-class** agent — any of `<lang>-reviewer`, `code-reviewer`, `security-reviewer`, or `database-reviewer`. The most domain-specific reviewer wins the tail position (e.g. rule 2's `impl+security` ends with `security-reviewer`; rule 3's `impl+db` ends with `<lang>-reviewer` because `database-reviewer` already gates the migration earlier in the chain). `test` and `build` steps are gated by their own validators (`e2e-runner` and the build resolver respectively) and do not require an additional reviewer.

### Phase 3 — Compress task description

Each emitted `<task description>` must:
- Be self-contained (the first agent does not need the plan document open).
- Start with `[Plan: <path>#step-<id>]`.
- Include 1–3 verifiable Acceptance criteria.
- Include a Scope guard (`Out of scope: ...`) **only if the plan declares one for this step**. Inherit verbatim. If the plan has no out-of-scope statement, omit the clause entirely — do not invent one.
- Be 200–600 characters; one line; embedded `"` escaped as `\"`; no literal newlines.

### Phase 4 — Output

Emit Markdown using **the form determined by `ECC_MODE`**. The output uses one form throughout — every `{ORCH_CMD}` and every agent name is rendered with the matching prefix from Phase 0. **Do not emit both forms; do not include "this is plugin form" / "strip the prefix" instructions in the rendered output.**

Concrete rendering rules:

- `{ORCH_CMD}` = `/everything-claude-code:orchestrate` under `plugin`, `/orchestrate` under `legacy`.
- `{AGENT(name)}` = `everything-claude-code:<name>` under `plugin`, `<name>` under `legacy`.
- The overview-table "Chain" column uses the same `{AGENT(name)}` rendering.
- Per-step bash blocks contain only the runnable command. **No `# plugin form` or `# legacy form` comments** — the form is implicit and uniform across the whole output.

Output structure:

````markdown
# Plan-Orchestrate Result

**Plan**: `<path>`
**Lang**: `<detected-or-given>`
**ECC mode**: `<plugin | legacy>`
**Steps**: <N>
**Scope**: <all | step:n | range:a-b>

## Steps overview

| # | Title | Tags | Chain |
|---|---|---|---|
| 1 | ... | impl, db | `{AGENT(tdd-guide)},{AGENT(database-reviewer)},{AGENT(python-reviewer)}` |
| ... | | | |

---

## Step 1 — <title>

**Intent**: <1–3 sentences>
**Tags**: <a, b>
**Chain rationale**: <why this chain; which agent closes the loop>

```bash
{ORCH_CMD} custom "{AGENT(tdd-guide)},{AGENT(database-reviewer)},{AGENT(python-reviewer)}" "[Plan: docs/foo.md#step-1] <compressed task description>; Acceptance: <1–3 items>; Out of scope: <…>"
```
````

> The `{ORCH_CMD}` and `{AGENT(...)}` notation above describes the substitution this skill performs at runtime. The actual emitted Markdown contains the resolved strings, never the placeholders.

Append a final "Batch execution" block aggregating every step's command in order so the user can paste them all at once. **Skip the Batch block in overview-only mode** (see "Large plan" edge case): when only the overview table is being emitted, there are no per-step commands to aggregate.

### Phase 5 — Self-check (run before emitting)

---

Continue in `summary-3.md`.
