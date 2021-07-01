import { initState } from './state.js'


// initMixin 把_init 方法挂载在 Vue 原型 供 Vue 实例调用


export function initMixin(Vue) {

  // 提供_init 方法进行参数的初始化

  Vue.prototype._init = function (option) {
    // 实例this
    this.$options = option;

    // 接下来进行状态的初始化
    initState(this);
  }


}
