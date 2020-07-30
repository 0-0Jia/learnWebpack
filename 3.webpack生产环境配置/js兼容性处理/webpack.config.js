
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, "build")
    },
    module: {
        rules: [
            /**
             * js兼容性处理 babel-loader @babel/core  @babel/preset-env
             * 1. 基本js兼容性处理 -->@babel/preset-env
             *    问题：只能转换基本语法，如promise不能转换
             * 2. 全部js兼容性处理 -->@babel/polyfill
             *    问题：我只要解决部分的兼容性问题，但是将所有兼容性代码引入体积太大
             * 3. 需要做兼容性处理的就做：按需加载 --> corejs
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // 预设： 指示babel做怎样的兼容性处理
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                // 按需下载
                                useBuiltIns: 'usage',
                                corejs: {
                                    // 指定corejs版本
                                    version: 3
                                },
                                // 指定兼容做到哪个浏览器版本
                                targets: {
                                    chrome: '60',
                                    firefox: '50',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: "development"
}