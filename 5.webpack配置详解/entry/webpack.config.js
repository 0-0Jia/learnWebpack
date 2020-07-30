
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * entry: 入口起点
 * 1. string       单入口
 *      打包形成一个chunk，输出一个bundle文件
 *      此时chunk的名称默认是main
 * 2. array     多入口entry: ['./src/index.js', './src/add.js'],
 *      所有入口文件最终只会形成一个chunk，输出一个bundle
 *      --->只有在HMR功能中让html热更新生效
 * 3. object        多入口
 *      有几个入口文件就形成几个chunk，输出几个bundle文件
 *      此时chunk的名称是key
 * 
 * --->特殊用法
 * entry: {
        index: ['./src/index.js', './src/count.js'],
        add: './src/add.js'
    },
 */

module.exports = {
    entry: {
        index: ['./src/index.js', './src/count.js'],
        add: './src/add.js'
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, "build")
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}