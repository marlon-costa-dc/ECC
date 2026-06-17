---
name: quarkus-patterns-camel
description: "Apache Camel reference examples for quarkus-patterns: message publishing, direct routes, file processing, and bean invocation."
origin: ECC
---

# Quarkus Patterns — Camel Examples

## Camel Message Publishing (RabbitMQ)

```java
@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class BusinessRulesPublisher {
  private final ProducerTemplate producerTemplate;

  public void publishSync(BusinessRulesPayload payload) {
    producerTemplate.sendBody("direct:business-rules-publisher", payload);
  }
}
```

**Camel Route Configuration:**

```java
@ApplicationScoped
public class BusinessRulesRoute extends RouteBuilder {

  @ConfigProperty(name = "camel.rabbitmq.queue.business-rules")
  String businessRulesQueue;

  @ConfigProperty(name = "rabbitmq.host")
  String rabbitHost;

  @ConfigProperty(name = "rabbitmq.port")
  Integer rabbitPort;

  @Override
  public void configure() {
    from("direct:business-rules-publisher")
        .routeId("business-rules-publisher")
        .log("Publishing message to RabbitMQ: ${body}")
        .marshal().json(JsonLibrary.Jackson)
        .toF("spring-rabbitmq:%s?hostname=%s&portNumber=%d",
            businessRulesQueue, rabbitHost, rabbitPort);
  }
}
```

## Camel Direct Routes (In-Memory)

```java
@ApplicationScoped
public class DocumentProcessingRoute extends RouteBuilder {

  @Override
  public void configure() {
    onException(ValidationException.class)
        .handled(true)
        .to("direct:validation-error-handler")
        .log("Validation error: ${exception.message}");

    from("direct:process-document")
        .routeId("document-processing")
        .log("Processing document: ${header.documentId}")
        .bean(DocumentValidator.class, "validate")
        .bean(DocumentTransformer.class, "transform")
        .choice()
            .when(header("documentType").isEqualTo("INVOICE"))
                .to("direct:process-invoice")
            .when(header("documentType").isEqualTo("CREDIT_NOTE"))
                .to("direct:process-credit-note")
            .otherwise()
                .to("direct:process-generic")
        .end();

    from("direct:validation-error-handler")
        .bean(EventService.class, "createErrorEvent")
        .log("Validation error handled");
  }
}
```

## Camel File Processing

```java
@ApplicationScoped
public class FileMonitoringRoute extends RouteBuilder {

  @ConfigProperty(name = "file.input.directory")
  String inputDirectory;

  @ConfigProperty(name = "file.processed.directory")
  String processedDirectory;

  @ConfigProperty(name = "file.error.directory")
  String errorDirectory;

  @Override
  public void configure() {
    from("file:" + inputDirectory + "?move=" + processedDirectory +
         "&moveFailed=" + errorDirectory + "&delay=5000")
        .routeId("file-monitor")
        .log("Processing file: ${header.CamelFileName}")
        .to("direct:process-file");

    from("direct:process-file")
        .bean(OrderProcessingService.class, "processFile")
        .log("File processing completed");
  }
}
```

## Camel Bean Invocation

```java
@ApplicationScoped
public class InvoiceRoute extends RouteBuilder {

  @Override
  public void configure() {
    from("direct:invoice-validation")
        .bean(InvoiceFlowValidator.class, "validateFlowWithConfig")
        .log("Validation result: ${body}");

    from("direct:persist-and-publish")
        .bean(DocumentJobService.class, "createDocumentAndJobEntities")
        .bean(BusinessRulesPublisher.class, "publishAsync")
        .bean(EventService.class, "createSuccessEvent(${body}, 'PUBLISHED')");
  }
}
```
