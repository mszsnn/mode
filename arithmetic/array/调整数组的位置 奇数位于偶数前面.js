// 输入一个整数数组，实现一个函数来调整该数组中数字的顺序
// ，使得所有的奇数位于数组的前半部分，
// 所有的偶数位于数组的后半部分，并保证奇数和奇数，
// 偶数和偶数之间的相对位置不变。
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param array int整型一维数组
 * @return int整型一维数组
 */
// 1234789
// 1324
function reOrderArray( array ) {
  // write code here

  let n = 0;
  const stack = [];
  for (let i = 0; i < array.length; i++) {
    const data = array[i];
    if (data % 2) {
      array[n] = data;
      n++;
    } else {
      stack.push(data);
    }
  }
  while(stack.length) {
    array[n++] = stack.shift();
  }
  return array;
}


console.log(reOrderArray([1, 2, 3, 4]));
