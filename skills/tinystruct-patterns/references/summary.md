# tinystruct Development Patterns

Architecture and implementation patterns for building modules with the **tinystruct** Java framework – a lightweight, high-performance framework that treats CLI and HTTP as equal citizens, requiring no `main()` method and minimal configuration.

## Core Principle

**CLI and HTTP are equal citizens.** Every method annotated with `@Action` should ideally be runnable from both a terminal and a web browser without modification. This "dual-mode" capability is the core design philosophy of tinystruct.

## When to Activate

### When to Use

- Creating new `Application` modules by extending `AbstractApplication`.
- Defining routes and command-line actions using `@Action`.
- Handling per-request state via `Context`.
- Performing JSON serialization using the native `Builder` and `Builders` components.
- Working with database persistence via `AbstractData` POJOs.
- Generating POJOs from database tables using the `generate` command.
- Implementing Server-Sent Events (SSE) for real-time push.
- Handling file uploads via multipart data.
- Making outbound HTTP requests with `URLRequest` and `HTTPHandler`.
- Configuring database connections or system settings in `application.properties`.
- Debugging routing conflicts (Actions) or CLI argument parsing.

## How It Works

The tinystruct framework treats any method annotated with `@Action` as a routable endpoint for both terminal and web environments. Applications are created by extending `AbstractApplication`, which provides core lifecycle hooks like `init()` and access to the request `Context`.

Routing is handled by the `ActionRegistry`, which automatically maps path segments to method arguments and injects dependencies. For data-only services, the native `Builder` and `Builders` components should be used for JSON serialization to maintain a zero-dependency footprint. The database layer uses `AbstractData` POJOs paired with XML mapping files for CRUD operations without external ORM libraries.

## Examples

### Basic Application (MyService)

[See code example 1 in `code-examples.md`]

### HTTP Mode Disambiguation (login)

[See code example 2 in `code-examples.md`]

### Native JSON Data Handling (Builder + Builders)

[See code example 3 in `code-examples.md`]

### SSE (Server-Sent Events)

[See code example 4 in `code-examples.md`]

### File Upload

[See code example 5 in `code-examples.md`]

## Configuration

Settings are managed in `src/main/resources/application.properties`.

[See code example 6 in `code-examples.md`]

Access config values in your application:

[See code example 7 in `code-examples.md`]

## Red Flags & Anti-patterns

---

For additional details, continue reading `summary-1.md`.
