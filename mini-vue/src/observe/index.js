import {arrayMethods} from './array'


class Observe {
  constructor(value) {
    // 正式因为性能原因
    // 这里需要对数组进行单独处理

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
    console.log('循环', value);
    for (let i = 0; i < value.length; i++) {
      observe(value[i]);
    }
  }
}


function defineReactive(data, key, value) {

  observe(value);

  // 此方法不能对对象的删除值和创建值进行处理

  Object.defineProperty(data, key, {
    get() {
      console.log('获取值');
      return value;
    },
    set(newValue) {
      if (newValue === value) {
        return;
      }
      console.log('设置值')
      // TODO 更新视图  数据变化的时候，要在这里更新视图
      value = newValue;
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
