// 在一个二维数组array中（每个一维数组的长度相同），
// 每一行都按照从左到右递增的顺序排序，
// 每一列都按照从上到下递增的顺序排序。请完成一个函数，
// 输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
// [
//   [1,2,8,9],
//   [2,4,9,12],
//   [4,7,10,13],
//   [6,8,11,15]
// ]
// 给定 target = 7，返回 true。
//
// 给定 target = 3，返回 false

// 从左下角或者右上角往对角方向走


function Find(target, array)
{
  // write code here
  let y = array[0].length - 1;
  let x = 0;

  while (y >= 0 && x < array.length) {
    if(array[x][y] === target) {
      return true;
    } else if(array[x][y] > target) {
      y--
    } else {
      x++
    }
  }
  return false
}

console.log(Find(2,[[1,1]]))
