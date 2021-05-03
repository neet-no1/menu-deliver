var path = require('path');
var webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')
const enabledSourceMap = process.env.NODE_ENV === "development";

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\\.json$/,
        use: {
          loader: 'json-loader'
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // Sassファイルの読み込みとコンパイル
      {
        test: /\.(scss|sass)$/, // 対象となるファイルの拡張子
        use: [
          'vue-style-loader',
          // linkタグに出力する機能
          //'style-loader',
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,

              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
              esModule: false
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
            }
          }
        ],
      },
      // { 
      //   test: /\.json$/,
      //   loader: 'json' 
      // },
      {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            esModule: false
          }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    //host: '0.0.0.0',
    //historyApiFallback: true,
    //noInfo: true
    contentBase: path.join(__dirname, ''),
    compress: true,
    port: 8080,
  },
  //devtool: '#eval-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.$": "jquery",
      "window.jQuery": "jquery"
    }),
    new VueLoaderPlugin()
  ]
}

if (process.env.ENABLE_MOCK === 'false') {
  module.exports.devServer.proxy = {
    '/api': 'http://localhost:48080'
  }
}

module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      ENABLE_MOCK: process.env.ENABLE_MOCK
    }
  })
])

if (process.env.NODE_ENV === 'production') {
  //module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        ENABLE_MOCK: process.env.ENABLE_MOCK
      }
    }),
/*    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
*/
    //new webpack.optimize.OccurrenceOrderPlugin()
  ])
}
