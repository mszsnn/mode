// 将ast 转化为render函数
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g  // 匹配花括号

function gen(el) {
  // 源码这块包含了复杂的处理  比如 v-once v-for v-if 自定义指令 slot等等  这里只考虑普通文本和变量表达式{{}}的处理

  if (el.type === 1) {
    return generate(el)
  } else {
    // 文本节点

    let text = el.text;
    // 文本里面可能会包含 变量
    if (!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(text)})`
    }

    // 例如： 这是一段文本{{name}}, 这是另外一段文本 {{age}}

    // 全局匹配需要处理lastIndex 属性， 重置

    // 为什么要存储，其实是为了保存匹配的开始位置
    let lastIndex = defaultTagRE.lastIndex = 0;
    let tokens = [];
    let match, index;

    while (match = defaultTagRE.exec(text)) {
      index = match.index;

      // 开始的文本
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)))
      }

      // 大括号里面的内容
      tokens.push(`_s(${match[1].trim()})`);

      lastIndex = index + match[0].length
    }

    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)))
    }

    return `_v(${tokens.join('+')})`

  }

}

// 生成子节点

function getChildren(ast) {
  const children = ast.children.map(el => {
    return gen(el)
  });
  return children.join(',')
}


function genProps(attrs) {
  /*
   style: {
     color: 'red'
   },
   name: '123'

   */

  let str = '';
  attrs.forEach(attr => {
    if (attr.name === 'style') {
      let obj = {}
      attr.value.split(';').forEach(s => {
        let [key, value] = s.split(':');
        obj[key] = value
      })
      attr.value = obj;
    }
    str += `${attr.name}: ${JSON.stringify(attr.value)},`
  })

  return `{ ${str.slice(0, -1)} }`
}


export function generate(ast) {
  const children = getChildren(ast);

  // _c('div',{id:"app"},_c('div',undefined,_v("hello"+_s(name)),_c('span',undefined,_v("world"))))
  // _c代表创建元素 _v代表创建文本 _s代表文Json.stringify--把对象解析成文本


  const code = `_c(
    '${ast.tag}',
    ${ast.attrs.length ? `${genProps(ast.attrs)}` : 'undefined'}
    ${children ? `, ${children}` : ''})`
  return code;
}
