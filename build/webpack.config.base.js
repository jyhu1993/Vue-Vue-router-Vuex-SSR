const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const createVueLoaderOptions = require('./vue-loader.config');

const isDev = process.env.NODE_ENV === 'development';

const config = {
	target:'web',
	entry:{
		index:path.join(__dirname,'../client/index.js'),
	},
	output:{
		path:path.join(__dirname,'../dist'),
		filename:'bundle.[hash:8].js',
	},
	module:{
		rules:[
			{
				test:/\.(vue|js|jsx)$/,
				loader:'eslint-loader',
				exclude:/node_modules/,
				//设置使用vue-loader之前先使用eslint进行校验；
				enforce:"pre"
			},
			{
				test:/\.vue$/, 
				loader:'vue-loader',
				options:createVueLoaderOptions(isDev)
			},
			{
				test:/\.js(x|'')$/,
				exclude:/node_modules/,
				use:'babel-loader'
			},
			{
				test:/\.(gif|jpg|jpeg|png|svg)$/,
				use:[
					{
						loader:'url-loader',
						options:{
							limit:1024,
							name:'resources/[path][name].[hash].[ext]'
						}
					}
				]
			}
		]
	},
	plugins:[
		new VueLoaderPlugin(),	
	]
}


module.exports = config;















