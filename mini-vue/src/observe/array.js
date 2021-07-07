
const origin = Array.prototype;

// 保留之前的方法原型，  AOP , 面向切片编程 冬天的扩展功能
export const arrayMethods = Object.create(origin);

const  needHandler = [
  'pop',
  'push',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

needHandler.forEach(name => {
  // 对方法进行重写
  arrayMethods[name] = function (...arg) {
    // 必须得保留原来的结果
    const result = origin[name].apply(this, arg);

    // 在这里需要考虑一个问题， 如果 新添加的元素是数据， 需要对数组里面的每一项进行侦测

    // 先判断是否添加， 添加的元素是什么


    let insert;
    // 拿到监测实例
    const ob = this.__ob__;

    switch (name) {
      case 'push':
      case 'unshift':
        insert = arg;
        break;
      case 'splice':
        insert = arg.slice(2)
        break;
      default:
        break
    }

    if(insert) {
      // 在这里应该是监测的
      ob.observeArray(insert);
    }

    //数组派发更新 ob指的就是数组对应的Observer实例
    // 我们在get的时候判断如果属性的值还是对象那么就在Observer实例的dep收集依赖
    // 所以这里是一一对应的  可以直接更新
    ob.dep.notify();


    return result
  }
})


