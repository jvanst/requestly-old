// vue.config.js
module.exports = {
  devServer: {
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        fiber: require('fibers')
      }
    }
  },
  pwa: {
    name: 'Requestly'
  }
}
