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

---

For additional details, continue reading `kubernetes-patterns-reference-1.md`.
