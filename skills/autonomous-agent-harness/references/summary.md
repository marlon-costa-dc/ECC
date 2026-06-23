# Autonomous Agent Harness

Turn Claude Code into a persistent, self-directing agent system using only native features and MCP servers.

## Consent and Safety Boundaries

Autonomous operation must be explicitly requested and scoped by the user. Do not create schedules, dispatch remote agents, write persistent memory, use computer control, post externally, modify third-party resources, or act on private communications unless the user has approved that capability and the target workspace for the current setup.

Prefer dry-run plans and local queue files before enabling recurring or event-driven actions. Keep credentials, private workspace exports, personal datasets, and account-specific automations out of reusable ECC artifacts.

## When to Activate

- User wants an agent that runs continuously or on a schedule
- Setting up automated workflows that trigger periodically
- Building a personal AI assistant that remembers context across sessions
- User says "run this every day", "check on this regularly", "keep monitoring"
- Wants to replicate functionality from Hermes, AutoGPT, or similar autonomous agent frameworks
- Needs computer use combined with scheduled execution

## Architecture

[See code example 1 in `code-examples.md`]

## Core Components

### 1. Persistent Memory

Use Claude Code's built-in memory system enhanced with MCP memory server for structured data.

**Built-in memory** (`~/.claude/projects/*/memory/`):
- User preferences, feedback, project context
- Stored as markdown files with frontmatter
- Automatically loaded at session start

**MCP memory server** (structured knowledge graph):
- Entities, relations, observations
- Queryable graph structure
- Cross-session persistence

**Memory patterns:**

[See code example 2 in `code-examples.md`]

### 2. Scheduled Operations (Crons)

Use Claude Code's scheduled tasks to create recurring agent operations.

**Setting up a cron:**

[See code example 3 in `code-examples.md`]

**Useful cron patterns:**

| Pattern | Schedule | Use Case |
|---------|----------|----------|
| Daily standup | `0 9 * * 1-5` | Review PRs, issues, deploy status |
| Weekly review | `0 10 * * 1` | Code quality metrics, test coverage |
| Hourly monitor | `0 * * * *` | Production health, error rate checks |
| Nightly build | `0 2 * * *` | Run full test suite, security scan |
| Pre-meeting | `*/30 * * * *` | Prepare context for upcoming meetings |

### 3. Dispatch / Remote Agents

Trigger Claude Code agents remotely for event-driven workflows.

**Dispatch patterns:**

[See code example 4 in `code-examples.md`]

### 4. Computer Use

Leverage Claude's computer-use MCP for physical world interaction.

---

For additional details, continue reading `summary-1.md`.
