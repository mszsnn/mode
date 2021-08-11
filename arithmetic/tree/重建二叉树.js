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

function reConstructBinaryTree(pre, vin)
{
  // write code here
  let head = {}

  const stack = [
    pre,
    vin
  ];

  while(stack.length) {
    let v = stack.pop();  // 中序
    let p = stack.pop(); // 前序

    const head = {
      val: p[0]
    }
    const index = v.indexOf(p[0]);
    let leftv = v.slice(0, index);
    let rightv = v.slice(index + 1);

    let leftp = p.slice(1, 1 + leftv.length);
    let rightp = p.slice(1 + rightv.length);

    let left = {
      val: leftp[0] || null,
    }
    let right = {
      val: rightp[0] || null
    }

    head.left = left;
    head.right = right;

  }

}
