import { initMixin } from './init.js'

function Vue (option){
  // 原型上的方法进行初始化
  this._init(option)
}


// 非原型方式需要传递vue, 方便进行Vue传递

initMixin(Vue);


export default Vue;

