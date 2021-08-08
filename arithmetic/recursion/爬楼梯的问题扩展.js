// 一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶(n为正整数)总共有多少种跳法。

// fn = 2^(n-1) 推导出来



function jumpFloorII(number)
{
  // write code here
  if(number <= 1) {
    return 1;
  }
  let a = 1, result = 0;
  for (let i = 2; i<= number; i++) {
    result = 2 * a;
    a = result;
  }
  return result;
}





console.log(jumpFloorII(5));

