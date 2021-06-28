
function Promise(executor) {
  this.status = 'pending'; // 初始为pending状态
  this.data = undefined;  // promise 的值
  this.onResolvedCallback = []; // resolve 回调合集
  this.onRejectedCallback = []; // reject 回调合集


  // value 拿到的异步值
  function resolve(value) {

  }

  // reason 错误的原因
  function reject(reason) {

  }

// 在回调函数的执行过程中可能会出现错误， 出现错误的时候直接reject
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}






// Promise构造函数接收一个executor函数，executor函数执行完同步或异步操作后，调用它的两个参数resolve和reject
let promise = new Promise(function(resolve, reject) {
  /*
    如果操作成功，调用resolve并传入value
    如果操作失败，调用reject并传入reason
  */
})


