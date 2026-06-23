---
name: quarkus-tdd-coverage
description: "Coverage and dependency reference for quarkus-tdd: JaCoCo Maven configuration, test commands, and test dependencies."
origin: ECC
---

# Quarkus TDD — Coverage and Dependencies

## Coverage with JaCoCo

### Maven Configuration

```xml
<plugin>
  <groupId>org.jacoco</groupId>
  <artifactId>jacoco-maven-plugin</artifactId>
  <version>0.8.13</version>
  <executions>
    <execution>
      <id>prepare-agent</id>
      <goals><goal>prepare-agent</goal></goals>
    </execution>
    <execution>
      <id>report</id>
      <phase>verify</phase>
      <goals><goal>report</goal></goals>
    </execution>
    <execution>
      <id>check</id>
      <goals><goal>check</goal></goals>
      <configuration>
        <rules>
          <rule>
            <element>BUNDLE</element>
            <limits>
              <limit>
                <counter>LINE</counter>
                <value>COVEREDRATIO</value>
                <minimum>0.80</minimum>
              </limit>
              <limit>
                <counter>BRANCH</counter>
                <value>COVEREDRATIO</value>
                <minimum>0.70</minimum>
              </limit>
            </limits>
          </rule>
        </rules>
      </configuration>
    </execution>
  </executions>
</plugin>
```

Run tests with coverage:

```bash
mvn clean test
mvn jacoco:report
mvn jacoco:check
# Report at: target/site/jacoco/index.html
```

## Test Dependencies

```xml
<dependencies>
  <dependency>
    <groupId>io.quarkus</groupId>
    <artifactId>quarkus-junit5</artifactId>
    <scope>test</scope>
  </dependency>
  <dependency>
    <groupId>io.quarkus</groupId>
    <artifactId>quarkus-junit5-mockito</artifactId>
    <scope>test</scope>
  </dependency>
  <dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <scope>test</scope>
  </dependency>
  <dependency>
    <groupId>org.assertj</groupId>
    <artifactId>assertj-core</artifactId>
    <version>3.24.2</version>
    <scope>test</scope>
  </dependency>
  <dependency>
    <groupId>io.rest-assured</groupId>
    <artifactId>rest-assured</artifactId>
    <scope>test</scope>
  </dependency>
  <dependency>
    <groupId>org.apache.camel.quarkus</groupId>
    <artifactId>camel-quarkus-junit5</artifactId>
    <scope>test</scope>
  </dependency>
</dependencies>
```

## Best Practices

- Use `@Nested` classes to group tests by method
- Use `@DisplayName` for readable descriptions
- Follow `givenX_whenY_thenZ` naming convention
- Follow AAA pattern with explicit comments
- Mock all external dependencies
- Test happy paths, null inputs, edge cases, and exceptions
- Aim for 80%+ line coverage, 70%+ branch coverage
- Prefer AssertJ over JUnit assertions
- Use REST Assured for API testing
- Use `@InjectMock` instead of `@MockBean` (Quarkus-specific)
