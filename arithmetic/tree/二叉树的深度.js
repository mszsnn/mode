// 输入一棵二叉树，求该树的深度。从根结点到叶结点依次经过的结点（含根、叶结点）形成树的一条路径，最长路径的长度为树的深度。




// 二叉树的遍历总体上分为两类
  // 深度优先遍历   前序 后序 中序遍历  一般用递归
  // 广度优先遍历  层序遍历   一般用栈或者是队列处理



function TreeDepth(pRoot)
{
  // write code here
  if(!pRoot) return 0;

  return 1 + Math.max(TreeDepth(pRoot.left), TreeDepth(pRoot.right));

}



