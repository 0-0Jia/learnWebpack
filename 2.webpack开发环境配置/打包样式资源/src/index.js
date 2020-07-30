/**
 * 入口起点文件
 * 
 * 开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
 * 生产环境webpack ./src/index.js -o ./build/built.js --mode=production
 * 
 * 1.只能处理js/json，不能处理css/img等其他资源
 * 2.生产环境和开发环境将ES6模块编译成浏览器能识别的模块化
 * 3.生产环境比开发环境多一个压缩js代码
 */

import './index.css'
import './index.less'