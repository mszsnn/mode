/*
数组中有一个数字出现的次数超过数组长度的一半，
请找出这个数字。例如输入一个长度为9的数组[1,2,3,2,2,2,5,4,2]。
由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。
你可以假设数组是非空的，并且给定的数组总是存在多数元素。1<=数组长度<=50000，0<=数组元素<=10000
*/

function fun(numbers) {
  const obj = {};
  for (let i = 0; i < numbers.length ;i++) {
    let item = numbers[i];
    if(!obj[item]) {
      obj[item] = 1;
    } else {
      obj[item]++
    }
  }

  return Object.keys(obj).find(item => {
    return obj[item] > numbers.length / 2
  })
}



function fun1(numbers) {
  // 使用快速排序进行排序， 排序完毕之后， 中间的那个数，肯定是答案
}




let arr = [1,2,3,2,2,2,5,4,2];
console.log(fun(arr));
