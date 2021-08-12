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
  // write code here
  const map = {};
  matrix.forEach( (f, i) => {
    f.forEach( (s, j) => {
      if(!map[s]) {
        map[s] = [];
      }
      map[s].push(`${i}-${j}`)
    })
  })

  let str = word.substring(1);
  if(!map[str]) return false

  for (let i = 0; i < map[str].length ; i++) {
    const coords = map[str][i];
    let have = [];
    have.push(coords);
    let [x, y] = coords.split('-');
    let n = 1;
    str = word.charAt(1);
    while (str) {
      if(!map[str]) return false;
      let left = `${x + 1}-${y}`
      let top = `${x}-${y - 1}`
      let right = `${x + 1}-${y}`
      let bottom = `${x}-${y + 1}`
      
      n++
    }

    have = [];
  }


  console.log(map);
}

hasPath([['a','b','c','e'],['s','f','c','s'],['a','d','e','e']],"abcced")
