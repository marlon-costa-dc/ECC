- **First-time (Branch A)** — Measures project scale, scans codebase across 4 meta-architecture dimensions (File Anatomy, State & Control Flow, Infrastructure, Error Handling), applies signal-threshold noise reduction to suppress weak conflicts, resolves strong-signal conflicts one-at-a-time with the user, generates `.ai-style-rules.md` with Golden Files / Naming Rules / DONTs, and offers optional enforcement hooks.
- **Incremental (Branch B)** — Reads existing rules, checks recent Git diffs for new or conflicting patterns, runs the same one-at-a-time grilling protocol for any conflicts found, and appends evolution logs without overwriting existing rules.
- **Per-Turn Enforcement** — When hooked via `CLAUDE.md`, every code-writing task opens with a compliance declaration naming the exemplar followed and the DONTs avoided.

## Output Specification

- `.ai-style-rules.md` at project root (with commit fingerprint + scale tier in header)
- Optionally `CLAUDE.md` with `@.ai-style-rules.md` reference
- Evolution logs appended as `### [YYYY-MM-DD] Style Evolution Log` entries

## Anti-Patterns

- FAIL: Do NOT skip the scale measurement step — sampling a 30-file project "starves" it; full-scanning a 5,000-file repo blows up
- FAIL: Do NOT stack multiple conflict questions at once — grilling is strictly one-at-a-time
- FAIL: Do NOT overwrite old rules in incremental mode — always append evolution logs
- FAIL: Do NOT default to "hard hook" without asking — enforcement strength is the user's call
- FAIL: Do NOT judge syntax or tech-stack quality — this skill aligns meta-architecture only
- FAIL: Do NOT copy bugs from exemplar files — reuse structure, flag defects

## Best Practices

- Announce the detected mode (first-time vs incremental) and scale tier in one line before scanning
- For large projects, read `--stat` summaries first, then targeted `Read` on suspect files
- Let the signal threshold handle noise — a 843-vs-8 naming split should auto-resolve without user interruption
- When in doubt about signal strength, lean toward asking
- The CLAUDE.md soft hook (`@.ai-style-rules.md`) is usually sufficient; hard hook only if the user wants mechanical enforcement

## Related Skills

- `init` — initialize a new CLAUDE.md with codebase documentation
- `code-review` — review diffs for correctness and style issues
- `simplify` — review code for reuse and simplification opportunities

## Examples

1. **First-time onboarding**
   - User: "Help me onboard AI to this older codebase without changing its style."
   - Action: Run Branch A full-scan → measure scale → scan 4 dimensions → grill conflicts → generate `.ai-style-rules.md` → offer hook strength (soft/hard/none).

2. **Incremental update after team changes**
   - User: "We added a new module; keep existing style rules intact."
   - Action: Run Branch B incremental sniff → compare Git deltas to recorded rules → grill any new conflicts → append evolution log without overwriting.

3. **Enforcing DONTs via CLAUDE.md**
   - User: "Make sure all new code stays consistent with the project's rules."
   - Action: Soft hook installed → `.ai-style-rules.md` auto-loaded every session → every code-writing task opens with compliance declaration, reusing exemplar patterns and avoiding DONTs.
