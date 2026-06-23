- Modules/packages mirror Java split
- Ports: Kotlin interfaces
- Use cases: classes with constructor injection
- Composition: module definitions or dedicated composition functions

### Go

- Packages: `internal/<feature>/domain`, `application`, `ports`, `adapters/inbound`, `adapters/outbound`
- Ports: small interfaces owned by the consuming application package
- Use cases: structs with interface fields plus explicit `New...` constructors
- Composition: wire in `cmd/<app>/main.go` or dedicated wiring package

## Anti-Patterns

- Domain entities importing ORM models, web framework types, or SDK clients
- Use cases reading directly from `req`, `res`, or queue metadata
- Returning database rows directly from use cases
- Adapters calling each other directly instead of flowing through use cases
- Spreading dependency wiring across hidden global singletons

## Migration Playbook

1. Pick one vertical slice with frequent change pain
2. Extract a use-case boundary with explicit input/output types
3. Introduce outbound ports around existing infrastructure calls
4. Move orchestration logic from controllers/services into the use case
5. Keep old adapters delegating to the new use case
6. Add tests around the new boundary (unit + adapter integration)
7. Repeat slice-by-slice; avoid full rewrites

### Refactoring Tactics

- **Strangler approach**: keep current endpoints, route one use case at a time through new ports/adapters
- **Facade first**: wrap legacy services behind outbound ports before replacing internals
- **Composition freeze**: centralize wiring early
- **Slice selection rule**: prioritize high-churn, low-blast-radius flows first
- **Rollback path**: keep a reversible toggle per migrated slice until verified

## Testing Guidance

- **Domain tests**: pure business rules, no mocks or framework setup
- **Use-case unit tests**: orchestration with fakes/stubs for outbound ports
- **Outbound adapter contract tests**: shared contract suites at port level
- **Inbound adapter tests**: verify protocol mapping
- **Adapter integration tests**: real infrastructure for serialization, retries, timeouts
- **End-to-end tests**: critical journeys through inbound -> use case -> outbound
- **Refactor safety**: add characterization tests before extraction
