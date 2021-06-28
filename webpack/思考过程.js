//代码 add.js

exports.default = function (a, b) {
  return a + b;
}


// index.js

var add = require('add.js').default;

console.log(add(1,2));

// 远古时代， 这段代码不能执行
// 用后端打包加载生成的方式， 将代码重新打包加载





var add = exports.default;


// 但是这样会污染全局变量， 没有封闭
// 使用自运行函数




// 但是执行的时候， 使用的是require(), 封装require 代码






// 但是这样只能加载固定函数， 一般需要加载更多的代码块， 将整个代码块进行打包加载


// 再进行封装一层

(function (list) {
  function require (file) {
    var  exports = {};
    (function (exports, code) {
      eval(code);
    })(exports, list[file])
    return exports;
  }

  require('index.js');

})({
  'index.js': `var add = require('add.js').default;
    console.log(add(1,2));`,
  'add.js': `exports.default = function (a, b) {
    return a + b;
  }`
})


// 整个就是webpack原理
