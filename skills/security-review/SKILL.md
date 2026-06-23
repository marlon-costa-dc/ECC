---
name: security-review
description: Use when adding authentication, handling user input, working with secrets, creating API endpoints, implementing payment features, or storing and transmitting sensitive data.
origin: ECC
---

# Security Review

Use this skill to ensure code follows security best practices and to identify potential vulnerabilities.

> Sujeito à lei no-bypass (AGENTS.md §0 / ADR-001 resolver-nunca-esconder): corrigir na raiz, verificar verde com evidência fresca, nunca mascarar/pular/adiar-como-pronto.

## When to Activate

- Implementing authentication or authorization
- Handling user input or file uploads
- Creating new API endpoints
- Working with secrets or credentials
- Implementing payment features
- Storing or transmitting sensitive data
- Integrating third-party APIs

## Rules

1. **Secrets**: never hardcode keys, tokens, or passwords; use environment variables and platform secret managers.
2. **Input validation**: validate all user input with schemas; whitelist values; never pass raw input to queries or shell commands.
3. **SQL injection**: use parameterized queries or ORM methods; never concatenate SQL.
4. **Auth/AuthZ**: store tokens in httpOnly/Secure/SameSite=Strict cookies; check authorization before sensitive operations; enable Row Level Security.
5. **XSS**: sanitize user-provided HTML; configure a strict CSP; avoid `dangerouslySetInnerHTML` without sanitization.
6. **CSRF**: use CSRF tokens and SameSite=Strict cookies for state-changing operations.
7. **Rate limiting**: apply per-IP and per-user limits, stricter on expensive operations.
8. **Sensitive data exposure**: redact secrets from logs and user-facing error messages.
9. **Dependencies**: keep dependencies updated, commit lock files, and run `npm audit`.

## Resources

- [Detailed checklist and examples](references/security-checklist.md)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/security)
- [Supabase Security](https://supabase.com/docs/guides/auth)
