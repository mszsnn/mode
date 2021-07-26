// 遍历 AST来进行各种转化

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


