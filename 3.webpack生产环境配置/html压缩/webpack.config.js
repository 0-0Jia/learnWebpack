
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
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // 压缩html
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    mode: "production"
}