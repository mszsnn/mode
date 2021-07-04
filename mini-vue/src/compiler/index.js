
import {parse} from './parse'
import {generate} from "./codegen";


// 模板转化核心方法 compileToFunctions


export function compareToFunction(template) {
  console.log('template', template)

  // 要实现的功能
  /*
  *  1 将模板转化为 ast
  *  2 标记静态节点
  *  3 通过ast 生成 render 函数
  * */
  let ast = parse(template);


  console.log('ast', ast);

  // 2优化点， 标记静态节点
  // 不影响核心功能， 暂时不实现


  // 3.通过ast 重新生成代码

  // 类似_c('div',{id:"app"},_c('div',undefined,_v("hello"+_s(name)),_c('span',undefined,_v("world"))))
  // _c代表创建元素 _v代表创建文本 _s代表文Json.stringify--把对象解析成文本

  let code = generate(ast);  // return字符串代码

  console.log('code', code);

  // with 的作用用来改变作用域，在with 里面使用的属性，如果和obj 上的相同就是使用obj 的如果没有就创建全局

  /*  不推荐使用with的原因
  *
  * 1 污染全局， 内存泄漏
  * 2 性能比较低下， js 编译器不能对其做任何优化
  * */
  // 造成全局污染
  //
  // with (obj) {
  //   a = 3;
  //   b = 4;
  //   c = 5;
  // }


  //   使用with语法改变作用域为this  之后调用render函数可以使用call改变this 方便code里面的变量取值
  return new Function(`with(this) {return ${code}}`);

}

