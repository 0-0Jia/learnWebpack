/**
 * webpack 会将打包的结果输出出去
 * npx webpack-dev-server 只会在内存中编译打包，没有输出
 */



const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: './src/js/index.js',
    output:{
        filename: 'js/built.js',
        path: resolve(__dirname, "build")
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10*1024,
                    name: '[hash:10].[ext]',
                    esModule: false,
                    outputPath: 'imgs'
                },
                
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }, 
            {
                exclude: /\.(html|png|jpg|gif|css|js|less)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                },
                
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, "build"),
        compress: true,
        port: 3000,
        open: true
    }
}