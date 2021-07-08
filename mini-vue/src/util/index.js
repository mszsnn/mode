
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

const ASSETS_TYPE = ["component", "directive", "filter"];

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



function mergeAssets (parentVal, childVal) {
  //比如有同名的全局组件和自己定义的局部组件
  // 那么parentVal代表全局组件 自己定义的组件是childVal
  // 首先会查找自已局部组件有就用自己的
  // 没有就从原型继承全局组件  res.__proto__===parentVal

  // 如果自己有，用自己的， 自己没有用全局， 所以
  const res = Object.create(parentVal);
  if (parentVal) {
    for (let k in childVal) {
      res[k] = childVal[k];
    }
  }

  return res;
}

ASSETS_TYPE.forEach(type => {
  strats[type] = mergeAssets;
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




export function isReservedTag() {
  //判断是不是常规html标签
  // 定义常见标签
  let str =
    "html,body,base,head,link,meta,style,title," +
    "address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section," +
    "div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul," +
    "a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby," +
    "s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video," +
    "embed,object,param,source,canvas,script,noscript,del,ins," +
    "caption,col,colgroup,table,thead,tbody,td,th,tr," +
    "button,datalist,fieldset,form,input,label,legend,meter,optgroup,option," +
    "output,progress,select,textarea," +
    "details,dialog,menu,menuitem,summary," +
    "content,element,shadow,template,blockquote,iframe,tfoot";
  let obj = {};
  str.split(",").forEach((tag) => {
    obj[tag] = true;
  });
  return obj[tagName];

}




export function isObject(data) {
  //判断是否是对象
  if (typeof data !== "object" || data == null) {
    return false;
  }
  return true;
}


