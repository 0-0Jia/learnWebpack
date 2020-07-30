
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')



module.exports = {
    entry: './src/index.js',
    output: {
        // 文件名称（指定名称+目录）
        filename: 'js/[name].js',
        // 输出文件目录（将来所有资源输出的公共目录）
        path: resolve(__dirname, "build"),
       
    },
    module:{
        rules: [
            //loader的配置
            {
                test: /.\css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                //排除
                exclude: /node_modules/,
                //值检查src下的js文件
                include: resolve(__dirname, 'src'),
                // pre优先执行  post延后执行  不写中间执行
                enforce: 'pre',
                loader: 'eslint-loader'
            },
            {
                // 以下配置只会生效一个
                oneof:[

                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}