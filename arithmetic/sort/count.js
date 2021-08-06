// 计数排序

// 在数据范本是整数,并且数据的大致范围清楚的情况下, 可以使用计数排序来实现排序

// 此种算法不基于比较， 而是利用数组下标来计算正确的位置

function fun(arr) {
  let result = [];
  let count = [];
  // 先计数

  for (let i = 0; i< arr.length; i++) {
    if(!count[arr[i]]) {
      count[arr[i]] = 1;
    } else {
      count[arr[i]]++;
    }
  }


  for (let j = 0; j < count.length; j++) {
    while (count[j]) {
      result.push(j);
      count[j]--;
    }
  }

  return result;
}


const arr = [1,23,3,23,23, 9,5];


console.log(fun(arr));

