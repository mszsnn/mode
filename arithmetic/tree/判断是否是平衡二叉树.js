/*
输入一棵二叉树，判断该二叉树是否是平衡二叉树。
在这里，我们只需要考虑其平衡性，不需要考虑其是不是排序二叉树
平衡二叉树（Balanced Binary Tree），具有以下性质：
它是一棵空树或它的左右两个子树的高度差的绝对值不超过1，并且左右两个子树都是一棵平衡二叉树。*/


/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */


// 判断是不是二叉树，要求左右子树 都是平衡二叉树


// 这种方法在判断深度的时候， 存在大量冗余操作
function IsBalanced_Solution(pRoot)
{
  if(!pRoot) {
    return true;
  }

  return (
   Math.abs( depth(pRoot.left) - depth(pRoot.right) ) <= 1
   &&
   IsBalanced_Solution(pRoot.left)
   &&
   IsBalanced_Solution(pRoot.right)
  )
}

function depth(node) {
  if(!node) return 0;
  return 1 + Math.max(depth(root.left, depth(root.right)))
}



// 第二种方法

// 利用后序遍历，先遍历左右叶子， 后遍历跟
function isBan(root) {
  return ban(root) !== -1;
}

function ban(node) {
  if(!node) return 0;
  let left = ban(node.left);
  let right = ban(node.right);

  if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
    return -1;
  }

  return 1 + Math.max(left, right);
}



