const path = require('path');//引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('views', resolve('src/views'))
      .set('assets', resolve('src/assets'))
    //set第一个参数：设置的别名，第二个参数：设置的路径

  },
  devServer: {
    host: 'localhost',
    port: 8080,
    https: false,
    open: false, // 配置自动启动浏览器
    hotOnly: true, // 是否热更新
    proxy: {
      '/api': { // 路径中有 /api 的请求都会走这个代理
        target: 'http://106.54.165.210:9000/PluginWeb', // 要访问的接口域名
        ws: true, // 是否启用  websockets
        // secure: false,
        changeOrigin: true,
        // 开启代理：在本地会创建一个虚拟服务端，
        // 然后发送请求的数据，并同时接收请求的数据，
        // 这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/api': '' // 这里理解成用/api代替target里面的地址，即去掉路径中的/api  的这一截
        }
      }
    }
  }
}