import initMixin from "./mixin";

export function initGlobalApi(Vue) {
  Vue.option = {};
  initMixin(Vue);
}
