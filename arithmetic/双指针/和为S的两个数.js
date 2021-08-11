// 输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，
// 如果有多对数字的和等于S，返回两个数的乘积最小的，如果无法找出这样的数字，返回一个空数组即可。




function FindNumbersWithSum(array, sum)
{
  // write code here
  let start = 0;
  let end = array.length - 1;
  let max = [];
  while (start < end) {
    if (array[start] + array[end] === sum) {
      if(!max.length) {
        max = [array[start], array[end]]
      }
      if(max[0] * max[1] > array[start] * array[end] ) {
        max = [array[start], array[end]]
      }
      start++;
      end--;
    } else if( array[start] + array[end] > sum) {
      end--;
    } else {
      start++
    }
  }
  return max;
}


console.log(FindNumbersWithSum([1,2,4,7,11,15],15));
