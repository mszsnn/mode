// 输入一个链表，反转链表后，输出新链表的表头。


/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ReverseList(pHead)
{
  // write code here
  if(!pHead) return null;
  const stack = [];
  while (pHead) {
    stack.push(pHead);
    pHead = pHead.next;
  }
  const target = {};
  let temp = {};
  target.next = temp;
  while (stack.length) {
    let pop = stack.pop();
    temp.next = pop;
    temp = pop;
  }
  return target.next;
}
