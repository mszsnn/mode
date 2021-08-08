/*
               7
              3 8
             8 1 0
            2 7 4 4
           4 5 2 6 5
*/


// 从三角形中找到一个从顶部到底边的路径， 要求路径的和最大， 只能向左或者向右走

// 对于一个N行的三角形，
// 第 N 行的 就是他自己

// 其他行的，都可以看成是下一行的左右最大值

// 用二维数组来存储

let arr = [[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]];



function sum(arr, r, c) {
  if(r === arr.length - 1) {
    return arr[r][c]
  } else {
    let left = sum(arr, r + 1, c );
    let right = sum(arr, r + 1, c + 1);
    return  Math.max(left, right) + arr[r][c];
  }
}



// 优化： 添加缓存


// 递推



function fun1 (arr) {
  // 从下往上，依次计算每种情况的最大值， 一直累计到三角形顶端, 就是递归过程的逆过程

  for(let i = arr.length - 2; i >= 0; i--) {
    for(let j = 0 ; j < arr[i].length ; j++) {

      // 最下面的一层的最优
      let max = Math.max(arr[i + 1][j], arr[i + 1][j + 1]);

      // 加上当前项目就是 这层的最优
      arr[i][j] = arr[i][j] + max;
      // 这样依次迭代就能一直向上进行添加， 最终arr[0][0] 就是最后的结果
    }
  }

  return arr[0][0];
}



console.log(fun1(arr))
