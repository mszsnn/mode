// 请实现一个函数用来找出字符流中第一个只出现一次的字符。
// 例如，当从字符流中只读出前两个字符"go"时，第一个只出现一次的字符是"g"。
// 当从该字符流中读出前六个字符“google"时，第一个只出现一次的字符是"l"。
// 后台会用以下方式调用Insert 和 FirstAppearingOnce 函数


//Init module if you need
function Init()
{
  // write code here
}
//Insert one char from stringstream

const stack = [];
const map = {};

function Insert(ch)
{
  // write code here
  if(!map[ch]) {
    stack.push(ch);
    map[ch] = 1 ;
  }
  map[ch]++ ;
}


//return the first appearence once char in current stringstream
function FirstAppearingOnce()
{
  // write code here

  while (stack.length) {
    let start = stack[0];
    if (map[start] == 1) {
      return start;
    } else {
      stack.shift();
    }
  }
  return '#'
}
