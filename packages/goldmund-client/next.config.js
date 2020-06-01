const withCSS = require('@zeit/next-css');
const withImages = require('next-images')
module.exports = withCSS(withImages({
  webpack: config => {
    return config
  },
serverRuntimeConfig: {
    // Will only be available on the server side
    URI: process.env.API_BASE_DOCKER
},
publicRuntimeConfig: {
    // Will be available on both server and client
    URI: process.env.API_BASE_CLIENT
}
}));