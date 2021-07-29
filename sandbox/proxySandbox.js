// 代理沙箱两种： 基于es6 proxy实现
//  1 单例沙箱
//  2 多例沙箱



// 单例沙箱


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
          } else if(!this.modifiedPropsOriginalValueMapInSandbox[prop]) {
            // 更新值, 记录更新值的初始值
            const origin = rawWindow[prop];
            this.modifiedPropsOriginalValueMapInSandbox[prop] = origin;
          }

          // 记录此次修改
          this.currentUpdatedPropsValueMap[prop] = value;

          // 将不管是新增的值还是修改的都赋值给当前window
          rawWindow[prop] =- value;
          return true;
        }
        return true
      },

      get(target, prop) {
        return rawWindow[prop]
      }
    })

    this.proxy = proxy;

  }

  active() {

    if(!this.sandboxRunning) {
      // 还原上次修改的值
      for(let key in this.currentUpdatedPropsValueMap) {
        window[key] = this.currentUpdatedPropsValueMap[key];
      }
    }

    this.sandboxRunning = true;
  }

  inactive() {
    // 退出沙箱的时候， 将初始值都还原
    for(const key in this.modifiedPropsOriginalValueMapInSandbox) {
      window[key] = this.modifiedPropsOriginalValueMapInSandbox[key];
    }



    // 删除新增的值
    for(const key in this.addedPropsMapInSandbox) {
      delete window[key];
    }

    this.sandboxRunning = false;
  }
}


// 这种使用方法。 在设置属性和添加属性的时候， 可以清楚的知晓改动了哪些属性， 不需要复制整个window

// 进入沙箱， 更新操作过的属性， 不管是添加还是修改

// 退出沙箱， 还原操作过的属性为初始值， 删除新增的属性


// 这种方式比快照方式速度快，不用拷贝整个window


// 但是这种方式或者是快照沙箱都污染了全局变量  window




