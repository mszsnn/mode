// 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。
/*
{1,3,5} {2,4,6}
返回 [1,2,3,4,5,6]*/




/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/


// 用一个新的节点， 然后一个一个对比
function Merge(pHead1, pHead2)
{
  // write code here

  let result = {}
  let current = result;
  while (pHead2 && pHead1) {
    if (pHead2.val > pHead1.val) {
      current.next = pHead1;
      pHead1 = pHead1.next
    } else {
      current.next = pHead2;
      pHead2 = pHead2.next
    }
    current = current.next;
  }

  current.next = pHead1 ? pHead1 : pHead2;
  return result.next;
}
