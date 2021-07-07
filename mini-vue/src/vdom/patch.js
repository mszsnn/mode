// 主要是用来渲染视图和更新视图

export function patch(oldVnode, Vnode) {
  // 判断传入的oldVnode是否是一个真实元素
  // 这里很关键  初次渲染 传入的vm.$el就是咱们传入的el选项  所以是真实dom
  // 如果不是初始渲染而是视图更新的时候  vm.$el就被替换成了更新之前的老的虚拟dom
  const isRealElement = oldVnode.nodeType
  if (isRealElement) {
    // 初次渲染逻辑
    const parentElm = oldVnode.parentNode; // 父元素
    console.log('parentElm',oldVnode);
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

  }
}

function createElm(Vnode) {
  let {tag, data, key, children, text } = Vnode;
  // 判断节点类型
  if( tag === undefined ) {
    Vnode.el = document.createTextNode(text);
  } else {
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
