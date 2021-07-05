import { createElement, createTextNode } from "./vdom";

export function renderMixin(Vue) {
  // 将render 函数转化为 虚拟dom
  Vue.prototype._render = function () {
    const { render } = this.$options;
    // 直接调用函数， 主要是处理 以下三个函数
    return render.call(this);
  }


  // render 函数中含有   _c 生成元素  _v 生成文本  _s JSON.stringify()

  Vue.prototype._c = function (...arg) {
    return createElement(...arg)
  }

  Vue.prototype._v = function (text) {
    return createTextNode(text)
  }

  Vue.prototype._s = function (val) {
    return val === null ? '' : typeof val === 'object' ? JSON.stringify(val) : val;
  }

}


