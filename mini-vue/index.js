import Vue from './src/index'
import OriginVue from 'vue'


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
  }
}


const vm = new Vue(options);


const app = new OriginVue(options)


console.log(vm, app);



vm.habit.push('哈哈');
