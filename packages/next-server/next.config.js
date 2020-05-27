const withCSS = require('@zeit/next-css');
const withImages = require('next-images')
module.exports = withCSS(withImages({
  webpack(config, options) {
    return config
  },
  env: {
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE
  }
}));