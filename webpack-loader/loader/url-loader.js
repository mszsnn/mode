
const { getOptions, parseQuery, stringifyRequest } = require('loader-utils')
function loader (source, map) {
  //获取options参数
  const options = getOptions(this);
  //解析字符串为对象
  parseQuery("?param1=foo")
  //将绝对路由转换成相对路径
  //以便能在require或者import中使用以避免绝对路径
  stringifyRequest(this, "test/lib/index.js")


}

module.exports = loader
