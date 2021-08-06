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



function divi(arr, start, end) {

  //需要在一个数组里面进行用一个实现大的在前， 小的在后

  // 选好一个基准点  最后一个

  let temp =  arr[end];

  let n = start;
  for (let i = start; i < end; i++) {
    if (temp > arr[i]) {
      // 交换, 将下标小的，从前往后开始排列
      [ arr[i], arr[n] ] = [ arr[n], arr[i] ]
      n++;
    }
  }

  // 这样结束了之后，n 的位置就是中间
  [arr[n], arr[end]] = [arr[end], arr[n]]
  // 就是中间
  return n
}



function fun_(arr, start = 0, end = arr.length - 1) {
  if (start >= end) {
    return;
  }

  // 需要一个middle
  let mid = divi(arr, start, end);

  fun_(arr, 0, mid -1)
  fun_(arr, mid + 1, end);
}




// 快速排序的思想就是分二治之



// 用循环同样能解决这个问题

// 思想就是当start end 的关系能一直维系， 就一直进行下去


function fun_for(arr) {
  // 维护一个栈， 用来保存开始和结束的位置

  let start = 0;
  let end = arr.length - 1;
  let stack =  [start, end];
  while (stack.length) {

    let e = stack.pop(); // 开始
    let s = stack.pop(); // 结束

    let mid = divi(arr, s, e);

    if(mid - 1 > s) {
      stack.push(s)
      stack.push(mid - 1)
    }

    if(mid + 1 < e) {
      stack.push(mid + 1)
      stack.push(e)
    }
  }
}


let arr = [3,44,38,5,47,15];
fun_for(arr)
console.log(arr);
