# Team Builder

Interactive menu for browsing and composing agent teams on demand. Works with flat or domain-subdirectory agent collections.

## When to Use

- You have multiple agent personas (markdown files) and want to pick which ones to use for a task
- You want to compose an ad-hoc team from different domains (e.g., Security + SEO + Architecture)
- You want to browse what agents are available before deciding

## Prerequisites

Agent files must be markdown files containing a persona prompt (identity, rules, workflow, deliverables). The first `# Heading` is used as the agent name and the first paragraph as the description.

Both flat and subdirectory layouts are supported:

**Subdirectory layout** — domain is inferred from the folder name:

[See code example 1 in `code-examples.md`]

**Flat layout** — domain inferred from shared filename prefixes. A prefix counts as a domain when 2+ files share it. Files with unique prefixes go to "General". Note: the algorithm splits at the first `-`, so multi-word domains (e.g., `product-management`) should use the subdirectory layout instead:

[See code example 2 in `code-examples.md`]

## Configuration

Agents are discovered via two methods, merged and deduplicated by agent name:

1. **`claude agents` command** (primary) — run `claude agents` to get all agents known to the CLI, including user agents, plugin agents (e.g. `everything-claude-code:architect`), and built-in agents. This automatically covers ECC marketplace installs without any path configuration.
2. **File glob** (fallback, for reading agent content) — agent markdown files are read from:
   - `./agents/**/*.md` + `./agents/*.md` — project-local agents
   - `~/.claude/agents/**/*.md` + `~/.claude/agents/*.md` — global user agents

Earlier sources take precedence when names collide: user agents > plugin agents > built-in agents. A custom path can be used instead if the user specifies one.

## How It Works

### Step 1: Discover Available Agents

Run `claude agents` to get the full agent list. Parse each line:
- **Plugin agents** are prefixed with `plugin-name:` (e.g., `everything-claude-code:security-reviewer`). Use the part after `:` as the agent name and the plugin name as the domain.
- **User agents** have no prefix. Read the corresponding markdown file from `~/.claude/agents/` or `./agents/` to extract the name and description.
- **Built-in agents** (e.g., `Explore`, `Plan`) are skipped unless the user explicitly asks to include them.

For user agents loaded from markdown files:
- **Subdirectory layout:** extract the domain from the parent folder name
- **Flat layout:** collect all filename prefixes (text before the first `-`). A prefix qualifies as a domain only if it appears in 2 or more filenames (e.g., `engineering-security-engineer.md` and `engineering-software-architect.md` both start with `engineering` → Engineering domain). Files with unique prefixes (e.g., `code-reviewer.md`, `tdd-guide.md`) are grouped under "General"
- Extract the agent name from the first `# Heading`. If no heading is found, derive the name from the filename (strip `.md`, replace hyphens with spaces, title-case)
- Extract a one-line summary from the first paragraph after the heading

If no agents are found after running `claude agents` and probing file locations, inform the user: "No agents found. Run `claude agents` to verify your setup." Then stop.

### Step 2: Present Domain Menu

[See code example 3 in `code-examples.md`]

- Skip domains with zero agents (empty directories)
- Show agent count per domain

### Step 3: Handle Selection

Accept flexible input:
- Numbers: "1,3" selects all agents from Engineering and Sales
- Names: "security + seo" fuzzy-matches against discovered agents
- "all from engineering" selects every agent in that domain

If more than 5 agents are selected, list them alphabetically and ask the user to narrow down: "You selected N agents (max 5). Pick which to keep, or say 'first 5' to use the first five alphabetically."

Confirm selection:

[See code example 4 in `code-examples.md`]

### Step 4: Spawn Agents in Parallel

---

For additional details, continue reading `summary-1.md`.
