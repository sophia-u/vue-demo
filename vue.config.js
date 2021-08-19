const path = require('path')
const webpack = require('webpack')
const resolve = (dir) => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  // 部署应用包时的基本 URL
  publicPath: '/',
  // 输出文件目录
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的目录
  assetsDir: 'static',
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: !IS_PROD,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,
  // 生产环境的 source map，设置为 false 以加速生产环境构建
  productionSourceMap: !IS_PROD,
  // 是否为 Babel 或 TypeScript 使用 thread-loader。
  // 该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,
  // CSS 配置
  css: {
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中，而不是动态注入到 JavaScript 中的 inline 代码。
    // 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。
    extract: IS_PROD, // 是否将 CSS 抽离成独立文件，开发环境默认不开启（与 HMR不兼容）
    sourceMap: !IS_PROD, // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
    loaderOptions: {
      sass: {
        // 引入全局样式
        prependData: '@import "@assets/scss/frame.scss";'
      }
    },
    // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。
    // 设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    requireModuleExtension: true
  },
  // webpack 链式操作
  chainWebpack: (config) => {
    // 修复热更新失效
    config.resolve.symlinks(true)

    // 配置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@store', resolve('src/store'))
      .set('@utils', resolve('src/utils'))
      .set('@views', resolve('src/views'))

    const svgRule = config.module.rule('svg')
    // 找到 svg-loader 并清除， 如果不这样做会添加在此 loader 之后
    svgRule.uses.clear()
    // 添加新的 loader 处理 svg
    svgRule
      .rule('svg')
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    const imgRule = config.module.rule('images')
    // 将小于 10kb 的图像资源内联以减少 HTTP 请求的数量。
    imgRule
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }))

    // 优化 moment 去掉国际化内容
    config
      .plugin('ignore')
      // 忽略/moment/locale下的所有文件
      .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

    if (IS_PROD) {
      config.optimization.minimizer('terser').tap((args) => {
        // 去除生产环境console
        args[0].terserOptions.compress.drop_console = true
        return args
      })
    }
  },
  // webpack 简单配置
  configureWebpack: (config) => {
    if (IS_PROD) {
      // gzip 压缩插件
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 匹配文件名
          algorithm: 'gzip',
          threshold: 10240, // 对超过10kb的数据进行压缩
          minRatio: 0.8,
          deleteOriginalAssets: false // 是否删除原文件
        })
      )

      // 配置 splitChunks(webpack4内置), 将公用组件，样式，依赖等等提取出来,减少打包体积。
      config.optimization = {
        runtimeChunk: {
          name: 'mainifest' // 将包含 chunk 映射关系的列表从 main.js 中抽离出来，在配置了 splitChunk 时要配置 runtimeChunk.
        },
        splitChunks: {
          cacheGroups: { // 缓存组
            common: { // 公共模块
              priority: 1,
              name: 'common',
              chunks: 'initial', // "initial" | "all"(推荐) | "async" (默认就是async)
              minSize: 0, // 大小超过 0 个字节
              minChunks: 2, // 最少引入了 2 次
              maxAsyncRequests: 5, // 最大异步请求数， 默认1
              maxInitialRequests: 3, // 最大初始化请求数，默认1
              reuseExistingChunk: true, // 可设置是否重用该chunk
              enforce: true
            },
            vendors: { // 第三方依赖
              priority: 2,
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'initial',
              reuseExistingChunk: true,
              enforce: true
            },
            elementUI: {
              priority: 3,
              name: 'elementui',
              test: /[\\/]node_modules[\\/]element-ui[\\/]/,
              chunks: 'all',
              reuseExistingChunk: true,
              enforce: true
            },
            vant: {
              priority: 4,
              name: 'vantui',
              test: /[\\/]node_modules[\\/]vant[\\/]/,
              chunks: 'all',
              reuseExistingChunk: true,
              enforce: true
            }
          }
        }
      }
    } else {
      config.devtool = 'eval-cheap-module-source-map'

      // webpack 打包可视化插件
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
  devServer: {
    host: 'localhost',
    port: '8080',
    // 让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: true,
      errors: true
    },
    open: true, // 启动后自动打开浏览器
    https: false, // 启用 https 服务
    hot: true, // 启用模块热更新
    compress: true, // 启用 gzip 压缩
    proxy: {
      '/api': {
        target: 'http://kamiaomei.com',
        changeOrigin: true, // 开启代理在本地创建一个虚拟服务端
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
