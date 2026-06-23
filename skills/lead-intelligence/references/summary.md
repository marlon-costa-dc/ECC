# Lead Intelligence

Agent-powered lead intelligence pipeline that finds, scores, and reaches high-value contacts through social graph analysis and warm path discovery.

## When to Activate

- User wants to find leads or prospects in a specific industry
- Building an outreach list for partnerships, sales, or fundraising
- Researching who to reach out to and the best path to reach them
- User says "find leads", "outreach list", "who should I reach out to", "warm intros"
- Needs to score or rank a list of contacts by relevance
- Wants to map mutual connections to find warm introduction paths

## Tool Requirements

### Required
- **Exa MCP** — Deep web search for people, companies, and signals (`web_search_exa`)
- **X API** — Follower/following graph, mutual analysis, recent activity (`X_BEARER_TOKEN`, plus write-context credentials such as `X_CONSUMER_KEY`, `X_CONSUMER_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET`)

### Optional (enhance results)
- **LinkedIn** — Direct API if available, otherwise browser control for search, profile inspection, and drafting
- **Apollo/Clay API** — For enrichment cross-reference if user has access
- **GitHub MCP** — For developer-centric lead qualification
- **Apple Mail / Mail.app** — Draft cold or warm email without sending automatically
- **Browser control** — For LinkedIn and X when API coverage is missing or constrained

## Pipeline Overview

[See code example 1 in `code-examples.md`]

## Voice Before Outreach

Do not draft outbound from generic sales copy.

Run `brand-voice` first whenever the user's voice matters. Reuse its `VOICE PROFILE` instead of re-deriving style ad hoc inside this skill.

If live X access is available, pull recent original posts before drafting. If not, use supplied examples or the best repo/site material available.

## Stage 1: Signal Scoring

Search for high-signal people in target verticals. Assign a weight to each based on:

| Signal | Weight | Source |
|--------|--------|--------|
| Role/title alignment | 30% | Exa, LinkedIn |
| Industry match | 25% | Exa company search |
| Recent activity on topic | 20% | X API search, Exa |
| Follower count / influence | 10% | X API |
| Location proximity | 10% | Exa, LinkedIn |
| Engagement with your content | 5% | X API interactions |

### Signal Search Approach

[See code example 2 in `code-examples.md`]

## Stage 2: Mutual Ranking

For each scored target, analyze the user's social graph to find the warmest path.

### Ranking Model

1. Pull user's X following list and LinkedIn connections
2. For each high-signal target, check for shared connections
3. Apply the `social-graph-ranker` model to score bridge value
4. Rank mutuals by:

| Factor | Weight |
|--------|--------|
| Number of connections to targets | 40% — highest weight, most connections = highest rank |
| Mutual's current role/company | 20% — decision maker vs individual contributor |
| Mutual's location | 15% — same city = easier intro |
| Industry alignment | 15% — same vertical = natural intro |
| Mutual's X handle / LinkedIn | 10% — identifiability for outreach |

Canonical rule:

[See code example 3 in `code-examples.md`]

Inside this skill, use the same weighted bridge model:

[See code example 4 in `code-examples.md`]

---

For additional details, continue reading `summary-1.md`, `summary-2.md`.
