// 插入排序的思想是把之前的排序好的序列当做有序数列， 要插入的每一项和之前的项目从后往前进行比较， 大的就往后挪动
// 然后将要插入的项目放在比较的位置
function fun(arr) {
  for (let i = 1; i < arr.length ; i++ ) {
    let temp = arr[i]; // 要插入的元素
    let j = i - 1
    for(; j > 0 && arr[j] > temp;j --) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = temp;
  }
}


let arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
fun(arr);
console.log(arr);



// 如果有一个已经排列好的数，现在要将一个数据插入到里面去
// 二分插入

function f (arr, n) {
  let left = 0;
  let right = arr.length - 1;
  let mid;
  while (left < right) {
    mid = Math.floor((left + right) / 2);
    if(arr[mid] > n) {
      right = mid - 1 ;
    } else {
      left = mid + 1
    }
     console.log(left, right);
  }
  for (let i = arr.length -1 ; i >= left; i--) {
    arr[i + 1] = arr[i];
  }
  arr[left] = n;
}


const brr = [1,3,4,5,7,9];

f(brr, 2);
console.log(brr);


