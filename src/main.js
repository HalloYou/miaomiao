import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'
Vue.component('Scroller', Scroller)
Vue.component('Loading', Loading)

import axios from 'axios'
Vue.prototype.axios = axios;

Vue.filter('setWH', (url, arg) => {
  return url.replace(/w\.h/, arg)
})
Vue.filter('timestampToTime', (timestamp) => {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D =
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var s =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + M + D;
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
