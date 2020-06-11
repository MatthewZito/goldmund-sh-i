## Goldmund Client

Follows are notes regarding the `goldmund-client` package.

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

A curious consequence of my architecture is the sensitive run-time configurations required to activate the data layers. As one can readily see, `goldmund-client` is somewhat a misnomer given it refers to a hybridized server-side-render/static-site-gen frontend. In order for the frontend service to operate at proper context, `goldmund-api` must be *actively serving data* at `goldmund-client`'s build-time. This is a quandary given my environment is fully automated; I must find a way to enforce a chronology at run-time.

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