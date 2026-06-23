# Code Examples

## Example 1

```yaml
apiVersion: apps/v1
kind: Deployment
metadata: { name: my-app }
spec:
  replicas: 3
  selector: { matchLabels: { app: my-app } }
  template:
    spec:
      securityContext: { runAsNonRoot: true, runAsUser: 1001 }
      serviceAccountName: my-app-sa
      containers:
        - name: app
          image: ghcr.io/org/my-app:1.0.0
          ports: [{ containerPort: 8080 }]
          resources:
            requests: { cpu: "100m", memory: "128Mi" }
            limits: { cpu: "500m", memory: "256Mi" }
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities: { drop: [ALL] }
          livenessProbe:
            httpGet: { path: /health, port: 8080 }
            periodSeconds: 30
            failureThreshold: 3
          readinessProbe:
            httpGet: { path: /ready, port: 8080 }
            periodSeconds: 10
            failureThreshold: 2
```
