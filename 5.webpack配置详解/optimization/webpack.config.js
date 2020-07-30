
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')


module.exports = {
    entry: './src/js/index.js',
    output: {
        // 文件名称（指定名称+目录）
        filename: 'js/[name].[contenthash:10].js',
        // 输出文件目录（将来所有资源输出的公共目录）
        path: resolve(__dirname, "build"),
        chunkFilename: 'js/[name].[contenthash:10]_chunk.js'
    },
    module:{
        rules: [
            //loader的配置
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
          
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'production',
    // 解析模块的规则
    resolve: {
        // 配置解析模块路径别名,简写路径.缺点:路径没有提示
        alias: {
            $css: resolve(__dirname, "src/css")
        },
        // 配置省略文件路径的后缀名
        extensions:[".js", ".json", ".css"],
        // 告诉webpack解析模块去找哪个目录
        modules: [resolve(__dirname, '../../node_modules'), "node_modules"]
    },
    devServer: {
        // 运行代码的目录
        contentBase: resolve(__dirname, "build"),
        // 监视contentBase目录下的所有文件，一旦文件变化就会reload
        watchContentBase: true,
        watchOptions: {
            // 忽略文件
            ignored: /node_modules/
        },
        // 启动gzip压缩
        compress: true,
        // 端口号
        post: 5000,
        // 域名
        host: "localhost",
        // 自动打开浏览器
        open: true,
        // 开启HMR功能
        hot: true,
        // 不要显示启动服务器日志信息
        clientLogLevel: 'none',
        // 除了一些基本启动信息以外，其他内容都不要显示
        quiet: true,
        // 如果出错了，不要全屏提示
        overlay: false,
        // 服务器代理： 解决开发环境跨域问题
        proxy: {
            // 一旦devServer服务器接收到/api/xxx请求，就会把请求转发到另外一个服务器（3000）
            '/api': {
                target: 'http://localhost: 3000',
                // 发送请求时，请求路径重写：将/api/xxx --> /xxx（去掉/api）
                pathRewrite: {
                    '^api': ''
                }
            }
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        //     // 以下为默认值
        //     // 分割的chunk最小为30kb
        //     miniSize: 30*1024,
        //     // 最大没有限制
        //     maxSize: 0,
        //     //要提取的chunk最少要被引用一次
        //     minChunks: 1,
        //     // 按需加载时并行加载文件的最大数量
        //     maxAsyncRequests: 5,
        //     // 入口js文件最大并行请求数量
        //     maxInitialRequests: 3,
        //     // 名称连接符
        //     automaticNameDelimiter: "~",
        //     // 可以使用命名规则
        //     name: true,
        //     cacheGroups: {   // 分割chunk的组
        //         // node_modules文件会被打包到vendors组中的chunk中
        //         // vendors~xxx.js  满足上面的规则：如大小超过30kb....
        //         vendors: {
        //             test: /[\\/]node_modules[\\/]/,
        //             // 优先级
        //             priority: -10
        //         },
        //         default: {
        //             minChunks: 2,
        //             priority: -20,
        //             // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
        //             reuseExistingChunk: true
        //         }
        //     }
        },
        // 将当前模块的记录其他文件的hash单独打包为一个文件runtime
        // 解决：修改a文件导致b文件的contenthash变化
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint}`
        },
        minimizer: [
            // 配置生产环境的压缩方案： js和css
            new TerserWebpackPlugin({
                // 开启缓存
                cache: true,
                //开启多线程打包
                parallel:true,
                //启动source-map
                sourceMap: true
            })
        ]
    }
} 