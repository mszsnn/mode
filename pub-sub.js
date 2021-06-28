class Player {
  constructor() {
    // 观察者
    this.watcher = {}
  }

  // 订阅
  _subscription(event, callback) {
    console.log(1);
    // 存储所有相关的订阅操作
    this.watcher[event] = this.watcher[event] || [];
    this.watcher[event].push(callback);
    console.log(this.watcher[event])
  }

  // 退订
  _subscription(event, callback) {
    if(callback) {
      if (this.watcher[event]) {
        let index =  this.watcher[event].findIndex(item => Object.is(callback, item));
        if(~index) {
          this.watcher[event].splice(index, 1);
        }
      }
    } else {
      this.watcher[event] = [];
    }
  }


  // 发布
  // 发布其实就是通知观察者执行订阅函数
  _publish(event, data) {
    if(this.watcher[event] && this.watcher[event].length) {
      this.watcher[event].forEach(callback => {
        callback.call(this, data);
      });
    }
  }
}




let video = new Player();

console.log(video.__proto__);
video._subscription('play', function (data) {
  console.log('播放啦', data)
})

video._subscription('play', function (data) {
  console.log('又一个播放啦', data)
})

setTimeout(() => {
  video._publish('play', '发布啦');
}, 2000)


