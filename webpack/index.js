// 从文件读取开始， 一点一点处理文件

const fs = require('fs');
const path = require('path');

const parser = require('@babel/parser');  // 将代码转换为ast 语法树
const traverse = require('@babel/traverse').default;  // 分析代码

const babel = require('@babel/core');


// 首先分析单个模块， 获取模块信息


function getModuleInfo(file) {
  const info = fs.readFileSync(file, {
    encoding: 'utf-8'
  });
  // 指定encoding后 读取完毕后其实是个字符串，

  // 将字符串转化为抽象语法树


  const ast = parser.parse(info, {
    sourceType: 'module'
  })

  // 分析代码。将里面的 import 进行记录, 收集依赖

  const deps = {};

  // 遍历ast , 将里面的模块导入进行遍历，进行依赖收集

  traverse(ast, {
    ImportDeclaration({ node }, source) {
      // 拿到文件的绝对路径
      const pathname = path.dirname(file);

      // 得到引入的文件相对于当前文件的路径， 或者说拿到引入文件的绝对路径

      const p =  './' + path.join(pathname, node.source.value);

      // 将依赖存储起来, 文件的名称: 文件的地址

      deps[node.source.value] = p;
    }
  });

  // 依赖收集好了之后， 需要将代码转化为es5代码
  const { code } = babel.transformFromAstSync(
    ast,
    null,
    {
      presets: ['@babel/preset-env']
    }
  );




  const moduleInfo = {
    file,
    deps,
    code
  }

  return moduleInfo;
}



// 单个模块信息拿到之后， 需要从入口文件开始， 拿到整体的入口文件的模块依赖信息

// 也就是开始 编译模块, entry入口


function parseModules(entry) {
  // 先拿到入口模块 信息
  const entryInfo = getModuleInfo(entry);

  // 拿到入口模块之后， 需要拿到模块的模块的依赖,拿到所有的依赖文件， 最后生成依赖的图

  // 所有的依赖
  const temp = [ entryInfo ];

  const graph = {};

  function getDeps(temp, { deps }) {
    Object.keys(deps).forEach(depsFile => {
      // 继续拿到依赖的模块信息，
      const depsFileInfo = getModuleInfo(deps[depsFile]);
      temp.push(depsFileInfo);

      getDeps(temp, depsFileInfo)
    })
  }


  getDeps(temp, entryInfo);


  temp.forEach(info => {
    graph[info.file] = {
      deps: info.deps,
      code: info.code
    }
  })

  return graph;

}



// 以上两个函数基本分析了整个代码的逻辑和依赖关系， 分析完成之后，接下来就得执行代码

// 基本使用原理代码就可以实现整个代码的执行


// 代码执行, 最终的结果是输出一个字符串， 可执行的js 字符串
function bundle(file) {
  const graph = JSON.stringify(parseModules(file));
  return `
  
  (function (graph) {

    function require(file) {

      function absRequire(relPath) {
        return require(graph[file].deps[relPath])
      }

      var exports = {};

      (function (require,exports,code) {

        eval(code)

      })(absRequire,exports,graph[file].code)


      return exports
    }

    require('${file}')

  })(${graph})
  
  `
}











const result = bundle('./demo/index.js');

!fs.existsSync("./dist") && fs.mkdirSync("./dist");

fs.writeFileSync("./dist/bundle.js", result);






// 整体思路

