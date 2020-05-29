const withCSS = require('@zeit/next-css');
const withImages = require('next-images')
module.exports = withCSS(withImages({
  webpack: config => {
    return config
  },
  env: {
    NEXT_PUBLIC_API_BASE: "http://localhost:5000"
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }

    return config
  }
}));