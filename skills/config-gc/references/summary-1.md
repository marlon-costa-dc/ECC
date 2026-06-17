Largest stale caches (channel 8) — `du -k` instead of GNU-only `find -printf`, so it works on macOS/BSD too:

```bash
find ~/.claude/file-history ~/.claude/shell-snapshots -type f -mtime +30 \
  -exec du -k {} + 2>/dev/null | sort -rn | head -20
```

Soft-delete with undo path (capture the date once so the log can't disagree with the directory):

```bash
gc_date=$(date +%Y-%m-%d)
mkdir -p ~/.claude/_gc_trash/$gc_date
mv ~/.claude/skills/dead-skill ~/.claude/_gc_trash/$gc_date/
echo "$(date -Iseconds) moved skills/dead-skill -> _gc_trash/$gc_date/ (undo: mv back)" >> ~/.claude/gc_log.md
```

Removing a confirmed-redundant permission entry (JSON has no comments — back up, log, then edit):

```bash
cp ~/.claude/settings.local.json ~/.claude/settings.local.json.bak
echo "$(date -Iseconds) removed permission entry: Bash(git push) (undo: restore from .bak or re-add)" >> ~/.claude/gc_log.md
jq '.permissions.allow -= ["Bash(git push)"]' ~/.claude/settings.local.json.bak \
  > ~/.claude/settings.local.json
```

## Anti-Patterns

- **Bulk approval.** Asking "delete all 15? [y/n]" defeats the design. One item, one decision.
- **Hard-deleting on first pass.** If there's no `_gc_trash/` copy or `.disabled` rename, you did it wrong.
- **Treating "old" as "dead".** A skill untouched for 60 days may be seasonal (tax season, quarterly reviews). Age is a signal, not a verdict — that's why a human confirms.
- **Cleaning memory by truncation.** Merging two contradicting memory files requires reading both and keeping the newer truth, not deleting the longer one.
- **Touching anything outside `~/.claude`** (or the project's `.claude/`). Config GC never wanders into source trees.

## Best Practices

- Run after big additions, not just on a calendar: installing a 50-skill pack is exactly when overlap with existing skills appears.
- When two skills overlap, prefer disabling the one with the weaker trigger description — it's the one that was probably never firing anyway.
- Permission cleanup is the highest-value channel per minute spent: redundant allow-entries make security review harder.
- Keep `gc_log.md` forever. It's tiny, and "when did I disable that hook and why" comes up more often than you'd think.

## Related Skills

- `skill-stocktake` — audits skill *quality*; config-gc audits skill *existence*. Run stocktake on what survives GC.
- `workspace-surface-audit` — the additive counterpart: recommends what to install. config-gc is the subtractive half of the same lifecycle.
- `configure-ecc` — after installing skills with it, run config-gc to reconcile overlaps with your pre-existing setup.
- `continuous-learning` — produces the memory files this skill later audits.
- `security-review` — pairs well with the permissions channel.
