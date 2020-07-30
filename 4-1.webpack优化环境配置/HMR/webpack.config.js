/**
 * hot module replacement 热模块替换、模块热替换
 * 一个模块发生变化，只会重新打包这一个模块，而不是打包所有模块，极大提升构建速度
 * 
 * 样式文件：可以使用HMR功能，因为style-loader内部实现了
 * js文件：默认没有HMR功能     --》  需要修改js代码，添加支持HMR功能的代码
 * 注意： HMR功能对js的处理，只能处理非入口js文件的其他文件
 * 
 * html文件：默认没有HMR功能，同时导致html文件不能热更新了(不用做HMR功能)
 *      解决：修改entry入口，将html文件引入
 */


const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: ['./src/js/index.js', './src/index.html'],
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
        open: true,
        // 当修改webpack配置，新配置想生效，必须重启webpack服务
        hot: true
    }
}