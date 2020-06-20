## Goldmund.sh | A Declarative Approach to Cloud Automation
 
[![Build Status](https://travis-ci.org/MatthewZito/goldmund-automated-cluster.svg?branch=master)](https://travis-ci.org/MatthewZito/goldmund-automated-cluster)
```
Author: Matthew T Zito (goldmund)
License: MIT
```
## Table of Contents

 - [Introduction](#intro) 
    * [Packages](#packages)
 - [Documentation](#docs)
    * [Features](#features)
    * [Demos](#demo)
    * [Todos](#todo)

## <a name="intro"></a> Introduction
This is a personal web application intended as an auto-didactic tool for perfecting CI/CD and production-grade development in a fully containerized cloud environment. Building this app has been quite interesting; it has necessitated extensive research and unending trials. As a developer who aspires to make an impact as a software architect, I'm rather pleased with the result. I hope you enjoy as well.

### <a name="packages"></a> Packages

 - [`goldmund-api`](https://github.com/MatthewZito/goldmund-automated-cluster/tree/master/packages/goldmund-api) - persistent data processing service and REST API
 - [`goldmund-client`](https://github.com/MatthewZito/goldmund-automated-cluster/tree/master/packages/goldmund-client) - isomorphic server - hybrid SSG + server-side rendering at runtime
 - [`goldmund-cli`](https://github.com/MatthewZito/goldmund-automated-cluster/tree/master/packages/goldmund-cli) - command-line utility for managing sessions, `goldmund-api` database content, and CDN uploads/eager transformations
 - [`goldmund-server`](https://github.com/MatthewZito/goldmund-automated-cluster/tree/master/packages/goldmund-server) - a mock ingress for proxying Docker Engine namespace

## <a name="docs"></a> Documentation

### <a name="features"> Features
  - Multi-service, distributed web app coordinated with Kubernetes and Helm
  - Local development streamlined with Skaffold
  - Fully automated testing, auditing, builds, and production deployments via a single webhook
  - Nginx-Ingress Controller and Issuer daemon automates TLS certificate renewal + infra / cert signing request(CSR) 
  - Hardened security profile includes: HTTPs, Role-Based Access Control (RBAC), Cluster-wide security policies, rotational logging, and sanitization / validation middleware
  - Custom [Lambda architecture](https://en.wikipedia.org/wiki/Lambda_architecture) database layer, portable Redis caching layer
  - RESTful microservice and API for data, batch processing (`goldmund-api`)
  - Hybrid statically generated (SSG) / server-side rendered (SSR) frontend (`goldmund-client`) utilizes code-splitting, lazy loading, and dynamic imports for performance optimization
  - Command-line utility for localized sessions, database, and CDN management  (`goldmund-cli`) 
  - Custom middlewares. There are some esoteric and interesting HTTP Headers here - see if you can find them!
  

### <a name="demo"> Demos, Visualizations, and Abstractions
Goldmund.sh Architecture HLD:

![demo](https://github.com/MatthewZito/goldmund-automated-cluster/blob/master/documentation/architecture-hld.jpg)

  - [Usage demo of `goldmund-cli`, basic commands](https://streamable.com/n2jqqc)
  - [Usage demo of `goldmund-cli`, advanced commands](https://streamable.com/n2jqqc)

Local development is greatly aided by Skaffold. In order to run local dev instance,
1. Register ledger secret object 
2. `skaffold dev`

To deploy:
 Merge into Master with commit message "automate-deployment"

More information:
  - [Testing and Auditing](https://github.com/MatthewZito/goldmund-automated-cluster/blob/master/documentation/testing-and-auditing.md)
  - [Micro Batch-Processor](https://github.com/MatthewZito/goldmund-automated-cluster/blob/master/documentation/batch-processing.md)
  - [Isomorphic Kubernetes](https://github.com/MatthewZito/goldmund-automated-cluster/blob/master/documentation/goldmund-client.md)
  - [Goldmund CLI](https://github.com/MatthewZito/goldmund-automated-cluster/blob/master/packages/goldmund-cli/README.md)
  - [Goldmund Server](https://github.com/MatthewZito/goldmund-automated-cluster/blob/master/documentation/goldmund-server.md)
  - [More documentation](https://github.com/MatthewZito/goldmund-automated-cluster/tree/master/documentation)

### <a name="todo"></a> Todos + Upcoming Features

 - Add analytics dashboard + campaigns (tracking per post analytics in a separate DB collection)
 - Enable Progressive Web App (PWA) support ([see: why I will NOT be using AMP](https://medium.com/@danbuben/why-amp-is-bad-for-your-site-and-for-the-web-e4d060a4ff31))
 
#### <a name="about"> Note to visitors

If you are a hiring manager, recruiter, or otherwise an interested party considering my competencies as they might apply
to your needs, please consider this application to be an examplar of what I can design and build on my own, unassisted. My hope here is that this delimits my actual capabilities from those pertinent to apps on which I have worked in a collaborative capacity (just about everything in any developer's professional portfolio). That is, here, you can see that I indeed can effectively employ tools such as Docker, Kubernetes, et al. 

If you'd like to work together, you are invited to email me [here](https://goldmund.sh/communications).
