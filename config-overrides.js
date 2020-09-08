const path = require('path')
const {
  override,
  overrideDevServer,
  addDecoratorsLegacy,
  addPostcssPlugins,
  addWebpackPlugin,
  addWebpackAlias,
  addBabelPresets,
  fixBabelImports
} = require('customize-cra')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const VConsolePlugin = require('vconsole-webpack-plugin')

const resolvePath = (dir) => path.join(__dirname, dir)
const isProd = process.env.NODE_ENV === 'production'
const paths = require('react-scripts/config/paths')

const addCustomize = () => (config) => {
  if (isProd) {
    // 项目部署基础
    // 默认情况下，我们假设你的应用将被部署在域的根目录下,
    // 例如：https://www.my-app.com/
    // 默认：'/'
    // 如果您的应用程序部署在子路径中，则需要在这指定子路径
    // 例如：https://www.foobar.com/my-app/
    // 需要将它改为'/my-app/'
    config.output.publicPath = process.env.REACT_APP_PUBLIC_PATH
    config.output.path = paths.appBuild = resolvePath('deploy')
    // 关闭sourceMap
    config.devtool = false
    config.plugins.push(
      // 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      new CompressionWebpackPlugin({
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
        threshold: 8192,
        minRatio: 0.8
      })
    )
  }
  return config
}

const devServerConfig = () => (config) => {
  return {
    ...config
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    /* proxy: {
      // 例如将'localhost:8080/api/xxx'代理到'https://yujihu.cn/api/xxx'
      '/h5/api': {
        target: 'http://car.jd.com', // 接口的域名
        secure: false, // 是否验证SSL证书，如果是https接口，需要配置这个参数
        changeOrigin: true, // 将主机标头的原点更改为目标URL，如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/h5/api': '' // pathRewrite 来重写地址，将前缀 '/api' 转为 '/'
        }
      }
    } */
  }
}

module.exports = {
  webpack: override(
    ...addBabelPresets(
      [
        '@babel/preset-env',
        {
          corejs: '3', // 声明 corejs 版本
          useBuiltIns: 'usage'
        }
      ],
      '@babel/preset-react'
    ),
    fixBabelImports('import', {
      libraryName: '@jdcfe/yep-react',
      style: true
    }),
    addDecoratorsLegacy(),
    addCustomize(),
    addPostcssPlugins([
      require('postcss-pxtorem')({
        // 对于想忽略的px写成大写即可，诸如 border:1PX solid #fff;
        rootValue: 100, // 1rem = 100px，750px设计稿 -----> 7.5rem
        propList: ['*'], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
        // 注意：如果有使用第三方UI如VUX，则需要配置下忽略选择器不转换。
        // 规则是class中包含的字符串，如vux中所有的class前缀都是weui-。也可以是正则。
        selectorBlackList: ['weui-']
      })
    ]),
    // 配置文件夹的别名
    addWebpackAlias({
      '@': resolvePath('src'),
      _c: resolvePath('src/components'),
      _v: resolvePath('src/views')
    }),
    // 构建完成通知
    // 当你启动构建时，就可以隐藏控制台面板，专心去做其他事情啦，到“点”了自然会来叫你，它的效果就是下面这样，同时还有提示音噢～
    addWebpackPlugin(
      new WebpackBuildNotifierPlugin({
        title: '项目构建完成',
        logo: resolvePath('public/favicon.ico'),
        suppressSuccess: true
      })
    ),
    addWebpackPlugin(
      new VConsolePlugin({
        enable: process.env.REACT_APP_VCONSOLE === 'true'
      })
    )
  ),
  devServer: overrideDevServer(devServerConfig())
}
