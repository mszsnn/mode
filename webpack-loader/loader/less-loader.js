const less = require('less');

function loader (source, map) {
  const callback = this.async();
  less.render(source, function (err, res) {
    let { css } = res;
    console.log('css', css);
    callback(null, css);
  })
}

module.exports = loader
