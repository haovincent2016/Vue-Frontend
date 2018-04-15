import { ADD_CART, REMOVE_CART, CLEAR_CART, GET_CART } from './mutation-types'

export default {
  //get data from localstorage
  [GET_CART](state) {
    let cart = window.localStorage.getItem('cart')
    if(cart) {
      state.cartItems = JSON.parse(cart)
    }
  },
  //add item to shopping cart by 1
  //all cart items --(shop_id)--> all shop's items --(category_id)--> shop's items of category --(item_id)--> specific item --(specs_id)--> item specs
  //name -> item name, specs -> specs name, price -> specs price ->, sku -> specs sku
  [ADD_CART](state, { shop_id, category_id, item_id, specs_id, name, specs, price, sku }) {
    let items = state.cartItems
    let shop = items[shop_id] = (items[shop_id] || {})
    let category = shop[category_id] = (shop[category_id] || {})
    let food = category[item_id] = (category[item_id] || {})
    if(food[specs_id]) {
      food[specs_id]['number']++;
    } else {
      food[specs_id] = {
        "specs_id" : specs_id,
        "number" : 1,
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
  [REMOVE_CART](state, { shop_id, category_id, item_id, specs_id }) {
    let items = state.cartItems
    let shop = (items[shop_id] || {})
    let category = (shop[category_id] || {})
    let food = (category[item_id] || {})
    if(food && food[specs_id]) {
      if(food[specs_id]['number'] > 0) {
        food[specs_id]['number']--;
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
  }
}