import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
// 引入第三方图标库
import './assets/font/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
// 引入mock
require('./axios/mock')
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
