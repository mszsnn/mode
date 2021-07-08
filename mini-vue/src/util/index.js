import merge from "merge-source-map";

export const LIFECYCLE_HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestroy",
  "destroyed",
]
// 合并策略
const strats = {};

// 生命周期合并策略

function mergeHook(parentVal, childVal) {
  // 如果有儿子
  if (childVal) {
    if (parentVal) {
      // 合并成一个数组
      return parentVal.concat(childVal);
    } else {
      // 包装成一个数组
      return [childVal];
    }
  } else {
    return parentVal;
  }
}


LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook;
})


export function mergeOptions (parent, child) {
  const options = {}

  // 遍历父亲
  for (let k in parent) {
    mergeFiled(k);
  }

  // 如果父灭有， 子有

  // 父亲没有 儿子有
  for (let k in child) {
    if (!parent.hasOwnProperty(k)) {
      mergeFiled(k);
    }
  }

  function mergeFiled(k) {
    if (strats[k]) {
      options[k] = strats[k](parent[k], child[k])
    } else {
      options[k] = child[k] ? child[k]: parent[k];
    }
  }

  return options;
}
