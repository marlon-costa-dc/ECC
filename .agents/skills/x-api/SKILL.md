---
name: x-api
description: Use when integrating with the X/Twitter API to post tweets, threads, search timelines, or read analytics with OAuth patterns and rate-limit awareness.
---

# x-api

## When to use
- Post tweets or threads to X programmatically
- Read timelines, mentions, or user data
- Search X for content, trends, or conversations
- Track analytics and engagement metrics
- User says "post to X", "tweet", "X API", or "Twitter API"

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
- Rotate tokens immediately if exposed.
- Combine with `brand-voice` and `content-engine`; require approval before posting.

## Example
```python
import os
from requests_oauthlib import OAuth1Session

oauth = OAuth1Session(
    os.environ["X_CONSUMER_KEY"],
    client_secret=os.environ["X_CONSUMER_SECRET"],
    resource_owner_key=os.environ["X_ACCESS_TOKEN"],
    resource_owner_secret=os.environ["X_ACCESS_TOKEN_SECRET"],
)
resp = oauth.post("https://api.x.com/2/tweets", json={"text": "Hello from Claude Code"})
resp.raise_for_status()
tweet_id = resp.json()["data"]["id"]
```
