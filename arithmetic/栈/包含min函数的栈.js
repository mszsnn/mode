/*
定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数，并且调用 min函数、push函数 及 pop函数 的时间复杂度都是 O(1)
push(value):将value压入栈中
pop():弹出栈顶元素
top():获取栈顶元素
min():获取栈中最小元素*/



// 思路解析： 最小的元素会因为出栈的数据而变化 所以需要维护一个栈， 每次推送一个元素，就需要维护一个最小元素
const arr = []
const mins = [];
function push(node)
{
  // write code here
  arr.push(node);
  if(!mins.length) {
    mins.push(node)
  }

  if(node > mins[mins.length - 1]) {
    mins.push(mins[mins.length - 1])
  } else {
    mins.push(node)
  }
}
function pop()
{
  // write code here
  arr.pop();
  mins.pop();
}
function top()
{
  // write code here
  return arr[arr.length - 1]
}
function min()
{
  // write code here
  // return Math.min(...arr); //  复杂度有问题
  return mins[mins.length - 1];
}


