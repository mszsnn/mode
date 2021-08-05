// 快速排序， 使用的也是分治的思想， 但是不用的是， 首先选择一个合适的基准点， 将数组分成小的元素在前，
// 大的在后面， 的数组， 然后在对小的和小的和大的进行递归， 最终就排序好了

function fun(arr) {
  if(arr.length <= 1) {
    return arr;
  }
  let middle = Math.floor(arr.length  / 2);
  let left = [], right = [];
  for (let i = 0; i< arr.length ;i++) {
    if(i === middle) continue
    if( arr[i] > arr[middle]) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }
  return fun(left).concat([arr[middle]], fun(right));
}



function fun_(arr, start = 0, end = arr.length) {
  if (arr.length <= 0) {
    return arr;
  }


  fun_(arr, 0, mid -1)
  fun_(arr, mid + 1, end);
}

let arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];

console.log(fun(arr));
