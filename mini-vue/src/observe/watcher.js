// 每次new  watcher 会自增
import {pushScopeId} from "vue";

let id = 0;

export default class Watcher {
  constructor(vm, expOrFun, cb, options) {
    this.vm = vm;
    this.expOrFun = expOrFun;
    this.cb = cb; // 回调函数，watcher 更新更新之前可以执行 beforeUpdate 方法
    this.options = options;  // 额外选项
    this.deps = [] // 用来存放 dep 容器

    this.depsId = new Set() //  用来去重
    this.id = id++;  // watcher 唯一标识

    if(typeof this.expOrFun === 'function') {
      this.getter = expOrFun;
    }

    this.get() // 实例化默认调用get
  }

  get() {
    pushTarget(this);  // 先将实例target 指向当期那watcher
    this.getter()
    popTarget();
  }

  addDep(dep) {
    let id = dep.id;
    if(!this.depsId.has(id)) {
      this.depsId.add(id);
      this.deps.push(dep);
    }

    dep.addSub(this);
  }
}
