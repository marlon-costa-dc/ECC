---
name: security-review
description: Use this skill to review code and configs for security risks. Scan for secrets, validate input, check auth, and enforce secure patterns before merging sensitive changes.
---

# Security Review

**UTILITY SKILL**

Apply this skill whenever a change touches auth, input, secrets, APIs, or sensitive data.

## USE FOR:

- Reviewing auth, authorization, or session handling.
- Validating user input, file uploads, or API payloads.
- Checking for hardcoded secrets, credentials, or exposed PII.
- Reviewing new API endpoints, payment flows, or third-party integrations.

## DO NOT USE FOR:

- Replacing a full penetration test or formal security audit.
- Approving risky changes without fixes.

## INVOKES:

- Static scan for secrets (`sk-`, `api_key`, tokens).
- Schema validation, parameterized queries, secure cookies, CSP, rate limiting.
- `npm audit`, dependency checks when applicable.

## Workflow

1. Scan for hardcoded secrets and credentials.
2. Validate all input with strict schemas (whitelist).
3. Use parameterized queries / ORMs; never concatenate SQL.
4. Verify auth: check authorization before mutations; use httpOnly/Secure/SameSite cookies.
5. Prevent XSS: sanitize output, use CSP, avoid dangerous `innerHTML`.
6. Apply rate limiting; redact sensitive data from logs/errors.
7. Keep lock files committed and dependencies audited.

## Examples:

- "Review this login endpoint" → scan secrets → validate input → check cookie flags.
- "Is this API safe?" → check auth, rate limits, input schema, error redaction.

## Troubleshooting:

- Secret found → rotate it immediately; do not just delete from code.
- Input validation missing → add strict schema before merge.
- Dependency vulnerability → upgrade or pin; document risk if blocked.
