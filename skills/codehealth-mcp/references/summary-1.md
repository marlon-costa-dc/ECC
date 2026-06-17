```md
## Code Health (CodeScene MCP)

Before modifying any file: run `code_health_review`, note score and issues.

- Score below 5: problematic range — scope changes narrowly.
- Score 5–7: warning range — no broad refactors.

After each change: run `code_health_score` to verify delta.

- If score regressed: fix before continuing; never declare done if score dropped.

Before every commit: run `pre_commit_code_health_safeguard`.

Before PR: run `analyze_change_set`.
```

### Example: anti-patterns vs correct loop

```markdown
# BAD: Edit first, check later
[large refactor without code_health_review]

# BAD: Ignore score drop
"Tests pass" → mark task done while Code Health decreased

# BAD: Broad refactor on red-score file (below 5)
Drive-by cleanup across the module

# GOOD: review → small change → score → commit safeguard → analyze_change_set
```

## Pairing with ECC

| ECC skill / flow | Code Health MCP role |
|------------------|----------------------|
| `coding-standards` | Style/naming; Code Health = structure/complexity |
| `plankton-code-quality` | Write-time lint/format; Code Health = pre/post edit structural gate |
| `verification-loop` / `/quality-gate` | Add structural regression check before "done" |
| `security-review` | Security vs maintainability — use both when relevant |
| `tdd-workflow` | Tests pass ≠ healthy design — check score after refactors |

**Context tip:** ECC recommends keeping MCP count low. Enable `codescene` when doing substantive edits; disable when not needed.

## Related Skills

- `coding-standards` — baseline conventions
- `plankton-code-quality` — write-time lint/format hooks
- `verification-loop` — build/test/lint gate
- `tdd-workflow` — test-first development
- `security-review` — security checklist
- `documentation-lookup` — library docs via Context7 (orthogonal)
