Interpretation:
- Tier 1: high `R(m)` and direct bridge paths -> warm intro asks
- Tier 2: medium `R(m)` and one-hop bridge paths -> conditional intro asks
- Tier 3: no viable bridge -> direct cold outreach using the same lead record

### Output Format

```

If the user explicitly wants the ranking engine broken out, the math visualized, or the network scored outside the full lead workflow, run `social-graph-ranker` as a standalone pass first and feed the result back into this pipeline.
MUTUAL RANKING REPORT
=====================

#1  @mutual_handle (Score: 92)
    Name: Jane Smith
    Role: Partner @ Acme Ventures
    Location: San Francisco
    Connections to targets: 7
    Connected to: @target1, @target2, @target3, @target4, @target5, @target6, @target7
    Best intro path: Jane invested in Target1's company

#2  @mutual_handle2 (Score: 85)
    ...
```

## Stage 3: Warm Path Discovery

For each target, find the shortest introduction chain:

```
You ──[follows]──> Mutual A ──[invested in]──> Target Company
You ──[follows]──> Mutual B ──[co-founded with]──> Target Person
You ──[met at]──> Event ──[also attended]──> Target Person
```

### Path Types (ordered by warmth)
1. **Direct mutual** — You both follow/know the same person
2. **Portfolio connection** — Mutual invested in or advises target's company
3. **Co-worker/alumni** — Mutual worked at same company or attended same school
4. **Event overlap** — Both attended same conference/program
5. **Content engagement** — Target engaged with mutual's content or vice versa

## Stage 4: Enrichment

For each qualified lead, pull:

- Full name, current title, company
- Company size, funding stage, recent news
- Recent X posts (last 30 days) — topics, tone, interests
- Mutual interests with user (shared follows, similar content)
- Recent company events (product launch, funding round, hiring)

### Enrichment Sources
- Exa: company data, news, blog posts
- X API: recent tweets, bio, followers
- GitHub: open source contributions (for developer-centric leads)
- LinkedIn (via browser-use): full profile, experience, education

## Stage 5: Outreach Draft

Generate personalized outreach for each lead. The draft should match the source-derived voice profile and the target channel.

### Channel Rules

#### Email

- Use for the highest-value cold outreach, warm intros, investor outreach, and partnership asks
- Default to drafting in Apple Mail / Mail.app when local desktop control is available
- Create drafts first, do not send automatically unless the user explicitly asks
- Subject line should be plain and specific, not clever

#### LinkedIn

- Use when the target is active there, when mutual graph context is stronger on LinkedIn, or when email confidence is low
- Prefer API access if available
- Otherwise use browser control to inspect profiles, recent activity, and draft the message
- Keep it shorter than email and avoid fake professional warmth

#### X

- Use for high-context operator, builder, or investor outreach where public posting behavior matters
- Prefer API access for search, timeline, and engagement analysis
- Fall back to browser control when needed
- DMs and public replies should be much tighter than email and should reference something real from the target's timeline

#### Channel Selection Heuristic

Pick one primary channel in this order:

1. warm intro by email
2. direct email
3. LinkedIn DM
4. X DM or reply

Use multi-channel only when there is a strong reason and the cadence will not feel spammy.

### Warm Intro Request (to mutual)

Goal:

- one clear ask
- one concrete reason this intro makes sense
- easy-to-forward blurb if needed

Avoid:

> Continued in [`summary-2.md`](summary-2.md)
