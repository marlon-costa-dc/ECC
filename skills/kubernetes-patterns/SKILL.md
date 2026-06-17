---
name: kubernetes-patterns
description: Use when the user is writing, reviewing, or debugging Kubernetes manifests and workloads for production, including Deployments, Services, Ingress, Jobs, probes, resource requests/limits, RBAC, autoscaling, PodDisruptionBudgets, ConfigMaps, Secrets, and kubectl troubleshooting.
origin: ECC
---

# Kubernetes Patterns

## When to Activate

- Writing or reviewing K8s YAML (Deployments, Services, Ingress, Jobs, CronJobs)
- Configuring probes, resources, RBAC, HPA, or PDBs
- Debugging CrashLoopBackOff, OOMKilled, Pending, or ImagePullBackOff
- Setting up namespaces, quotas, or external secrets

## Core Rules

- Pin immutable image tags; never use `:latest`.
- Run non-root with `readOnlyRootFilesystem: true` and drop ALL capabilities.
- Set resource requests AND limits on every container.
- Configure startup + liveness + readiness probes together.
- Use `automountServiceAccountToken: false` unless the app calls the K8s API.
- Run production workloads with `minReplicas: 2+`, HPA, and PDB where needed.
- Manage secrets with External Secrets Operator or Sealed Secrets.

## Example Deployment

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

## References

- Full YAML patterns, probes, Services/Ingress, ConfigMaps/Secrets, RBAC, HPA, PDB, Jobs, kubectl cheatsheet, anti-patterns, and checklist: [references/kubernetes-patterns-reference.md](references/kubernetes-patterns-reference.md)
