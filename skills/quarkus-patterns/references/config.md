---
name: quarkus-patterns-config
description: "Configuration reference for quarkus-patterns: YAML profiles, structured logging context, and Logback setup."
origin: ECC
---

# Quarkus Patterns — Configuration and Logging

## Configuration as YAML

```yaml
# application.yml
"%dev":
  quarkus:
    datasource:
      jdbc:
        url: jdbc:postgresql://localhost:5432/dev_db
      username: dev_user
      password: ${DB_PASSWORD}
    hibernate-orm:
      database:
        generation: drop-and-create

  rabbitmq:
    host: localhost
    port: 5672
    username: ${RABBITMQ_USER}
    password: ${RABBITMQ_PASSWORD}

"%test":
  quarkus:
    datasource:
      jdbc:
        url: jdbc:h2:mem:test
    hibernate-orm:
      database:
        generation: drop-and-create

"%prod":
  quarkus:
    datasource:
      jdbc:
        url: ${DATABASE_URL}
      username: ${DB_USER}
      password: ${DB_PASSWORD}
    hibernate-orm:
      database:
        generation: validate

  rabbitmq:
    host: ${RABBITMQ_HOST}
    port: ${RABBITMQ_PORT}
    username: ${RABBITMQ_USER}
    password: ${RABBITMQ_PASSWORD}

camel:
  rabbitmq:
    queue:
      business-rules: business-rules-queue
      invoice-processing: invoice-processing-queue
```

## Custom Logging Context Pattern (Logback)

```java
@ApplicationScoped
public class ProcessingService {

  public void processDocument(Document doc) {
    LogContext logContext = CustomLog.getCurrentContext();
    try (SafeAutoCloseable ignored = CustomLog.startScope(logContext)) {
      logContext.put("documentId", doc.getId().toString());
      logContext.put("documentType", doc.getType());
      logContext.put("userId", SecurityContext.getUserId());

      log.info("Starting document processing");
      processInternal(doc);
      log.info("Document processing completed");
    } catch (Exception e) {
      log.error("Document processing failed", e);
      throw e;
    }
  }
}
```

**Logback Configuration (logback.xml):**

```xml
<configuration>
  <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
    <encoder class="net.logstash.logback.encoder.LogstashEncoder">
      <includeContext>true</includeContext>
      <includeMdc>true</includeMdc>
    </encoder>
  </appender>

  <logger name="com.example" level="INFO"/>
  <root level="WARN">
    <appender-ref ref="CONSOLE"/>
  </root>
</configuration>
```

See `async-deps.md` for CompletableFuture async examples and Maven dependencies.
