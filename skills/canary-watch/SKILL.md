---
name: canary-watch
description: Use when the user needs to monitor and verify a deployed URL after releases, merges, dependency upgrades, or during a launch window to detect HTTP regressions, console errors, network failures, performance drift, missing content, broken static assets, or SSE stream failures.
origin: ECC
---

# Canary Watch — Post-Deploy Monitoring

## When to Use

- After deploying to production or staging
- After merging a risky pull request
- When verifying a fix actually resolved the issue
- During a launch window
- After dependency upgrades

## How It Works

Monitors a deployed URL in a loop until stopped or until the watch window expires, then reports regressions.

## Watch List

- **HTTP endpoints**: status, redirects, latency, and 4xx/5xx regressions.
- **SSE Streams**: connection setup, first event, heartbeat, reconnects, and drops.
- **Static Assets**: JavaScript, CSS, image, font, and source-map responses.
- **Console errors**: new browser errors, failed module loads, and noisy warnings.
- **Performance regressions**: LCP, CLS, INP, response time, and request volume drift.

## Watch Modes

- **Quick check**: single pass, report results.
- **Sustained watch**: check every N minutes for M hours.
- **Diff mode**: compare staging vs production.

## Alert Thresholds

- **Critical**: HTTP != 200, > 5 new console errors, LCP > 4s, 5xx API responses, 4xx/5xx static assets, SSE endpoint cannot connect or drops before first heartbeat.
- **Warning**: LCP delta > 500ms, CLS > 0.1, new console warnings, response time > 2x baseline, unexpected asset content type, SSE heartbeat latency > 2x baseline.
- **Info**: minor performance variance, new third-party requests.

## Notifications

On critical thresholds: desktop notification, optional Slack/Discord webhook, and log to `~/.claude/canary-watch.log`.

## Output

Return a Canary Report with status (HEALTHY / DEGRADED / CRITICAL), a results table per check, and a regression summary.

## Integration

Pair with `browser-qa` for pre-deploy verification and with post-deploy hooks or GitHub Actions.
