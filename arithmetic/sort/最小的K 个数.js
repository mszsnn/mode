/*
给定一个数组，找出其中最小的K个数。例如数组元素是4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4。
0 <= k <= input.length <= 10000
0 <= input[i] <= 10000*/


// 使用堆排序


// 数组的第N个节点的 值为  a[i]   左节点 a[2 * i] + 1  和 右节点a[2 * i] + 2

function adjustHeap(input, n, len) {
  let temp = input[n];

  for(let i = n * 2 + 1 ; i < len  ; i = i * 2 + 1) {
    let left = input[i];
    let right = input[ i + 1];

    // 这里需要判断哪个更大

    if (right < left && i + 1 < len) {
      i++;  // 意思是直接拿到大的数字， 右边树叶子比较大
    }

    if (temp > input[i]) {
      [input[n], input[i]] = [input[i], input[n]];
      n = i;  // 定点需要更新，
    }
  }
}

function GetLeastNumbers_Solution(input, k)
{
  // write code here
  // 最后一个非叶子节点, 得到一个大顶堆
  for (let i = Math.floor( input.length / 2 ); i >= 0; i--) {
    adjustHeap(input, i, input.length);
  }


  // 从后面往前进行赋值
  for (let n = input.length - 1 ; n > input.length - k - 1 ; n--) {

    [input[0], input[n]] = [input[n], input[0]]

    // 整个元素的位置已经调整好了， 仅仅需要调整定点的大小就行
    adjustHeap(input, 0, n)
  }

  return input.slice(input.length - k).reverse();
}


// 可以快排序


function devide(input, start, end) {
  let temp = input[end];
  let n = start;

  for (let i = start ; i < end ; i++) {
    if(input[i] < temp) {
      [input[n] ,  input[i]] = [input[i], input[n]];
      n++;
    }
  }

  [input[n] , input[end]] = [input[end], input[n]];

  return n;
}

function fast(input, start = 0, end = input.length - 1) {
  if(start > end) {
    return;
  }

  let mid = devide(input, start, end );

  fast(input, start, mid - 1);
  fast(input, mid + 1, end);
}


