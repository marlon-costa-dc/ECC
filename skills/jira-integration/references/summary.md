# Jira Integration Skill

Retrieve, analyze, and update Jira tickets directly from your AI coding workflow. Supports both **MCP-based** (recommended) and **direct REST API** approaches.

## When to Activate

- Fetching a Jira ticket to understand requirements
- Extracting testable acceptance criteria from a ticket
- Adding progress comments to a Jira issue
- Transitioning a ticket status (To Do → In Progress → Done)
- Linking merge requests or branches to a Jira issue
- Searching for issues by JQL query

## Prerequisites

### Option A: MCP Server (Recommended)

Install the `mcp-atlassian` MCP server. This exposes Jira tools directly to your AI agent.

**Requirements:**
- Python 3.10+
- `uvx` (from `uv`), installed via your package manager or the official `uv` installation documentation

**Add to your MCP config** (e.g., `~/.claude.json` → `mcpServers`):

[See code example 1 in `code-examples.md`]

> **Security:** Never hardcode secrets. Prefer setting `JIRA_URL`, `JIRA_EMAIL`, and `JIRA_API_TOKEN` in your system environment (or a secrets manager). Only use the MCP `env` block for local, uncommitted config files.

**To get a Jira API token:**
1. Go to <https://id.atlassian.com/manage-profile/security/api-tokens>
2. Click **Create API token**
3. Copy the token — store it in your environment, never in source code

### Option B: Direct REST API

If MCP is not available, use the Jira REST API v3 directly via `curl` or a helper script.

**Required environment variables:**

| Variable | Description |
|----------|-------------|
| `JIRA_URL` | Your Jira instance URL (e.g., `https://yourorg.atlassian.net`) |
| `JIRA_EMAIL` | Your Atlassian account email |
| `JIRA_API_TOKEN` | API token from id.atlassian.com |

Store these in your shell environment, secrets manager, or an untracked local env file. Do not commit them to the repo.

For direct `curl` examples, keep credentials out of command-line arguments by passing the Jira user config on stdin:

[See code example 2 in `code-examples.md`]

## MCP Tools Reference

When the `mcp-atlassian` MCP server is configured, these tools are available:

| Tool | Purpose | Example |
|------|---------|---------|
| `jira_search` | JQL queries | `project = PROJ AND status = "In Progress"` |
| `jira_get_issue` | Fetch full issue details by key | `PROJ-1234` |
| `jira_create_issue` | Create issues (Task, Bug, Story, Epic) | New bug report |
| `jira_update_issue` | Update fields (summary, description, assignee) | Change assignee |
| `jira_transition_issue` | Change status | Move to "In Review" |
| `jira_add_comment` | Add comments | Progress update |
| `jira_get_sprint_issues` | List issues in a sprint | Active sprint review |
| `jira_create_issue_link` | Link issues (Blocks, Relates to) | Dependency tracking |
| `jira_get_issue_development_info` | See linked PRs, branches, commits | Dev context |

> **Tip:** Always call `jira_get_transitions` before transitioning — transition IDs vary per project workflow.

## Direct REST API Reference

### Fetch a Ticket

[See code example 3 in `code-examples.md`]

### Fetch Comments

[See code example 4 in `code-examples.md`]

### Add a Comment

[See code example 5 in `code-examples.md`]

### Transition a Ticket

[See code example 6 in `code-examples.md`]

### Search with JQL

[See code example 7 in `code-examples.md`]

## Analyzing a Ticket

When retrieving a ticket for development or test automation, extract:

---

For additional details, continue reading `summary-1.md`.
