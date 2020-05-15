Please see my other repositories for proper examples of my documentation and capacity to use markdown - this README is not going to be 
formatted for quite a while.

TODO:

Add error view
Add 404 view
Add 500 view
Error handling 
Admin routing
Add spinner

async/await, transliterate

edit endpoint

pagination, at vestibule component


BUGFIXES:
- fix router history obj on "go back", e.g. from created/updated blog post redirect


ABOUT:
- database uses [(quasi)Lambda architecture](https://en.wikipedia.org/wiki/Lambda_architecture)

Features:
- CRUD db operations via admin panel
  * update post
  * create new post
  * set 'deleted' flag (update, qua lamdba architectural ethos)
- Dynamic template engine/render
- Markdown-render blog format; sanitized HTML, dynamically slugified URIs
- server-side rendering with NextJs, client with Reactjs



TODO
- tracking pixel campaign(s)
- analytics dashboard + campaigns (tracking per post analytics in a separate DB collection)
- Email-handling (with data sanatization)
- implement cookies via Redis store, utilize in-memory caching for client
- add logger to server, wire logger to crontab on primary host
- containerize all services in docker 
- convert to whollyrely upon server-side-rendering
- SEO optimize
 
ABOUT

If you are a hiring manager, recruiter, or otherwise an individual considering my competencies as they might apply
to your needs, please consider this application to be exemplary of my technical skillset.

I solely designed and architected this app. No tutorials were used, this wasn't a Udemy project. I pre-planned this app, I worked with wireframes, I ran simulations, I gathered intelligence. I have - very carefully and deliberately - implemented each feature here per my own devices. A lot of Stack Overflow and Google querying, yes, but this app was made by me.

So, yes, an exemplar thereof. This is a sample of what I can design and build on my own. My hope here is that this delimits my actual capabilities from those apps on which I have worked in a collaborative capacity (just about everything in any developer's professional portfolio). For instance, maybe I worked at a company that used Docker. How do you know if *I* understand Docker? You don't. Hopefully, this app dispels that veil.

