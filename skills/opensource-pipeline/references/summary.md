# Open-Source Pipeline Skill

Safely open-source any project through a 3-stage pipeline: **Fork** (strip secrets) → **Sanitize** (verify clean) → **Package** (CLAUDE.md + setup.sh + README).

## When to Activate

- User says "open source this project" or "make this public"
- User wants to prepare a private repo for public release
- User needs to strip secrets before pushing to GitHub
- User invokes `/opensource fork`, `/opensource verify`, or `/opensource package`

## Commands

| Command | Action |
|---------|--------|
| `/opensource fork PROJECT` | Full pipeline: fork + sanitize + package |
| `/opensource verify PROJECT` | Run sanitizer on existing repo |
| `/opensource package PROJECT` | Generate CLAUDE.md + setup.sh + README |
| `/opensource list` | Show all staged projects |
| `/opensource status PROJECT` | Show reports for a staged project |

## Protocol

### /opensource fork PROJECT

**Full pipeline — the main workflow.**

#### Step 1: Gather Parameters

Resolve the project path. If PROJECT contains `/`, treat as a path (absolute or relative). Otherwise check: current working directory, `$HOME/PROJECT`, then ask the user.

[See code example 1 in `code-examples.md`]

Ask the user:
1. "Which project?" (if not found)
2. "License? (MIT / Apache-2.0 / GPL-3.0 / BSD-3-Clause)"
3. "GitHub org or username?" (default: detect via `gh api user -q .login`)
4. "GitHub repo name?" (default: project name)
5. "Description for README?" (analyze project for suggestion)

#### Step 2: Create Staging Directory

[See code example 2 in `code-examples.md`]

#### Step 3: Run Forker Agent

Spawn the `opensource-forker` agent:

[See code example 3 in `code-examples.md`]

Wait for completion. Read `{STAGING_PATH}/FORK_REPORT.md`.

#### Step 4: Run Sanitizer Agent

Spawn the `opensource-sanitizer` agent:

[See code example 4 in `code-examples.md`]

Wait for completion. Read `{STAGING_PATH}/SANITIZATION_REPORT.md`.

**If FAIL:** Show findings to user. Ask: "Fix these and re-scan, or abort?"
- If fix: Apply fixes, re-run sanitizer (maximum 3 retry attempts — after 3 FAILs, present all findings and ask user to fix manually)
- If abort: Clean up staging directory

**If PASS or PASS WITH WARNINGS:** Continue to Step 5.

#### Step 5: Run Packager Agent

Spawn the `opensource-packager` agent:

[See code example 5 in `code-examples.md`]

#### Step 6: Final Review

Present to user:

[See code example 6 in `code-examples.md`]

#### Step 7: GitHub Publish (on user approval)

[See code example 7 in `code-examples.md`]

---

### /opensource verify PROJECT

Run sanitizer independently. Resolve path: if PROJECT contains `/`, treat as a path. Otherwise check `$HOME/opensource-staging/PROJECT`, then `$HOME/PROJECT`, then current directory.

[See code example 8 in `code-examples.md`]

---

### /opensource package PROJECT

Run packager independently. Ask for "License?" and "Description?", then:

[See code example 9 in `code-examples.md`]

---

### /opensource list

[See code example 10 in `code-examples.md`]

Show each project with pipeline progress (FORK_REPORT.md, SANITIZATION_REPORT.md, CLAUDE.md presence).

---

### /opensource status PROJECT

[See code example 11 in `code-examples.md`]

## Staging Layout

---

For additional details, continue reading `summary-1.md`.
