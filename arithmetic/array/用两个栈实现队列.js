/*
用两个栈来实现一个队列，分别完成在队列尾部插入整数(push)和
在队列头部删除整数(pop)的功能。
队列中的元素为int类型。保证操作合法
，即保证pop操作时队列内已有元素。

示例:
  输入:
    ["PSH1","PSH2","POP","POP"]
返回:
  1,2
解析:
"PSH1":代表将1插入队列尾部
"PSH2":代表将2插入队列尾部
"POP“:代表删除一个元素，先进先出=>返回1
"POP“:代表删除一个元素，先进先出=>返回2*/





// 思考： 两个栈来实现队列， 就是一个用来入队列， 一个用来出队列

const inStack = [];
const outStack = [];

function push(node) {
  inStack.push(node);
}
function pop() {
  if(outStack.length) {
    return  outStack.pop()
  } else {
    while (inStack.length) {
      outStack.push(inStack.pop())
    }
    return outStack.pop();
  }
}
