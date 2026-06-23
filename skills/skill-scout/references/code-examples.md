# Code Examples

## Example 1

```bash
find ~/.claude/skills -maxdepth 2 -name SKILL.md 2>/dev/null | grep -iE "keyword|synonym"
find ~/.claude/plugins/marketplaces -path '*/skills/*/SKILL.md' 2>/dev/null | grep -iE "keyword|synonym"
```

## Example 2

```bash
grep -RilE "keyword|synonym" ~/.claude/skills ~/.claude/plugins/marketplaces 2>/dev/null
```

## Example 3

```bash
gh search repos "claude code skill keyword" --limit 10 --sort stars
gh search code "name: keyword" --filename SKILL.md --limit 10
```

## Example 4

```text
"claude code skill" keyword
"SKILL.md" keyword
"everything-claude-code" keyword
```

## Example 5

```markdown
| # | Skill | Source | Why it matches | Gap |
| --- | --- | --- | --- | --- |
| 1 | article-writing | Local ECC | Drafts articles and guides | Not focused on release notes |
| 2 | content-engine | Local ECC | Multi-format content workflow | Heavier than needed |
| 3 | blog-writer | GitHub | Blog writing skill with recent commits | Needs security review |
```

## Example 6

```markdown
I found two close local matches and one external candidate. The closest fit is
`article-writing`; it covers drafting and revision, but it does not include the
release-note checklist you asked for. I can either use it as-is, fork it into a
release-note variant, or create a fresh skill.
```
