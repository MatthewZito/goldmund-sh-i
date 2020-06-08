#### Configuring Nginx as a Reverse Proxy for a SSG Frontend
*exploring esoteric caching mechanisms to handle hybrid websites effectively*

Nginx is far more proficient at serving static assets than Node (which is what Nextjs is utilizing).

Here, I have taken advantage of Nginx's proxy cache feature, persisting static files subsequent to the initial request thereof; the Nginx filesystem henceforth handles these assets. This means that at most, my Nextjs server is getting hit once per sixty minutes.

A few nuances about Nextjs that I had to keep in mind here:
 - Nextjs by default sets headers for in-browser caching. 
 - Build assets served at `/_next/static/*` contain a unique build ID which brings with it the 'cache forever' header. Rebuilds mean this build ID will change. However, the static assets in the static/ directory do not utilize this build ID; they are instead served via the `/static/*` path. Ergo, Nextjs sets 'no-cache' headers for these assets such that the browser *never* caches them. To get around this, I direct Nginx to *ignore* the cache-control headers.
 - The cache is refreshed once per sixty minutes; this is how often the goldmund-client is getting hit via the browser.

I'm not worried about hot-reloading because I'm not running Nginx in my dev environment at the moment (in my automated dev environment, yes, but that's for testing via Travis CI), however there may arise a use case for enabling web-sockets. I do have planned a feature which utilizes sockets, and here is what I will need to do when that time arrives:

```
location /sockjs-node {
    proxy_pass http://frontend_upstream;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
}
```

This should suffice.