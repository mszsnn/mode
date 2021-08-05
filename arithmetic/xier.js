// 希尔排序
// 缩小增量排序, 选定一个增量，， 然后将增量减小到1 ， 将数组分为不同的小段，然后在每个段里面进行简单插入排序

// 其实一共进行次数为

function f(arr) {
  let len = arr.length;
  // 增量一直减少，每次缩小一半，直到 0
  for (let gap = Math.floor( len / 1 ); gap > 0; gap = Math.floor(gap / 2)) {
    // 然后每个部分里面进行插入排序

    // 这部分其实就是从，第gap 的元素开始，将元素插入到 -gap   - 2 * gap -3 * gap的地方去
    for(let n = gap; n < len ; n++) {
      // 要插入的元素 arr[j], 插入到 -gap 的地方去
      let j = n;
      let insert = arr[n];
      while(j >= gap && arr[j - gap] > insert) {
        arr[j] = arr[j - gap]
        j = j - gap
      }
      arr[j] = insert;
    }
  }
}


let arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
f(arr);
console.log(arr);
