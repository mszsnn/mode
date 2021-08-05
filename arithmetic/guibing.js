// 归并排序， 采用分支的思想， 将大的问题分解成小的模块，最后再合并起来

function divide(arr) {
  if(arr.length > 1) {
    return arr;
  } else {
    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);
    return merge(divide(left), divide(right))
  }
}
// [1,3] [2,4]

function merge(left, right) {
  let result = [];
  while(left.length && right.length) {
    if (left[0] > right[0]) {
      result.push(left.unshift());
    } else {
      result.push(right.unshift())
    }
  }

  if (left.length) {
    result.push(...result)
  }

  if(right.length) {
    result.unshift(...result)
  }

  return result;
}


let arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];

console.log(divide(arr));
