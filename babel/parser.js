// babel parser 扩展了acorn

// 简单实现parse的原理和功能, parser 用来将字符串代码翻译为AST

const acorn = require('acorn');

const Parser = acorn.Parser;

let literalExtend = function (Parser) {
  return class extends Parser {
    // 继承和重写 字面量方法
    parseLiteral (...arg) {
      // 父级编译的结果
      const node = super.parseLiteral(...arg);
      switch (typeof node.value) {
        case "number":
          node.type = 'NumericLiteral';
          break;
        case 'string':
          node.type = 'StringLiteral';
          break;
      }
      return node
    }
  }
}

const newParser = Parser.extend(literalExtend);

const ast = newParser.parse(`
  const a = 1;
`)






//  翻译为AST 功能之后， 需要对 AST 进行遍历

// 接下来 实现 traverse功能




// 遍历AST 是一个深度优先的过程

// @babel/types里面处理了每一种节点如何遍历， 怎么创建

// 在这里我们也需要处理怎么遍历和维护

const AST_DEFINATIONS_MAP = new Map();

AST_DEFINATIONS_MAP.set('Program', {
  visitor: ['body']
})

AST_DEFINATIONS_MAP.set('VariableDeclaration', {
  visitor: ['declarations']
})

AST_DEFINATIONS_MAP.set('VariableDeclarator', {
  visitor: ['id', 'init']
})

AST_DEFINATIONS_MAP.set('Identifier', {})


AST_DEFINATIONS_MAP.set('NumericLiteral', {})


// 1 重点是遍历每个节点， 实现深度优先遍历
// 2 实现visitor 功能， 在遍历的过程中， 对AST 进行操作 增删改， 这个遍历的过程就是根据node.type 的不同来调用对应的visitor 函数
// 并且要支持 enter  和 after,在遍历节点之前和之后调用 enter after
// 3 要传入 path , ast 传入父节点的信息

// 这样就可以在子节点中拿到父节点的值
class NodePath {
  constructor(node, parent, parentPath, key, listKey) {
    this.node = node;  // 当前节点
    this.parent = parent;  // 父节点
    this.parentPath = parentPath; //  父路径， 其实是NodePath 实例

    // parent 可以保存， 那么sibling 也可以保存， 其实可以通过 path 拿到所有的ast ， 但是直接拿比较麻烦， 可以提供api 来简化操作

    this.key = key;  // 属性键
    this.listKey = listKey;   // 数组下表


  }

  // 基于 key 和 listKey 实现 path Api
  replaceWith(node) {
    if(this.listKey) {
      this.parent[this.key].splice(this.listKey, 1, node);
    }
    this.parent[this.key] = node;
  }

  remove() {
    if(this.listKey) {
      this.parent[this.key].splice(this.listKey, 1);
    }
    this.parent[this.key] = null;
  }
}




function traverse(node, visitor, parent, parentPath, key, listKey) {
  const defination = AST_DEFINATIONS_MAP.get(node.type);

  let visitorFunc = visitor[node.type] || {};

  if (typeof visitorFunc === 'function') {
    visitorFunc = {
      enter : visitorFunc
    }
  }

  const path = new NodePath(node, parent, parentPath, key, listKey);

  visitorFunc.enter && visitorFunc.enter(path);

  if(defination.visitor) {
    defination.visitor.forEach(key => {
      const prop = node[key];
      if (Array.isArray(prop)) {
        prop.forEach((child, index) => {
          traverse(child, visitor, node, path, key, index);
        })
      } else {
       traverse(prop, visitor, node, path, key);
      }
    })
  }

  // 遍历完毕子节点调用
  visitorFunc.exit && visitorFunc.exit(path);
}










// NodePath 里面还有一个重要功能， 就是用来处理path.scope , 记录变量的 binging, 引用 reference ,以及父作用域，
// 是静态作用域链的实现


// types 里面还有个功能， 用来生成AST

// template 是通过字符串来创建 AST

function template(code) {
  return Parser.parse(code);
}

template.expression = function (node) {
  return template(node).body[0].expression;
}


traverse(ast, {
  NumericLiteral: {
    exit(path) {
      path.replaceWith(template.expression('bbb'))
    }
  }
});

console.log(JSON.stringify(ast, null, 2));




// 以上都是针对ast 的修改， 接下来我们实现下 generate, 把ast  打印成目标代码



class Printer{
  constructor(props) {
    this.buf = '';
  }

  space() {
    this.buf +=' ';
  }

  nextLint() {
    this.buf += '/n';
  }

  Program(node) {
    node.body.forEach(item => {
      this[item.type](item) + ';';
      this.nextLint();
    })
  }

  VariableDeclaration(node) {
    this.buf += node.kind;
    this.space();
    node.declarations.forEach((declaration, index) => {
      if (index != 0) {
        this.buf += ',';
      }
      this[declaration.type](declaration);
    });
    this.buf += ';';
  }


  VariableDeclarator(node) {
    this[node.id.type](node.id);
    this.buf += '=';
    this[node.init.type](node.init);
  }

  Identifier(node) {
    this.buf += node.name;
  }


  NumericLiteral(node) {
    this.buf += node.value;
  }

}


class Generator extends Printer{

  generate(node) {
    this[node.type](node);
    return this.buf;
  }
}
function generate (node) {
  return new Generator().generate(node);
}


const sourceCode = `
const a = 1,b=2,c=3;
const d=4,e=5;
`;


const ast1 = newParser.parse(sourceCode);
traverse(ast1, {
  NumericLiteral(path) {
    if (path.node.value === 2) {
      path.replaceWith(template.expression('aaaaa'));
    }
  }
})
console.log(generate(ast1));




// 以上就是全流程的babel 编译的流程


// 平时我们很少使用这些单独的api , 而是使用 babel/core
// 需要基于上面的包来实现 plugin / preset


function transformSync (code, options) {
  const ast = newParser.parse(code)


  const pluginApi = {
    template
  }

  const visitor = {};

  options.plugins.forEach(([plugin, options]) => {
    const res = plugin(pluginApi, options);
    Object.assign(visitor, res.visitor);
  })

  traverse(ast, visitor);

  return generate(ast);
}




const sourceCode2 = `
const a = 1;
`

const code = transformSync(sourceCode2, {
  plugins: [
    [
      function plugin1(api, options) {
        return {
          visitor: {
            Identifier(path) {
              path.replaceWith(api.template.expression(options.replaceName));
            }
          }
        }
      },
      {
        replaceName: 'dddd'
      }
    ]
  ]
})

console.log(code);



