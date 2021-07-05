// 声明周期相关功能
import { patch } from './vdom/patch'
import Watcher from "./observe/watcher";

export  function mountComponent(vm, el) {
  // 上一步模板编译已经生成了render 函数， 接下来
  // 1  生成 虚拟dom   vm._render()
  // 2 将 虚拟dom 转化为 真实dom  vm._update()

  vm.$el = el;

  let updateComputed = () => {
    const result = vm._render()
    console.log('render 虚拟dom 结果',result);
    vm._update(result);
  }

  new Watcher(vm, updateComputed, null, true)
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (Vdom) {
    // 源码这里不是这样
    this.$el = patch(this.$el, Vdom);
  }
}
