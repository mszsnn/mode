// 汇编语言中有一种移位指令叫做循环左移（ROL），现在有个简单的任务，就是用字符串模拟这个指令的运算结果。对于一个给定的字符序列
// S，请你把其循环左移 K 位后的序列输出（保证 K 小于等于 S 的长度）。
// 例如，字符序列S=”abcXYZdef”,要求输出循环左移 3 位后的结果，即“XYZdefabc”。是不是很简单？OK，搞定它！

function LeftRotateString(str, n)
{
  // write code here
  if(!str || n > str.length ) {
    return str;
  }
  while(n > 0) {
    let s = str.slice(0, 1);
    str = str.substring(1);
    str += s;
    n--
  }
  return str;
}

console.log(LeftRotateString('abcXYZdef', 3));
