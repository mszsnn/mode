// 输入一个整型数组，数组里有正数也有负数。
// 数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。
// 要求时间复杂度为 O(n).


// 这种是动态规划的问题
// 动态规划问题的三个核心因素
// 最优子结构
// 状态转移过程
// 边界

// f(i)=max{ f(i−1)+ nums[i],  nums[i]}


let arr = [-2,1,-3,4,-1,2,1,-5,4]



function fun(arr) {
  if (arr.length === 0) {
    return 0
  } else {
    let last = arr.pop();
    // 得到 r 是最后一个元素的最大和， 所以这种算法肯定不是最优的， 所以我们用递推
    return Math.max(fun(arr) + last, last)
  }
}


function fun1(nums) {
  let now = 0; // 当前
  let max = nums[0];  // 初始当前最大， 就是第一个元素

  for (let i = 0; i < nums.length ; i++) {
    // 其实是每次 一个元素， 两个元素， 三个元素   的最大值
    now = Math.max(now + nums[i], nums[i]);
    // 但是我们要的是最大
    max = Math.max(max, now);
  }

  return max;
}


console.log(fun1(arr))



// 整体思想就是动态规划的思想， 但是问题的关键是 边界条件，状态转移公式，和最优的子结构
// 递归是从前往后推导， 但是递推的话， 从结果往前推导
