class ProxySandbox_new{
  active() {
    this.sandboxRuning = true;
  }

  enactive() {
    this.sandboxRuning = false;
  }

  constructor(props) {

    const rawWindow = window;
    const fakeWindow = {};
    const proxy = new Proxy(fakeWindow, {
      set(target, p, value, receiver) {
        if(this.sandboxRuning) {
          target[prop] = value;
          return true;
        }
      },
      get(target, p, receiver) {
        let value = prop in target ? fakeWindow[prop] : rawWindow[prop];
        return value;
      }
    })


    this.proxy = proxy;
  }
}



// 这种实现方式， 真正做到对于全局没有任何污染， 支持多个子应用同时加载

