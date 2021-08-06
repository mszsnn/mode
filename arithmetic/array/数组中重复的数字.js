/*
在一个长度为n的数组里的所有数字都在0到n-1的范围内。 数组中某些数字是重复的，
但不知道有几个数字是重复的。也不知道每个数字重复几次。请找出数组中任一一个重复的数字。
例如，如果输入长度为7的数组[2,3,1,0,2,5,3]，那么对应的输出是2或者3。存在不合法的输入的话输出-1
*/

function fun(numbers) {
  const obj = {};
  for (let i = 0; i < numbers.length ;i++) {
    let item = numbers[i];
    if (item >= 0 && item <= numbers.length - 1) {
      if(!obj[item]) {
        obj[item] = 1;
      } else {
        return item;
      }
    } else {
      return -1
    }
  }
  return -1
}


let arr = [];
console.log(fun(arr));
