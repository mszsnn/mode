// 请实现一个函数，将一个字符串中的每个空格替换成“%20”。
// 例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy

function replaceSpace( s ) {
  // write code here
  let str = '';
  for (let i =0; i< s.length; i++) {
    if(s[i] === ' ') {
      str+=('%20')
    } else {
      str+=(s[i])
    }
  }
  return str;
}

console.time();
console.log(replaceSpace('We Are Happy'))
console.timeEnd();
