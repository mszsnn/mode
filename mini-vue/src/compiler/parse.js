// 要结果为
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; //  /[a-zA-Z_][\-\.0-9_a-zA-Z]*/
const qnameCapture = `((?:${ncname}\\:)?${ncname})` //
const startTagOpen = new RegExp(`^<${qnameCapture}`);  // 用来匹配开始标签
const startTagClose = /^\s*(\/?)>/;  // 匹配标签结束

const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)   // 匹配结束标签


const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性  形如 id="app"






// 将template编译为ast, 使用大量正则匹配

export function parse(html) {
  let root, currentParent;

  let stack = [] // 维护栈结构


// 标识元素节点和文本节点


  const ELEMENT_TYPE = 1;

  const TEXT_TYPE = 3



// 生成ast 方法

  function createASTElement(tagName, attrs) {
    return {
      tag: tagName,
      attrs,
      parent: null,
      children: [],
      type: ELEMENT_TYPE
    }
  }


// 对开始标签进行处理

  function handleStartTag({tagName, attrs}) {
    // 一个 标签就是一个元素节点
    let element = createASTElement(tagName, attrs);
    if (!root) {
      root = element;
    }

    currentParent = element;
    stack.push(element);

  }

  function handleEndTag() {
    // 对于匹配到结束标签的时候，就意味着能找到一个完整元素，应该是出栈
    let element = stack.pop(); // 栈顶元素就是当前元素

    // 栈顶的上个元素就是父元素
    currentParent = stack[stack.length - 1];

    if (currentParent) {
      element.parent = currentParent;
      currentParent.children.push(element);
    }
  }

// 处理文本
  function handleChars(text) {
    text = text.trim();
    if (text) {
      currentParent.children.push({
        type: TEXT_TYPE,
        text
      })
    }
  }


  while (html) {
    // 文本结束
    let textEnd = html.indexOf('<');
    // 如果<在第一个 那么证明接下来就是一个标签 不管是开始还是结束标签

    if (textEnd === 0) {
      const startTagMatch = parseStartTag();

      // 匹配开始标签
      if (startTagMatch) {
        handleStartTag(startTagMatch)
        continue;
      }

      // 匹配结束标签

      const endTagMatch = html.match(endTag);
      if (endTagMatch) {
        advance(endTagMatch[0].length)
        handleEndTag(endTagMatch[1]);
        continue
      }

    }


    let text;


    if (textEnd >= 0) {
      text = html.substring(0, textEnd);
    }
    if (text) {
      advance(text.length)
      handleChars(text);
    }
  }


  function parseStartTag() {
    const start = html.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      }

      // 匹配到了开始标签就截取掉
      advance(start[0].length)


      // 开始匹配属性 , 属性需要循环匹配， 然后匹配着截取着

      // 如果不是匹配到了结束符号 > 和 匹配到属性就一直处理
      let end, attr

      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
        ) {
        advance(attr[0].length);


        attr = {
          name: attr[1],
          value: attr[3] || attr[4] || attr[5]
        }

        match.attrs.push(attr);
      }


      //   代表一个标签匹配到结束的>了 代表开始标签解析完毕
      if (end) {
        advance(1);
        return match;
      }
    }

  }


  function advance(n) {
    html = html.substring(n);
  }



  // root 是最终生成的元素
  return root;
}








