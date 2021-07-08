import { initMixin } from './init.js'
import { renderMixin } from "./render";
import { lifecycleMixin } from "./lifecycle";
import { initGlobalApi } from './global-api/index.js'
function Vue (option){
  // 原型上的方法进行初始化
  this._init(option)
}


// 非原型方式需要传递vue, 方便进行Vue传递


// 初始化相关混入
initMixin(Vue);

// 虚拟dom混入
renderMixin(Vue)

// 真实dom 渲染
lifecycleMixin(Vue);


// 初始化全局Api
initGlobalApi(Vue);

export default Vue;

