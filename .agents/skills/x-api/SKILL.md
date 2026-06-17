---
name: x-api
description: 'Use this skill to use when integrating with the X/Twitter API to post
  tweets, threads, search timelines, or read analytics with OAuth patterns and rate-limit
  awareness. DO NOT USE FOR: questions unrelated to x-api creating projects or architecture
  from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# x-api

**UTILITY SKILL**

## When to use
## What to do
1. **Choose auth**
   - Read-only/search: OAuth 2.0 Bearer Token (`X_BEARER_TOKEN`).
   - Write/post/account: OAuth 1.0a user context (`X_CONSUMER_KEY`, `X_CONSUMER_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET`).
2. **Set env vars** from `developer.x.com`; never hardcode tokens.
3. **Request** `https://api.x.com/2/...` (media upload uses `https://upload.twitter.com/1.1/media/upload.json`).
4. **Handle rate limits**: read `x-rate-limit-remaining` and `x-rate-limit-reset`; back off.
5. **Return draft for approval** before posting unless user explicitly asked to post now.
6. **Track results** via `public_metrics` or returned tweet IDs.

## Critical rules
- Never hardcode or commit tokens; use `.env` excluded by `.gitignore`.
- Use OAuth 1.0a for writes; Bearer token is read/search only.
- Check rate-limit headers at runtime; do not rely on static limits.

## Example
**Input:** a request.
**Output:** a concise response.

## USE FOR

- Requests about x api.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to x-api.
- creating projects or architecture from scratch.

## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.

## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
