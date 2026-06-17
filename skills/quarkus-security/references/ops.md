---
name: quarkus-security-ops
description: "Operational security reference examples for quarkus-security: rate limiting, security headers, audit logging, and dependency scanning."
origin: ECC
---

# Quarkus Security — Operational Examples

## Rate Limiting

**Security Note**: Never use `X-Forwarded-For` directly — clients can spoof it. Use the actual remote address or an authenticated identity.

```java
@ApplicationScoped
public class RateLimitFilter implements ContainerRequestFilter {
  private final Map<String, RateLimiter> limiters = new ConcurrentHashMap<>();

  @Inject HttpServletRequest servletRequest;

  @Override
  public void filter(ContainerRequestContext requestContext) {
    String clientId = servletRequest.getRemoteAddr();
    RateLimiter limiter = limiters.computeIfAbsent(clientId,
        k -> RateLimiter.create(100.0)); // 100 requests per second

    if (!limiter.tryAcquire()) {
      requestContext.abortWith(
          Response.status(429)
              .entity(Map.of("error", "Too many requests"))
              .build()
      );
    }
  }
}
```

## Security Headers

```java
@Provider
public class SecurityHeadersFilter implements ContainerResponseFilter {

  @Override
  public void filter(ContainerRequestContext request, ContainerResponseContext response) {
    MultivaluedMap<String, Object> headers = response.getHeaders();
    headers.putSingle("X-Frame-Options", "DENY");
    headers.putSingle("X-Content-Type-Options", "nosniff");
    headers.putSingle("X-XSS-Protection", "1; mode=block");
    headers.putSingle("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    headers.putSingle("Content-Security-Policy",
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'");
  }
}
```

## Audit Logging

```java
@ApplicationScoped
public class AuditService {
  private static final Logger LOG = Logger.getLogger(AuditService.class);

  @Inject SecurityIdentity securityIdentity;

  public void logAccess(String resource, String action) {
    String user = securityIdentity.isAnonymous()
        ? "anonymous"
        : securityIdentity.getPrincipal().getName();
    LOG.infof("AUDIT: user=%s action=%s resource=%s timestamp=%s",
        user, action, resource, Instant.now());
  }
}
```

## Dependency Security Scanning

```bash
mvn org.owasp:dependency-check-maven:check
./gradlew dependencyCheckAnalyze
quarkus extension list --installable
```
