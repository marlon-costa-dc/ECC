| Symptom | Correct Pattern |
|---|---|
| Importing `com.google.gson` or `com.fasterxml.jackson` | Use `org.tinystruct.data.component.Builder` / `Builders`. |
| Using `List<Builder>` for JSON arrays | Use `Builders` to avoid generic type erasure issues. |
| `ApplicationRuntimeException: template not found` | Call `setTemplateRequired(false)` in `init()` for API-only apps. |
| Annotating `private` methods with `@Action` | Actions must be `public` to be registered by the framework. |
| Hardcoding `main(String[] args)` in apps | Use `bin/dispatcher` as the entry point for all modules. |
| Manual `ActionRegistry` registration | Prefer the `@Action` annotation for automatic discovery. |
| Action not found at runtime | Ensure class is imported via `--import` or listed in `application.properties`. |
| CLI arg not visible | Pass with `--key value`; access via `getContext().getAttribute("--key")`. |
| Two methods same path, wrong one fires | Set explicit `mode` (e.g., `HTTP_GET` vs `HTTP_POST`) to disambiguate. |

## Best Practices

1. **Granular Applications**: Break logic into smaller, focused applications rather than one monolithic class.
2. **Setup in `init()`**: Leverage `init()` for setup (config, DB) rather than the constructor. Do NOT call `setAction()` — use `@Action` annotation.
3. **Mode Awareness**: Use the `Mode` parameter in `@Action` to restrict sensitive operations to `CLI` only or specific HTTP methods.
4. **Context over Params**: For optional CLI flags, use `getContext().getAttribute("--flag")` rather than adding parameters to the method signature.
5. **Asynchronous Events**: For heavy tasks triggered by events, use `CompletableFuture.runAsync()` inside the event handler.

## Technical Reference

Detailed guides are available in the `references/` directory:

- [Architecture & Config](references/architecture.md) — Abstractions, Package Map, Properties
- [Routing & @Action](references/routing.md) — Annotation details, Modes, Parameters
- [Data Handling](references/data-handling.md) — Builder, Builders, JSON serialization & parsing
- [Database Persistence](references/database.md) — AbstractData POJOs, CRUD, mapping XML, POJO generation
- [System & Usage](references/system-usage.md) — Context, Sessions, SSE, File Uploads, Events, Networking
- [Testing Patterns](references/testing.md) — JUnit 5 unit and HTTP integration testing

## Reference Source Files (Internal)

- `src/main/java/org/tinystruct/AbstractApplication.java` — Core base class with lifecycle hooks
- `src/main/java/org/tinystruct/system/annotation/Action.java` — Annotation & Modes
- `src/main/java/org/tinystruct/application/ActionRegistry.java` — Routing Engine
- `src/main/java/org/tinystruct/data/component/Builder.java` — JSON object serializer
- `src/main/java/org/tinystruct/data/component/Builders.java` — JSON array serializer
- `src/main/java/org/tinystruct/data/component/AbstractData.java` — Base POJO class with CRUD
- `src/main/java/org/tinystruct/data/Mapping.java` — Mapping XML parser
- `src/main/java/org/tinystruct/data/tools/MySQLGenerator.java` — POJO generator reference
- `src/main/java/org/tinystruct/data/component/FieldType.java` — SQL-to-Java type mappings
- `src/main/java/org/tinystruct/data/component/Condition.java` — Fluent SQL query builder
- `src/main/java/org/tinystruct/http/SSEPushManager.java` — SSE connection management
- `src/test/java/org/tinystruct/application/ActionRegistryTest.java` — Registry test examples
- `src/test/java/org/tinystruct/system/HttpServerHttpModeTest.java` — HTTP integration test patterns
