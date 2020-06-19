## Goldmund.sh | A Declarative Approach to Cloud Automation
 
[![Build Status](https://travis-ci.org/MatthewZito/goldmund-automated-cluster.svg?branch=master)](https://travis-ci.org/MatthewZito/goldmund-automated-cluster)
```
Author: Matthew T Zito (goldmund)
License: MIT
```
## Table of Contents

 - [Introduction](#intro) 
    * [Features](#features)
 - [Documentation](#docs)
    * [Visualizations](#demo)
    * [Todos](#todo)

## <a name="intro"></a> Introduction
This is a personal web application intended as an auto-didactic tool for perfecting CI/CD and production-grade development in a fully containerized cloud environment. Building this app has been quite interesting; it has necessitated extensive research and unending trials. As a developer who aspires to make an impact as a software architect one day, I'm rather pleased with the result. I hope you enjoy as well.

Packages:
 - [`goldmund-api`](https://github.com/MatthewZito/goldmund-automated-cluster/tree/master/packages/goldmund-api) - persistent data processing service and REST API
 - [`goldmund-client`](https://github.com/MatthewZito/goldmund-automated-cluster/tree/master/packages/goldmund-client) - isomorphic server - hybrid SSG + server-side rendering at runtime
 - [`goldmund-cli`](https://github.com/MatthewZito/goldmund-automated-cluster/tree/master/packages/goldmund-cli) - command-line utility for managing sessions, `goldmund-api` database content, and CDN uploads/eager transformations
 - [`goldmund-server`](https://github.com/MatthewZito/goldmund-automated-cluster/tree/master/packages/goldmund-server) - a mock ingress for proxying Docker Engine namespace

 To deploy:
 Merge into Master with commit message "automate-deployment"

### <a name="features"> Features
  - Custom database wrapper modeled on [Lambda architecture](https://en.wikipedia.org/wiki/Lambda_architecture)
  - custom RESTful microservice for data processing
  - hybrid static site generation (SSG) / server-side rendering (SSR) 
  - Reactjs components: code-splitting, lazy loading, and dynamic imports
  - infinite scrolling coordinated via batch processing on the backend (maintains consistent processing power requirements regardless of dataset size)
  - blazin' fast sessions caching with Redis
  - localized sessions, database, and CDN management via `goldmund-cli` command-line utility
  - fully automated container-to-cloud CI/CD pipeline
  - local development automated w/Docker Compose
  - automated production deployments w/ Helm + Kubernetes

## <a name="docs"></a> Documentation

### <a name="demo"> Visualizations + Abstractions
 Preliminary architectural layout:

![demo](https://github.com/MatthewZito/goldmund-automated-cluster/blob/master/documentation/preliminary-architecture.png)

[Usage demo of `goldmund-cli`, basic commands](https://streamable.com/n2jqqc)

Local development is greatly aided by Skaffold. In order to run local dev instance,
1. Register ledger secret object 
2. `skaffold dev`

More information:
  - [Testing and Auditing](https://github.com/MatthewZito/goldmund-automated-cluster/blob/master/documentation/testing-and-auditing.md)
  - [Micro Batch-Processor](https://github.com/MatthewZito/goldmund-automated-cluster/blob/master/documentation/batch-processing.md)
  - [Isomorphic Kubernetes](https://github.com/MatthewZito/goldmund-automated-cluster/blob/master/documentation/goldmund-client.md)
  - [Goldmund CLI](https://github.com/MatthewZito/goldmund-automated-cluster/blob/master/packages/goldmund-cli/README.md)
  - [Goldmund Server](https://github.com/MatthewZito/goldmund-automated-cluster/blob/master/documentation/goldmund-server.md)
  - [More documentation](https://github.com/MatthewZito/goldmund-automated-cluster/tree/master/documentation)

### <a name="todo"></a> Todos + Upcoming Features

 - analytics dashboard + campaigns (tracking per post analytics in a separate DB collection)
 - optimize for mobile, where needed ([see: why I will NOT be using AMP](https://medium.com/@danbuben/why-amp-is-bad-for-your-site-and-for-the-web-e4d060a4ff31))
 - styled components
 
#### <a name="about"> Note to visitors

If you are a hiring manager, recruiter, or otherwise an interested party considering my competencies as they might apply
to your needs, please consider this application to be an examplar of what I can design and build on my own, unassisted. My hope here is that this delimits my actual capabilities from those pertinent to apps on which I have worked in a collaborative capacity (just about everything in any developer's professional portfolio). That is, here, you can see that I indeed can effectively employ tools such as Docker, Kubernetes, et al. 

If you'd like to work together, you are invited to email me at matthewtzito (gmail).
