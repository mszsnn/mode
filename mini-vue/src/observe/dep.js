
// dep 和watcher 是多对多关系
//  每个属性都需要有自己的dep

let id = 0 // dep 实例的唯一标识

export default class Dep{
  static target = null   // 静态属性， 后面会有大用处
  constructor(props) {
    this.id = id++;
    this.subs = [];   // 这个用来存放watcher 的容器
  }
}
