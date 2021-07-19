const Vue = {
  createApp(config) {
    // 编译过程
    const compile = template => (observed, dom ) => {
      // 重新渲染
      let input = dom.querySelector('input')
      if (!input) {
        input = document.createElement('input')
        input.setAttribute('value', observed.message)

        input.addEventListener('keyup', function () {
          observed.message = this.value
        })
        dom.appendChild(input)
      }
      let button = dom.querySelector('button')
      if (!button) {
        console.log('create button')
        button = document.createElement('button')
        button.addEventListener('click', () => {
          return config.methods.click.apply(observed)
        })
        dom.appendChild(button)
      }
      button.innerText = observed.message
    }
    const render =  compile(config.template);

    return {
      mount(container) {
        const dom = document.querySelector(container);
        const setupResult = config.setup();
        effective = () => render(setupResult, dom);
        render(setupResult, dom);
      }
    }
  }
}
let effective;

const App = {
  template: `
    <input v-model="message"/>
    <button @click='click'>{{message}}</button>
`,
  setup() {
    // 数据劫持
    const state = new Proxy({
      message: 'hellow vue3'
    }, {
      set(target, key, value, receiver) {
        const set = Reflect.set(target, key, value);
        // 触发响应
        effective();
        return set;
      }
    });


    const click = () => {
      state.message = state.message.split("").reverse().join("");
    }

    return {
      click,
      state
    }
  }
}



const { createApp }  = Vue;

createApp(App).$mount('#app');

