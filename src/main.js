// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import { Swipe, SwipeItem } from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'
import * as VueGoogleMaps from 'vue2-google-maps'
import BaiduMap from 'vue-baidu-map'
import 'mint-ui/lib/style.css'

/*
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body, {
      excludedNode: '^pac-'
    })
  }, false)
}
*/

Vue.use(Vuelidate)
Vue.use(VueLazyload, {
  preload: 1.3,
  error: '/h5/static/error.png',
  loading: '/h5/static/loading.gif',
  attempt: 2
})
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA88ghj7UuFc7SGr64Hotd-zYJQDihvnlE',
    libraries: 'places'
  }
})



Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
