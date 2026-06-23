---
name: perl-security
description: Use when writing, reviewing, or hardening Perl code that handles user input, files, processes, databases, web output, sessions, or dependencies and the user needs secure defaults for taint mode, validation, SQL injection prevention, XSS/CSRF protection, and security tooling.
origin: ECC
---

# Perl Security Patterns

## When to Activate

- Handling user input in Perl applications
- Building or reviewing Perl web applications
- Performing file operations with user-supplied paths
- Executing system commands from Perl
- Writing DBI database queries

## Core Rules

1. **Enable taint mode** (`-T`) on web-facing scripts and sanitize `PATH` early.
2. **Validate with allowlists** and length limits; never use permissive regex untainting.
3. **Use three-argument `open`** with lexical filehandles; prevent path traversal with `realpath`.
4. **Use list-form `system`/`exec`** or `IPC::Run3`; never interpolate user data into shell commands.
5. **Use DBI placeholders** for every query; validate dynamic columns against allowlists.
6. **Encode output for its context**: `encode_entities()` for HTML, `uri_escape_utf8()` for URLs, `encode_json()` for JSON.
7. **Use framework CSRF protection**, constant-time token comparison, and secure session headers (HTTPS-only, `SameSite`, `HttpOnly`, CSP, HSTS, `X-Frame-Options`).
8. **Pin CPAN versions**, audit dependencies, and avoid ReDoS-prone regexes.

For detailed examples, checklist, and perlcritic configuration, see [references/perl-security-reference.md](references/perl-security-reference-1.md).

## Cross-References

- [perl-patterns](perl-patterns/SKILL.md) for modern Perl idioms.
- [perl-testing](perl-testing/SKILL.md) for Test2::V0 and security regression tests.
