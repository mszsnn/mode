
import Vue from 'vue'
import VueRouter from './myrouter'
import Home from '../views/Home.vue'
import About from "../views/about.vue"

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
];
const router = new VueRouter({
  mode:"hash",
  routes
})
export default router
