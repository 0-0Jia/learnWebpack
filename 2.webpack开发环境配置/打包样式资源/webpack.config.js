/**
 * webpack 配置文件
 * 当运行webpack指令时，会加载里面的配置
 * 所有构建工具都是基于nodejs平台运行，模块化默认采用commonjs
 */
// 用来拼接绝对路径的方法
 const {resolve} = require('path')

 module.exports = {
     //入口起点
     entry: './src/index.js',
     output: {
         filename: "built.js",
         // __dirname nodejs变量，代表当前文件目录的绝对路径
         path: resolve(__dirname, "build")
     },
     module:{
         rules: [
            // 详细的loader配置
            {
                test: /\.css$/,
                // 使用哪些loader进行处理
                use: [
                    // use数组中loader执行顺序，从右到左
                    // 创建style标签，将js中的样式资源进行插入，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载js中，里面的内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                // 使用哪些loader进行处理
                use: [
                    'style-loader',
                    'css-loader',
                    // 将less文件编译成css文件
                    'less-loader'
                ]
            }
         ]
     },
     plugins: [

     ],
     mode: 'development',
     //mode: 'production',

 }