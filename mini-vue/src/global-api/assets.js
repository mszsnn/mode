
const ASSETS_TYPE = ["component", "directive", "filter"];

// 全局组件  就挂载在 Vue.options.components 上面

export function initAssetRegisters (Vue) {

  ASSETS_TYPE.forEach((type) => {
    Vue[type] = function (id, definition) {
      this.options[type + "s"][id] = definition;
    }
  });

}
