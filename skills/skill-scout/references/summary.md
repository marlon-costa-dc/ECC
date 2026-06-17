# Skill Scout

Use this skill before creating a new skill. The goal is to avoid duplicating
existing community or marketplace work, while still vetting anything external
before adoption.

Source: salvaged from stale community PR #1232 by `redminwang`.

## When to Use

- The user says "create a skill", "build a skill", "make a skill", or "new
  skill".
- The user asks "is there a skill for X?" or "does a skill exist that does Y?"
- The user describes a workflow and you are about to suggest creating a new
  skill.
- The user wants to fork or extend an existing skill.

If the user explicitly says to skip search or create from scratch, acknowledge
that and proceed with the requested creation workflow.

## How It Works

### Step 1 - Capture Intent

Extract:

- The task the skill should perform.
- The trigger conditions for using it.
- The domain, tools, frameworks, or data sources involved.
- Three to five search keywords plus useful synonyms.

### Step 2 - Search Local Sources

Search installed and marketplace skill names first. Local sources are preferred
because they are already part of the user's environment.

[See code example 1 in `code-examples.md`]

Then search frontmatter descriptions:

[See code example 2 in `code-examples.md`]

### Step 3 - Search Remote Sources

Use available GitHub and web search tools. Prefer concise queries:

[See code example 3 in `code-examples.md`]

For web search, use at most three targeted queries such as:

[See code example 4 in `code-examples.md`]

### Step 4 - Vet External Matches

Before recommending any external skill for adoption or forking:

- Read the `SKILL.md` frontmatter and instructions.
- Look for unexpected shell commands, file writes, network calls, credential
  handling, or package installs.
- Check whether the repository appears maintained.
- Prefer copying into a fresh local branch and reviewing the diff over editing
  marketplace originals.

### Step 5 - Rank Results

Rank candidates by:

1. Exact keyword match in the skill name.
2. Keyword or synonym match in description.
3. Local installed or marketplace source.
4. Maintained GitHub source with recent activity.
5. Web-only mention.

Cap the final list at 10 results.

### Step 6 - Present Decision Options

Give the user a short table:

| Option | Meaning |
| --- | --- |
| Use existing | Invoke or install a matching skill as-is. |
| Fork or extend | Copy the closest skill and modify it. |
| Create fresh | Build a new skill after confirming no close match exists. |

Only create a new skill after the user chooses that path or after the search
finds no close match.

## Examples

### Result Table

[See code example 5 in `code-examples.md`]

### User-Facing Summary

[See code example 6 in `code-examples.md`]

## Anti-Patterns

- Do not jump directly to new skill creation when a search is reasonable.
- Do not install external skills without reading them first.
- Do not present a long unranked list of weak matches.
- Do not treat web-only mentions as trusted sources.
- Do not edit installed marketplace originals in place.

## Related

- `search-first` - General search-before-building workflow.
- `skill-stocktake` - Audit installed skills for health, duplicates, and gaps.
- `agent-sort` - Categorize and organize existing agents and skills.
