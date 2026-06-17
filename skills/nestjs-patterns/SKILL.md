---
name: nestjs-patterns
description: Use when building or reviewing NestJS TypeScript backends, including modules, controllers, providers, DTO validation, guards, interceptors, exception filters, environment-aware configuration, persistence, and production defaults.
origin: ECC
metadata:
  adrs: []
---

# NestJS Development Patterns

Production-grade NestJS patterns for modular TypeScript backends.

## When to Activate

- Building NestJS APIs or services
- Structuring modules, controllers, and providers
- Adding DTO validation, guards, interceptors, or exception filters
- Configuring environment-aware settings and database integrations

## Bootstrap and Validation

- Use a global `ValidationPipe` with `whitelist`, `forbidNonWhitelisted`, and `transform`
- Apply `ClassSerializerInterceptor` globally to strip internal fields
- Register a global exception filter for consistent error envelopes
- Validate environment at boot; terminate on invalid config

## Modules, Controllers, Providers

- Controllers stay thin: parse input, call a provider, return response DTOs
- Business logic belongs in injectable services, not controllers
- Export only providers other modules genuinely need
- Use pipes to validate route inputs

## DTOs, Validation, Auth

- Validate every request DTO with `class-validator`
- Use dedicated response DTOs or serializers; avoid returning ORM entities
- Avoid leaking password hashes, tokens, or audit columns
- Keep auth strategies and guards module-local unless shared
- Encode coarse access rules in guards; do resource-specific authorization in services

## Error Handling and Persistence

- Keep one consistent error envelope across the API
- Throw framework exceptions for expected client errors; log unexpected failures centrally
- Keep repository/ORM code behind providers that speak domain language
- Isolate transactional workflows in services that own the unit of work
- Do not let controllers coordinate multi-step writes directly

## Testing

- Unit test providers in isolation with mocked dependencies
- Reuse the same global pipes/filters in tests that run in production

## Production Defaults

- Enable structured logging and request correlation IDs
- Use async provider initialization for DB/cache clients with health checks
- Keep background jobs and event consumers in their own modules

## References

- [NestJS Patterns Reference](references/nestjs-patterns.md) — detailed code examples

## Related Skills

- `api-design`, `backend-patterns`, `hexagonal-architecture`, `nestjs-tdd`, `security-review`
