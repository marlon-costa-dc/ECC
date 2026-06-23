---
name: quarkus-patterns-examples
description: "Reference examples for quarkus-patterns: service layer, event service, Panache repository, REST resources, DTOs, and validation."
origin: ECC
---

# Quarkus Patterns — Examples

## Service Layer with Multiple Dependencies

```java
@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class OrderProcessingService {

  private final OrderValidator orderValidator;
  private final EventService eventService;
  private final OrderRepository orderRepository;
  private final FulfillmentPublisher fulfillmentPublisher;
  private final AuditPublisher auditPublisher;

  @Transactional
  public OrderReceipt process(CreateOrderCommand command) {
    ValidationResult validation = orderValidator.validate(command);
    if (!validation.valid()) {
      eventService.createErrorEvent(command, "ORDER_REJECTED", validation.message());
      throw new WebApplicationException(validation.message(), Response.Status.BAD_REQUEST);
    }

    Order order = Order.from(command);
    orderRepository.persist(order);

    OrderReceipt receipt = OrderReceipt.from(order);
    fulfillmentPublisher.publishAsync(receipt);
    auditPublisher.publish("ORDER_ACCEPTED", receipt);
    eventService.createSuccessEvent(receipt, "ORDER_ACCEPTED");

    log.info("Processed order {}", order.id);
    return receipt;
  }
}
```

## Event Service Pattern

```java
@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class EventService {
  private final EventRepository eventRepository;
  private final ObjectMapper objectMapper;

  public void createSuccessEvent(Object payload, String eventType) {
    Objects.requireNonNull(payload, "Payload cannot be null");
    Event event = new Event();
    event.setType(eventType);
    event.setStatus(EventStatus.SUCCESS);
    event.setPayload(serializePayload(payload));
    event.setTimestamp(Instant.now());
    eventRepository.persist(event);
    log.info("Success event created: {}", eventType);
  }

  private String serializePayload(Object payload) {
    try {
      return objectMapper.writeValueAsString(payload);
    } catch (JsonProcessingException e) {
      throw new IllegalStateException("Failed to serialize event payload", e);
    }
  }
}
```

## Repository Pattern (Panache Repository)

```java
@ApplicationScoped
public class DocumentRepository implements PanacheRepository<Document> {

  public List<Document> findByStatus(DocumentStatus status, int page, int size) {
    return find("status = ?1 order by createdAt desc", status)
        .page(page, size)
        .list();
  }

  public Optional<Document> findByReferenceNumber(String referenceNumber) {
    return find("referenceNumber", referenceNumber).firstResultOptional();
  }

  public long countByStatusAndDate(DocumentStatus status, LocalDate date) {
    return count("status = ?1 and createdAt >= ?2", status, date.atStartOfDay());
  }
}
```

## REST API Structure

```java
@Path("/api/documents")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequiredArgsConstructor
public class DocumentResource {
  private final DocumentService documentService;

  @GET
  public Response list(
      @QueryParam("page") @DefaultValue("0") int page,
      @QueryParam("size") @DefaultValue("20") int size) {
    return Response.ok(documentService.list(page, size)).build();
  }

  @POST
  public Response create(@Valid CreateDocumentRequest request, @Context UriInfo uriInfo) {
    Document document = documentService.create(request);
    URI location = uriInfo.getAbsolutePathBuilder()
        .path(String.valueOf(document.id))
        .build();
    return Response.created(location).entity(DocumentResponse.from(document)).build();
  }

  @GET
  @Path("/{id}")
  public Response getById(@PathParam("id") Long id) {
    return documentService.findById(id)
        .map(DocumentResponse::from)
        .map(Response::ok)
        .orElse(Response.status(Response.Status.NOT_FOUND))
        .build();
  }
}
```

## DTOs and Validation

```java
public record CreateDocumentRequest(
    @NotBlank @Size(max = 200) String referenceNumber,
    @NotBlank @Size(max = 2000) String description,
    @NotNull @FutureOrPresent Instant validUntil,
    @NotEmpty List<@NotBlank String> categories) {}

public record DocumentResponse(Long id, String referenceNumber, DocumentStatus status) {
  public static DocumentResponse from(Document document) {
    return new DocumentResponse(document.getId(), document.getReferenceNumber(),
        document.getStatus());
  }
}
```

See `extras.md` for exception mapping, caching, and health checks.
