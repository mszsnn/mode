// 输入两个无环的单链表，找出它们的第一个公共结点。（注意因为传入数据是链表，所以错误测试数据的提示是用其他方式显示的，保证传入数据是正确的

// 公共节点不是说值相同  ！！！！
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/

// 暴力求解
function FindFirstCommonNode(pHead1, pHead2)
{
  let p2 = pHead2;
  // write code here
  while (pHead1) {

    while (p2) {

      if(p2 === pHead1) {
        return pHead1
      }

      if (p2.val === pHead1.val) {
        return pHead1;
      }
      p2 = p2.next;
    }

    p2 = pHead2

    pHead1 = pHead1.next;
  }

  return null
}


// 如果存在相同的部分，那么两个指针一起走的时候， 肯定是能相等的
//  但是长度不一样， 那就创造长度一致， a + b = b + a

function fun(pHead1, pHead2) {
  let ta = pHead1, tb = pHead2;
  while (ta !== tb) {
    // 这里不会死循环， 因为同时走到最后，的时候，都是null  相等退出循环了
    ta = ta ? ta.next : pHead2;
    tb = tb ? tb.next : pHead1;
  }
  return ta;
}
