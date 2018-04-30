import { 
  ADD_CART, 
  REMOVE_CART, 
  CLEAR_CART, 
  GET_CART, 
  USER_LOCATION, 
  LOCATION_HISTORY,
  GET_LOCATION, 
  GET_LOCATIONS,
  DEL_HISTORY,
  EMPTY_HISTORY 
} from './mutation-types'

export default {
  //get data from localstorage
  [GET_CART](state) {
    let cart = window.localStorage.getItem('cart')
    if(cart) {
      state.cartItems = JSON.parse(cart)
    }
  },
  //add item to shopping cart by 1
  //1. all cart items --(shop_id)--> all shop's items --(category_id)--> shop's items of category --(item_id)--> specific item --(specs_id)--> item specs
  //2. name -> item name, specs -> specs name, price -> specs price ->, sku -> specs sku
  //3. let a = b[c] = (b[c] || {}), if b[c] exists, no change to property c of b. if not exist, assign {} to property c of b.
  //   so if item[shop_id] not exist, assign value {} to key shop_id, if exist, do nothing.
  [ADD_CART](state, { shop_id, category_id, item_id, specs_id, name, specs, price, sku, number }) {
    let items = state.cartItems
    let shop = items[shop_id] = (items[shop_id] || {})
    let category = shop[category_id] = (shop[category_id] || {})
    let food = category[item_id] = (category[item_id] || {})
    if(food[specs_id]) {
      food[specs_id]['number'] += number;
    } else {
      food[specs_id] = {
        "specs_id" : specs_id,
        "number" : number,
        "name" : name,
        "specs" : specs,
        "price" : price,
        "sku" : sku
      }
    }
    state.cartItems = { ...items }
    window.localStorage.setItem('cart', JSON.stringify(state.cartItems))
  },
  //remove item from shopping cart by 1
  [REMOVE_CART](state, { shop_id, category_id, item_id, specs_id, number }) {
    let items = state.cartItems
    let shop = (items[shop_id] || {})
    let category = (shop[category_id] || {})
    let food = (category[item_id] || {})
    if(food && food[specs_id]) {
      if(food[specs_id]['number'] > 0) {
        food[specs_id]['number'] -= number;
      } else {
        food[specs_id] = null;
      }
    }
    state.cartItems = { ...items }
    window.localStorage.setItem('cart', JSON.stringify(state.cartItems))
  },
  //clear all cart items of the shop
  [CLEAR_CART](state, shop_id) {
    state.cartItems[shop_id] = null
    state.cartItems = {...state.cartItems}
    window.localStorage.setItem('cart', JSON.stringify(state.cartItems))
  },


  //get user location from localstorage
  [GET_LOCATION](state) {
    let location = window.localStorage.getItem('location')
    if(location) {
      state.location = JSON.parse(location)
    }
  },
  //set user location
  [USER_LOCATION](state, location) {
    state.location = location
    window.localStorage.setItem('location', JSON.stringify(state.location))
  },
  //get location search history
  [GET_LOCATIONS](state) {
    let history = window.localStorage.getItem('location_history')
    if(history) {
      state.locationHistory = JSON.parse(history)
    }
  },
  //add location to search history
  [LOCATION_HISTORY](state, location) {
    state.locationHistory.push(location)
    window.localStorage.setItem('location_history', JSON.stringify(state.locationHistory))
  },
  //delete location from search history
  [DEL_HISTORY](state, index) {
    state.locationHistory.splice(index, 1)
    window.localStorage.setItem('location_history', JSON.stringify(state.locationHistory))
  },
  //
  [EMPTY_HISTORY](state, index) {
    state.locationHistory = []
    window.localStorage.setItem('location_history', state.locationHistory)
  }
}