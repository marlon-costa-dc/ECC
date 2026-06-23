| **3** No hook | Keep the rules file; user references manually |

### Branch B — Incremental Sniff

1. Read existing `.ai-style-rules.md`; if it has a commit fingerprint, `git diff <last_hash> HEAD --stat` to pinpoint delta
2. Read recent Git changes (`git log -3 --stat` → inspect suspect files on demand)
3. For oversized diffs (>hundreds of files): `--stat` summary only + sample the largest changes
4. Compare new code against recorded rules → conflicts go through Grilling Protocol
5. Append evolution log at the end of `.ai-style-rules.md` (never overwrite old rules)

### Per-Turn Enforcement

When `.ai-style-rules.md` is in context (loaded via CLAUDE.md), every code-writing task must open with a **compliance declaration** in the reasoning chain, naming the exemplar being followed and the DONTs being avoided.

## How It Works

This skill auto-detects whether it's a first-time or incremental run via `.ai-style-rules.md` presence:

---

For additional details, continue reading `summary-1.md`.
