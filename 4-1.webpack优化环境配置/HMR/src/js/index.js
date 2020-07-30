import print from './print'
import '../css/iconfont.css'
import '../css/index.less'

console.log("index.js文件被加载了~")

print();

if(module.hot){
    module.hot.accept('./print.js', function(){
        // 方法会监听print.js文件的变化，一旦发生变化，其他默认不会重新打包构建，执行后面的回调函数
        print();
    })
}