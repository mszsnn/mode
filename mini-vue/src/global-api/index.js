import initMixin from "./mixin";
import {initExtend} from "./initExtend";
import {initAssetRegisters} from "./assets";

const ASSETS_TYPE = ["component", "directive", "filter"];

export function initGlobalApi(Vue) {
  Vue.option = {};  //  全局的组件， 过滤器，指令等

  initMixin(Vue);

  ASSETS_TYPE.forEach(type => {
    Vue.option[type + 's'] = {};
  })


  Vue.option._base = Vue;

  initExtend(Vue);

  initAssetRegisters(Vue);
}
