---
name: quarkus-tdd-unit
description: "Unit testing reference examples for quarkus-tdd: JUnit 5 with Mockito and structured test organization."
origin: ECC
---

# Quarkus TDD — Unit Tests

## Unit Tests with @Nested

```java
@ExtendWith(MockitoExtension.class)
@DisplayName("OrderService Unit Tests")
class OrderServiceTest {

  @Mock private OrderRepository orderRepository;
  @Mock private EventService eventService;
  @Mock private FulfillmentPublisher fulfillmentPublisher;
  @InjectMocks private OrderService orderService;

  private CreateOrderCommand validCommand;

  @BeforeEach
  void setUp() {
    validCommand = new CreateOrderCommand("customer-123", List.of(new OrderLine("sku-123", 2)));
  }

  @Nested
  @DisplayName("Tests for createOrder")
  class CreateOrder {

    @Test
    @DisplayName("Should persist order and publish fulfillment event")
    void givenValidCommand_whenCreateOrder_thenPersistsAndPublishes() {
      doNothing().when(orderRepository).persist(any(Order.class));

      OrderReceipt receipt = orderService.createOrder(validCommand);

      assertThat(receipt).isNotNull();
      assertThat(receipt.customerId()).isEqualTo("customer-123");
      verify(orderRepository).persist(any(Order.class));
      verify(fulfillmentPublisher).publishAsync(receipt);
      verify(eventService).createSuccessEvent(receipt, "ORDER_CREATED");
    }

    @Test
    @DisplayName("Should reject missing customer id")
    void givenMissingCustomerId_whenCreateOrder_thenThrowsBadRequest() {
      CreateOrderCommand invalid = new CreateOrderCommand("", validCommand.lines());

      WebApplicationException exception = assertThrows(
          WebApplicationException.class,
          () -> orderService.createOrder(invalid)
      );

      assertThat(exception.getResponse().getStatus()).isEqualTo(400);
      verify(orderRepository, never()).persist(any(Order.class));
      verify(fulfillmentPublisher, never()).publishAsync(any());
    }

    @Test
    @DisplayName("Should record error event when persistence fails")
    void givenPersistenceFailure_whenCreateOrder_thenRecordsErrorEvent() {
      doThrow(new PersistenceException("database unavailable"))
          .when(orderRepository).persist(any(Order.class));

      PersistenceException exception = assertThrows(
          PersistenceException.class,
          () -> orderService.createOrder(validCommand)
      );

      assertThat(exception.getMessage()).contains("database unavailable");
      verify(eventService).createErrorEvent(
          eq(validCommand),
          eq("ORDER_CREATE_FAILED"),
          contains("database unavailable")
      );
      verify(fulfillmentPublisher, never()).publishAsync(any());
    }
  }
}
```

### Key Patterns

- `@Nested` classes group tests by method
- `@DisplayName` provides readable descriptions
- Naming convention: `givenX_whenY_thenZ`
- AAA pattern with explicit `// ARRANGE`, `// ACT`, `// ASSERT` comments
- `@BeforeEach` for common test data setup
- `verify(mock, never())` ensures methods are NOT called in error scenarios

See `async-events.md` for event service and CompletableFuture test examples.
