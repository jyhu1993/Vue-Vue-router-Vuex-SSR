const path = require('path')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')


const isDev = process.env.NODE_ENV === 'development'

const defaulePlugin = [
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  })
]

let config


if (isDev) {
  config = merge(baseConfig, {
    module: {
      rules: [
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'less-loader' },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')
                ]
              }
            }
          ]
        }]
    },
    devtool: '#cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, '../dist'),
      host: '0.0.0.0',
      port: 8080,
      overlay: {
        errors: true
      },
      historyApiFallback: {
        index: '/index.html'
      },
      hot: true
    },
    plugins: defaulePlugin.concat([
      new webpack.HotModuleReplacementPlugin()
    ])

  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    // webpack4 分离第三方类库；
    optimization: {
      runtimeChunk: {
		        name: 'runtime'
		    },
	        splitChunks: {
	            cacheGroups: {
	                commons: {
	                    test: /[\\/]node_modules[\\/]/,
	                    name: 'vendor',
	                    chunks: 'all'
	                }
	            }
	        }
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          exclude: [path.resolve('../node_modules')],
          // 分离css;
          use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader' },
              { loader: 'less-loader' },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [
                    require('autoprefixer')
                  ]
                }
              }
            ]
          })
        }]
    },
    plugins: defaulePlugin.concat([new ExtractPlugin('styles.[hash:8].css')])
  })
}

module.exports = config










