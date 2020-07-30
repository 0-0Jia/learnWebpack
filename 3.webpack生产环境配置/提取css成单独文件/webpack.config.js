
const {resolve} = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, "build")
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    // // 创建style标签，将样式放入
                    // 'style-loader',
                    // 这个loader取代style-loader 作用：提取出js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    // 将css整合到js文件中
                     'css-loader'
                    ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            // 对输出的css文件重命名
            filename: 'css/built.css'
        })
    ],
    mode: 'development'

}