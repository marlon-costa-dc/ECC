---
name: quarkus-tdd-camel
description: "Apache Camel route testing reference examples for quarkus-tdd using AdviceWith and MockEndpoint."
origin: ECC
---

# Quarkus TDD — Camel Route Tests

```java
@QuarkusTest
@DisplayName("Business Rules Camel Route Tests")
class BusinessRulesRouteTest {

  @Inject CamelContext camelContext;
  @Inject ProducerTemplate producerTemplate;
  @InjectMock EventService eventService;
  @InjectMock DocumentValidator documentValidator;

  private BusinessRulesPayload testPayload;

  @BeforeEach
  void setUp() {
    testPayload = new BusinessRulesPayload();
    testPayload.setDocumentId(1L);
    testPayload.setFlowProfile(FlowProfile.BASIC);
  }

  @Nested
  @DisplayName("Tests for business-rules-publisher route")
  class BusinessRulesPublisher {

    @Test
    @DisplayName("Should successfully publish message to RabbitMQ")
    void givenValidPayload_whenPublish_thenMessageSentToQueue() throws Exception {
      MockEndpoint mockRabbitMQ = camelContext.getEndpoint("mock:rabbitmq", MockEndpoint.class);
      mockRabbitMQ.expectedMessageCount(1);

      camelContext.getRouteController().stopRoute("business-rules-publisher");
      AdviceWith.adviceWith(camelContext, "business-rules-publisher", advice -> {
        advice.replaceFromWith("direct:business-rules-publisher");
        advice.weaveByToString(".*spring-rabbitmq.*").replace().to("mock:rabbitmq");
      });
      camelContext.getRouteController().startRoute("business-rules-publisher");

      producerTemplate.sendBody("direct:business-rules-publisher", testPayload);

      mockRabbitMQ.assertIsSatisfied(5000);
      assertThat(mockRabbitMQ.getExchanges()).hasSize(1);
      String body = mockRabbitMQ.getExchanges().get(0).getIn().getBody(String.class);
      assertThat(body).contains("\"documentId\":1");
    }
  }

  @Nested
  @DisplayName("Tests for document-processing route")
  class DocumentProcessing {

    @Test
    @DisplayName("Should route invoice to correct processor")
    void givenInvoiceType_whenProcess_thenRoutesToInvoiceProcessor() throws Exception {
      MockEndpoint mockInvoice = camelContext.getEndpoint("mock:invoice", MockEndpoint.class);
      mockInvoice.expectedMessageCount(1);

      camelContext.getRouteController().stopRoute("document-processing");
      AdviceWith.adviceWith(camelContext, "document-processing", advice -> {
        advice.weaveByToString(".*direct:process-invoice.*").replace().to("mock:invoice");
      });
      camelContext.getRouteController().startRoute("document-processing");

      producerTemplate.sendBodyAndHeader("direct:process-document",
          testPayload, "documentType", "INVOICE");

      mockInvoice.assertIsSatisfied(5000);
    }

    @Test
    @DisplayName("Should handle validation errors gracefully")
    void givenValidationError_whenProcess_thenRoutesToErrorHandler() throws Exception {
      MockEndpoint mockError = camelContext.getEndpoint("mock:error", MockEndpoint.class);
      mockError.expectedMessageCount(1);

      camelContext.getRouteController().stopRoute("document-processing");
      AdviceWith.adviceWith(camelContext, "document-processing", advice -> {
        advice.weaveByToString(".*direct:validation-error-handler.*")
            .replace().to("mock:error");
      });
      camelContext.getRouteController().startRoute("document-processing");

      when(documentValidator.validate(any())).thenThrow(new ValidationException("Invalid document"));

      producerTemplate.sendBody("direct:process-document", testPayload);

      mockError.assertIsSatisfied(5000);
      Exception exception = mockError.getExchanges().get(0).getException();
      assertThat(exception).isInstanceOf(ValidationException.class);
      assertThat(exception.getMessage()).contains("Invalid document");
    }
  }
}
```
