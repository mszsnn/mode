class MyPlugin {
  constructor() {
    console.log("Plugin被创建了");
  }
  apply (compiler) {
    compiler.hooks.done.tap('p', (compilation) => {
      console.log('compilation', compilation)
    })
  }
}
module.exports = MyPlugin;
