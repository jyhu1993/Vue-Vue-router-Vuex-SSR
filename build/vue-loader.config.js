

module.exports = (isDev) => {
	return {
		//删除字符串后面的空格；
		preserveWhitepace:true,
		//分离.vue文件中的css;
		extractCSS:!isDev,
		cssModules:{
			localIdentName:'[path]-[name]-[hash:base64:5]',
			camelCase:true
		},
		
	}

}