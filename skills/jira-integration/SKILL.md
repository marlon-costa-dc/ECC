---
name: jira-integration
description: Use this skill when retrieving Jira tickets, analyzing requirements,
  updating ticket status, adding comments, or transitioning issues. Provides Jira
  API patterns via MCP or direct REST calls.
origin: ECC
---

# Jira Integration Skill

Retrieve, analyze, and update Jira tickets directly from your AI coding workflow. Supports both **MCP-based** (recommended) and **direct REST API** approaches.

## When to Use

- Fetching a Jira ticket to understand requirements
- Extracting testable acceptance criteria from a ticket
- Adding progress comments to a Jira issue
- Transitioning a ticket status (To Do → In Progress → Done)
- Linking merge requests or branches to a Jira issue
- Searching for issues by JQL query

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

## Direct REST API Safety

Prefer the Jira MCP server. When direct REST is required, pass Jira credentials through curl config stdin so `JIRA_EMAIL` and `JIRA_API_TOKEN` do not appear in process arguments.

```bash
jira_curl() {
  printf 'user = "%s:%s"\n' "$JIRA_EMAIL" "$JIRA_API_TOKEN" |
    curl -s -K - "$@"
}
```

For full details, examples, edge cases, and reference material, read `references/summary.md`.
