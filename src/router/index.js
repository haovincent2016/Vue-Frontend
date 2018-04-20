import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import Locate from '@/pages/Location'
import Cities from '@/pages/Cities'
import Discover from '@/pages/Discover'
import Account from '@/pages/Account'
import Order from '@/pages/Order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cities',
      name: 'Cities',
      component: Cities
    },
    {
      path: '/location',
      name: 'Location',
      component: Locate
    },
    {
      path: '/discover',
      name: 'Discover',
      component: Discover
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/shop/:id',
      name: 'Shop',
      component: Shop
    }
  ]
})
