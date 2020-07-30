
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    // 单入口   单页面应用
    entry: './src/js/index.js',
    output: {
        // 取文件名[name]
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, "build")
    },
    module: {
        
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }    
    },
    mode: 'production'
}