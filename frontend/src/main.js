import Vue from 'vue'
import App from './App.vue'
import router from './router'
import jQuery from 'jquery';
import store from '@/store.js'

window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false

Vue.prototype.$store = store

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
