const koa = require('koa');
const fs = require('fs');
const path = require('path');

const app = new koa();

app.use( async ctx => {
  const { url, query} = ctx.request;

  if (url === '/') {
    let file = fs.readFileSync('./index.html', {
      encoding: 'utf-8'
    })
    ctx.type = 'text/html';

    // 这段代码是为了处理node 的环境变量, 因为浏览器中没有node
    file = file.replace('<script', `
    
    <script>
          window.process = {
            env: {
              NODE_ENV: 'dev'
            }
          }
    </script>
    
    <script
    `)


    ctx.body = file;

  } else if(url.endsWith('.js')) {

    const p = path.resolve(__dirname, url.slice(1))
    let content = fs.readFileSync(p, {
      encoding: 'utf-8'
    })
    ctx.type = 'application/javascript';

    // 因为浏览器解析不了模块  从node_modules 取内容的模块
    // 浏览器认为 ../ ./ / 之外的值都不为路径


    content = rewirteImport(content);

    ctx.body = content;

  } else if(url.startsWith('/@modules')) {
    let really = url.replace('/@modules/', '');
    // 接下来得需要获取到对应的node_modules 里面的模块内容
    // 但是对应的模块的内容其实是
    let reallyPath = path.resolve(__dirname, 'node_modules', really);
    // 但是对应的module 的包的位置其实是package.json里面声明的module 的位置

    const package = require(reallyPath + '/package.json').module;

    let content = fs.readFileSync(path.resolve(reallyPath, package), 'utf-8');

    // content 里面可能还有对应的三方模块的加载

    content = rewirteImport(content);

    ctx.type = 'application/javascript';
    ctx.body = content;
  }
})


app.listen(3000, () => {
  console.log('服务器已经运行')
})



function rewirteImport(content) {
  // import xx form 'vue'

  return content.replace(/ from ['|"]([^'"]+)['|"]/g, function (s0, s1) {
    // ./ ../ / 都是路径
    if(s1[0] !== '.' && s1[0] !== '/') {
      return ` from '/@modules/${s1}'`
    } else {
      return s0
    }
  })
}



