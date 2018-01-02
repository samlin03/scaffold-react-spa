const path = require("path");
const pkg = require('./package.json')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		app: './app/root.js',
		vendor: Object.keys(pkg.dependencies)
	},
	output: {
		path: path.resolve(__dirname, "dist/"),
		filename: 'js/[name].[chunkhash:8].js'
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: path.resolve(__dirname, "node_modules/"),
				include: path.resolve(__dirname, "app"),
				query: {
					presets: ['react', 'es2015'],
					plugins: [
						'react-html-attrs'
						// ["import", {
						// 	libraryName: "antd",
						// 	style: "css"
						// }]
					]
				}
			},
			{
				// test: /\.scss$/,
				// use: [
				// 	'style-loader',
				// 	'css-loader',
				// 	'postcss-loader',
				// 	'sass-loader'
				// ]
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
		        	fallback: "style-loader",
		            use: [
		            	"css-loader?minimize=true&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
		            	{
		            		loader: "postcss-loader",
		            		options: {
		            			plugins: [
		            				require("autoprefixer")({
										browsers: ['last 5 versions']
									})		
		            			]
		            		}
		            	},
		            	"sass-loader"
		            ]
		        })				
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
		        	fallback: "style-loader",
		            use: [
			            "css-loader?minimize=true&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
						{
		            		loader: "postcss-loader",
		            		options: {
		            			plugins: [
		            				require("autoprefixer")({
										browsers: ['last 5 versions']
									})		
		            			]
		            		}
		            	},			            
			            "less-loader"
		            ]
		        })				
			},
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
			            {
		            		loader: "postcss-loader",
		            		options: {
		            			plugins: [
		            				require("autoprefixer")({
										browsers: ['last 5 versions']
									})		
		            			]
		            		}
		            	}
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
		            	{
		            		loader: "postcss-loader",
		            		options: {
		            			plugins: [
		            				require("autoprefixer")({
										browsers: ['last 5 versions']
									})		
		            			]
		            		}
		            	}
		            ]
		        })				
			},		
			{
				test: /\.html$/,
				use: 'html-loader'
			},
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
			template: './app/template/index.tmpl.html',
			inject: 'body',
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}			
		}),

		// css 打包，link引入插件
		new ExtractTextPlugin({
			filename: 'css/style-[contenthash:8].css',
		}),

		// js压缩插件
		new UglifyJsPlugin({
			uglifyOptions:{
				compress: {
				    warnings: false // 去掉警告
				},
				output: {
				    comments: false, //去掉注释
				}
			}
		}),

		// 用了js压缩插件后，react会报错
		new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("production") 
            }
        }),

        // 生成的文件banner信息
        new webpack.BannerPlugin('版权归林瑜个人所有')
	]
};