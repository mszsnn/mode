// 给定某二叉树的前序遍历和中序遍历，请重建出该二叉树并返回它的头结点。
// 例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建出如下图所示。


// 提示:
//   1.0 <= pre.length <= 2000
// 2.vin.length == pre.length
// 3.-10000 <= pre[i], vin[i] <= 10000
// 4.pre 和 vin 均无重复元素
// 5.vin出现的元素均出现在 pre里
// 6.只需要返回根结点，系统会自动输出整颗树做答案对比

// pre 前序系列
// vin 中序序列
// [1,2,4,7,3,5,6,8],[4,7,2,1,5,3,8,6]

// 建议递归解决问题

function tree(pre, vin) {

}

function reConstructBinaryTree(pre, vin)
{
  // write code here

  if(!pre.length || !vin.length) {
    return null
  }

  let head = {
    val: pre[0],
  };

  const index = vin.indexOf(pre[0]);
  let leftv = vin.slice(0, index);
  let rightv = vin.slice(index + 1);

  let leftp = pre.slice(1, 1 + leftv.length);
  let rightp = pre.slice(1 + rightv.length);

  let left = reConstructBinaryTree(leftp, leftv)
  let right = reConstructBinaryTree(rightp, rightv);

  head.left = left;
  head.right = right;

  return head;
}
