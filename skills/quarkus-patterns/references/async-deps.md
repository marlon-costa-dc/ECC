---
name: quarkus-patterns-async-deps
description: "Reference for quarkus-patterns: CompletableFuture async operations and Maven dependencies."
origin: ECC
---

# Quarkus Patterns — Async and Dependencies

## CompletableFuture Async Operations

```java
@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class FileStorageService {
  private final S3Client s3Client;
  private final ExecutorService executorService;

  @ConfigProperty(name = "storage.bucket-name")
  String bucketName;

  public CompletableFuture<StoredDocumentInfo> uploadOriginalFile(
      InputStream inputStream, long size, LogContext logContext, InvoiceFormat format) {

    return CompletableFuture.supplyAsync(() -> {
      try (SafeAutoCloseable ignored = CustomLog.startScope(logContext)) {
        String path = generateStoragePath(format);

        PutObjectRequest request = PutObjectRequest.builder()
            .bucket(bucketName)
            .key(path)
            .contentLength(size)
            .build();

        s3Client.putObject(request, RequestBody.fromInputStream(inputStream, size));
        log.info("File uploaded to S3: {}", path);
        return new StoredDocumentInfo(path, size, Instant.now());
      } catch (Exception e) {
        log.error("Failed to upload file to S3", e);
        throw new StorageException("Upload failed", e);
      }
    }, executorService);
  }
}
```

## Dependencies (Maven)

```xml
<properties>
  <quarkus.platform.version>3.27.0</quarkus.platform.version>
  <lombok.version>1.18.42</lombok.version>
  <maven.compiler.release>17</maven.compiler.release>
</properties>

<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>io.quarkus.platform</groupId>
      <artifactId>quarkus-bom</artifactId>
      <version>${quarkus.platform.version}</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
    <dependency>
      <groupId>io.quarkus.platform</groupId>
      <artifactId>quarkus-camel-bom</artifactId>
      <version>${quarkus.platform.version}</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>

<dependencies>
  <dependency>
    <groupId>io.quarkus</groupId>
    <artifactId>quarkus-arc</artifactId>
  </dependency>
  <dependency>
    <groupId>io.quarkus</groupId>
    <artifactId>quarkus-config-yaml</artifactId>
  </dependency>
  <dependency>
    <groupId>org.apache.camel.quarkus</groupId>
    <artifactId>camel-quarkus-spring-rabbitmq</artifactId>
  </dependency>
  <dependency>
    <groupId>org.apache.camel.quarkus</groupId>
    <artifactId>camel-quarkus-direct</artifactId>
  </dependency>
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>${lombok.version}</version>
    <scope>provided</scope>
  </dependency>
  <dependency>
    <groupId>io.quarkiverse.logging.logback</groupId>
    <artifactId>quarkus-logging-logback</artifactId>
  </dependency>
  <dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
  </dependency>
</dependencies>
```
