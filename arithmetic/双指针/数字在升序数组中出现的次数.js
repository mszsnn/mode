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



function fun(data, k) {
  let lbound = 0, rbound = 0;
  let l = 0, r = data.length - 1;
  while(l <= k) {
    let mid = Math.floor((l + r) / 2);
    if(data[mid] < k) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  lbound = l;

  while (l < r) {
    let mid = l + (r - l) / 2;
    if (data[mid] <= k) {
      l = mid + 1;
    }
    else {
      r = mid;
    }
  }
  rbound = l;


  return rbound - lbound;
}


console.log(GetNumberOfK([1,2,3,3,3,3,4,5],3));
