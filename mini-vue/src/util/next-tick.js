let callback = [];
let pending = false;

// timerFunc 需要优雅降级

function flushCallbacks () {
  pending = false; //把标志还原为false
  // 依次执行回调
  for (let i = 0; i < callback.length; i++) {
    callback[i]();
  }
}


let timerFunc ;

if(typeof Promise !== "undefined") {
  // 支持promise 的时候， 使用promise
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCallbacks)
  }
} else if(typeof MutationObserver !== "undefined") {
  // MutationObserver 异步监听dom 变化

  let counter = 1;
  const observe = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observe.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    // 在这里改变之后， MutationObserver 会自动监听数据发生变化了， 然后进行回调的触发
    counter = (counter + 1) % 2 ;
    textNode.data = String(counter);
  }
} else if (typeof setImmediate !== "undefined") {
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}







export function nextTick(cb) {
  // 异步更新需要回调之后， 用户自己手动也会传入callback
  callback.push(cb);

  if(!pending) {
    pending = true;

    // 多次调用nextTick 只会执行一次异步， 但是cb都已经全部收齐
    timerFunc()
  }
}
