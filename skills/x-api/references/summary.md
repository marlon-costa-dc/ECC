# X API

> **Drift-prone skill.** X API endpoints, access tiers, quotas, and write
> permissions change frequently. Verify current developer docs and account
> access before quoting rate limits or implementing a posting/search flow.

Programmatic interaction with X (Twitter) for posting, reading, searching, and analytics.

## When to Activate

- User wants to post tweets or threads programmatically
- Reading timeline, mentions, or user data from X
- Searching X for content, trends, or conversations
- Building X integrations or bots
- Analytics and engagement tracking
- User says "post to X", "tweet", "X API", or "Twitter API"

## Authentication

### OAuth 2.0 Bearer Token (App-Only)

Best for: read-heavy operations, search, public data.

[See code example 1 in `code-examples.md`]

[See code example 2 in `code-examples.md`]

### OAuth 1.0a (User Context)

Required for: posting tweets, managing account, DMs, and any write flow.

[See code example 3 in `code-examples.md`]

Legacy aliases such as `X_API_KEY`, `X_API_SECRET`, and `X_ACCESS_SECRET` may exist in older setups. Prefer the `X_CONSUMER_*` and `X_ACCESS_TOKEN_SECRET` names when documenting or wiring new flows.

[See code example 4 in `code-examples.md`]

## Core Operations

### Post a Tweet

[See code example 5 in `code-examples.md`]

### Post a Thread

[See code example 6 in `code-examples.md`]

### Read User Timeline

[See code example 7 in `code-examples.md`]

### Search Tweets

[See code example 8 in `code-examples.md`]

### Pull Recent Original Posts for Voice Modeling

[See code example 9 in `code-examples.md`]

### Get User by Username

[See code example 10 in `code-examples.md`]

### Upload Media and Post

[See code example 11 in `code-examples.md`]

## Rate Limits

X API rate limits vary by endpoint, auth method, and account tier, and they change over time. Always:
- Check the current X developer docs before hardcoding assumptions
- Read `x-rate-limit-remaining` and `x-rate-limit-reset` headers at runtime
- Back off automatically instead of relying on static tables in code

[See code example 12 in `code-examples.md`]

## Error Handling

[See code example 13 in `code-examples.md`]

## Security

- **Never hardcode tokens.** Use environment variables or `.env` files.
- **Never commit `.env` files.** Add to `.gitignore`.
- **Rotate tokens** if exposed. Regenerate at developer.x.com.
- **Use read-only tokens** when write access is not needed.
- **Store OAuth secrets securely** — not in source code or logs.

## Integration with Content Engine

Use `brand-voice` plus `content-engine` to generate platform-native content, then post via X API:
1. Pull recent original posts when voice matching matters
2. Build or reuse a `VOICE PROFILE`
3. Generate content with `content-engine` in X-native format
4. Validate length and thread structure
5. Return the draft for approval unless the user explicitly asked to post now
6. Post via X API only after approval
7. Track engagement via public_metrics

## Related Skills

---

For additional details, continue reading `summary-1.md`.
