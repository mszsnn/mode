// 在数组中的两个数字，如果前面一个数字大于后面的数字，
// 则这两个数字组成一个逆序对。输入一个数组,求出这个数组中的逆序对的总数P。
// 并将P对1000000007取模的结果输出。 即输出P%1000000007
//
// 对于50\%50%的数据,size\leq 10^4size≤10
// 4
//
// 对于100\%100%的数据,size\leq 10^5size≤10
// 5


// [1,2,3,4,5,6,7,0]  7

// 使用归并排序，然后再排序的过程中，计算逆序


// 归并排序是分支的思想



function InversePairs(data)
{
  // write code here
  if(!data.length) return 0;
  let copy = [];
  return sort(data, 0, data.length - 1, copy) % 1000000007;
}


function sort(data, start, end, copy) {
  if(start >= end) return 0;
  let mid = Math.floor((start + end) / 2);
  let left = sort(data, start, mid, copy);
  let right = sort(data, mid + 1, end, copy);
  let merge = Merge(data, start, mid, end, copy);
  return left + right + merge;
}

function Merge(data, start, mid, end, copy) {
  // 首先需要复制原始数组
  for (let k = start; k <= end ; k++) {
    copy[k] = data[k];
  }

  let i = start;
  let j = mid + 1;
  let count = 0;
  for (let k = start; k <= end; k++ ) {

    if (i === mid + 1) {
      data[k] = copy[j];  // i 用完了， j 还没完
      j++;
    } else if (j === end + 1) {
      data[k] = copy[i];
      i++;
    } else {
      //  i j  都有的时候
      if(copy[i] <= copy[j]) {
        data[k] = copy[i];
        i++;
      } else {
        data[k] = copy[j];
        j++;
        count += (mid - i + 1);
      }
    }
  }
  return count
}


console.log(InversePairs([1,2,3,4,5,6,7,0]));
