## Kubernetes Configurations

### Updating to Helm v3

1. Install Helm v3:

```
google-cloud-console# curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 > get_helm.sh
google-cloud-console# chmod 700 get_helm.sh
google-cloud-console# ./get_helm.sh
 ```
2. Install Ingress-Nginx:
```
google-cloud-console# helm repo add stable https://kubernetes-charts.storage.googleapis.com/
google-cloud-console# helm install my-nginx stable/nginx-ingress --set rbac.create=true 
```
2. Skip Helm Setup, Kubernetes Security with RBAC, Assigning Tiller a Service Account and Ingress-Nginx with Helm.

### Generating Encrypted Objects
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

### APIs and Ancillary Services

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

Run Proxy Dashboard:
1. apply dash service
2. run `kubectl proxy`
3. launch at http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/error?namespace=default

Run Proxy Metrics Server:

1. `kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.3.6/components.yaml`
2. `kubectl -n kube-system edit deploy metrics-server`
3. Add following to args: 
```
- args:
        - --cert-dir=/tmp
        - --secure-port=4443
        - --v=2
        - --kubelet-insecure-tls
        - --kubelet-preferred-address-types=InternalIP
```

### Pre-Deployment Operations

Encrypt assets:
1. `docker run -it -v $(pwd):/app ruby:2.4 sh`
2. `gem install travis --no-rdoc --no-ri`
3. `gem install travis`
4. `travis login`
5. `travis encrypt-file <file> -r <username>/<target-repository>`

Declaratively applying proper K8s configurations:
To do this, I am simply applying a binary nomenclature of providing dev-only configs the `.yaml` extension. Running `kubectl` with `$(ls ./kubernetes/*.yml | awk ' { print " -f " $1 } ')` iterates through all `.yml` files (restricted to actual production assets). I'm happy with this solution for now; after all, it's clean.

Configuring GKE vars:
1. Activate GKE shell
2. 
```
gcloud config set project <PROJECT_ID>
gcloud config set compute/zone <ZONE>
gcloud container clusters get-credentials <CLUSTER_NAME>
```
3. create obj as needed