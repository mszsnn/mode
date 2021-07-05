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



setTimeout(() => {
  vm.name = '张丽'
  vm._update(vm._render())
}, 2000)

console.log(vm);



