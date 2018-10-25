const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development'

const config = {
	target:'web',
	entry:{
		index:path.resolve('client','index.js'),
	},
	output:{
		path:path.resolve('dist'),
		filename:'bundle.[hash:8].js',
	},
	module:{
		rules:[
			{
				test:/\.vue$/, 
				use:'vue-loader'
			},
			{
				test:/\.jsx$/,
				exclude:[
					path.resolve('node_modules')
				],
				use:'babel-loader'
			},
			{
				test:/\.(gif|jpg|jpeg|png|svg)$/,
				use:[
					{
						loader:'url-loader',
						options:{
							limit:1024,
							name:'[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins:[
		new VueLoaderPlugin(),
		new HTMLPlugin(),
		new webpack.DefinePlugin({
			'process.env':{
				NODE_ENV:isDev ? '"development"' : '"production"'
			}
		})	
	]
}


if (isDev) {
	config.module.rules.push(			
		{
			test:/\.less$/, 
			exclude:[
				path.resolve('node_modules')
			],
			use:[
				{loader:'style-loader'},
				{loader:'css-loader'},
				{loader:'less-loader'},
				{
					loader:'postcss-loader',
					options:{
						plugins:[
							require("autoprefixer")
						]
					}
				}
			]
		});
	config.devtool = '#cheap-module-eval-source-map';
	config.devServer = {
		contentBase:path.join(__dirname,'dist'),
		host:'0.0.0.0',
		port:8080,
		overlay:{
			errors:true,
		},
		hot:true
	};
	config.plugins.push(new webpack.HotModuleReplacementPlugin());
}else{
	config.entry = {
		app:path.resolve('client','index.js'),
		vendor:['vue'],
	},
	//webpack4 分离第三方类库；
	config.optimization = {
		runtimeChunk: {
	        name: "runtime"
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
	config.output.filename = '[name].[chunkhash:8].js';
	config.module.rules.push(
		{
			test:/\.less$/, 
			exclude:[
				path.resolve('node_modules')
			],
			//分离css;
			use:ExtractPlugin.extract({
				fallback:'style-loader',
				use:[
					{loader:'css-loader'},
					{loader:'less-loader'},
					{
						loader:'postcss-loader',
						options:{
							plugins:[
								require("autoprefixer")
							]
						}
					}
				]
			})
	});
	config.plugins.push(
		new ExtractPlugin('styles.[hash:8].css')
	);
}

module.exports = config;















