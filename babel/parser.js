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


console.log(JSON.stringify(ast, null, 2));
