---
name: production-audit
description: Local-evidence production readiness audit for shipped apps, pre-launch
  reviews, post-merge checks, and "what breaks in prod?" questions without sending
  repo data to an external audit service.
origin: community
---

# Production Audit

Use this skill when the user asks whether an application is ready to ship, what could break in production, or what must be fixed before a launch. This is a maintainer-safe rewrite of the stale community production-audit idea: it keeps...

> Sujeito à lei no-bypass (AGENTS.md §0 / ADR-001 resolver-nunca-esconder): corrigir na raiz, verificar verde com evidência fresca, nunca mascarar/pular/adiar-como-pronto.

## When to Use

- The user asks "is this production-ready", "what would break in prod", "what
- A feature was merged and needs a pre-deploy or post-merge risk pass.
- A public launch, demo, customer rollout, or investor walkthrough is close.
- CI is green but the user wants production risk, not only test status.
- A deployed URL, release branch, PR, or current checkout is available for

## Workflow

1. Establish the release surface.
2. Read recent changes and current branch state.
3. Inspect runtime, auth, data, payment, background-job, AI, and deployment
4. Check CI, tests, migrations, environment documentation, and rollback path.
5. Produce a short ship/block recommendation with specific fixes.

For full details, examples, edge cases, and reference material, read `references/summary.md`.
