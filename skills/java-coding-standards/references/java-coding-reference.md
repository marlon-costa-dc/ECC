# Java Coding Reference

Detailed examples for `java-coding-standards`.

## Naming

```java
public class MarketService {}
public record Money(BigDecimal amount, Currency currency) {}
private final MarketRepository marketRepository;
private static final int MAX_PAGE_SIZE = 100;

// [QUARKUS] JAX-RS resources
public class MarketResource {}

// [SPRING] REST controllers
public class MarketController {}
```

## Immutability

```java
public record MarketDto(Long id, String name, MarketStatus status) {}

public class Market {
    private final Long id;
    private final String name;
}

// [QUARKUS] Panache active-record entities use public fields
@Entity
public class Market extends PanacheEntity {
    public String name;
    public MarketStatus status;
}
```

## Optional

```java
Optional<Market> market = marketRepository.findBySlug(slug);
return market
    .map(MarketResponse::from)
    .orElseThrow(() -> new EntityNotFoundException("Market not found"));
```

## Dependency Injection

```java
// [SPRING] Constructor injection
@Service
public class MarketService {
    private final MarketRepository marketRepository;
    public MarketService(MarketRepository marketRepository) {
        this.marketRepository = marketRepository;
    }
}

// [QUARKUS] Constructor injection
@ApplicationScoped
public class MarketService {
    private final MarketRepository marketRepository;
    @Inject
    public MarketService(MarketRepository marketRepository) {
        this.marketRepository = marketRepository;
    }
}

// FAIL: [SPRING] field injection
@Autowired private MarketRepository marketRepository;

// FAIL: [QUARKUS] @Singleton when interception is needed
@Singleton
public class MarketService {}
```

## Reactive Patterns [QUARKUS]

```java
@GET
@Path("/{slug}")
public Uni<Market> findBySlug(@PathParam("slug") String slug) {
    return Market.find("slug", slug)
        .<Market>firstResult()
        .onItem().ifNull().failWith(() -> new MarketNotFoundException(slug));
}

public Uni<OrderConfirmation> placeOrder(OrderRequest req) {
    return validateOrder(req)
        .chain(valid -> persistOrder(valid))
        .chain(order -> notifyFulfillment(order));
}
```

## Exception Handling

```java
// [SPRING]
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MarketNotFoundException.class)
    public ResponseEntity<ErrorResponse> handle(MarketNotFoundException ex) {
        return ResponseEntity.status(404).body(ErrorResponse.from(ex));
    }
}

// [QUARKUS]
@ServerExceptionMapper
public RestResponse<ErrorResponse> handle(MarketNotFoundException ex) {
    return RestResponse.status(Status.NOT_FOUND, ErrorResponse.from(ex));
}
```

## Project Structure

### [SPRING]

```text
src/main/java/com/example/app/
  config/
  controller/
  service/
  repository/
  domain/
  dto/
  util/
src/main/resources/application.yml
src/test/java/... (mirrors main)
```

### [QUARKUS]

```text
src/main/java/com/example/app/
  config/
  resource/
  service/
  repository/
  domain/
  dto/
  util/
  mapper/
src/main/resources/application.properties
src/test/java/... (mirrors main)
```

## Configuration

```java
// [SPRING]
@ConfigurationProperties(prefix = "market")
public record MarketProperties(int maxPageSize, Duration cacheTtl) {}

// [QUARKUS]
@ConfigMapping(prefix = "market")
public interface MarketConfig {
    int maxPageSize();
    Duration cacheTtl();
}

@ConfigProperty(name = "market.max-page-size", defaultValue = "100")
int maxPageSize;
```

## Testing

```java
// [SPRING]
@WebMvcTest(MarketController.class)
class MarketControllerTest {
    @Autowired MockMvc mockMvc;
    @MockBean MarketService marketService;
}

// [QUARKUS] integration
@QuarkusTest
class MarketResourceTest {
    @InjectMock MarketService marketService;

    @Test
    void should_return_404_when_market_not_found() {
        given().when().get("/markets/unknown").then().statusCode(404);
    }
}

// [QUARKUS] unit
@ExtendWith(MockitoExtension.class)
class MarketServiceTest {
    @Mock MarketRepository marketRepository;
    @InjectMocks MarketService marketService;
}
```

## Logging

```java
// [SPRING]
private static final Logger log = LoggerFactory.getLogger(MarketService.class);
log.info("fetch_market slug={}", slug);

// [QUARKUS]
private static final Logger log = Logger.getLogger(MarketService.class);
log.infof("fetch_market slug=%s", slug);
```
