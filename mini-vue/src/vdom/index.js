import {isObject, isReservedTag} from "../util";

export default class Vnode {
  constructor(tag, data, key, children, text, componentOptions) {
    this.tag = tag;
    this.data = data;
    this.key = key;
    this.children = children;
    this.text = text;
    this.componentOptions = componentOptions;
  }
}

// _c(tag, {}, children )

export function createElement(vm ,tag, data = {} , ...children) {
  const key = data.key;

  if (isReservedTag(tag)) {
    // 普通标签
    return new Vnode(tag, data, key, children)
  } else {
    // 组件
    console.log('09000', vm.$options);
    let definition = vm.$options.components[tag];
    let result = createComponent(vm, tag,data, key, children, definition);
    console.log('res',result);
    return result;
  }
}

function createComponent(vm, tag,data, key, children, Ctor) {
  if(isObject(Ctor)) {
    Ctor = vm.$options._base.extend(Ctor);
  }
  data.hook = {
    init(vnode) {
      let child = vnode.componentInstance = new Ctor({
        _isComponent: true
      });
      child.$mount();
    }
  }
  return new Vnode(
    `${tag}`,
    data,
    key,
    undefined,
    undefined,
    {
      Ctor,
      children,
    }
  )
}

export function createTextNode(text) {
  return new Vnode(undefined, undefined, undefined, undefined,text);
}
