# Code Examples

## Example 1

```
~/.claude/ck/
├── projects.json              ← path → {name, contextDir, lastUpdated}
└── contexts/<name>/
    ├── context.json           ← SOURCE OF TRUTH (structured JSON, v2)
    └── CONTEXT.md             ← generated view — do not hand-edit
```

## Example 2

```bash
node "$HOME/.claude/skills/ck/commands/init.mjs"
```

## Example 3

```
Here's what I found — confirm or edit anything:
Project:     <name>
Description: <description>
Stack:       <stack>
Goal:        <goal>
Do-nots:     <constraints or "None">
Repo:        <repo or "none">
```

## Example 4

```bash
echo '<confirmed-json>' | node "$HOME/.claude/skills/ck/commands/save.mjs" --init
```

## Example 5

```bash
echo '<json>' | node "$HOME/.claude/skills/ck/commands/save.mjs"
```

## Example 6

```bash
node "$HOME/.claude/skills/ck/commands/resume.mjs" [arg]
```

## Example 7

```bash
node "$HOME/.claude/skills/ck/commands/info.mjs" [arg]
```

## Example 8

```bash
node "$HOME/.claude/skills/ck/commands/list.mjs"
```

## Example 9

```bash
node "$HOME/.claude/skills/ck/commands/forget.mjs" [name]
```

## Example 10

```bash
node "$HOME/.claude/skills/ck/commands/migrate.mjs"
```

## Example 11

```bash
node "$HOME/.claude/skills/ck/commands/migrate.mjs" --dry-run
```

## Example 12

```json
{
  "hooks": {
    "SessionStart": [
      { "hooks": [{ "type": "command", "command": "node \"~/.claude/skills/ck/hooks/session-start.mjs\"" }] }
    ]
  }
}
```
