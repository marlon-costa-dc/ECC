---
name: quarkus-tdd-async-events
description: "Reference examples for quarkus-tdd: testing event services with JUnit 5 and Mockito."
origin: ECC
---

# Quarkus TDD — Event Service Tests

```java
@ExtendWith(MockitoExtension.class)
@DisplayName("EventService Unit Tests")
class EventServiceTest {

  @Mock private EventRepository eventRepository;
  @Mock private ObjectMapper objectMapper;
  @InjectMocks private EventService eventService;

  private BusinessRulesPayload testPayload;

  @BeforeEach
  void setUp() {
    testPayload = new BusinessRulesPayload();
    testPayload.setDocumentId(1L);
  }

  @Nested
  @DisplayName("Tests for createSuccessEvent")
  class CreateSuccessEvent {

    @Test
    @DisplayName("Should create success event with correct attributes")
    void givenValidPayload_whenCreateSuccessEvent_thenEventPersisted() throws Exception {
      when(objectMapper.writeValueAsString(testPayload)).thenReturn("{\"documentId\":1}");

      assertDoesNotThrow(() ->
          eventService.createSuccessEvent(testPayload, "DOCUMENT_PROCESSED"));

      verify(eventRepository).persist(argThat(event ->
          event.getType().equals("DOCUMENT_PROCESSED") &&
          event.getStatus() == EventStatus.SUCCESS &&
          event.getPayload().equals("{\"documentId\":1}") &&
          event.getTimestamp() != null
      ));
    }

    @Test
    @DisplayName("Should throw exception when payload is null")
    void givenNullPayload_whenCreateSuccessEvent_thenThrowsException() {
      assertThrows(NullPointerException.class,
          () -> eventService.createSuccessEvent(null, "EVENT_TYPE"));
      verify(eventRepository, never()).persist(any());
    }
  }

  @Nested
  @DisplayName("Tests for createErrorEvent")
  class CreateErrorEvent {

    @Test
    @DisplayName("Should create error event with error message")
    void givenError_whenCreateErrorEvent_thenEventPersistedWithMessage() throws Exception {
      String errorMessage = "Processing failed";
      when(objectMapper.writeValueAsString(testPayload)).thenReturn("{\"documentId\":1}");

      assertDoesNotThrow(() ->
          eventService.createErrorEvent(testPayload, "PROCESSING_ERROR", errorMessage));

      verify(eventRepository).persist(argThat(event ->
          event.getType().equals("PROCESSING_ERROR") &&
          event.getStatus() == EventStatus.ERROR &&
          event.getErrorMessage().equals(errorMessage) &&
          event.getPayload().equals("{\"documentId\":1}")
      ));
    }

    @ParameterizedTest
    @ValueSource(strings = {"", " "})
    @DisplayName("Should reject invalid error messages")
    void givenBlankErrorMessage_whenCreateErrorEvent_thenThrowsException(String blankMessage) {
      IllegalArgumentException exception = assertThrows(
          IllegalArgumentException.class,
          () -> eventService.createErrorEvent(testPayload, "ERROR", blankMessage)
      );
      assertThat(exception.getMessage()).contains("Error message cannot be blank");
    }
  }
}
```

See `async.md` for CompletableFuture test examples.
