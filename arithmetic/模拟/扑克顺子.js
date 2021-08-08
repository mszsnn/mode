/*
现在有2副扑克牌，从扑克牌中随机五张扑克牌，我们需要来判断一下是不是顺子。
有如下规则：
1. A为1，J为11，Q为12，K为13，A不能视为14
2. 大、小王为 0，0可以看作任意牌
3. 如果给出的五张牌能组成顺子（即这五张牌是连续的）就输出true，否则就输出false。
例如：给出数据[6,0,2,0,4]
中间的两个0一个看作3，一个看作5 。即：[6,3,2,5,4]
这样这五张牌在[2,6]区间连续，输出true
数据保证每组5个数字，每组最多含有4个零，数组的数取值为 [0, 13]*/


// 排序  + 遍历

function IsContinuous(numbers)
{

  function divide(arr, s, e) {
    let mid = arr[e];
    let n = s;
    for (let i = s ; i < e; i++) {
      if (mid > arr[i]) {
        [arr[n], arr[i]] = [arr[i], arr[n]]
        n++;
      }
    }
    [arr[n], arr[e]] = [arr[e], arr[n]]

    return n;
  }

  // write code here
  let start = 0;
  let end = numbers.length - 1;
  let stack = [start, end];
  while (stack.length) {
    let e = stack.pop();
    let s = stack.pop();

    let mid = divide(numbers, s, e);

    if(mid - 1 > s) {
      stack.push(
        s,
        mid - 1
      )
    }

    if(mid + 1 < e) {
      stack.push(
        mid + 1,
        end
      )
    }
  }


  // 如果有非0 重复值， 肯定是false, 排除 0 的干扰，最大值，减去最小值应该小于 5
  let n = 0
  for (let i = 0; i < numbers.length; i++) {
    if(numbers[i] === 0) {
      n++;
      continue
    }
    if(i + 1 < numbers.length && numbers[i] === numbers[i + 1]) {
      return false
    }
  }

  return numbers[numbers.length - 1] - numbers[n] < 5;

}



function fun(numbers) {
  // 求得最大和最小值   并且不能重复
  let obj = {};
  for (let i = 0; i < numbers.length; i++) {
    let item = numbers[i];
    if(item === 0) {
      continue;
    }
    if(obj[item] !== undefined) {
      return false
    } else {
      obj[item] = true;

      if(!obj.min) {
        obj.min = item
      }
      if(!obj.max) {
        obj.max = item
      }

      if(item > obj.max) {
        obj.max = item;
      }
      if(item < obj.min) {
        obj.min = item;
      }
    }
  }
  return  obj.max - obj.min < 5;
}


let arr =[1,3,2,6,4];
console.log(fun(arr));

