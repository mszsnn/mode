// 统计一个数字在升序数组中出现的次数。



function GetNumberOfK(data, k)
{
  // write code here
  let start = 0;
  let end = data.length - 1;
  let n = 0;
  while ( start <= end) {

    if (data[start] > k || data[end] < k) {
      break;
    }

    if(data[start] === k) {
      n++;
    }
    if(data[end] === k) {
      n++
    }

    if (start === end && array[start] === k) {
      n--
    }
    if (data[start] <= k) {
      start++
    }
    if(data[end] >= k) {
      end--;
    }



  }
  return n;
}



// 利二分法，找到第一次出现的位置和最后一次出现的位置, 也就是找到作左边和右边的边界

function fun(data, k) {
  if(!data.length) {
    return 0;
  }
  let lbound = 0, rbound = 0;
  // 搜索右边界 right
  let i = 0, j = data.length - 1;
  // [1,2,3,3,3,3,4,5]   3

  // 找左边边界， 比目标值小的数
  while (i <= j) {
    let mid = Math.floor((i + j) / 2);
    if (data[mid] >= k) {
      j = mid - 1;
    } else {
      i = mid + 1;
    }
  }
  lbound = j;

  // 找右边边界, 比目标值大的数
  i = 0; j = data.length - 1;

  while( i <= j) {
    let mid = Math.floor((i + j) / 2);
    if (data[mid] <= k) {
      i = mid + 1;
    } else {
      j = mid - 1;
    }
  }

  rbound = i;
  return rbound - lbound - 1;
}



fun([1,2,3,3,3,3,4,5],3)
// console.log();




