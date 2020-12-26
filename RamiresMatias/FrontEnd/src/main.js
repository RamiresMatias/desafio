import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/router.js'
import './plugins/axios.js'


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,

  render: h => h(App)
}).$mount('#app')
