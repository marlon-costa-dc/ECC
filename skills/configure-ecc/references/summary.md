# Configure Everything Claude Code (ECC)

An interactive, step-by-step installation wizard for the Everything Claude Code project. Uses `AskUserQuestion` to guide users through selective installation of skills and rules, then verifies correctness and offers optimization.

## When to Activate

- User says "configure ecc", "install ecc", "setup everything claude code", or similar
- User wants to selectively install skills or rules from this project
- User wants to verify or fix an existing ECC installation
- User wants to optimize installed skills or rules for their project

## Prerequisites

This skill must be accessible to Claude Code before activation. Two ways to bootstrap:
1. **Via Plugin**: `/plugin install ecc@ecc` — the plugin loads this skill automatically
2. **Manual**: Copy only this skill to `~/.claude/skills/configure-ecc/SKILL.md`, then activate by saying "configure ecc"

---

## Step 0: Clone ECC Repository

Before any installation, clone the latest ECC source to `/tmp`:

[See code example 1 in `code-examples.md`]

Set `ECC_ROOT=/tmp/everything-claude-code` as the source for all subsequent copy operations.

If the clone fails (network issues, etc.), use `AskUserQuestion` to ask the user to provide a local path to an existing ECC clone.

---

## Step 1: Choose Installation Level

Use `AskUserQuestion` to ask the user where to install:

[See code example 2 in `code-examples.md`]

Store the choice as `INSTALL_LEVEL`. Set the target directory:
- User-level: `TARGET=~/.claude`
- Project-level: `TARGET=.claude` (relative to current project root)
- Both: `TARGET_USER=~/.claude`, `TARGET_PROJECT=.claude`

Create the target directories if they don't exist:

[See code example 3 in `code-examples.md`]

---

## Step 2: Select & Install Skills

### 2a: Choose Scope (Core vs Niche)

Default to **Core (recommended for new users)** — copy `.agents/skills/*` plus `skills/search-first/` for research-first workflows. This bundle covers engineering, evals, verification, security, strategic compaction, frontend design, and Anthropic cross-functional skills (article-writing, content-engine, market-research, frontend-slides).

Use `AskUserQuestion` (single select):

[See code example 4 in `code-examples.md`]

If the user chooses niche or core + niche, continue to category selection below and only include those niche skills they pick.

### 2b: Choose Skill Categories

There are 7 selectable category groups below. The detailed confirmation lists that follow cover 45 skills across 8 categories, plus 1 standalone template. Use `AskUserQuestion` with `multiSelect: true`:

[See code example 5 in `code-examples.md`]

### 2c: Confirm Individual Skills

For each selected category, print the full list of skills below and ask the user to confirm or deselect specific ones. If the list exceeds 4 items, print the list as text and use `AskUserQuestion` with an "Install all listed" option plus "Other" for the user to paste specific names.

**Category: Framework & Language (25 skills)**

---

For additional details, continue reading `summary-1.md`, `summary-2.md`, `summary-3.md`.
