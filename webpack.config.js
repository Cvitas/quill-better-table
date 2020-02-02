const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  let entry, minimize

  if (env && env.minimize) {
    entry = {
      'quill-better-table.min.js': ['./src/quill-better-table.js']
    }
    minimize = true
  } else {
    entry = {
      // 'quill-better-table': ['./src/quill-better-table.js'],
      // 'quill-better-table': './src/assets/quill-better-table.scss',
      'demo1': './demo/js/demo1.js',
      'demo': './demo/js/demo.js'
    }
    minimize = false
  }

  return {
    mode: 'development',
    entry,

    optimization: {
      splitChunks: {
        // Must be specified for HtmlWebpackPlugin to work correctly.
        // See: https://github.com/jantimon/html-webpack-plugin/issues/882
        chunks: 'all'
      }
    },

    output: {
      // filename: '[name]',
      // library: 'quillBetterTable',
      // libraryExport: 'default',
      // libraryTarget: 'umd',
      // path: path.resolve(__dirname, './dist/')
      path: path.resolve(__dirname, './dist/'),
      filename: 'static/js/[name].js',
      chunkFilename: 'static/js/[name].js'
    },

    resolve: {
      alias: {
        'src': path.resolve(__dirname, './src'),
        'dist': path.resolve(__dirname, './dist')
      },
      extensions: ['.js', '.scss', '.html']
    },
    externals: {
      'quill': {
        commonjs: 'quill',
        commonjs2: 'quill',
        amd: 'quill',
        root: 'Quill'
      }
    },
    module: {
      rules: [
        {
          test: /\.(jpg|jpeg|png)$/,
          include: [
            path.resolve(__dirname, '../src/assets/imgs')
          ],
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }]
        },

        {
          test: /\.(html|svg)$/,
          use: [{
            loader: 'html-loader',
            options: {
              minimize: false
            }
          }]
        },

        {
          test: /\.(scss|css)$/,
          use: [
            // fallback to style-loader in development
            !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },

        {
          test: /\.js$/,
          // exclude: /(node_modules)/,
          include: [/\/node_modules\/quill/],
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'quill-better-table',
        template: './demo/demo1.html',
        filename: 'demo/demo1.html',
        chunks: ['vendors~demo~demo1', 'demo~demo1', 'demo1']
      }),
      new HtmlWebpackPlugin({
        title: 'quill-better-table2',
        template: './demo/demo1.html',
        filename: 'demo/demo.html',
        chunks: ['vendors~demo~demo1', 'demo~demo1', 'demo']
      }),

      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].[id].css'
      }),

      new webpack.HotModuleReplacementPlugin({})
    ],

    devServer: {
      host: 'localhost',
      // contentBase: path.join(__dirname, './dist'),
      port: 8765,
      hot: false
    },
    devtool: 'eval-source-map',
    target: 'web'
  }
}
