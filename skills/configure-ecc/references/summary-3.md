**Critical**: Only modify files in the installation target (`$TARGET/`), NEVER modify files in the source ECC repository (`$ECC_ROOT/`).

---

## Step 6: Installation Summary

Clean up the cloned repository from `/tmp`:

```bash
rm -rf /tmp/everything-claude-code
```

Then print a summary report:

```
## ECC Installation Complete

### Installation Target
- Level: [user-level / project-level / both]
- Path: [target path]

### Skills Installed ([count])
- skill-1, skill-2, skill-3, ...

### Rules Installed ([count])
- common (8 files)
- typescript (5 files)
- ...

### Verification Results
- [count] issues found, [count] fixed
- [list any remaining issues]

### Optimizations Applied
- [list changes made, or "None"]
```

---

## Troubleshooting

### "Skills not being picked up by Claude Code"
- Verify the skill directory contains a `SKILL.md` file (not just loose .md files)
- For user-level: check `~/.claude/skills/<skill-name>/SKILL.md` exists
- For project-level: check `.claude/skills/<skill-name>/SKILL.md` exists

### "Rules not working"
- Rules are flat files, not in subdirectories: `$TARGET/rules/coding-style.md` (correct) vs `$TARGET/rules/common/coding-style.md` (incorrect for flat install)
- Restart Claude Code after installing rules

### "Path reference errors after project-level install"
- Some skills assume `~/.claude/` paths. Run Step 4 verification to find and fix these.
- For `continuous-learning-v2`, the `~/.claude/homunculus/` directory is always user-level — this is expected and not an error.
