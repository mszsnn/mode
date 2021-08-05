class Sort {

  constructor(arr) {
    this.arr = arr || [];
  }

  // 选择排序
  select(type) {
    console.time()
    for (let i = 0; i < this.arr.length - 1 ; i++) {
      for (let j = i + 1; j < this.arr.length ;j++) {
        if (type) {
          if (this.arr[i] < this.arr[j]) {
            [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
          }
        } else {
          if (this.arr[i] > this.arr[j]) {
            [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
          }
        }
      }
    }
    console.timeEnd()
  }

  // 冒泡
  bubbling(type) {
    for (let i = 0; i< this.arr.length - 1 ; i++) {
      for (let j = 0; j < this.arr.length - i - 1 ; j++) {
        if(type) {
          if (this.arr[j] < this.arr[j + 1]) {
            [ this.arr[j], this.arr[j + 1]] = [ this.arr[j + 1], this.arr[j]];
          }
        } else {
          if (this.arr[j] > this.arr[j + 1]) {
            [ this.arr[j], this.arr[j + 1]] = [ this.arr[j + 1], this.arr[j]];
          }
        }
      }
    }
    console.timeEnd();
  }

  // 改进后的冒泡, 因为每次跑的时候，仅仅比较到上次交换的位置
  bubbling_(type) {
    console.time()
    let pos = this.arr.length - 1;
    for (let i = 0; i < pos ; i++) {
      let n = 0;
      for (let j = 0; j < this.arr.length - i - 1 ; j++) {
        if (type) {
          if (this.arr[j] < this.arr[j + 1]) {
            [ this.arr[j], this.arr[j + 1]] = [ this.arr[j + 1], this.arr[j]];
            n = j
          }
        } else {
          if (this.arr[j] > this.arr[j + 1]) {
            [ this.arr[j], this.arr[j + 1]] = [ this.arr[j + 1], this.arr[j]];
            n = j
          }
        }
      }
      pos = n;
    }
    console.timeEnd();
  }




  // 插入排序
  insertionSort() {
    // 插入排序的思想是把之前的排序好的序列当做有序数列， 要插入的每一项和之前的项目从后往前进行比较， 大的就往后挪动
    // 然后将要插入的项目放在比较的位置

    for(let i = 1; i< this.arr.length ;i++) {
      let tem = this.arr[i]  // 要插入的元素

      for(let j = i - 1; j >= 0 && this.arr[j] > tem; j--) {
        this.arr[j + 1] = this.arr[j];
      }

      this.arr[j + 1] = tem;
    }


    // console.time();
    // for( let i = 1; i < this.arr.length ;i++) {
    //   // 要插入的元素
    //   let key = this.arr[i];
    //   // 从后往前扫扫描的开始位置
    //   let j = i - 1;
    //   while (j >= 0 && this.arr[j] > key) {
    //     this.arr[j + 1] = this.arr[j];
    //     j--;
    //   }
    //   this.arr[j + 1] = key;
    // }
  }


  // 如果有一个排好序的数组， 将一个数据插入到已经排序好的数组里

  insert(arr, num) {
    let left = 0;
    let right = arr.length -1 ;
    while(left <= right) {
      let n = parseInt((left + right) / 2 );
      if (arr[n] > num) {
        right = n - 1;
      } else {
        left = n + 1
      }
    }
    console.log('需要插入的位置', left);

    for (let j = arr.length -1; j >= left; j--) {
      arr[j + 1] = arr[j];
    }
    arr[left] = num;
  }

  // 插入二分排序
  binaryInsertionSort() {

    // 二分 插入排序的思想是： 思路和插入排序思想一样 ， 只是在查找插入位置的时候，用二分法来进行查找位置

    // for (let i = 1; i< this.arr.length;i++) {
    //   let key = this.arr[i]; // 插入的元素
    //   // 找到插入的位置
    //   // 因为前面是已经排序的位置， 所以用二分法查找位置
    //   let left = 0;
    //   let right = i - 1;
    //   while (left <= right) {
    //     let n = parseInt( (left + right ) /2);
    //     if (this.arr[n] > key) {
    //       right = n - 1;
    //     }  else {
    //       left = n + 1;
    //     }
    //   }
    //   for (let j = i - 1 ; j >= left ; j--) {
    //     this.arr[j + 1] = this.arr[j];
    //   }
    //   this.arr[left] = key;
    // }
  }

  shellSort() {
    // 希尔排序
    // 思路： 将数组分割成等分的小段， 然后在小段里面分别进行插入排序

    // 先确定段数  N*5
    // 分成pos 之后， pos 之后的每个数据都要插入到对应的数据中
    // 要插入的数据， 但是要插入的地方在每一个 j -i   j-2 * i 的地方

    let N = this.arr.length;
    let pos = 1;
    while(pos < N / 5) {
      pos = pos * 5 + 1
    }

    for(let i = pos; i >= 1 ; i = Math.trunc(i / 5)) {

      for (let j = i; j < N; j++) {
        let tmp = this.arr[j]

        let k = j - i
        for(k; k >= 0 && this.arr[k] > tmp; k = k - i) {
          this.arr[k + i] = this.arr[k]
        }
        this.arr[k + i] = tmp;
      }
    }





    // let N = this.arr.length;
    // let pos = 1;
    // // 先确定间距
    // while (pos < N / 5) {
    //   pos = pos * 5 + 1;
    // }
    // // 找到pos 间距之后， 进行每次循环间距的减小
    // while (pos >= 1) {
    //   // 将a[i] 进行插入排序插入到 a[i - h] a[i - 2h]
    //   for (let i = pos ; i< N; i++) {
    //     let tem = this.arr[i]; // 要插入的元素
    //     // 往后挪动
    //     for (let j = i - pos; j >= 0 && this.arr[j] > tem; j= j-pos ) {
    //       arr[j + pos] = arr[j];
    //     }
    //     arr[j + pos] = temp;
    //   }
    //   pos = Math.trunc(pos / 5);
    // }


  }


  // 归并排序， 使用分治的思想，， 先进行分解， 后进行合并
  merger() {

    function divide(arr) {
      if(arr.length <=1 ) {
        return arr;
      }
      let middle = Math.floor(arr.length / 2);
      console.log('middle',middle)
      let left = arr.slice(0, middle);
      let right = arr.slice(middle);
      console.log(left, right);
      // 合并
      return merge(divide(left), divide(right));
    }

    function merge (left, right) {
      let result = [];  // [4,4] [1,2]
      while(left.length && right.length) {
        if(left[0] > right[0]) {
          result.push(right.shift());
        } else {
          result.push(left.shift())
        }
      }

      while(left.length) {
        result.push(left.shift())
      }

      while(right.length) {
        result.push(right.shift())
      }
      return result;
    }

    return divide(this.arr);
  }


  // 快速排序， 使用的也是分治的思想， 但是不用的是， 首先选择一个合适的基准点， 将数组分成小的元素在前，
  // 大的在后面， 的数组， 然后在对小的和小的和大的进行递归， 最终就排序好了

  fast(arr) {
     // 找到基准的中间值， 将数据按照基准值分为比基准大的值和比基准值晓得数组

    // 这种算法使用了新的空间 空间复杂度比较高
    if(arr.length <=1) {
      return arr;
    }
    let middle = Math.floor( arr.length / 2);
    let left = [], right = [];

    for (let i = 0; i< arr.length && i !== middle ;i++) {
      if(arr[i] > arr[middle]) {
        right.push(arr[i])
      } else {
        left.push(arr[i])
      }
    }


    // 这种方法可以完成排序， 但是问题是没有尾递归优化， 容易栈溢出
    return this.fast(left).contact([ arr[middle]], this.fast(right))
  }



  divide(arr, start, end) {
    // 数组循环分割法 在一个数组里面实现小的元素在前 大的在后
    // 将最后一个元素作为基准
    let point = arr[end];

    let pointIndex = start; // 将小的元素放置的下标位置， 从开始开始往后排
    for(let i = start; i < end; i++) {
      if (arr[i] < point ) {
        [arr[i], arr[pointIndex]] = [ arr[pointIndex], arr[i]];
        pointIndex++
      }
    }

    // 结束的时候 pointIndex 的位置就是 中间的位置

    [arr[pointIndex], arr[end]] = [arr[end], arr[pointIndex]];

    // 返回中间的位置， 这样一个数组就完成了小的在前， 大的在后面
    return pointIndex;
  }


  fast_(arr, start, end) {
    // 改进的快速排序， 同样使用递归
    // 这种方式可以在一个元素就行排序， 避免了新的空间的产生

    if (start >= end) {
      return;
    }

    let middle = this.divide(arr, start, end);

    this.fast_(arr, start, middle - 1);
    this.fast_(arr, middle + 1, end);
  }

  // 用循环类解决快速排序
  quickSort(arr) {
    let stack = [];
    // 栈里面存在的其实是开始位置很结束位置 ， 不断改变元素里面的位置
    stack.push(0);
    stack.push(arr.length - 1);


    // 只要存在栈的栈顶有元素就继续循环
    while(stack[stack.length -1] >= 0) {
      // 取栈顶元素
      let start = stack.pop();
      let end = stack.pop();

      let middle = this.divide(arr, start, end);

      // 要维护栈里面的元素， 让他继续循环下去
      // 小的一面需要继续下， 大的一面也需要继续下去

      if (middle - 1 > start) {
        stack.push(start);
        stack.push(pivotIndex - 1);
      }

      if (pivotIndex + 1 < end){
          stack.push(pivotIndex + 1);
          stack.push(end);
      }
    }
  }

  // 计数排序

  // 利用一个新数组， 进行排序，
  countSort(arr) {
    let len = arr.length;
    let count = [];
    let result = []

    let min = arr[0];
    let max = arr[0];

    // 将数据进行计数
    for (let i = 0; i< arr.length; i++) {
      min = arr[i] < min? arr[i]: min;
      max = arr[i] > max? arr[i]: max;
      count[arr[i]] = count[arr[i]] ? count[arr[i]] + 1 : 1;
    }

    // 将计数好的数据进行排序

    for(let j = min;  j<= max; j++) {
      while(count[j]) {
        result[result.length] = j;
        count[j]--;
      }
    }

    return result;
  }

  // 桶排序
  // 桶排序是计数排序算法的一种升级版本， 假设数据比较均匀 并且有序的情况下

  // 1 首先划分桶， 确定桶的个数
  // 2  遍历数据， 将数据放置在每个桶的内部
  // 3  将每个桶进行排序， 然后依次拿出数据来（有可能使用到其他的排序方式）


  bucket(arr) {
    if(arr.length <=1) {
      return arr;
    }
    let len = arr.length;
    let bucket = [];
    result = [];
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    // 每个桶的容量， 就是数据范围
    let space = (max - min) / len;


    for (let i = 0; i< len;i++) {
      let index = (arr[i] - mim) / space;

      if(bucket[index]) {
        // 从第一个元素进来开始插入排序
        let insert = arr[i];
        let i = bucket[index].length - 1
        for(i; i>=0 && bucket[index][i] > insert; i--) {
          bucket[index][i + 1] = bucket[index][i]
        }
        bucket[index][i+ 1] = insert;
      } else {
        bucket[index] = [];
        bucket[index].push(arr[i]);
      }
    }
  }


  /* 基数排序适用的范围
    整数  每个数值大于0
    按照每一个位数进行排序， 一共十个桶 ， 0-9
  */

  radix(arr, maxCount) {
    // 1 确定桶的个数为10个
    let mod = 10;
    let dev = 1;
    let bucket = [];

    // 每一个位置上面的数字 分别 * 10的n次方取余数 / 10

    // 循环 的次数由最大的位数决定
    for(let i = 0; i< maxCount ;i++, mod*=10, dev*=10) {

      for(let j=0;j< arr.length;j++) {
        let bucketIndex = parseInt((arr[j] % mod ) / dev);
        if (bucket[bucketIndex]) {
          bucket[bucketIndex].push(arr[j]);
        } else {
          bucket[bucketIndex] = [arr[j]];
        }
      }

      let pos = 0;
      for(let j = 0; j< bucket.length ;j++) {
        let value = null;
        while(bucket[j] && bucket[j].length) {
          arr[pos++] = bucket[j].shift();
        }
      }

    }

    return arr;
  }

  // 堆排序


}



const arr = new Sort([3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]);

// arr.merger();

console.log(arr.radix(arr.arr, 2));

// 讲一个数据，插入已经排序的数组内部




try {
  throw  {name: '123'};
} catch(err) {
  console.log(err);
}
