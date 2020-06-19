## Testing and Auditing

### Unit, Integration, and Functional Tests
Testing is automated locally. To manually test:

*Run all packages' respective tests (quiet)*
```
lerna run test 
```

*Run all packages' respective tests (verbose)*
```
lerna run test --stream
```

Test at package level:
```
npm run test
```

### Docker Image Security Audits 
Using 'Dive' to Audit Cached Container Layers (*This is a mandatory security audit which will be included in the CI/CD pipeline*):

*on osx*:
```
# in given package root dir
docker run --rm -it \
      -v /var/run/docker.sock:/var/run/docker.sock \
      -v  "$(pwd)":"$(pwd)" \
      -w "$(pwd)" \
      -v "$HOME/.dive.yaml":"$HOME/.dive.yaml" \
      wagoodman/dive:latest build -t <some-tag> .
```

*on pixel-linux*
```
# in given package root dir
dive build -t <some-tag> .
```

To enumerate all environment variables in a given container runtime:
```
docker exec -it <container-name> sh
container-shell# ( set -o posix ; set ) | less
```
This can also be done via `kubectl`.

Somewhat amusing, the ingress service object is ultimately just a wrapper around the "deprecated" load balancer service object...

### Testing Redis Host in Development
Accessing Redis-CLI:
```
# fetch internal IP
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <redis container_name_or_id>
# connect
docker exec -it <redis container_name_or_id> bash
# launch cli from internal docker namespace
redis-cli -h <internal IP>
```

### Clearing Docker Cache
Due to the way the Goldmund.sh CI/CD pipeline is configured - in conjunction with a few nuanced issues introduced by Skaffold - I accumulate several versions of the same docker images. Removing these is quite simple with this chained command that I most certainly would forget if I don't document it here:
```
docker images | grep goldmund-api | tr -s ' ' | cut -d ' ' -f 2 | xargs -I {} docker rmi exbotanical/goldmund-api:{}

docker images | grep goldmund-client | tr -s ' ' | cut -d ' ' -f 2 | xargs -I {} docker rmi exbotanical/goldmund-client:{}

```