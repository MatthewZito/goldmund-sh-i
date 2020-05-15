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

TODO
- tracking pixel campaign(s)
- analytics dashboard + campaigns (tracking per post analytics in a separate DB collection)
- Email-handling (with data sanatization)