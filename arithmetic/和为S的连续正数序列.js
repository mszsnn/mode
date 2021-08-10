/*
小明很喜欢数学,有一天他在做数学作业时,要求计算出9~16的和,他马上就写出了正确答案是100。但是他并不满足于此,他在想究竟有多少种
连续的正数序列的和为100(至少包括两个数)。没多久
  ,他就得到另一组连续正数和为100的序列:18,19,20,21,22。现在把问题交给你,你能不能也很快的找出所有和为S的连续正数序列? Good Luck!*/


function FindContinuousSequence(sum)
{
  // write code here
  if(sum < 2) {
    return []
  }
  const arr = [];
  const mid = Math.floor(sum / 2 );
  let data = 0;
  // 从i 开始加
  for (let i = 1; i <= mid ; i++) {
    for(let j = i;; j++) {
      data += j;
      if (data > sum) {
        data = 0;
        break;
      } else if (data === sum){
        const temp = [];
        for(let k = i; k <= j; k++) {
          temp.push(k);
        }
        arr.push(temp);
      }
    }

  }

  return arr;
}




// 并不是最佳
function fun(sum) {
  const result = [];
  if (sum < 2) {
    return result;
  }
  for (let i = 1; i <= Math.ceil(sum / 2 ); i++) {
    const f = i % 2;
    let res = Math.floor(sum / i);
    if(f) {
      // 奇数
      const mid = (i - 1) / 2;
      if (res - mid > 0 && res + mid < sum && res * i  === sum) {
        const tem = []
        for (let j = res - mid; j <= res + mid; j++) {
          tem.push(j);
        }
        result.unshift(tem);
      }
    } else {
      // 偶数
      const mid = i / 2;
      if (res - mid + 1 > 0 && res + mid < sum &&  ( 2 * res + 1 ) * i / 2 === sum) {
        const tem = []
        for (let j  = res - mid + 1; j <= res + mid; j++) {
          tem.push(j);
        }
        result.unshift(tem);
      }
    }
  }
  return result
}


console.log(fun(3));
