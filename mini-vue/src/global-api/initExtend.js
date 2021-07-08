import {mergeOptions} from "../util";

export function initExtend (Vue) {
  let cid = 0;

  Vue.extend = function (extendOptions) {
    // 创建子类的构造函数

    const Sub = function VueComponet(option) {
      this._init(option)  // 因为原型链上有
    }

    Sub.cid = cid++ ;

    // 原型链继承
    Sub.prototype = Object.create(this.prototype);  // 子类原型指向父类
    Sub.prototype.constructor = Sub;
    Sub.option = mergeOptions(this.option, extendOptions);

    return Sub;
  }
}
