---
name: springboot-security
description: "Use when securing Java Spring Boot services with authentication, authorization, input validation, CSRF, CORS, secrets management, security headers, rate limiting, and dependency scanning."
origin: ECC
---

# Spring Boot Security Review

Security best practices for Spring Boot authentication, authorization, input handling, and configuration.

## When to Activate

- Adding authentication (JWT, OAuth2, session-based)
- Implementing authorization (`@PreAuthorize`, role-based access)
- Validating user input or configuring CORS/CSRF/security headers
- Managing secrets or adding rate limiting
- Scanning dependencies for CVEs

## Core Rules

- Deny by default; expose only required scopes
- Prefer stateless JWT or opaque tokens with revocation list
- Set `httpOnly`, `Secure`, `SameSite=Strict` cookies for sessions
- Hash passwords with BCrypt or Argon2 via `PasswordEncoder`
- Disable CSRF only for pure Bearer-token APIs
- Externalize secrets; use placeholders, env vars, or Vault
- Use parameterized queries; never concatenate SQL strings
- Restrict CORS origins; never use `*` in production
- Add security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)
- Scan dependencies with OWASP Dependency Check or Snyk
- Never log secrets, tokens, passwords, or PAN data

## Quick Examples

See `references/examples.md` for JWT filter, `@PreAuthorize`, Bean Validation, parameterized queries, and password encoding examples. See `references/advanced.md` for CSRF, secrets, security headers, CORS, rate limiting, dependency scanning, and logging PII examples.

## Checklist Before Release

- [ ] Auth tokens validated and expired correctly
- [ ] Authorization guards on every sensitive path
- [ ] All inputs validated and sanitized
- [ ] No string-concatenated SQL
- [ ] CSRF posture correct for app type
- [ ] Secrets externalized; none committed
- [ ] Security headers configured
- [ ] Rate limiting on APIs
- [ ] Dependencies scanned and up to date
- [ ] Logs free of sensitive data

## Cross-References

- For patterns: `springboot-patterns`
- For testing: `springboot-tdd`
- For verification: `springboot-verification`
