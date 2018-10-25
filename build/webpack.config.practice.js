const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');



const defaulePlugin = [
	new HTMLPlugin({
		template:path.join(__dirname,'template.html')
	}),
	new webpack.DefinePlugin({
		'process.env':{
			NODE_ENV:'"development"'
		}
	})	
];

let config;

config = merge(baseConfig,{
	entry:path.join(__dirname,'../practice/index.js'),
	module:{
		rules:[
			{
			test:/\.less$/, 
			exclude:/node_modules/,
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
		}]	
	},
	devtool:'#cheap-module-eval-source-map',
	devServer:{
			contentBase:path.join(__dirname,'../dist'),
			host:'0.0.0.0',
			port:8880,
			overlay:{
				errors:true,
			},
			hot:true
		},
		//设置import Vue from 'vue'的vue版本；
	resolve:{
		alias:{
			'vue':path.join(__dirname,'../node_modules/vue/dist/vue.esm.js')
		}
	},
	plugins:defaulePlugin.concat([
		new webpack.HotModuleReplacementPlugin()
		])

})

module.exports = config;















