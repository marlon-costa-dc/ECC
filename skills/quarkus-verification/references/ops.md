---
name: quarkus-verification-ops
description: "Operational reference for quarkus-verification: native compilation, load testing with K6, container builds, and health checks."
origin: ECC
---

# Quarkus Verification — Operations

## Native Compilation

Test GraalVM native image compatibility:

```bash
# Build native executable
mvn package -Dnative

# Or with container
mvn package -Dnative -Dquarkus.native.container-build=true

# Test native executable
./target/*-runner

# Run basic smoke tests
curl http://localhost:8080/q/health/live
curl http://localhost:8080/q/health/ready
```

Example reflection config:

```java
@RegisterForReflection(targets = {MyDynamicClass.class})
public class ReflectionConfiguration {}
```

## Load Testing with K6

```javascript
// load-test.js
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  const res = http.get('http://localhost:8080/api/markets');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
}
```

Run: `k6 run load-test.js`

## Container Image Build

```bash
mvn package -Dquarkus.container-image.build=true

# Or with specific registry
mvn package \
  -Dquarkus.container-image.build=true \
  -Dquarkus.container-image.registry=docker.io \
  -Dquarkus.container-image.group=myorg \
  -Dquarkus.container-image.tag=1.0.0

# Test container
docker run -p 8080:8080 myorg/my-quarkus-app:1.0.0
```

Container security scans:

```bash
trivy image myorg/my-quarkus-app:1.0.0
grype myorg/my-quarkus-app:1.0.0
```

## Health Checks

```bash
curl http://localhost:8080/q/health/live
curl http://localhost:8080/q/health/ready
curl http://localhost:8080/q/health
curl http://localhost:8080/q/metrics
```

See `ci.md` for automated verification script, GitHub Actions workflow, and verification checklist.
