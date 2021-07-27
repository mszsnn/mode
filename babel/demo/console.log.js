
// 需求是在console.log()  参数中添加行列

const babel = require('@babel/core');
const parser = require('@babel/parser')
const insertParametersPlugin = require('./console.log.module').default

const sourceCode = `
    console.log(1);

    function func() {
        console.info(2);
    }
`;

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous'
})




const { code, map} = babel.transformFromAstSync(ast, sourceCode, {
  plugins: [insertParametersPlugin]
})

console.log(code, map);
