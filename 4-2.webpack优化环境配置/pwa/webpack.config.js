
const {resolve} = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

process.env.NODE_ENV = "production";

/**
 * PWA: 渐进式开发应用程序（离线可访问）
 * workbox  --》 workbox-webpack-plugin
 * 
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
        new OptimizeCssAssetsWebpackPlugin(),
        new WorkboxWebpackPlugin.GenerateSW({
            /**
             * 1. 帮助serviceworker快速启动
             * 2. 删除旧的serviceworker
             * 
             * 生成一个servicewoker文件
             */
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    mode: 'production',
    devtool: 'source-map'
}