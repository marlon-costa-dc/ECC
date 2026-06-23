---
name: social-publisher
description: Use when the user wants agent-driven scheduling and publishing of social media posts across 13 platforms via SocialClaw, including X, LinkedIn, Instagram, Facebook Pages, TikTok, Discord, Telegram, YouTube, Reddit, WordPress, or Pinterest, plus campaign management, media uploads, and post delivery monitoring.
origin: community
---

# Social Publisher (SocialClaw)

Connects Claude Code to [SocialClaw](https://getsocialclaw.com) for agent-driven social media publishing across 13 platforms through a single workspace API key.

## When to Activate

- publish content to X, LinkedIn, Instagram, TikTok, or other platforms
- schedule a post campaign across multiple platforms at once
- upload media for use in social posts
- validate a post schedule before going live
- monitor publishing run status and delivery analytics

## Setup

```bash
export SC_API_KEY="<workspace-key>"
printf 'header = "Authorization: Bearer %s"\n' "$SC_API_KEY" |
  curl -sS -K - https://getsocialclaw.com/v1/keys/validate
npm install -g socialclaw@0.1.12
socialclaw login --api-key <workspace-key>
```

## Core Workflow

1. List accounts: `socialclaw accounts list --json`
2. Connect providers: `socialclaw accounts connect --provider x --open`
3. Upload media: `socialclaw assets upload --file ./image.png --json`
4. Build `schedule.json` with provider, account, text, and `scheduled_at` per post.
5. Validate: `socialclaw validate -f schedule.json --json`
6. Publish: `socialclaw apply -f schedule.json --json` → returns `run_id`
7. Monitor: `socialclaw status --run-id <run-id> --json`

See [references/providers.md](references/providers.md) for provider key mapping.

## Security

- Outbound requests go to `getsocialclaw.com` only
- `SC_API_KEY` is workspace-scoped

## Related Skills

- `x-api` — direct X/Twitter API operations
- `social-graph-ranker` — network analysis for outreach targeting

## Source

- Dashboard: [SocialClaw dashboard](https://getsocialclaw.com/dashboard)
