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
kind: RoleBinding
metadata: { name: my-app-rolebinding, namespace: my-namespace }
subjects: [{ kind: ServiceAccount, name: my-app-sa, namespace: my-namespace }]
roleRef: { kind: Role, apiGroup: rbac.authorization.k8s.io, name: my-app-role }
```

## Horizontal Pod Autoscaler

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata: { name: my-app-hpa, namespace: my-namespace }
spec:
  scaleTargetRef: { apiVersion: apps/v1, kind: Deployment, name: my-app }
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource: { name: cpu, target: { type: Utilization, averageUtilization: 70 } }
```

Requires `resources.requests` on all containers.

## PodDisruptionBudget

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata: { name: my-app-pdb, namespace: my-namespace }
spec:
  minAvailable: 2
  selector: { matchLabels: { app: my-app } }
```

## Namespaces and Quotas

```bash
kubectl create namespace my-namespace
kubectl apply -f - <<EOF
apiVersion: v1
kind: ResourceQuota
metadata: { name: my-namespace-quota, namespace: my-namespace }
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 4Gi
    limits.cpu: "8"
    limits.memory: 8Gi
    pods: "20"
EOF
```

## Jobs and CronJobs

```yaml
apiVersion: batch/v1
kind: Job
metadata: { name: db-migrate, namespace: my-namespace }
spec:
  backoffLimit: 3
  ttlSecondsAfterFinished: 3600
  template:
    spec:
      restartPolicy: OnFailure
      containers:
        - name: migrate
          image: ghcr.io/org/my-app:1.0.0
          command: [python, manage.py, migrate]
          resources: { requests: { cpu: "100m", memory: "256Mi" } }
```

```yaml
apiVersion: batch/v1
kind: CronJob
metadata: { name: cleanup-job, namespace: my-namespace }
spec:
  schedule: "0 2 * * *"
  concurrencyPolicy: Forbid
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: cleanup
              image: ghcr.io/org/cleanup:1.0.0
              resources: { requests: { cpu: "50m", memory: "64Mi" } }
```

## kubectl Cheatsheet

```bash
kubectl get pods -n my-namespace
kubectl describe pod <pod> -n my-namespace
kubectl logs <pod> -n my-namespace --previous
kubectl exec -it <pod> -n my-namespace -- sh
kubectl top pods -n my-namespace
kubectl rollout status deployment/my-app -n my-namespace
kubectl rollout undo deployment/my-app -n my-namespace
kubectl scale deployment my-app --replicas=5 -n my-namespace
kubectl get events -n my-namespace --sort-by='.lastTimestamp'
kubectl port-forward svc/my-app 8080:80 -n my-namespace
kubectl apply -f deployment.yaml --dry-run=server
```

### Common Errors

- **CrashLoopBackOff:** `kubectl logs --previous`; check exit code/OOM
- **ImagePullBackOff:** check image tag, imagePullSecret, registry auth
- **Pending:** insufficient resources, node selector, taint mismatch
- **OOMKilled:** increase memory limits

## Anti-Patterns

- `:latest` tags
- Running as root
- No resource limits
- Plaintext secrets in ConfigMaps
- `cluster-admin` for app service accounts
- `minAvailable: 0` in PDB
- `restartPolicy: Always` in Jobs

## Checklist

- Security: non-root, readOnlyRootFilesystem, drop ALL, dedicated SA, no auto token unless needed, least-privilege RBAC, external secrets
- Reliability: all 3 probes, requests/limits, minReplicas 2+, PDB, RollingUpdate with maxUnavailable 0, HPA
- Observability: `/health` and `/ready`, structured logs, labels

## Related Skills

- `docker-patterns`
- `deployment-patterns`
- `security-review`
- `git-workflow`
