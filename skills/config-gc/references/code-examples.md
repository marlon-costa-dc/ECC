# Code Examples

## Example 1

```bash
for f in ~/.claude/hooks/*; do
  name=$(basename "$f")
  grep -rq "$name" ~/.claude/settings.json ~/.claude/settings.local.json 2>/dev/null \
    || echo "ORPHAN: $f"
done
```

## Example 2

```bash
jq -r '.permissions.allow[]' ~/.claude/settings.local.json | sort | uniq -d
if jq -e '.permissions.allow | index("Bash(*)")' ~/.claude/settings.local.json >/dev/null; then
  jq -r '.permissions.allow[]' ~/.claude/settings.local.json \
    | grep '^Bash(' | grep -vF 'Bash(*)'
fi
```
