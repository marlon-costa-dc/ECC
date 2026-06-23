---
name: gateguard
description: Use when the user needs a pre-action fact-forcing gate that blocks Edit, Write, Bash, and MultiEdit operations until concrete investigation of importers, data schemas, and user instruction is completed, improving output quality over ungated agents.
origin: community
---

# GateGuard — Fact-Forcing Pre-Action Gate

A PreToolUse hook that forces investigation before editing. Instead of self-evaluation, it demands concrete facts. The investigation itself creates awareness that self-evaluation never does.

## When to Activate

- Working on codebases where edits affect multiple modules.
- Projects with data files that have specific schemas or formats.
- Teams where AI-generated code must match existing patterns.
- Any workflow where Claude tends to guess instead of investigating.

## Core Concept

LLM self-evaluation does not work. Asking "did you violate any policies?" always gets "no." Asking "list every file that imports this module" forces `Grep` and `Read`, and that investigation changes the output.

**Three-stage gate:**

1. **DENY** — block the first Edit/Write/Bash attempt.
2. **FORCE** — tell the model exactly which facts to gather.
3. **ALLOW** — permit retry after facts are presented.

## Gate Types

- **Edit / MultiEdit gate:** list importers, affected public symbols, data schema (with redacted values), and quote the user's instruction.
- **Write gate:** identify callers, confirm no existing file serves the same purpose, show data schema, and quote the user's instruction.
- **Destructive Bash gate:** every destructive command must list affected files/data, provide a one-line rollback, and quote the user's instruction.
- **Routine Bash gate:** once per session, state the request and what the command verifies.

## Anti-Patterns

- Don't use self-evaluation instead of fact-forcing.
- Don't skip the data schema check.
- Don't gate every single Bash command.

## References

- Full gate prompts, A/B test evidence, and setup options: [references/gateguard-reference.md](references/gateguard-reference.md)
- Related skills: `safety-guard`, `ecc-code-review`
