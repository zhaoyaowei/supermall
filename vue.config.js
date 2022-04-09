const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  },
  chainWebpack: config => {
  config
    .plugin('html')
    .tap(args => {
      args[0].title= '购物街'
      return args
    })
  }
})
