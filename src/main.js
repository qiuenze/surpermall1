import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"

import toast from 'components/common/toast'
import FastClick from 'fastclick'

import VueLazyLoad from 'vue-lazyload'

//安装toast
Vue.use(toast)

FastClick.attach(document.body)

Vue.config.productionTip = false
//添加事件总线
Vue.prototype.$bus = new Vue

//路由懒加载
Vue.use(VueLazyLoad)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
