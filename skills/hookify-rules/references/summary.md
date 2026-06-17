# Writing Hookify Rules

## Overview

Hookify rules are markdown files with YAML frontmatter that define patterns to watch for and messages to show when those patterns match. Rules are stored in `.claude/hookify.{rule-name}.local.md` files.

## Rule File Format

### Basic Structure

[See code example 1 in `code-examples.md`]

### Frontmatter Fields

| Field | Required | Values | Description |
|-------|----------|--------|-------------|
| name | Yes | kebab-case string | Unique identifier (verb-first: warn-*, block-*, require-*) |
| enabled | Yes | true/false | Toggle without deleting |
| event | Yes | bash/file/stop/prompt/all | Which hook event triggers this |
| action | No | warn/block | warn (default) shows message; block prevents operation |
| pattern | Yes* | regex string | Pattern to match (*or use conditions for complex rules) |

### Advanced Format (Multiple Conditions)

[See code example 2 in `code-examples.md`]

**Condition fields by event:**
- bash: `command`
- file: `file_path`, `new_text`, `old_text`, `content`
- prompt: `user_prompt`

**Operators:** `regex_match`, `contains`, `equals`, `not_contains`, `starts_with`, `ends_with`

All conditions must match for rule to trigger.

## Event Type Guide

### bash Events
Match Bash command patterns:
- Dangerous commands: `rm\s+-rf`, `dd\s+if=`, `mkfs`
- Privilege escalation: `sudo\s+`, `su\s+`
- Permission issues: `chmod\s+777`

### file Events
Match Edit/Write/MultiEdit operations:
- Debug code: `console\.log\(`, `debugger`
- Security risks: `eval\(`, `innerHTML\s*=`
- Sensitive files: `\.env$`, `credentials`, `\.pem$`

### stop Events
Completion checks and reminders. Pattern `.*` matches always.

### prompt Events
Match user prompt content for workflow enforcement.

## Pattern Writing Tips

### Regex Basics
- Escape special chars: `.` to `\.`, `(` to `\(`
- `\s` whitespace, `\d` digit, `\w` word char
- `+` one or more, `*` zero or more, `?` optional
- `|` OR operator

### Common Pitfalls
- **Too broad**: `log` matches "login", "dialog" — use `console\.log\(`
- **Too specific**: `rm -rf /tmp` — use `rm\s+-rf`
- **YAML escaping**: Use unquoted patterns; quoted strings need `\\s`

### Testing

[See code example 3 in `code-examples.md`]

## File Organization

- **Location**: `.claude/` directory in project root
- **Naming**: `.claude/hookify.{descriptive-name}.local.md`
- **Gitignore**: Add `.claude/*.local.md` to `.gitignore`

## Commands

- `/hookify [description]` - Create new rules (auto-analyzes conversation if no args)
- `/hookify-list` - View all rules in table format
- `/hookify-configure` - Toggle rules on/off interactively
- `/hookify-help` - Full documentation

## Quick Reference

Minimum viable rule:

[See code example 4 in `code-examples.md`]
