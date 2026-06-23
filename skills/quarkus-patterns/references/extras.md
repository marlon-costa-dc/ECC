---
name: quarkus-patterns-extras
description: "Additional reference examples for quarkus-patterns: exception mapping, caching, and health checks."
origin: ECC
---

# Quarkus Patterns — Extras

## Exception Mapping

```java
@Provider
public class ValidationExceptionMapper implements ExceptionMapper<ConstraintViolationException> {
  @Override
  public Response toResponse(ConstraintViolationException exception) {
    String message = exception.getConstraintViolations().stream()
        .map(cv -> cv.getPropertyPath() + ": " + cv.getMessage())
        .collect(Collectors.joining(", "));

    return Response.status(Response.Status.BAD_REQUEST)
        .entity(Map.of("error", "validation_error", "message", message))
        .build();
  }
}

@Provider @Slf4j
public class GenericExceptionMapper implements ExceptionMapper<Exception> {
  @Override
  public Response toResponse(Exception exception) {
    log.error("Unhandled exception", exception);
    return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
        .entity(Map.of("error", "internal_error", "message", "An unexpected error occurred"))
        .build();
  }
}
```

## Caching

```java
@ApplicationScoped
@RequiredArgsConstructor
public class DocumentCacheService {
  private final DocumentRepository repo;

  @CacheResult(cacheName = "document-cache")
  public Optional<Document> getById(@CacheKey Long id) {
    return repo.findByIdOptional(id);
  }

  @CacheInvalidate(cacheName = "document-cache")
  public void evict(@CacheKey Long id) {}

  @CacheInvalidateAll(cacheName = "document-cache")
  public void evictAll() {}
}
```

## Health Checks

```java
@Readiness
@ApplicationScoped
@RequiredArgsConstructor
public class DatabaseHealthCheck implements HealthCheck {
  private final AgroalDataSource dataSource;

  @Override
  public HealthCheckResponse call() {
    try (Connection conn = dataSource.getConnection()) {
      boolean valid = conn.isValid(2);
      return HealthCheckResponse.named("Database connection").status(valid).build();
    } catch (SQLException e) {
      return HealthCheckResponse.down("Database connection");
    }
  }
}

@Liveness
@ApplicationScoped
public class CamelHealthCheck implements HealthCheck {
  @Inject CamelContext camelContext;

  @Override
  public HealthCheckResponse call() {
    boolean isStarted = camelContext.getStatus().isStarted();
    return HealthCheckResponse.named("Camel Context").status(isStarted).build();
  }
}
```
