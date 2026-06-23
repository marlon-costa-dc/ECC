# Code Tour

Create **CodeTour** `.tour` files for codebase walkthroughs that open directly to real files and line ranges. Tours live in `.tours/` and are meant for the CodeTour format, not ad hoc Markdown notes.

A good tour is a narrative for a specific reader:
- what they are looking at
- why it matters
- what path they should follow next

Only create `.tour` JSON files. Do not modify source code as part of this skill.

## When to Use

Use this skill when:
- the user asks for a code tour, onboarding tour, architecture walkthrough, or PR tour
- the user says "explain how X works" and wants a reusable guided artifact
- the user wants a ramp-up path for a new engineer or reviewer
- the task is better served by a guided sequence than a flat summary

Examples:
- onboarding a new maintainer
- architecture tour for one service or package
- PR-review walk-through anchored to changed files
- RCA tour showing the failure path
- security review tour of trust boundaries and key checks

## When NOT to Use

| Instead of code-tour | Use |
| --- | --- |
| A one-off explanation in chat is enough | answer directly |
| The user wants prose docs, not a `.tour` artifact | `documentation-lookup` or repo docs editing |
| The task is implementation or refactoring | do the implementation work |
| The task is broad codebase onboarding without a tour artifact | `codebase-onboarding` |

## Workflow

### 1. Discover

Explore the repo before writing anything:
- README and package/app entry points
- folder structure
- relevant config files
- the changed files if the tour is PR-focused

Do not start writing steps before you understand the shape of the code.

### 2. Infer the reader

Decide the persona and depth from the request.

| Request shape | Persona | Suggested depth |
| --- | --- | --- |
| "onboarding", "new joiner" | `new-joiner` | 9-13 steps |
| "quick tour", "vibe check" | `vibecoder` | 5-8 steps |
| "architecture" | `architect` | 14-18 steps |
| "tour this PR" | `pr-reviewer` | 7-11 steps |
| "why did this break" | `rca-investigator` | 7-11 steps |
| "security review" | `security-reviewer` | 7-11 steps |
| "explain how this feature works" | `feature-explainer` | 7-11 steps |
| "debug this path" | `bug-fixer` | 7-11 steps |

### 3. Read and verify anchors

Every file path and line anchor must be real:
- confirm the file exists
- confirm the line numbers are in range
- if using a selection, verify the exact block
- if the file is volatile, prefer a pattern-based anchor

Never guess line numbers.

### 4. Write the `.tour`

Write to:

[See code example 1 in `code-examples.md`]

Keep the path deterministic and readable.

### 5. Validate

Before finishing:
- every referenced path exists
- every line or selection is valid
- the first step is anchored to a real file or directory
- the tour tells a coherent story rather than listing files

## Step Types

### Content

Use sparingly, usually only for a closing step:

[See code example 2 in `code-examples.md`]

Do not make the first step content-only.

### Directory

Use to orient the reader to a module:

[See code example 3 in `code-examples.md`]

### File + line

This is the default step type:

[See code example 4 in `code-examples.md`]

### Selection

Use when one code block matters more than the whole file:

[See code example 5 in `code-examples.md`]

### Pattern

Use when exact lines may drift:

[See code example 6 in `code-examples.md`]

### URI

Use for PRs, issues, or docs when helpful:

[See code example 7 in `code-examples.md`]

## Writing Rule: SMIG

---

For additional details, continue reading `summary-1.md`.
