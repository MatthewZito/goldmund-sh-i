## goldmund.io
This repository hosts an application that is currently in development. As such, this document may not be formatted/completed until said
app has been deployed to production.

### TODOs
 - ~~Error handling~~ prettify error boundary 
 - Admin routing
 - Add dedicated loading state
 - Add pagination, at vestibule component
 - ~~error routing~~ handled by nextjs
 - add cookies service
 - tracking pixel campaign(s)
 - analytics dashboard + campaigns (tracking per post analytics in a separate DB collection)
 - Email-handling (with data sanatization)
 - implement cookies via Redis store, utilize in-memory caching for client
 - add logger to server, wire logger to crontab on primary host
 - SEO optimize
 - wrap services in dockerfile
 - cloudflare for ddos protection + auto https


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


 
### ABOUT

If you are a hiring manager, recruiter, or otherwise an individual considering my competencies as they might apply
to your needs, please consider this application to be exemplary of my technical skillset.

I solely designed and architected this app. No tutorials were used, this wasn't a Udemy project. I pre-planned this app, I worked with wireframes, I ran simulations, I gathered intelligence. I have - very carefully and deliberately - implemented each feature here per my own devices. A lot of Stack Overflow and Google querying, yes, but this app was made by me.

So, yes, an exemplar thereof. This is a sample of what I can design and build on my own. My hope here is that this delimits my actual capabilities from those apps on which I have worked in a collaborative capacity (just about everything in any developer's professional portfolio). For instance, maybe I worked at a company that used Docker. How do you know if *I* understand Docker? You don't. Hopefully, this app dispels that veil.

