---
name: github-ops
description: "Use when the user wants to manage GitHub repositories operationally through the gh CLI, including issue triage, pull-request lifecycle, CI/CD failure investigation, release preparation, Dependabot or secret-scanning alerts, and contributor experience."
origin: ECC
---

# GitHub Operations

Manage GitHub repositories with a focus on community health, CI reliability, and contributor experience.

## When to Activate

- Triaging issues, labeling, deduplicating.
- Managing PRs, CI checks, stale PRs, merge readiness.
- Debugging CI/CD failures.
- Preparing releases and changelogs.
- Monitoring Dependabot and security alerts.
- User says "check GitHub", "triage issues", "review PRs", "merge", "release", or "CI is broken".

## Tool Requirements

- **gh CLI** for GitHub API operations.
- Repository access via `gh auth login`.

## Issue Triage

Classify by type and priority, search duplicates, apply labels, and comment with next steps.

## PR Management

Check CI, mergeability, and age/last activity. Flag PRs older than 5 days with no review. Apply the stale policy for inactive issues and PRs.

## CI/CD Operations

When CI fails, view logs, identify the failing step, distinguish flaky from real failures, root-cause real issues, and note flaky patterns.

## Release Management

Ensure CI is green on main, review merged PRs, generate the changelog, and create the release with `gh release create --generate-notes`.

## Security Monitoring

Check Dependabot, secret-scanning, and dependency PRs. Review safe bumps, flag critical/high alerts, and check weekly.

## Quality Gate

Before completing: issues have labels; no PR older than 7 days without review; CI failures investigated; releases have changelogs; security alerts are tracked.

## References

- Detailed `gh` CLI commands, stale policy, and quality gate: [references/github-ops-reference.md](references/github-ops-reference.md)
