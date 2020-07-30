
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
        hot: true
    },
    devtool: 'eval-source-map'
}

/**
 * source-map  :  一种提供源代码到构建后代码映射技术（如果构建后代码出错，通过映射关系可以追踪源代码错误）
 * 
 * [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
 * 
 * source-map  外部
 *      错误代码准确信息 和 源代码的错误位置
 * inline-source-map  内联（只生成一个）
 *      错误代码准确信息 和 源代码的错误位置
 * hidden-source-map  外部
 *      错误代码错误原因，但是没有错误位置，不能追踪到源代码的错误，只能提示构建代码的错误位置
 * eval-source-map   内联（每一个文件都生成对应的）
 *      错误代码准确信息 和 源代码的错误位置
 * nosources-source-map  外部
 *      错误代码准确信息，但是没有任何源代码信息
 * cheap-source-map   外部
 *      错误代码准确信息 和 源代码的错误位置，只能精确的行
 * cheap-module-source-map   外部
 *      错误代码准确信息 和 源代码的错误位置，只能精确的行
 *      module会将loader的source map加入
 * 内联和外部的区别： 外部生成了文件，内联没有。  内联构建速度更快
 * 
 * 开发环境： 速度快，调试更友好
 *      速度快（eval>inline>cheap>...）
 *          eval-cheap-source-map
 *          eval-source-map
 *      调试更友好
 *          source-map
 *          cheap-module-source-map
 *          cheap-source-map
 * 
 *          ---》eval-source-map / eval-cheap-module-source-map
 * 
 * 生产环境： 源代码要不要隐藏？调试要不要更友好？
 *      内联会让代码体积变大，所以在生产环境中不用内联
 *      nosources-source-map    
 *      hidden-source-map
 * 
 *      ---》source-map / cheap-module-source-map
 * 
 */