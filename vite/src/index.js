import { createApp, h } from 'vue'


const root = {
  render() {
    return h('div', 'hello vue');
  }
}

createApp(root).mount('#app');
