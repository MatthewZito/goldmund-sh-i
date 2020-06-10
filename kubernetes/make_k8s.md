Imperatively:
```
kubectl create secret generic goldmund-ledger --from-literal <k8s env name>=<env val> [et al ...]
```

Cleaner, but more complicated for myriad reasons:
```
kubectl create secret generic goldmund-ledger --from-env-file="path"
```

Or declaratively:
```
apiVersion: v1
kind: Secret
metadata:
  name: secret-name
type: Opaque
data:
  A_VALUE: $(head -c 24 /dev/random | base64)
stringData:
  ANOTHER_VALUE: string_value
```

Run Ingress-Nginx locally (on macos machine):
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-0.32.0/deploy/static/provider/cloud/deploy.yaml
```

On Pixel-Linux, just use minikube or something.

Adding a Persistent Volume Claim (should I want one):
```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
    name: goldmund-pvc
spec:
    accessModes:
        - ReadWriteOnce
    resources:
        requests:
            storage: 2Gi
```