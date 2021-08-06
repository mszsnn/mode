
/*现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0，第1项是1）。
n\leq 39n≤39*/

function Fibonacci(n) {
  // write code here
  let caches = {
    0: 0,
    1: 1
  }
  function f(n) {
    if (caches[n] !== undefined) {
      return caches[n]
    } else {
      caches[n] = f(n - 1 ) + f(n - 2);
      return caches[n];
    }
  }
  return f(n)
}
module.exports = {
  Fibonacci : Fibonacci
};


// 0, 1, 1, 2, 3, 5


function fun(n) {
  let caches = {
    0: 0,
    1: 1
  }
  function f(n) {
    for (let i = 2; i <= n; i++) {
      caches[i] = caches[i - 1] + caches[i - 2]
    }
    return caches[n];
  }
  return f(n)
}



console.log(fun(30));
