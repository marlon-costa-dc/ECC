---
name: agentic-os-reference
description: Supplementary reference for agentic-os containing example kernel and agent definitions, standard slash commands, scheduling configs, and data layer templates for the file-based agent operating system.
---

# Agentic OS — Reference

## Kernel Example

```markdown
# CLAUDE.md - Agentic OS Kernel

## Identity
You are the COO of [project-name]. You route tasks to specialist agents.

## Agent Registry
| Agent | Role | Trigger |
|---|---|---|
| @dev | Code, architecture, debugging | "build", "fix", "refactor" |
| @writer | Docs, content, emails | "write", "draft", "blog" |
| @researcher | Research, fact-checking | "research", "analyze", "compare" |
| @ops | DevOps, deployment | "deploy", "CI", "server" |

## Routing Rules
Parse intent, match registry trigger, load `agents/<name>.md`, hand off with context, synthesize result.

## Model Policies
Default to repo default; use higher-reasoning model for complex @dev tasks; research-capable model for @researcher; warn before spend threshold.
```

## Agent Definition Example

```markdown
# @dev - Software Engineer

## Identity
Senior software engineer. Simple solutions; ask when ambiguous.

## Memory Scope
Read `data/projects/<current>.md` and `data/decisions/`; append logs to `data/logs/<date>-@dev.md`.

## Tool Access
Filesystem within project root, Git, test runner, MCP servers.

## Constraints
Write tests for new features; never commit directly to `main`; prefer editing existing files; keep functions under ~50 lines.
```

## Standard Commands

| Command | Purpose |
|---|---|
| `/daily-sync` | Morning briefing |
| `/outreach` | Outreach workflow |
| `/research <topic>` | Deep research |
| `/apply-jobs` | Tailor resume/cover |
| `/analytics` | Pull metrics |
| `/interview-prep` | Flashcards/mock questions |
| `/decision <topic>` | Log a decision |

## Reflection Template

```markdown
## Reflection - Session 3
- What worked:
- What didn't:
- What to change:
```

## Scheduling Examples

### macOS LaunchAgent

```xml
<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0">
<dict>
  <key>Label</key><string>com.agentic.daily-sync</string>
  <key>ProgramArguments</key>
  <array>
    <string>/claude</string><string>--cwd</string><string>/path/to/project</string>
    <string>--command</string><string>/daily-sync</string>
  </array>
  <key>StartCalendarInterval</key>
  <dict><key>Hour</key><integer>8</integer><key>Minute</key><integer>0</integer></dict>
</dict>
</plist>
```

### Linux systemd

```ini
[Unit]
Description=Agentic OS Daily Sync
[Service]
Type=oneshot
ExecStart=/usr/local/bin/claude --cwd /path/to/project --command /daily-sync
```

```ini
[Unit]
Description=Run daily sync every morning
[Timer]
OnCalendar=*-*-* 8:00:00
Persistent=true
[Install]
WantedBy=timers.target
```

### pm2

```js
module.exports = { apps: [{
  name: 'agentic-daily-sync',
  script: 'claude',
  args: '--cwd /path/to/project --command /daily-sync',
  cron_restart: '0 8 * * *',
  autorestart: false
}]};
```

## Data Layer Examples

### JSON State

```json
{
  "name": "Website v2",
  "status": "in-progress",
  "milestone": "beta-launch",
  "agents_involved": ["@dev", "@writer"],
  "files": { "spec": "docs/spec.md" },
  "metrics": { "commits": 47, "last_session": "2026-04-22T11:30:00Z" }
}
```

### Schema Evolution

```json
{
  "name": "Website v2",
  "status": "in-progress",
  "_deprecated_priority": "high",
  "priority_v2": { "level": "high", "rationale": "Blocks investor demo" }
}
```
