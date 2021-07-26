import Vue from 'vue';
class Store {
  constructor(props) {
    // 为了响应
    this.vm = new Vue({
      data: {
        state: props.state
      }
    })

    // getters
    let getters = props.getter || {}
    this.getters =  {};
    Object.keys(getters).forEach(gettersName => {
      Object.defineProperty(this.getters, gettersName, {
        get: () => {
          return getters[gettersName](this.state)
        }
      })
    })

    // mutations
    let mutations = props.mutations || {}
    this.mutations = {}
    Object.keys(mutations).forEach( mutationName => {
      this.mutations[mutationName] = (arg) => {
        mutations[mutationName](this.state, arg);
      }
    })


    //actions
    let actions = props.actions
    this.actions = {}
    Object.keys(actions).forEach(actionName=>{
      this.actions[actionName] = (arg) => {
        actions[actionName](this, arg)
      }
    })

  }

  commit = (name, data) => {
    // 这里需要注意 this
    this.mutations[name](data);
  }

  dispatch(methods, data) {
    // 这里应该是使用promise 的
    this.actions[methods](data);
  }

  get state() {
    return this.vm.state
  }

}

let install = function (Vue) {
  Vue.mixin({
    beforeCreate() {
      // 根组件
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }
    }
  })
}

let Vuex = {
  Store,
  install
}

export default Vuex
