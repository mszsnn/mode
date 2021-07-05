import {initState} from './state.js'
import {compareToFunction} from './compiler'
import { mountComponent } from './lifecycle'
// initMixin 把_init 方法挂载在 Vue 原型 供 Vue 实例调用


export function initMixin(Vue) {

  // 提供_init 方法进行参数的初始化

  Vue.prototype._init = function (option) {
    // 实例this
    this.$options = option;

    //1 接下来进行状态的初始化
    initState(this);


    //2 如果有el 属性再进行模板挂载

    if (this.$options.el) {
      this.$mount(this.$options.el);
    }

  }

  Vue.prototype.$mount = function (el) {
    // 模板挂载的时候, 挂载的时候必然要获取元素， 然后统一生成render 函数
    let options = this.$options;

    // 这块代码在源码里面的位置其实是放在entry-runtime-with-compiler.js里面
    // 代表的是Vue源码里面包含了compile编译功能 这个和runtime-only版本需要区分开
    el = document.querySelector(el);  // 最终挂载的元素


    // 无论是template 还是 el ， 最终都要获取到 render 函数，为了统一
    // 有template，屏蔽el

    if (!options.render) {

      let template = options.template;

      if (!template && el) {
        template = el.outerHTML;
      }


      if (template) {
        options.render = compareToFunction(template);
      }
    }



    // 上述已经完成了template/el 的模板编译为render 函数， 接下来需要将  render 函数挂在到真实的 el 节点上面
    return mountComponent(this, el);

  }
}
