// 给定一棵二叉搜索树，请找出其中的第k小的TreeNode结点



// {5,3,7,2,4,6,8}

 //    5
 //  3   7
 // 2 4 6  8



// 二叉搜索树的性质:
// 左边树叶子 小于根节点， 但是右边树大于跟节点

// 所以二叉搜索树的中序遍历是递增数列
// 要找第K 大的话， 那么就是找中序的倒序的第K 个元素


/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */


function KthNode(pRoot, k)
{
  // write code here
  // 中序逆序  右  中  左
  // write code here
  let n = 0;
  let result

  function d(pRoot, k) {
    if(!pRoot) return;
    if(result) return;

    d(pRoot.left, k);
    n++;
    if(n === k) {
      result = pRoot
      return;
    }
    d(pRoot.right, k);
  }

  d(pRoot, k);
  return result;
}
