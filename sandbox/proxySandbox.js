// 代理沙箱两种： 基于es6 proxy实现
//  1 单例沙箱
//  2 多例沙箱

class Legacy{
  constructor(props) {
    // 沙箱期间新增的全局变量
    this.addedPropsMapInSandbox = {};

    // 沙箱期间更新的全局变量
    this.modifiedPropsOriginalValueMapInSandbox = {};

    // 持续记录更新的（新增和修改的）全局变量的map , 用于在任意时刻做snapshot
    this.currentUpdatedPropsValueMap = {};


    const rawWindow = Window;
    const fakeWindow = Object.create(null);

    this.sandboxRunning = true;

    const proxy = new Proxy(fakeWindow, {
      set(target, key, value) {
        if (this.sandboxRunning) {
          // 如果是激活状态
          if(!rawWindow.hasOwnProperty(key)) {
            // 如果当前window 身上不存在这个属性， 这个就是新增值
            this.addedPropsMapInSandbox[prop] = value;
          } else if(!this.modifiedPropsOriginalValueMapInSandbox()) {
            // 更新值
          }
        }
      },

      get(target, prop) {

      }
    })
  }
}


