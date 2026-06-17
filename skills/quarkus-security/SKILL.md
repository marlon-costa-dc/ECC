---
name: quarkus-security
description: "Use when securing Java Quarkus applications with JWT, OIDC, RBAC, Bean Validation, CORS, secrets management, security headers, rate limiting, audit logging, and dependency scanning."
origin: ECC
---

# Quarkus Security Review

Security best practices for Quarkus authentication, authorization, input handling, and configuration.

## When to Activate

- Adding authentication (JWT, OIDC, Basic Auth)
- Implementing authorization with `@RolesAllowed` or `SecurityIdentity`
- Validating user input or configuring CORS/security headers
- Managing secrets or adding rate limiting
- Scanning dependencies for CVEs

## Core Rules

- Always use HTTPS in production
- Enable JWT or OIDC for stateless authentication
- Use `@RolesAllowed` for declarative authorization
- Validate all input with Bean Validation
- Hash passwords with BCrypt (never plaintext)
- Store secrets in Vault or environment variables
- Use parameterized queries to prevent SQL injection
- Add security headers to all responses
- Implement rate limiting for public endpoints
- Audit sensitive operations
- Keep dependencies updated and scan for CVEs
- Use `SecurityIdentity` for programmatic checks
- Set appropriate CORS policies
- Test authentication and authorization paths

## Quick Examples

See `references/examples.md` for JWT auth, RBAC, Bean Validation, SQL injection prevention, and password hashing. See `references/advanced.md` for custom filters, programmatic security, custom validators, CORS, and secrets. See `references/ops.md` for headers, rate limiting, audit logging, and dependency scanning.

## Cross-References

- For patterns: `quarkus-patterns`
- For testing: `quarkus-tdd`
- For verification: `quarkus-verification`
