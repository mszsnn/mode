// 给定一个二叉树，返回该二叉树的之字形层序遍历，（第一层从左向右，下一层从右向左，一直这样交替）


/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */


// 树形遍历， 层序遍历， 使用栈来进行



function Print(pRoot)
{
  // write code here
  if(!pRoot) return [];
  const queue = [pRoot];

  const result = [];
  let deep = 0;

  // 使用队列的特性， 先进先出， 从左往右

  while(queue.length) {
    deep++;
    const temp = [];
    const len = queue.length;
    // 这个是用来处理这一层的队列
    for (let i = 0; i < len ; i++) {
      const node = queue.shift();
      temp.push(node.val);

      if (node.left) {
        queue.push(node.left)
      }

      if (node.right) {
        queue.push(node.right);
      }

    }

    if (deep % 2 === 1) {
      result.push(temp);
    } else {
      result.push(temp.reverse());
    }
  }

  return result;
}
