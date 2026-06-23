# Code Examples

## Example 1

```
┌──────────────────────────────────────────────────────────────┐
│                    Claude Code Runtime                        │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐ │
│  │  Crons   │  │ Dispatch │  │ Memory   │  │ Computer    │ │
│  │ Schedule │  │ Remote   │  │ Store    │  │ Use         │ │
│  │ Tasks    │  │ Agents   │  │          │  │             │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬──────┘ │
│       │              │             │                │        │
│       ▼              ▼             ▼                ▼        │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              ECC Skill + Agent Layer                  │    │
│  │                                                      │    │
│  │  skills/     agents/     commands/     hooks/        │    │
│  └──────────────────────────────────────────────────────┘    │
│       │              │             │                │        │
│       ▼              ▼             ▼                ▼        │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              MCP Server Layer                        │    │
│  │                                                      │    │
│  │  memory    github    exa    supabase    browser-use  │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

## Example 2

```
# Short-term: current session context
Use TodoWrite for in-session task tracking

# Medium-term: project memory files
Write to ~/.claude/projects/*/memory/ for cross-session recall

# Long-term: MCP knowledge graph
Use mcp__memory__create_entities for permanent structured data
Use mcp__memory__create_relations for relationship mapping
Use mcp__memory__add_observations for new facts about known entities
```

## Example 3

```
# Via MCP tool
mcp__scheduled-tasks__create_scheduled_task({
  name: "daily-pr-review",
  schedule: "0 9 * * 1-5",  # 9 AM weekdays
  prompt: "Review all open PRs in affaan-m/everything-claude-code. For each: check CI status, review changes, flag issues. Post summary to memory.",
  project_dir: "/path/to/repo"
})

# Via claude -p (programmatic mode)
echo "Review open PRs and summarize" | claude -p --project /path/to/repo
```

## Example 4

```bash
# Trigger from CI/CD
curl -X POST "https://api.anthropic.com/dispatch" \
  -H "Authorization: Bearer $ANTHROPIC_API_KEY" \
  -d '{"prompt": "Build failed on main. Diagnose and fix.", "project": "/repo"}'

# Trigger from webhook
# GitHub webhook → dispatch → Claude agent → fix → PR

# Trigger from another agent
claude -p "Analyze the output of the security scan and create issues for findings"
```
