---
name: git-workflow
description: Use when deciding branching strategy, commit conventions, merge vs rebase, conflict resolution, pull-request flow, or collaborative Git practices for a team.
origin: ECC
---

# git-workflow

## When to use
- Choosing a branching strategy or setting up a Git workflow
- Writing commits, PRs, releases, or resolving conflicts
- Managing branches/tags or onboarding the team

## What to do
1. **Pick a strategy**: GitHub Flow (default, `main` + feature branches + PR), trunk-based (short-lived branches/feature flags), or GitFlow (scheduled releases with `develop`).
2. **Branch** from the right base: `feature/oauth-login`, `fix/api-null`, `hotfix/security-patch`, `release/1.2.0`.
3. **Commit** with Conventional Commits: `type(scope): subject` (`feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`, `ci`, `revert`).
4. **Sync** often: rebase local-only branches; merge shared branches.
5. **Open a PR** with clear title/description, linked issues, and passing CI.
6. **Resolve conflicts** before merging.
7. **Release** with semantic version tags: `git tag -a v1.2.0 -m "Release v1.2.0"`.

## Critical rules
- `main` is always deployable; never commit directly to it.
- Never rebase pushed/shared or protected branches.
- Keep feature branches small and short-lived.
- Use PRs and CI before merging.
- Never commit secrets, `.env`, or generated files.
- Do not force-push shared branches.

## Example
```bash
git checkout main && git pull origin main
git checkout -b feature/oauth-login
git commit -m "feat(auth): add OAuth2 login"
git push -u origin feature/oauth-login
# open PR, review, merge
```
