---
name: browser-qa
description: Use when the user needs automated visual testing and UI interaction verification after deploying features to staging or preview, before shipping frontend changes, or when reviewing pull requests that touch UI code.
origin: ECC
---

# Browser QA — Automated Visual Testing & Interaction

## When to Use

- After deploying a feature to staging or preview
- When verifying UI behavior across pages
- Before shipping frontend changes
- When reviewing pull requests that touch frontend code
- Accessibility audits and responsive testing

## How It Works

Uses browser automation (claude-in-chrome, Playwright, or Puppeteer) to interact with live pages like a real user.

## Test Phases

### 1. Smoke Test
- Navigate to the target URL.
- Check for console errors (filter analytics and third-party noise).
- Verify no 4xx/5xx network requests.
- Screenshot above-the-fold on desktop and mobile.
- Check Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms.

### 2. Interaction Test
- Click every nav link and verify no dead links.
- Submit forms with valid and invalid data; verify success and error states.
- Test auth flow: login → protected page → logout.
- Test critical user journeys (checkout, onboarding, search).

### 3. Visual Regression
- Screenshot key pages at 375px, 768px, and 1440px.
- Compare against baselines if stored.
- Flag layout shifts > 5px, missing elements, and overflow.
- Check dark mode if applicable.

### 4. Accessibility
- Run axe-core or equivalent on each page.
- Flag WCAG AA violations (contrast, labels, focus order).
- Verify keyboard navigation end-to-end.
- Check screen reader landmarks.

## Output Format

Return a concise QA report: smoke status, interaction results, visual findings, accessibility violations, and a verdict such as `SHIP`, `SHIP WITH FIXES`, or `BLOCKED`.

## Integration

Works with any browser MCP: `mcp__claude-in-chrome__*` tools (preferred), Playwright, or Puppeteer.

Pair with `canary-watch` for post-deploy monitoring.
