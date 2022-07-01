import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'amfe-flexible'
import 'vant/lib/index.less'
import '@/styles/index.less'
import MyIcon from '@/components/MyIcon.vue'
import * as obj from './fiters' // 引入全局过滤器到obj 对象
Object.keys(obj).forEach((key) => { //
  Vue.filter(key, obj[key])
})
Vue.component('MyIcon', MyIcon)
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
