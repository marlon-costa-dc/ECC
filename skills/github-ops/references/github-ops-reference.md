# GitHub Operations Reference

Detailed commands and workflows for managing GitHub repositories with the `gh` CLI.

## Issue Triage Commands

```bash
# Search for potential duplicates
gh issue list --search "keyword" --state all --limit 20

# Add labels
gh issue edit <number> --add-label "bug,high-priority"

# Comment on issue
gh issue comment <number> --body "Thanks for reporting. Could you share reproduction steps?"
```

## PR Management Commands

```bash
# Check CI status
gh pr checks <number>

# Check mergeable
gh pr view <number> --json mergeable

# Find stale PRs by date
gh pr list --json number,title,updatedAt --jq '.[] | select(.updatedAt < "2026-03-01")'
```

## Stale Policy

- Issues with no activity in 14+ days: add `stale` label, comment asking for update.
- PRs with no activity in 7+ days: comment asking if still active.
- Auto-close stale issues after 30 days with no response and label `closed-stale`.

## CI/CD Commands

```bash
# List recent failed runs
gh run list --status failure --limit 10

# View failed run logs
gh run view <run-id> --log-failed

# Re-run a failed workflow
gh run rerun <run-id> --failed
```

## Release Commands

```bash
# List merged PRs since last release
gh pr list --state merged --base main --search "merged:>2026-03-01"

# Create a release
gh release create v1.2.0 --title "v1.2.0" --generate-notes

# Create a pre-release
gh release create v1.3.0-rc1 --prerelease --title "v1.3.0 Release Candidate 1"
```

## Security Commands

```bash
# Check Dependabot alerts
gh api repos/{owner}/{repo}/dependabot/alerts --jq '.[].security_advisory.summary'

# Check secret scanning alerts
gh api repos/{owner}/{repo}/secret-scanning/alerts --jq '.[].state'

# Review dependency PRs
gh pr list --label "dependencies" --json number,title
```

## Quality Gate

Before completing any GitHub operations task:
- all issues triaged have appropriate labels
- no PRs older than 7 days without a review or comment
- CI failures have been investigated (not just re-run)
- releases include accurate changelogs
- security alerts are acknowledged and tracked
