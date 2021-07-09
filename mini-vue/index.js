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
  mounted() {
    console.log('父组件mouneted')
    setTimeout(() => {
      this.habit[0].name ='wanguw'
      this.message.width = 100;
    }, 2000)
  },
  el: '#app'
}

Vue.mixin({
  created() {
    console.log(1);
  }
})

Vue.component('tag', {
  data() {
    return {
      name: 'children'
    }
  },
  mounted() {
    console.log('子组件mouneted')
    setTimeout(() => {
      this.name = '变化了'
    }, 2000)
  },
  template: `<span>{{name}}</span>`
})

const vm = new Vue(options);

console.log(vm);



