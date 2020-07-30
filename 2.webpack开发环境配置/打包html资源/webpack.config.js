/**
 * loader 下载，使用（配置loader）
 * plugins 下载，引入，使用
 */


const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, "build")
    },
    module: {
        rules:[

        ]
    },
    plugins: [
        // 默认会创建一个空的html文件，引入打包输出的所有资源（js/css)
        // 需要有结构的html文件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}