// 从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行。

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
// 二叉树层序遍历， 使用栈或者是队列进行处理
function Print(pRoot)
{
  if(!pRoot) return [];
  // write code here
  const stack = [ pRoot ];
  const result = [];
  while(stack.length) {
    const len = stack.length;
    const temp = [];
    for (let i =0 ; i < len ;i++) {
      let node = stack.shift();
      temp.push(node.val);

      if(node.left) stack.push(node.left);
      if(node.right) stack.push(node.right);
    }
    result.push(temp);
  }
  return result;
}

