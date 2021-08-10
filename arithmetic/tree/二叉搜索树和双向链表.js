// 输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。如下图所示
//
//
// 注意:
//   1.要求不能创建任何新的结点，只能调整树中结点指针的指向。当转化完成以后，树中节点的左指针需要指向前驱，树中节点的右指针需要指向后继
// 2.返回链表中的第一个节点的指针
// 3.函数返回的TreeNode，有左右指针，其实可以看成一个双向链表的数据结构
// 4.你不用输出或者处理，示例中输出里面的英文，比如"From left to right are:"这样的，程序会根据你的返回值自动打印输出

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

let head; // 头结点
let pre// 上个遍历的节点，因为要用到， 其实也是尾结点
function dfs(pRootOfTree) {
  // write code here
  // 中序遍历， 递增
  if(!pRootOfTree) return;

  dfs(pRootOfTree.left);

  // 遍历的时候， 建立相邻节点的引用关系
  if(!head) {
    head = pRootOfTree
  }
  if(pre) {
    // 把握一个原则， 不破坏之前的引用关系。否则不能遍历
    pre.right = pRootOfTree; // 设置前一个的右边子树
    pRootOfTree.left = pre; // 设置当前的左边子树
  }
  pre = pRootOfTree;

  dfs(pRootOfTree.right);
}


function Convert(pRootOfTree)
{
  if(!pRootOfTree) return;
  head = null;
  pre = null
  dfs(pRootOfTree);
  // head // 头结点
  // pre 最后一个节点
  head.left = pre;
  pre.right = head;
  return head;
}
