
function myPromise(executor) {
  this.status = 'pending'; // 初始为pending状态
  this.data = undefined;  // promise 的值
  this.onResolvedCallback = []; // resolve 回调合集
  this.onRejectedCallback = []; // reject 回调合集

  let self = this;
  // value 拿到的异步值
  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    // 状态的改变也应该是异步的
    setTimeout (function () {
      if (self.status !==  'pending') return;
      self.status = 'resolved';
      self.data = value;
      self.onResolvedCallback.forEach(callback => {
        callback(value);
      })
    }, 0)
  }

  // reason 错误的原因
  function reject(reason) {
    setTimeout(function () {
      if(self.status !==  'pending') return;
      self.status = 'rejected';
      self.data = reason;
      self.onRejectedCallback.forEach(callback => {
        callback(reason);
      })
    }, 0)
  }

// 在回调函数的执行过程中可能会出现错误， 出现错误的时候直接reject
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// resolveCallback rejectCallback 成功回调和失败回调

myPromise.prototype.then = function (resolveCallback, rejectCallback) {
  let self = this;
  let promise2;
  // 如果这俩不是函数， 便直接忽略
  resolveCallback = typeof resolveCallback === 'function' ?  resolveCallback: null;
  rejectCallback = typeof rejectCallback === 'function' ?  rejectCallback: null;

  if (this.status === 'resolved') {
    // 成功
    return promise2 = new Promise(function (resolve, reject){
      setTimeout(function () {
        try {
          let x = resolveCallback(self.data);
        } catch (e) {
          reject(e);
        }
      })
    })
  }

  if (this.status === 'rejected') {
    // 失败
    return promise2 = new Promise(function (resolve, reject){
      setTimeout(function () {
        try {
          let x = resolveCallback(self.data);
        } catch (e) {
          reject(e);
        }
      })
    })
  }

  if (this.status === 'pending') {
    // 执行中
    return promise2 = new Promise(function (resolve, reject){
      self.onResolvedCallback.push(function (value) {
        try {
          let x = resolveCallback(value);
        } catch (e) {
          reject(e);
        }
      })

      self.onRejectedCallback.push(function (value) {
        try {
          let x = rejectCallback(value);
        } catch (e) {
          reject(e);
        }
      })
    })
  }
}




