
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')



module.exports = {
    entry: './src/index.js',
    output: {
        // 文件名称（指定名称+目录）
        filename: 'js/[name].js',
        // 输出文件目录（将来所有资源输出的公共目录）
        path: resolve(__dirname, "build"),
        // 所有输出资源的公共路径 --> 'imgs/a.jpg' -> '/imgs/a.jpg'  一般用于生产环境
        publicPath: "/",
        chunkFilename: 'js/[name]_chunk.js',    //  非入口chunk的名称
        library: '[name]',  //整个库向外暴露的变量名
        libraryTarget: "window" //变量名添加到哪个上
        // window brower
        // global node
        // commonjs
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}