import { observe} from "./observe";

export function initState(vm) {
  // 初始化状态 注意这里的顺序 比如我经常面试会问到 是否能在data里面直接使用prop的值 为什么？
  // 这里初始化的顺序依次是 prop>methods>data>computed>watch


  // 获取传入的数据对象

  const opts = vm.$options;

  if (opts.props) {
    initProps(vm);
  }

  if (opts.methods) {
    initMethods(vm);
  }

  if (opts.data) {
    initData(vm);
  }

  if (opts.computed) {
    initComputed(vm);
  }

  if (opts.watch) {
    initWatch(vm);
  }

}


function initData(vm) {
  // 初始化数据

  let data = vm.$options.data;
  //   实例的_data属性就是传入的data
  // vue组件data推荐使用函数 防止数据在组件之间共享

  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};


  // 把data数据代理到vm 也就是Vue实例上面 我们可以使用this.a来访问this._data.a

  for (let key in data) {
    proxy(vm, '_data', key);
  }


  // 对数据进行观测 --响应式数据核心
  // initState 咱们主要关注 initData 里面的 observe 是响应式数据核心
  // 所以另建 observer 文件夹来专注响应式逻辑 其次我们还做了一层数据代理 把data代理到实例对象this上


  observe(data);

}


function proxy(object, targetKey, key) {
  Object.defineProperty(object, key, {
    get() {
      return object[targetKey][key];
    },
    set(v) {
      object[targetKey][key] = v
    }
  })
}
