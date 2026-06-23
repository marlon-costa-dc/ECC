4. **Soft-delete confirmed items**: prefer `.disabled` rename for skills/hooks and `_gc_trash/<date>/` move for files. Permission entries live in JSON (no comments possible): back up the settings file, record each removed entry verbatim in `gc_log.md`, then remove it from the `allow` array with `jq`. Only hard-delete when the user explicitly asks.
5. **Log** the run to `~/.claude/gc_log.md`: timestamp, items actioned, undo instructions.
6. **Report**: reclaimed size, channels still healthy, suggested next review date.

## Example Scan Commands

Orphaned hook scripts (channel 3) — scripts on disk that no hook config references:

[See code example 1 in `code-examples.md`]

Redundant permission entries (channel 4) — duplicates, and specific grants shadowed by a wildcard:

[See code example 2 in `code-examples.md`]

---

For additional details, continue reading `summary-1.md`.
