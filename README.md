## goldmund.io
This repository hosts an application that is currently in development. As such, this document may not be formatted/completed until said
app has been deployed to production.

### TODOs
 - ~~add cookies service~~ we are not coupling the API and server, after all. Thus:
    * ~~add JWT~~
    * add cookies, disable webstore so as to prevent things like downstream injections (e.g. the Flatmap-stream incident, circa 2018)
    * implement CSRF forgery protection
 - tracking pixel campaign(s)
 - analytics dashboard + campaigns (tracking per post analytics in a separate DB collection)
 - implement cookies via Redis store, utilize in-memory caching for client
 - cloudflare for ddos protection + auto https
 - add rate limiter
 - add CORS policy/whitelist
 - optimize for mobile, where needed ([see: why I will NOT be using AMP](https://medium.com/@danbuben/why-amp-is-bad-for-your-site-and-for-the-web-e4d060a4ff31))
 - ~~handle the GET users endpoint~~
 - slowly convert CSS stylesheet to styled components with Emotionjs
 
### BUGFIXES
  - ~~fix router history obj on "go back", e.g. from created/updated blog post redirect~~ handled by nextjs

### Features
  - database uses [(quasi)Lambda architecture](https://en.wikipedia.org/wiki/Lambda_architecture)
  - CRUD db operations via admin panel
    * update post
    * create new post
    * set 'deleted' flag (update, qua lamdba architectural ethos)
  - Dynamic template engine/render
  - Markdown-render blog format; sanitized HTML, dynamically slugified URIs
  - hybrid progressive / server-side rendering with NextJs + Reactjs
  - route-based code-splitting

### ABOUT

This project is not a course project, nor does it use any bootstrapped content e.g. Boostrap, Material UI CDN, templates, et al. All pages and components have been written from scratch. This is a full-stack application designed for production.

If you are a hiring manager, recruiter, or otherwise an individual considering my competencies as they might apply
to your needs, please consider this application to be exemplary of my technical skillset.

I solely designed and architected this app. No tutorials were used, this wasn't a Udemy project. I pre-planned this app, I worked with wireframes, I ran simulations, I gathered intelligence. I have - very carefully and deliberately - implemented each feature here per my own devices. A lot of Stack Overflow and Google querying, yes, but this app was made by me.

So, yes, an exemplar thereof. This is a sample of what I can design and build on my own. My hope here is that this delimits my actual capabilities from those apps on which I have worked in a collaborative capacity (just about everything in any developer's professional portfolio). For instance, maybe I worked at a company that used Docker. How do you know if *I* understand Docker? You don't. Hopefully, this app dispels that veil.

### Devevelopment Notes
Running Docker:
```
docker build -t >=;

docker run -it testcontainer

docker run -it -d testcontainer // run detached

docker exec -it <HASH> bash .. bring ps to fg

# bind to port
docker run -it -p 5000:5000 testcontainer


#### Why I Elected to Use an External API
As you may know, Nextjs version 9 saw the introduction of several new features which deprecated custom servers and introduced myriad utilities for integrating API routes into a Nextjs project.

Nextjs v9's Routes API is incredible, however it is very nascent. I have elected to maintain my API as a standard RESTful CRUD endpoint. I have done this for a few reasons:
 - Nextjs Routes API does not support the level of granularity I need in my middlewares
   * I cannot perform logging as I would like
   * I cannot set sessions without inelegant logic (I'll nigh make mention of auth issues)
 - Building my API into the Next server will effectively marry this project to Nextjs; development would be contingent on Zeit's priorities
 - My services still maintain same-origin given they will be containerized (no need for explicit service coupling)
 - Authentication and authorization are both difficult to properly implement when dealing with Nextjs; auth will be handled by the API - the rendered browser can simply store the token after authenticating with the API itself (as opposed to auth with next routed api, which can detriment security efforts)
 
 Finally, as someone who admires a great deal the ethos of the giants upon whose shoulders we stand (ie our UNIX forefathers), I'd prefer each service *do one thing, and do it well*. I have not enumarated this in my afore-cited reasons for using a decoupled API as it is ultimately a matter of personal preference and not of performance. Next's internal API feature is blazing fast, but it simply is not extensible enough for my needs right now.

```

