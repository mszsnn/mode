import Vue from './src/index'

const options = {
  data() {
    return {
      name: '123',
      age: 45,
      message: {
        width: 20,
        height: 30
      },
      habit: [ {
        name: 'lisi'
      }, '吃饭', '擦地']
    }
  },
  el: '#app'
}

Vue.mixin({
  created() {
    console.log(1);
  }
})



const vm = new Vue(options);



setTimeout(() => {
  vm.habit[0].name ='wanguw'
  vm.message.width = 100;
}, 2000)

console.log(vm);



