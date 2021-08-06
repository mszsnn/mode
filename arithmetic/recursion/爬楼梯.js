// 一只青蛙一次可以跳上1级台阶，也可以跳上2级。
// 求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）

function fun(number) {
  if (number <= 2) {
    return number;
  }
  let a = 1, b = 1, total = 0;
  for(let i = 2; i <= number;i++) {
    total = a + b;
    a = b;
    b = total;
  }
  return total
}
