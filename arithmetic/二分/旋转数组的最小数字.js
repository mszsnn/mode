/*
把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。
NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。*/

// 使用二分查找


// [3,4,5,1,2]  2
function minNumberInRotateArray(rotateArray)
{
  // write code here
  if(!rotateArray.length) return 0;

  let start = 0;
  let end = rotateArray.length - 1;

  while(start < end) {

    if(rotateArray[start] < rotateArray[end]) {
      return rotateArray[start]
    }

    let mid = Math.floor((start + end) / 2);

    if (rotateArray[mid] <  rotateArray[end]) {
      start = mid
    } else if(rotateArray[mid] >  rotateArray[end]) {
      start = mid + 1;
    } else if( rotateArray[mid] ===  rotateArray[end]  ) {
      end = end - 1;
    }

  }

  return rotateArray[start];
}


minNumberInRotateArray([4,5,6 ,1 ,2 ,3])
