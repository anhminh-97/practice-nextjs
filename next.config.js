const withImages = require('next-images')
const path = require('path')

module.exports = withImages({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')], 
  },
  images: {
    domains: ['media.giphy.com', 'api-meme-zendvn-01.herokuapp.com', 'i.memeful.com'],
  },
})
