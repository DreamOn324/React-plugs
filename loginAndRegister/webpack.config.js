var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
	entry: {
		loginAndRegister: ['./src/js/loginAndRegister.js']
	},
	output: {
		path: './assets/src/js/',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader!jsx-loader?harmony'
		}, {
			test: /\.jsx$/,
			loader: 'babel-loader!jsx-loader?harmony'
		}, {
			test: /\.css$/,
			loaders: ['style', 'css']
		}]
	},
	plugins: [
		commonsPlugin
	]
};