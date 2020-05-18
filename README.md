## goldmund.io
This repository hosts an application that is currently in development. As such, this document may not be formatted/completed until said
app has been deployed to production.

### TODOs
 - add cookies service
 - tracking pixel campaign(s)
 - analytics dashboard + campaigns (tracking per post analytics in a separate DB collection)
 - implement cookies via Redis store, utilize in-memory caching for client
 - cloudflare for ddos protection + auto https
 - add rate limiter
 - add CORS policy/whitelist
 - optimize for mobile, where needed ([see: why I will NOT be using AMP](https://medium.com/@danbuben/why-amp-is-bad-for-your-site-and-for-the-web-e4d060a4ff31))

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
```

