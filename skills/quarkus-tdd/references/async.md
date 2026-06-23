---
name: quarkus-tdd-async
description: "Reference examples for quarkus-tdd: testing CompletableFuture async operations with JUnit 5 and Mockito."
origin: ECC
---

# Quarkus TDD — CompletableFuture Tests

```java
@ExtendWith(MockitoExtension.class)
@DisplayName("FileStorageService Unit Tests")
class FileStorageServiceTest {

  @Mock private S3Client s3Client;
  @Mock private ExecutorService executorService;
  @InjectMocks private FileStorageService fileStorageService;

  private InputStream testInputStream;
  private LogContext testLogContext;

  @BeforeEach
  void setUp() {
    testInputStream = new ByteArrayInputStream("test content".getBytes());
    testLogContext = new LogContext();
    testLogContext.put("traceId", "trace-123");
  }

  @Nested
  @DisplayName("Tests for uploadOriginalFile")
  class UploadOriginalFile {

    @Test
    @DisplayName("Should successfully upload file and return document info")
    void givenValidFile_whenUpload_thenReturnsDocumentInfo() throws Exception {
      doAnswer(invocation -> {
        ((Runnable) invocation.getArgument(0)).run();
        return null;
      }).when(executorService).execute(any(Runnable.class));

      when(s3Client.putObject(any(PutObjectRequest.class), any(RequestBody.class)))
          .thenReturn(PutObjectResponse.builder().build());

      CompletableFuture<StoredDocumentInfo> future =
          fileStorageService.uploadOriginalFile(testInputStream, 1024L,
              testLogContext, InvoiceFormat.UBL);

      StoredDocumentInfo result = future.join();

      assertThat(result).isNotNull();
      assertThat(result.getPath()).isNotBlank();
      assertThat(result.getSize()).isEqualTo(1024L);
      assertThat(result.getUploadedAt()).isNotNull();
      verify(s3Client).putObject(any(PutObjectRequest.class), any(RequestBody.class));
    }

    @Test
    @DisplayName("Should handle S3 upload failure")
    void givenS3Failure_whenUpload_thenCompletableFutureFails() {
      doAnswer(invocation -> {
        ((Runnable) invocation.getArgument(0)).run();
        return null;
      }).when(executorService).execute(any(Runnable.class));

      when(s3Client.putObject(any(PutObjectRequest.class), any(RequestBody.class)))
          .thenThrow(new StorageException("S3 unavailable"));

      CompletableFuture<StoredDocumentInfo> future =
          fileStorageService.uploadOriginalFile(testInputStream, 1024L,
              testLogContext, InvoiceFormat.UBL);

      assertThatThrownBy(() -> future.join())
          .isInstanceOf(CompletionException.class)
          .hasCauseInstanceOf(StorageException.class)
          .hasMessageContaining("S3 unavailable");
    }

    @Test
    @DisplayName("Should propagate LogContext to async operation")
    void givenLogContext_whenUpload_thenContextPropagated() throws Exception {
      AtomicReference<LogContext> capturedContext = new AtomicReference<>();

      doAnswer(invocation -> {
        capturedContext.set(CustomLog.getCurrentContext());
        ((Runnable) invocation.getArgument(0)).run();
        return null;
      }).when(executorService).execute(any(Runnable.class));

      fileStorageService.uploadOriginalFile(testInputStream, 1024L,
          testLogContext, InvoiceFormat.UBL).join();

      assertThat(capturedContext.get()).isNotNull();
      assertThat(capturedContext.get().get("traceId")).isEqualTo("trace-123");
    }
  }
}
```
