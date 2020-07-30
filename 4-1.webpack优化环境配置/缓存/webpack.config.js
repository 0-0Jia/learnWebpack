
const {resolve} = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = "production";

/**
 * 缓存：
 * babel缓存
 * cacheDirectory: true
 *      --> 让第二次打包构建速度更快
 * 文件资源缓存
 * hash：每次webpack构建时会生成一个唯一的hash值
 *  问题：因为js和css同时使用一个hash值，如果重新打包会导致所有缓存失效（可能我只改动一个文件）
 *      chunkhash： 根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值就一样
 *          问题：js和css的hash值还是一样的
 *                  因为css是在js中引入的，所以同属一个chunk
 *      contenthash: 根据文件的内容来生成hash值。不同文件hash值一定不一样
 *   --> 让代码上线运行缓存更好使用
 */

// 复用
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: ()=>{
                require('postcss-preset-env')()
            }
        }
    }
]

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built[contenthash:10].js',
        path: resolve(__dirname, "build")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            // 以下loader只会匹配一个
            // 注意： 不能有两项配置处理同一类型的文件
            {oneOf: [
                {
                    test: /\.css$/,
                    use: [...commonCssLoader]
                },
                {
                    test: /\.less$/,
                    use: [
                        ...commonCssLoader,
                        'less-loader'
                    ]
                },
               
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env',
                            {
                                useBuiltIns: "usage",
                                corejs: {
                                    version: 3
                                },
                                targets: {
                                    chrome: '60',
                                    firefox: '50'
                                }
                            }]
                        ],
                        // 开启babel缓存
                        // 第二次构建时，才会读取之前的缓存
                        cacheDirectory: true
                    }
                },
                {
                    test: /\.(jpg|png|gif)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 8*1024,
                        name: '[hash:10].[ext]',
                        outputPath: 'imgs',
                        esModule: false
                    }
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },
                {
                    exclude: /\.(js|html|css|less|jpg|png|gif)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'media'
                    }
                }
            ]}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built[contenthash:10].css'
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'production',
    devtool: 'source-map'
}