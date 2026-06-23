# Plan Orchestrate

Bridge a plan document to `/orchestrate custom` by emitting one ready-to-paste invocation per step. The skill is generative only — it never executes `/orchestrate`. The user pastes each line when ready.

## When to Activate

- User has a multi-step plan document (PRD, RFC, implementation plan) and wants to drive it through `/orchestrate`.
- User says "orchestrate this plan", "give me orchestrate prompts for each step", "compose chains for this plan".
- A step-by-step plan exists but the user does not want to manually pick agents per step.

Skip when:
- The work is one ad-hoc step → call `/orchestrate custom` directly.
- The plan is unreadable or empty. Lack of explicit numbering alone is not a skip condition — see the "No clear steps" edge case below.

## Inputs

[See code example 1 in `code-examples.md`]

- `<plan-doc-path>` — required; relative or absolute path (`@docs/...` accepted).
- `--lang` — reviewer language variant; defaults to `auto` (detected from project).
- `--scope` — limits emitted steps; defaults to `all`.
- `--dry-run` — print decomposition + chain rationale only; do not emit final prompts.

## Authoritative `/orchestrate` shape (do not deviate)

[See code example 2 in `code-examples.md`]

Where `{ORCH_CMD}` is determined in Phase 0 (see below). The command string in the emitted output **always uses one concrete form** — never both, never a placeholder.

- `custom` is a sequential chain; each agent's HANDOFF feeds the next.
- Comma-separated agent list. No spaces preferred; one space tolerated.
- No `--mode` / `--gate` / `--agents=...` flags exist — never invent them.
- Agent names come from the catalogue in this skill. Embedded double quotes in the task description are escaped as `\"`.

## ECC install form and namespacing

Two install forms determine the prefix on **both** the slash command and every agent name. The two MUST stay in sync — one form per output, never mixed:

Let `<claude-home>` denote the Claude Code home directory: `~/.claude` on macOS/Linux, `%USERPROFILE%\.claude` on Windows. Resolve it the way the host platform resolves the user home directory (do not hardcode `~`).

| Form | Detection | `{ORCH_CMD}` | Agent name format |
|---|---|---|---|
| Plugin install (1.9.0+) | `<claude-home>/plugins/marketplaces/everything-claude-code/` exists | `/everything-claude-code:orchestrate` | `everything-claude-code:<name>` |
| Legacy bare install | Above absent; agent files under `<claude-home>/agents/` | `/orchestrate` | `<name>` |

Why this matters: under the plugin install, agents register as `everything-claude-code:tdd-guide`. Bare names force fuzzy matching, which fails intermittently under parallel calls. Under legacy, the prefixed forms are not registered and fail outright.

## Available agent catalogue (must pick from these)

General:
- `planner` — requirement restatement, risk decomposition, step planning
- `architect` — architecture, system design, refactor proposals
- `tdd-guide` — write tests → implement → 80%+ coverage
- `code-reviewer` — generic code review
- `security-reviewer` — security audit, OWASP, secret leakage
- `refactor-cleaner` — dead code, duplicates, knip-class cleanup
- `doc-updater` — documentation, codemap, README
- `docs-lookup` — third-party library API lookups (Context7)
- `e2e-runner` — end-to-end test orchestration
- `database-reviewer` — PostgreSQL schema, migration, performance
- `harness-optimizer` — local agent harness configuration
- `loop-operator` — long-running autonomous loops
- `chief-of-staff` — multi-channel triage (rarely a fit for plan steps)

Build error resolvers:
- `build-error-resolver` (generic) / `cpp-build-resolver` / `go-build-resolver` / `java-build-resolver` / `kotlin-build-resolver` / `rust-build-resolver` / `pytorch-build-resolver`

Code reviewers:
- `python-reviewer` / `typescript-reviewer` / `go-reviewer` / `rust-reviewer` / `cpp-reviewer` / `java-reviewer` / `kotlin-reviewer` / `flutter-reviewer`

A misspelled agent name fails `/orchestrate`. Cross-check against this list before emitting.

## How It Works

### Phase 0 — Detect ECC mode + language

---

For additional details, continue reading `summary-1.md`, `summary-2.md`, `summary-3.md`.
