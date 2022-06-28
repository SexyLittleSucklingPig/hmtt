import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'amfe-flexible'
// import '@/styles/icon.less'
import 'vant/lib/index.less'
import '@/styles/index.less'
import MyIcon from '@/components/MyIcon.vue'
// import '@/styles/reset.less'
Vue.component('MyIcon', MyIcon)
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
