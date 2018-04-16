import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/shop/1',
      name: 'Shop',
      component: Shop
    }
  ]
})
