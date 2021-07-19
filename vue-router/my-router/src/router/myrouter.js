

// 用来表示当前路由
class HistoryRoute {
  constructor() {
    this.current = null;
  }
}


class Myrouter {
  static install(Vue) {

    Vue.mixin({
      beforeCreate() {
        if(this.$options && this.$options.router) {
          // 根组件
          this._root = this;
          this._router = this.$options.router;
          Vue.util.defineReactive(this, 'xxx', this._router.history)
        } else {
          // 如果是 子组件，会形成一个指向根组件的引用复制
          this._root = this.$parent && this.$parent._root;
        }

        Reflect.defineProperty(this, '$router', {
          get() {
            return this._root._router
          }
        })

        Reflect.defineProperty(this, '$route', {
          get() {
            return this._root._router.history.current;
          }
        })
      }
    })


    // 先注册组件
    Vue.component('router-view', {
      render(h) {
        let current = this._self._root._router.history.current;
        let routesMap = this._self._root._router.routesMap;
        return h(routesMap[current])
      }
    })
    Vue.component('router-link', {
      props:{
        to:String
      },
      render(h) {
        let mode = this._self._root._router.mode;
        let to = mode === "hash"? "#" + this.to : this.to
        return h('a',{attrs:{href:to}},this.$slots.default)
      }
    })


  }

  constructor(props) {
    this.mode = props.mode || 'hash';


    this.routes = props.routes || [];

    // 转化为 key, value
    this.routesMap = this.createApp(this.routes);

    this.history = new HistoryRoute();


    // 当前路由初始化
    this.init();

    console.log('路由映射', this.routesMap)
  }

  createApp(routes) {
    return routes.reduce((pre,current)=>{
      pre[current.path] = current.component
      return pre;
    },{})
  }

  init() {
    if (this.mode === 'hash') {
      location.hash ? '' : location.hash = '#/';
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1);
      })
      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1);
      })
    } else if(this.mode === 'history') {
      location.pathname? '' : location.pathname = "/";

      window.addEventListener('load',() => {
        this.history.current = location.pathname
        console.log(1);
      })
      window.addEventListener("popstate",() => {
        this.history.current = location.pathname
      })
    }
  }
}


export default Myrouter;
