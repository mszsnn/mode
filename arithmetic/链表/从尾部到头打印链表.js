// 输入一个链表的头节点，按链表从尾到头的顺序返回每个节点的值（用数组返回

// 如输入{1,2,3}
//
//   返回一个数组为[3,2,1]

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
{
  // write code here
  let arr = [];
  while (head) {
    arr.unshift(head.val)
    head = head.next
  }

  return arr;
}




// 也可以使用递归的方式进行
