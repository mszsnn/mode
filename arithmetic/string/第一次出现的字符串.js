// 在一个字符串(0<=字符串长度<=10000，全部由字母组成)
// 中找到第一个只出现一次的字符,并返回它的位置, 如果没有则返回 -1（需要区分大小写）.（从0开始计数）
 // google  返回4


function fun(str) {
  let obj = {};
  for (let i = 0; i< str.length;i++) {
    if(obj[str[i]] === undefined) {
      obj[str[i]] = i
    } else {
      delete obj[str[i]];
    }
  }
  let arr = Object.values(obj);

  if(!arr.length) {
    return -1;
  }
  return Math.min(...Object.values(obj))
}



function fun2(str) {
  for (let i = 0; i< str.length;i++) {
    if(str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
      return i;
    }
  }
  return -1;
}
console.log(fun2('google'));
