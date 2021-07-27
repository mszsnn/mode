
// 需求是在console.log()  参数中添加行列

module.exports.default = function (api, options) {
  const { types } = api;
  return {
    visitor: {
      CallExpression(path, state) {
        if(types.isMemberExpression(path.node.callee) && path.node.callee.object.name === 'console' && ['log','info','error','debug'].includes(path.node.callee.property.name)) {
          const { line, column} = path.node.loc.start;
          path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`))
        }
      }
    }
  }
}
