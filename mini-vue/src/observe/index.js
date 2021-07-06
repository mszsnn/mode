import {arrayMethods} from './array'
import Dep from "./dep";


class Observe {
  constructor(value) {
    // 正式因为性能原因
    // 这里需要对数组进行单独处理
    this.value = value;
    this.dep = new Dep(); //当数组使用7种重写方法时  是无法进行依赖收集和派发更新的  此属性主要辅助数组更新


    // 给每个响应的数组或者对象添加  __ob__ 属性来标识是个响应数据，
    // 并且对数组来讲很有用， 存储的值为响应的实例对象

    // 响应式数据可以使用__ob__来获取 Observer 实例的相关方法 这对数组很关键

    Object.defineProperty(value, '__ob__', {
      value: this,   // 这里很关键
      enumerable: false,
      configurable: true,
      writable: true
    })


    if (Array.isArray(value)) {
      // 这里对数组做了额外判断
      // 通过重写数组原型方法来对数组的七种方法进行拦截

      value.__proto__ = arrayMethods;

      this.observeArray(value);

    } else {
      this.walk(value);
    }
  }

  walk(data) {
    // 对对象身上的属性进行全量遍历
    for (let [key, value] of Object.entries(data)) {
      defineReactive(data, key, value);
    }
  }

  observeArray(value) {
    for (let i = 0; i < value.length; i++) {
      observe(value[i]);
    }
  }
}


function defineReactive(data, key, value) {

  let childOb = observe(value);

  console.log('childOb',childOb);
  let dep = new Dep(); // 每个属性都需要有Dep

  // 此方法不能对对象的删除值和创建值进行处理
  Object.defineProperty(data, key, {
    get() {
      // 在页面取值的时候，将watcher  存储在deps 里面 ---------依赖收集
      if (Dep.target) {
        dep.depend();
      }

      console.log('依赖收集', key, Dep.target )
      return value;
    },
    set(newValue) {
      if (newValue === value) {
        return;
      }
      observe(value);
      value = newValue;
      dep.notify();  // 通知watcher 去更新 ------------ 派发更新
    }
  })

}


export function observe(value) {
  // 传递进来的是 value
  // 如果传递进来的 value 是对象或者数组
  if (
    Object.prototype.toString.call(value) === '[object Object]' ||
    Array.isArray(value)
  ) {
    return new Observe(value);
  }


  // 数组需要特殊处理的原因

  // 这样递归的方式其实无论是对象还是数组都进行了观测 但是我们想一下此时如果 data 包含数组比如 a:[1,2,3,4,5]
  // 那么我们根据下标可以直接修改数据也能触发 set 但是如果一个数组里面有上千上万个元素 每一个元素下标都添加 get 和 set 方法
  // 这样对于性能来说是承担不起的 所以此方法只用来劫持对象


}
