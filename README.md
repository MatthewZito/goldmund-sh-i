# Goldmund.io 
```
Author: Matthew T Zito (goldmund)
License: MIT
```
## Table of Contents

 - [Introduction](#intro) 
    * [Features](#features)
    * [About](#about)
    * [Demos](#demo)
 - [Development Notes](#notes)
    * [Testing](#test)
    * [Todos](#todo)

## <a name="intro"></a> Introduction
This repository hosts an application that is currently in development. As such, this document may not be formatted/completed until said app has been deployed to production.

Packages:
`goldmund-api` - persistent data processing service and REST API
`goldmund-client` - isomorphic server - hybrid SSG + server-side rendering at runtime
`goldmund-cli` - CLI and headless CMS for managing sessions and content
`goldmund-server` - a mock ingress for proxying Docker Engine namespace

### <a name="features"> Features
  - Custom database wrapper modeled on [Lambda architecture](https://en.wikipedia.org/wiki/Lambda_architecture)
  - custom RESTful microservice for data processing
  - reverse proxy routing to containerized environment
  - hybrid static site generation (SSG) / server-side rendering (SSR) 
  - Reactjs components: code-splitting, lazy loading, and dynamic imports
  - infinite scrolling coordinated via batch processing on the backend (maintains consistent processing power requirements regardless of dataset size)
  - blazin' fast sessions caching with Redis
  - localized sessions management via custom CLI (console-oriented service for auth mgmt)
  - fully automated container-to-cloud CI/CD pipeline
  - monorepo architecture handles package testing and dependencies hoisting at via Lerna
  - automated builds + testing
  - local development automated w/Docker Compose
  - automated deployments w/Kubernetes

### <a name="about"> About (temporary section for dev purposes)

This is a personal web application intended as an auto-didactic tool for perfecting CI/CD and production-grade development in a fully containerized cloud environment. Building this app has been quite interesting; it has necessitated extensive research and unending trials. As a developer who aspires to make an impact as a software architect one day, I'm rather pleased with the result. I hope you enjoy as well.

Note to visitors:

If you are a hiring manager, recruiter, or otherwise an individual considering my competencies as they might apply
to your needs, please consider this application to be an examplar of what I can design and build on my own, unassisted. My hope here is that this delimits my actual capabilities from those pertinent to apps on which I have worked in a collaborative capacity (just about everything in any developer's professional portfolio). That is, here, you can see that I indeed can effectively employ tools such as Docker, Kubernetes, et al. 

### <a name="demo"> Visualizations + Abstractions
 Preliminary architectural layout:

![demo](https://github.com/MatthewZito/goldmund.io/blob/master/documentation/preliminary-architecture.png)

More information:
- [Micro Batch-Processor](https://github.com/MatthewZito/goldmund.io/blob/master/documentation/batch-processing.md)
 
## <a name="notes"></a> Development Notes

### <a name="todo"></a> Todos + Upcoming Features

 - analytics dashboard + campaigns (tracking per post analytics in a separate DB collection)
 - optimize for mobile, where needed ([see: why I will NOT be using AMP](https://medium.com/@danbuben/why-amp-is-bad-for-your-site-and-for-the-web-e4d060a4ff31))
 - slowly convert CSS stylesheet to styled components with Emotionjs

### <a name="test"></a> Testing

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

Accessing Redis-CLI:
```
# fetch internal IP
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <redis container_name_or_id>
# connect
docker exec -it <redis container_name_or_id> bash
# launch cli from internal docker namespace
redis-cli -h <internal IP>
```

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