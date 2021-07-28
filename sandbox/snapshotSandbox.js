// 第一种沙箱： 快照沙箱

// active  进入沙箱之前， 存储当前window 的快照， 如果上次有修改的属性， 还原现在的window
// 退出沙箱的时候， diff 比对哪些做了修改， 保存修改， 然后通过快照还原 window

function iter(window, callback) {
  for (const prop in window) {
    if (window.hasOwnProperty(prop)) {
      callback(prop);
    }
  }
}

class SnapshotSandbox {
  constructor() {
    this.proxy = window;
    this.modifyPropMap = {};
  }

  //激活之前
  active() {
    // 缓存active 状态的window
    this.windowSnapshot = {};

    // 存储window身上的每个属性
    iter(window, (prop) => {
      this.windowSnapshot[prop] = window[prop];
    })

    Object.keys(this.modifyPropMap).forEach(p => {
      window[p] = this.modifyPropMap[p];
    })

  }

  // 退出沙箱
  inactive() {
    iter(window, (prop) => {
      if(this.windowSnapshot[prop] !== window[prop]) {
        // 记录变更
        this.modifyPropMap[prop] = window[prop];
        // 还原window
        window[prop] = this.windowSnapshot[prop];
      }
    })
  }
}
