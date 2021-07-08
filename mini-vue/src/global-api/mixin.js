import { mergeOptions } from "../util/index";
export default function initMixin(Vue) {
  Vue.mixin = function (mixin) {
    this.option = mergeOptions(this.option, mixin);
  }
}
