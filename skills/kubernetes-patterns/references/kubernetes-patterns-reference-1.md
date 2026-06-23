# Kubernetes Patterns — Extended Reference

## Probes

| Probe | Failure Action | Use For |
|-------|---------------|---------|
| startupProbe | Kills container if slow to start | Slow-starting apps |
| livenessProbe | Restarts container | Deadlock / hung process |
| readinessProbe | Removes from Service endpoints | Temporary unavailability |

```yaml
startupProbe:
  httpGet: { path: /health, port: 8080 }
  failureThreshold: 30
  periodSeconds: 5
livenessProbe:
  httpGet: { path: /health, port: 8080 }
  periodSeconds: 30
  failureThreshold: 3
readinessProbe:
  httpGet: { path: /ready, port: 8080 }
  periodSeconds: 10
  failureThreshold: 2
```

## Services and Ingress

```yaml
apiVersion: v1
kind: Service
metadata: { name: my-app, namespace: my-namespace }
spec:
  selector: { app: my-app }
  ports: [{ port: 80, targetPort: 8080 }]
  type: ClusterIP
```

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-app
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls: [{ hosts: [myapp.example.com], secretName: my-app-tls }]
  rules:
    - host: myapp.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend: { service: { name: my-app, port: { number: 80 } } }
```

## ConfigMaps and Secrets

```yaml
apiVersion: v1
kind: ConfigMap
metadata: { name: my-app-config, namespace: my-namespace }
data:
  LOG_LEVEL: info
  APP_ENV: production
  app.yaml: |
    server: { port: 8080, timeout: 30s }
```

```bash
kubectl create secret generic my-app-secrets \
  --from-literal=db-password='s3cr3t' \
  --namespace=my-namespace \
  --dry-run=client -o yaml | kubectl apply -f -
```

Raw K8s Secrets are base64, not encrypted. Use External Secrets Operator or Sealed Secrets for production.

## Resource Requests and Limits

| Workload Type | CPU Request | Memory Request | Notes |
|---------------|-------------|----------------|-------|
| Web API | 100–250m | 128–256Mi | Limits 2-4x requests |
| Worker | 250–500m | 256–512Mi | Memory limit = request |
| JVM | 500m–1 | 512Mi–2Gi | Headroom above `-Xmx` |
| Sidecar | 10–50m | 32–64Mi | Keep minimal |

## RBAC

### App does NOT need K8s API

```yaml
apiVersion: v1
kind: ServiceAccount
metadata: { name: my-app-sa, namespace: my-namespace }
automountServiceAccountToken: false
```

Reference in pod spec: `serviceAccountName: my-app-sa` and `automountServiceAccountToken: false`.

### App DOES need K8s API

```yaml
apiVersion: v1
kind: ServiceAccount
metadata: { name: my-app-sa, namespace: my-namespace }
automountServiceAccountToken: true
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata: { name: my-app-role, namespace: my-namespace }
rules:
  - apiGroups: [""]
    resources: [configmaps]
    verbs: [get, list, watch]
  - apiGroups: [""]
    resources: [secrets]
    resourceNames: [my-app-secrets]
    verbs: [get]
---
apiVersion: rbac.authorization.k8s.io/v1

> Continued in [`kubernetes-patterns-reference-2.md`](kubernetes-patterns-reference-2.md)
