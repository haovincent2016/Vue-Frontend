import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters' 
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  //user info
  userInfo: {},
  //is user login
  isLogin: false,
  //shop id
  shop: null,
  //cart id
  cart: null,
  //all items added to cart
  cartItems: {},
  //user location
  location: '',
  //location search history
  locationHistory: []
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
	actions
})