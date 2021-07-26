import Vue from 'vue';
import Vuex from './myvuex'

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    count: 1
  },
  getter: {
    count: state => {
      return state.count
    }
  },
  mutations: {
    setCount(state) {
      state.count++
    }
  },
  actions: {
    asyncSetCount({ commit }, data) {
      setTimeout(() => {
        commit('setCount', data);
      }, 1000)
    }
  },
  modules: {
  }
})
