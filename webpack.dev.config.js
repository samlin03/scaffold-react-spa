const path = require("path");
const pkg = require('./package.json')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const dependencies = Object.keys(pkg.dependencies);
// const vendor = dependencies.filter((item) => {
// 	return item != 'fetch' && (item != 'antd-mobile');
// });
module.exports = {
	entry: {
		app: './app/root.js'
		// ,vendor
	},
	output: {
		path: path.resolve(__dirname, "build/"),
		filename: 'js/[name]-[chunkhash:6].js'
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: path.resolve(__dirname, "node_modules/"),
				query: {
					presets: ['react', 'es2015'],
					plugins: [
						'syntax-dynamic-import',
						'react-html-attrs',
						["import", {
							libraryName: "antd-mobile",
							style: "css"
						}]
					]
				}
			},
			// 所有css 放在一个link里
			{
				test: /\.scss$/,
				exclude: [
					path.resolve(__dirname, 'app/static/style/'),
					path.resolve(__dirname, 'node_modules/')
				],
				use: ExtractTextPlugin.extract({
		        	fallback: "style-loader",
		            use: [
		            	"css-loader?minimize=true&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
		            	"postcss-loader",
		            	"sass-loader"
		            ]
		        })				
			},
			// global.scss 放在style里
			{
				test: /\.scss$/,
				exclude: path.resolve(__dirname, 'node_modules/'),
				include: path.resolve(__dirname, 'app/static/style/'),
				use: [
					'style-loader',
					'css-loader?minimize=true&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
					'postcss-loader',
					'sass-loader'
				]
			},
			// {
			// 	test: /\.less$/,
			// 	use: ExtractTextPlugin.extract({
		 //        	fallback: "style-loader",
		 //            use: [
			//             "css-loader?minimize=true&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
			// 			'postcss-loader',			            
			//             "less-loader"
		 //            ]
		 //        })				
			// },
			// 针对antd也会进行css-module处理，制定2套css打包规则
			{
				// test: /\.css$/,
				// use: [
				// 	'style-loader',
				// 	'css-loader?importLoaders=1',
				// 	'postcss-loader'
				// ]
				test: /\.css$/,
				exclude: path.resolve(__dirname, "node_modules/"),
		        use: ExtractTextPlugin.extract({
		        	fallback: "style-loader",
		            use: [
			            "css-loader?minimize=true&modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]",
			            "postcss-loader"
		            ]
		        })
			},
			{
				test: /\.css$/,
				include: path.resolve(__dirname, "node_modules/"),
		        use: ExtractTextPlugin.extract({
		        	fallback: "style-loader",
		            use: [
		            	"css-loader?minimize=true&importLoaders=1",
		            	"postcss-loader"
		            ]
		        })				
			},		
			// {
			// 	test: /\.html$/,
			// 	use: 'html-loader'
			// },
			{
				test: /\.(png|gif|jpe?g|svg)$/i,
				exclude: path.resolve(__dirname, "node_modules/"),
				loaders: [
					'url-loader?name=images/[name]-[hash:5].[ext]&limit=5000',
                    'image-webpack-loader'
				]
			}			
		]
	},
	plugins: [
		// html 模板插件
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './app/index.tmpl.html',
			inject: 'body'			
		}),
		
		// 提取公共模块
		// new webpack.optimize.CommonsChunkPlugin({
  //           name: 'vendor' // 指定公共 bundle 的名称。
  //       }),

		// css 打包，link引入插件
		new ExtractTextPlugin({
			filename: 'css/style-[contenthash:8].css',
		}),
		
		// 自动打开URL
		new OpenBrowserPlugin({ 
			url: 'http://localhost:8080' 
		}),

		// js压缩插件
		// new UglifyJsPlugin({
		// 	uglifyOptions:{
		// 		compress: {
		// 		    warnings: false // 去掉警告
		// 		},
		// 		output: {
		// 		    comments: false //去掉注释
		// 		}
		// 	}
		// }),
		
		// 可视化查看module分布
		new BundleAnalyzerPlugin({
			analyzerMode: 'server',
			analyzerHost: '127.0.0.1',
			analyzerPort: 8888,
			reportFilename: 'report.html',
			defaultSizes: 'parsed',
			openAnalyzer: true,
			generateStatsFile: false,
			statsFilename: 'stats.json',
			statsOptions: null,
			logLevel: 'info'
		})
	]
};