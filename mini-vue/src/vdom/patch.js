// 主要是用来渲染视图和更新视图

import {createCommentVNode} from "vue";

export function patch(oldVnode, Vnode) {
  // 判断传入的oldVnode是否是一个真实元素
  // 这里很关键  初次渲染 传入的vm.$el就是咱们传入的el选项  所以是真实dom
  // 如果不是初始渲染而是视图更新的时候  vm.$el就被替换成了更新之前的老的虚拟dom
  if (!oldVnode) {
    return createElm(Vnode);
  } else {
    const isRealElement = oldVnode.nodeType
    if (isRealElement) {
      // 初次渲染逻辑
      const parentElm = oldVnode.parentNode; // 父元素
      let el = createElm(Vnode);

      // 插入到 老的el节点下一个节点的前面 就相当于插入到老的el节点的后面
      // 这里不直接使用父元素appendChild是为了不破坏替换的位置

      parentElm.insertBefore(el, oldVnode.nextSibling);
      parentElm.removeChild(oldVnode);
      return el;
    } else {
      // 异步更新的时候
      // oldVnode 是虚拟dom
      if (oldVnode.tag !== Vnode.tag) {
        // 换了标签， 直接用新的换了旧的
        oldVnode.el.parentNode.removeChild(createElm(Vnode), oldVnode.el);
      }

      // 如果是文本节点
      if (!oldVnode.tag) {
        if(oldVnode.text !== Vnode.text) {
          oldVnode.el.textContent = Vnode.text;
        }
      }


      // 不符合以上两种代表

      const el = Vnode.el = oldVnode.el;
      updateProperties(Vnode, oldVnode.data);

      const oldCh = oldVnode.children || []; // 旧的真是子元素
      const newCh = Vnode.children || [];  // 新的虚拟子节点


      if(oldCh.length > 0 && newCh.length > 0) {
        // 新老节点都存在 核心比对
        updateChildren(el, oldCh, newCh);
      } else if (oldCh.length) {
        // 老的有， 新的没有， 那么直接清除旧元素的所有子节点
        el.innerHTML = '';
      } else {
        // 新的有，旧的没有
        // 一个一个追加
        newCh.forEach(item => {
          el.appendChild(createElm(item));
        })
      }
    }
  }

}


function isSameVnode(oldVnode, newVnode) {
  return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key;
}

function updateChildren(parent, oldCh, newCh)  {
  // 更新视通过比较新旧，来更新真实dom
  let oldStartIndex = 0;
  let oldStartVnode = oldCh[0];
  let oldEndIndex = oldCh.length - 1;
  let oldEndVnode = oldCh[oldEndIndex];

  let newStartIndex = 0;
  let newStartVnode = newCh[0];
  let newEndIndex = newCh.length - 1;
  let newEndVnode = newCh[newEndIndex];


  function markIndexByKey(children) {
    let map = {};
    children.forEach((item, index) => {
      map[item.key] = index;
    });
    return map;
  }



  let map = markIndexByKey(oldCh); // 旧的映射表

  // 采用的方法为从两边到中间比较

  // 只有新旧节点的下表起始位置不大于结束位置循环

  while (newStartIndex <= newEndIndex && oldStartIndex <= oldEndIndex) {
    // 对比过程中， 可能会把移动的vnode 位置设置为undefined ，所以如果不存在节点，直接跳过
    if(!oldStartVnode) {
      oldStartVnode = oldCh[++oldStartIndex]
    } else if(!oldEndVnode) {
      oldEndVnode = oldCh[--oldEndIndex]
    } else if(isSameVnode(oldStartVnode, newStartVnode)) {
      // 头和头对比 依次向后追加
      patch(oldStartVnode, newStartVnode); //递归比较儿子以及他们的子节点
      oldStartVnode = oldCh[++oldStartIndex];
      newStartVnode = newCh[++newStartIndex];

    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      // 尾和尾对比 依次向前追加
      patch(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIndex];
      newEndVnode = newCh[--newEndIndex];
    } else if(isSameVnode(oldStartVnode, newEndVnode)) {
      // 老的头和新的尾部相同，把老的头部给移动到尾部
      patch(oldStartVnode, newEndVnode);
      parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);

      oldStartVnode = oldCh[++oldStartIndex];
      newEndVnode = newCh[--newEndIndex];
    } else if(isSameVnode(oldEndVnode, newStartVnode)) {

      patch(oldEndVnode, newStartVnode);
      parent.insertBefore(oldEndVnode.el, oldStartVnode);

      oldEndVnode = oldCh[--oldEndIndex];
      newStartVnode = newCh[++newStartVnode];
    } else {
      // 如果以上的情况都不满足， 需要暴力对比，看看旧的这个节点到底去了哪里

      // 因为是以新的为准则， 更新旧的
      let moveIndex = map[newStartVnode.key];

      if (!moveIndex) {
        parent.insertBefore(createElm(newStartVnode), oldStartVnode.el);
      } else {
        let moveVnode = oldCh[moveIndex];
        oldCh[moveIndex] = undefined;
        parent.insertBefore(moveVnode.el, oldStartVnode.el);
        patch(moveVnode, newStartVnode);
      }
      newStartVnode = newCh[++newStartVnode]
    }


  }

  // 如果老节点循环完毕了 但是新节点还有  证明  新节点需要被添加到头部或者尾部
  if (newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      // 这是一个优化写法 insertBefore的第一个参数是null等同于appendChild作用
      const ele =
        newCh[newEndIndex + 1] == null ? null : newCh[newEndIndex + 1].el;
      parent.insertBefore(createElm(newCh[i]), ele);
    }
  }
  // 如果新节点循环完毕 老节点还有  证明老的节点需要直接被删除
  if (oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      let child = oldCh[i];
      if (child != undefined) {
        parent.removeChild(child.el);
      }
    }
  }

}

function createComponent(vnode) {
  let data = vnode.data;
  if( (data = data.hook) && (data = data.init)) {
    //写这样洋气， 其实是调用了data.hook.init
    data(vnode)
  }
  if (vnode.componentInstance) {
    return true;
  }
}

function createElm(Vnode) {
  let {tag, data, key, children, text } = Vnode;
  // 判断节点类型
  if( tag === undefined ) {
    Vnode.el = document.createTextNode(text);
  } else {
    if(createComponent(Vnode)) {
      return Vnode.componentInstance.$el
    }

    Vnode.el = document.createElement(tag);
    // 解析虚拟dom 属性
    updateProperties(Vnode);
    children.forEach(child => {
      Vnode.el.appendChild(createElm(child))
    })
  }
  return Vnode.el;
}

// 映射data 属性到真实dom 上
function updateProperties (Vnode) {
  let newProps = Vnode.data || {};
  let el = Vnode.el;

  for(let [key, value] of Object.entries(newProps)) {
    if (key === 'style') {
      for(let styleName in value) {
        el.style[styleName] = value[styleName];
      }
    } else if(key === 'class') {
      el.className = value;
    } else {
      el.setAttribute(key, value);
    }
  }
}


// 1 为什么会有 vnode.el
