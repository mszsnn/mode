// 请设计一个函数，用来判断在一个矩阵中是否存在一条
// 包含某字符串所有字符的路径。路径可以从矩阵中的任意一个格子开始，
// 每一步可以在矩阵中向左，向右，向上，向下移动一个格子。如果一条路径经过了矩阵中的某一个格子，
// 则该路径不能再进入该格子。 例如
//
// a b c e
// s f c s
// a d e e
// 矩阵中包含一条字符串"bcced"的路径，
// 但是矩阵中不包含"abcb"路径
// ，因为字符串的第一个字符b占 据了矩阵中的第一行第二个格子之后，路径不能再次进入该格子。

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param matrix char字符型二维数组
 * @param word string字符串
 * @return bool布尔型
 */
function hasPath( matrix ,  word ) {
  for (let i = 0; i < matrix.length ; i++) {
    for (let j = 0; j < matrix[i].length ; j++) {
      if(dfs(matrix, word, i, j, 0)) {
        return true
      }
    }
  }
  return false
}
function dfs(matrix, word, i, j, k) {
  // 递归的退出条件
  if (i < 0 || i >= matrix.length || j < 0 || j >= matrix[0].length || matrix[i][j] !== word[k]) {
    return false
  }
  if(k === word.length - 1) return true;
  // 查找四个方向
  matrix[i][j] = null; // 防止回来 搜索下一个将前面的设置为空
  let res = dfs(matrix, word, i + 1, j, k + 1) || dfs(matrix, word, i - 1, j, k + 1)
    || dfs(matrix, word, i, j + 1, k + 1) || dfs(matrix, word, i, j - 1, k + 1);

  matrix[i][j] = word[k]; // 能走到这里都代表匹配了  这里为啥需要重新给值， 因为值在处理的过程中被冲掉了

  return res;
}

console.log(hasPath([['a', 'b', 'c', 'e'], ['s', 'f', 'c', 's'], ['a', 'd', 'e', 'e']], "abcced"));
