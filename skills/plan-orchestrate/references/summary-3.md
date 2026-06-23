- [ ] Every agent in every chain comes from the catalogue (after stripping any `everything-claude-code:` prefix that appeared in the plan; see Phase 0 step 5).
- [ ] Resolved `{ORCH_CMD}` and every resolved `{AGENT(...)}` use the **same** form (`plugin` or `legacy`) — never mixed in one output.
- [ ] No `# plugin form` / `# legacy form` annotations and no "strip the prefix" instructions remain in the rendered output.
- [ ] No invented `--mode` / `--gate` / `--agents=...` fields.
- [ ] Each task description is single-line, double-quoted, with embedded `"` escaped.
- [ ] Each task description begins with `[Plan: <path>#step-<id>]` and includes Acceptance (1–3 items). The `Out of scope:` clause is present only when inherited from the plan.
- [ ] No duplicate agent in any chain after Phase 2 dedup.
- [ ] Chain length ≤ 4.
- [ ] Steps tagged `impl`/`refactor`/`migration` end with a reviewer-class agent (`<lang>-reviewer`, `code-reviewer`, `security-reviewer`, or `database-reviewer`). `test` and `build` are exempt — see Phase 2 rule 10.
- [ ] Zero-tag steps emit `code-reviewer` with the rationale `no tag matched; default review-only chain`.
- [ ] Overview table lists every step in the plan, regardless of `--scope`.
- [ ] Per-step detail block count matches the resolved `--scope` (full plan when `--scope=all`; one block for `step:n`; range size for `range:a-b`). In overview-only mode, no per-step blocks and no Batch block are emitted.

## Edge cases

- **No clear steps**: prefer H2/H3 splitting; if still ambiguous, report "no structured steps detected" with the document outline and ask the user to confirm running by outline.
- **Large plan (>1500 lines)**: enter **overview-only mode** — emit only the overview table and ask the user to narrow with `--scope` before re-running for details. In this mode, skip per-step detail blocks and skip the Batch execution block.
- **Step too broad** (e.g. "complete all backend work"): do not force a single chain. Suggest splitting into N.a and N.b and propose a split.
- **Plan declares agents** (rare): first **strip any `everything-claude-code:` prefix** to get the bare catalogue name (Phase 0 step 5), then validate against the catalogue. Replace invalid agents and explain under "Chain rationale". The bare name is re-prefixed at output time per `ECC_MODE`.
- **Polyglot project where `--lang=auto` cannot pick a winner**: set `lang=unknown`; reviewer resolves to `code-reviewer` and build resolver to `build-error-resolver`. Mention the fallback under "Chain rationale".

## Examples

### Example 1 — Plugin mode, Python plan

Input:
```
plan-orchestrate @docs/plan/example-feature.md --lang=python
```

Excerpt of expected output:
````markdown
## Step 2 — Encrypt sensitive UserProfile fields

**Intent**: Introduce an `EncryptedString` SQLAlchemy type and AES-GCM encrypt `birth_datetime` / `location` before persistence; load the key from an environment variable.
**Tags**: impl, security, db
**Chain rationale**: Security-sensitive write path, so `security-reviewer` closes the chain; `database-reviewer` validates the alembic migration; `python-reviewer` covers typing and PEP 8.

```bash

> Continued in [`summary-4.md`](summary-4.md)
