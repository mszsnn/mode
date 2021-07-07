// 每次new  watcher 会自增
import { pushTarget, popTarget } from "./dep";
import { queueWatcher } from './scheduler'
let id = 0;

export default class Watcher {
  constructor(vm, expOrFun, cb, options) {
    this.vm = vm;
    this.expOrFun = expOrFun;
    this.cb = cb; // 回调函数，watcher 更新更新之前可以执行 beforeUpdate 方法
    this.options = options;  // 额外选项
    this.deps = [] // 用来存放 dep的 容器

    this.depsId = new Set() //  用来去重
    this.id = id++;  // watcher 唯一标识

    if(typeof this.expOrFun === 'function') {
      this.getter = expOrFun;
    }

    this.get() // 实例化默认调用get
  }

  get() {
    pushTarget(this);  // 先将实例target 指向当前 watcher
    this.getter()   // 要做的事情  expOrFun, 当前指的是 mountComponent
    popTarget();
  }

  addDep(dep) {
    let id = dep.id;
    if(!this.depsId.has(id)) {
      this.depsId.add(id);
      this.deps.push(dep);
      // 这里 依赖将 watcher 添加在dep 里面， 同一个watcher 肯定是添加一次
      dep.addSub(this);
    }
  }


  update() {
    // 如果每次更新的时候， 可以将数据变化暂时缓存起来， 之后一起更新一次
    // 异步更新
    queueWatcher(this);
  }

  run () {
    this.get();
  }
}
