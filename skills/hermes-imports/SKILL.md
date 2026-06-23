---
name: hermes-imports
description: Convert local Hermes operator workflows into sanitized ECC skills and
  release-pack artifacts. Use when preparing a Hermes workflow for public ECC reuse
  without leaking private workspace state, credentials, or local-only paths.
origin: ECC
---

# Hermes Imports

Use this skill when turning a repeated Hermes workflow into something safe to ship in ECC.

## When to Use

- A Hermes workflow has repeated enough times to become reusable.
- A local operator prompt should become a public ECC skill.
- A launch, content, research, or engineering workflow needs sanitized handoff docs.
- A workflow mentions local paths, credentials, personal datasets, or private account names that must be removed before publication.

## Sanitization Checklist

- Do not ship raw workspace exports.
- Remove local filesystem paths, account names, private project aliases, credentials, tokens, and private datasets.
- Replace private examples with public, synthetic, or domain-generic examples before adding release-pack artifacts.
- Re-read generated artifacts for secrets and local-only paths before publishing.

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
