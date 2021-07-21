const path = require('path');

const p = require('./plugin/myplugin')
module.exports = {
	module: {
		rules: [
			{
				test: /.less/,
				use: [
					{
						loader: './loader/style-loader.js'
					},
					{
						loader: './loader/less-loader.js'
					}
				]
			},
			{
				test: /.txt/,
				use: './loader/banner-loader.js?filename=banner1'
			}
		]
	},

	plugins: [
		new p()
	],
	entry: './src/index.js',

	output: {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	mode: 'development'
};
