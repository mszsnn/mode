
// dep 和watcher 是多对多关系
//  每个属性都需要有自己的dep

let id = 0 // dep 实例的唯一标识
const targetStack = [];

export default class Dep{
  static target = null   // 静态属性， 后面会有大用处
  constructor(props) {
    this.id = id++;
    this.subs = [];   // 这个用来存放watcher 的容器
  }

  depend() {
    if(Dep.target) {
      // 把自身的实例放在watcher 里面,
      // 这里其实是执行watcher.addDep()  // 将 依赖放在watcher 的deps 里面
      Dep.target.addDep(this)
    }
  }

  notify() {
    // 依次执行subs 里面的watcher 更新方法
    this.subs.forEach(watcher => {
      watcher.update()
    })

  }


  addSub(watcher) {
    this.subs.push(watcher)
  }
}


export function pushTarget(watcher) {
  targetStack.push(watcher);
  Dep.target = watcher;
}

export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack - 1];
}

