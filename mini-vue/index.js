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
      habit: [ '洗完', '吃饭', '擦地']
    }
  },
  el: '#app'
}

const vm = new Vue(options);



// setTimeout(() => {
//   vm.message.width = 100;
// }, 2000)

console.log(vm);



