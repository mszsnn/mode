import { nextTick } from "../util/next-tick";
// 实现队列机制

let queue = [];
let has = {};

function flushSchedulerQueue() {
  // 执行队列
  for (let index = 0; index < queue.length; index++) {
    //   调用watcher的run方法 执行真正的更新操作
    queue[index].run();
  }
  // 执行完毕之后, 清空队列
  queue = [];
  has = {}
}



export function queueWatcher(watcher) {
  // 同一个更新防止添加多次
  const id = watcher.id;
  if (has[id] === undefined) {
    queue.push(watcher);
    has[id] = true;
    // 进行异步调用
    nextTick(flushSchedulerQueue)
  }
}
