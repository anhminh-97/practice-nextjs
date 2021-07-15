const withImages = require('next-images')
const path = require('path')

;(module.exports = withImages()),
  {
    reactStrictMode: true,
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
  }
module.exports = withImages()
