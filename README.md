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
    * [Roadmap](#bugs)
    * [Bugs](#bugs)
    * [Operational Notes](#ops)

## <a name="intro"></a> Introduction
This repository hosts an application that is currently in development. As such, this document may not be formatted/completed until said app has been deployed to production.

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
 - ~~add cookies service~~ we are not coupling the API and server, after all. Thus:
    * ~~add JWT~~
    * ~~add cookies, disable webstore so as to prevent things like downstream injections (e.g. the Flatmap-stream incident, circa 2018)~~
    * implement CSRF protection
 - tracking pixel campaign(s)
 - analytics dashboard + campaigns (tracking per post analytics in a separate DB collection)
 - ~~implement cookies via Redis store, utilize in-memory caching for client~~
 - ingess controller
 - https and automated cert [re-]auth
 - add rate limiter
 - ~~add CORS policy/whitelist~~
 - optimize for mobile, where needed ([see: why I will NOT be using AMP](https://medium.com/@danbuben/why-amp-is-bad-for-your-site-and-for-the-web-e4d060a4ff31))
 - slowly convert CSS stylesheet to styled components with Emotionjs
 - ~~Front-end proxy for DNS resolution of internal Docker hostnames~~
 - ~~Add test coverage - integrated, automated, and unit (integrate into pipeline)~~

### <a name="bugs"></a> Bugfixes Needed

### <a name="ops"></a> Operational Notes

Testing monorepo (local):

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

#### Why I Elected to Use an External API
As you may know, Nextjs version 9 saw the introduction of several new features which deprecated custom servers and introduced myriad utilities for integrating API routes into a Nextjs project.

Nextjs v9's Routes API is incredible, however it is very nascent. I have elected to maintain my API as a standard RESTful CRUD endpoint. I have done this for a few reasons:
 - Nextjs Routes API does not support the level of granularity I need in my middlewares
   * I cannot perform logging as I would like
   * I cannot set sessions without inelegant logic (I'll nigh make mention of auth issues)
 - Building my API into the Next server will effectively marry this project to Nextjs; development would be contingent on Zeit's priorities
 - My services still maintain same-origin given they will be containerized (no need for explicit service coupling)
 - Authentication and authorization are both difficult to properly implement when dealing with Nextjs; auth will be handled by the API - ~~the rendered browser can simply store the token after authenticating with the API itself (as opposed to auth with next routed api, which can detriment security efforts)~~ (see the Goldmund.io Admin CLI)
 
 Finally, as someone who admires a great deal the ethos of the giants upon whose shoulders we stand (ie our UNIX forefathers), I'd prefer each service *do one thing, and do it well*. I have not enumarated this in my afore-cited reasons for using a decoupled API as it is ultimately a matter of personal preference and not of performance. Next's internal API feature is blazing fast, but it simply is not extensible enough for my needs right now.

#### Activating the Data Layer at Run-time

A curious consequence of my architecture is the sensitive run-time configurations required to activate the data layers. As one can readily see, `goldmund-client` is somewhat a misnomer given it refers to a hybridized server-side-render/static-site-gen frontend. In order for the frontend service to operate at proper context, `goldmund-api` must be *actively serving data* at build-time. This is a quandary given my environment is fully automated; I must find a way to enforce a chronological context at run-time.

As it stands, this has been accomplished by utilizing a shell script (`wait-for-it.sh`) which polls for the `goldmund-api` service. The `goldmund-client` build will not occur until this script has successfully exited, ergo the data layer acquires insurance. Simply specifying the Nginx routing service's contingency on `goldmund-client` delays Docker Engine's execution of its run-time command; thus:
 1. `goldmund-api` build init
 2. `goldmund-client` build init
 3. `wait-for-it.sh` execute, `goldmund-client` build freeze
 4. `goldmund-api` run
 5. `goldmund-api` ack, `wait-for-it.sh` exit, `goldmund-client` build commence
 6. `goldmund-client` run (build SSG content + export)
 7. `goldmund-server` build, run --> serve SSG content from step 6

We'll see how this configuration changes relative to Kubernetes deployment, an imminent step in development at this moment.

#### Handling Isomorphic Requests in a Containerized Environment

I'll get around to this one...
