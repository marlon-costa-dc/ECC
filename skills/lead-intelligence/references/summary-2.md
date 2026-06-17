- LinkedIn: inspect target profile, recent activity, and mutual context, then draft or prepare the message
- X: inspect recent posts or replies, then draft DM or public reply language

If desktop automation is available:

- Apple Mail: create draft email with subject, body, and recipient

Do not send messages automatically without explicit user approval.

### Anti-Patterns

- generic templates with no personalization
- long paragraphs explaining your whole company
- multiple asks in one message
- fake familiarity without specifics
- bulk-sent messages with visible merge fields
- identical copy reused for email, LinkedIn, and X
- platform-shaped slop instead of the author's actual voice

## Configuration

Users should set these environment variables:

```bash
# Required
export X_BEARER_TOKEN="..."
export X_ACCESS_TOKEN="..."
export X_ACCESS_TOKEN_SECRET="..."
export X_CONSUMER_KEY="..."
export X_CONSUMER_SECRET="..."
export EXA_API_KEY="..."

# Optional
export LINKEDIN_COOKIE="..." # For browser-use LinkedIn access
export APOLLO_API_KEY="..."  # For Apollo enrichment
```

## Agents

This skill includes specialized agents in the `agents/` subdirectory:

- **signal-scorer** — Searches and ranks prospects by relevance signals
- **mutual-mapper** — Maps social graph connections and finds warm paths
- **enrichment-agent** — Pulls detailed profile and company data
- **outreach-drafter** — Generates personalized messages

## Example Usage

```
User: find me the top 20 people in prediction markets I should reach out to

Agent workflow:
1. signal-scorer searches Exa and X for prediction market leaders
2. mutual-mapper checks user's X graph for shared connections
3. enrichment-agent pulls company data and recent activity
4. outreach-drafter generates personalized messages for top ranked leads

Output: Ranked list with warm paths, voice profile summary, and channel-specific outreach drafts or drafts-in-app
```

## Related Skills

- `brand-voice` for canonical voice capture
- `connections-optimizer` for review-first network pruning and expansion before outreach
