
const {resolve}  = require("path")
const httpWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, "build")
    },
    module: {
        rules: [{
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]},
                {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]},
                // 只需要使用一个loader用loader
                // 下载url-loader， file-loader
                {
                    test: /\.(jpg|png|gif)$/,
                    loader: "url-loader",
                    // 图片大小小于10kb，就会被base64处理
                    // 优点：减少请求数量（减轻服务器的压力）
                    // 缺点：图片体积会更大（文件请求速度更慢）
                    options:{
                        limit: 10*1024,
                        // 因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
                        // 解析时会出问题[Object Module]
                        // 关闭url-loader的es6模块化，使用commjs解析
                        esModule: false,
                        // 图片重命名
                        name: '[hash: 10].[ext]'
                    }
                },
                {
                    test: /\.html$/,
                    // 处理html文件的image的图片（负责引入img，从而只能被url-loader进行处理）
                    loader: 'html-loader'
                }
        ]
    },
    plugins: [
        new httpWebpackPlugin({
            template: './src/index.html'
        }
        )
    ],
    mode: "development"
}