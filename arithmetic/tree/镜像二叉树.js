// 操作给定的二叉树，将其变换为源二叉树的镜像


/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param pRoot TreeNode类
 * @return TreeNode类
 */
function Mirror( pRoot ) {
  // write code here
  if(!pRoot) return;

  let temp = pRoot.left;
  pRoot.left = pRoot.right;
  pRoot.right = temp;

  if(pRoot.left) {
    Mirror(pRoot.left)
  }

  if(pRoot.right) {
    Mirror(pRoot.right);
  }

  return pRoot
}
