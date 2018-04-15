<template>
<div>
  <!-- shop header -->
  <shop-header />
  <!-- shop tabs -->
  <div class="tabs">
    <div class="tab-item" @click="selectTab(1)">
      <span class="tab-title" :class="{active: currentIndex === 1}">dishes</span>
    </div>
    <div class="tab-item" @click="selectTab(2)">
      <span class="tab-title" :class="{active: currentIndex === 2}">comments</span>
    </div>
    <div class="tab-item" @click="selectTab(3)">
      <span class="tab-title" :class="{active: currentIndex === 3}">seller</span>
    </div>
  </div>
  <!-- tab details 1: item list-->
  <div class="list" v-show="currentIndex === 1">
    <!-- menu section -->
    <section class="list-menu">
      <ul class="menu-wrapper">
        <li v-for="(item, index) in menu" :key="index" class="menu-item">
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </section>
    <!-- item list -->
    <section class="list-items">
      <div class="menu-header" v-if="currentIndex === 1">
        <strong class="header-title">Hot</strong>
        <span class="header-desc">hot cakes are here</span>
      </div>
      <ul>
        <!-- all menu items -->
        <li v-for="(item, index) in menu" :key="index">
          <!-- foods per menu -->
          <div class="food-list" v-for="(food, foodIndex) in item.foods" :key="foodIndex">
            <div class="food-image">
              <img :src="food.image" >
            </div>
            <div class="food-desc">
              <p class="desc-name">{{ food.name }}</p>
              <p class="desc-content">{{ food.description }}</p>
              <p class="desc-sale" v-if="food.month_sales">sold<span class="highlight">{{ food.month_sales }}</span>items<i v-if="food.month_sales > 100" class="far fa-thumbs-up"></i></p>
              <p class="desc-rating" v-if="food.satisfy_rate && food.satisfy_rate > 50"><span class="positive">{{ food.satisfy_rate }}%</span>satisfied customers</p>
              <p class="desc-rating" v-if="food.satisfy_rate && food.satisfy_rate <= 50"><span class="negative">{{ food.satisfy_rate }}%</span>satisfied customers</p>
              <strong class="food-price">
              <span>${{ food.specs[0].price }}</span>
              </strong>
              <!-- per food cart operations -->
              <cart 
                :shopId = 'shopId' 
                :food = 'food' 
                @showMovingDot = "showMovingDotFunc"
                @showSpecsPopup = "toggleSpecs"
              />
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
  <!-- food specs selection popup -->
  <transition name="show-popup">
    <div class="specs-popup" v-if="showSpecs">
        <header class="popup-header">
          <h4 class="header-title">{{selectedFood.name}}</h4>
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="header-cancel" @click="toggleSpecs">
              <line x1="0" y1="0" x2="16" y2="16"  stroke="#666" stroke-width="1.2"/>
              <line x1="0" y1="16" x2="16" y2="0"  stroke="#666" stroke-width="1.2"/>
          </svg>
        </header>
        <section class="popup-content">
          <ul>
            <li v-for="(item, itemIndex) in selectedFood.specs" 
              :class="{isSelected: itemIndex === specsIndex}" 
              @click="selectSpecs(itemIndex)"
              :key="itemIndex">
              <div class="conten-title">{{ item.name }}</div>
            </li>
          </ul>
        </section>
        <footer class="specs-footer">
            <div class="footer-price">
              <span>${{selectedFood.specs[specsIndex].price}}</span>
            </div>
            <div class="footer-add" @click="addSpecs(selectedFood.category_id, selectedFood.item_id, selectedFood.specs[specsIndex].specs_id, selectedFood.name, selectedFood.specs[specsIndex].name, selectedFood.specs[specsIndex].price, selectedFood.specs[specsIndex].sku)">
              <span>Add Cart</span>
            </div>
        </footer>
    </div>
  </transition>
  <!-- shopping cart, reset for different shops -->
  <div class="shop-cart" @click="toggleCartList">
    <div class="cart-icon-wrapper" :class="{'not-empty': totalNumber > 0}">
      <span class="cart-items">{{ totalNumber }}</span>
      <svg class="cart-icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
      </svg>
    </div>
    <div class="cart-price">
      <span>${{ totalPrice }}</span>
    </div>
    <div class="check-out" :class="{'checkout-highlight': minimumTotal <= 0}">
      <span v-if="minimumTotal > 0" class="checkout-notice">need ${{ minimumTotal }} more</span>
      <router-link v-else :to="{path: '/checkout'}" class="checkout-button">Checkout</router-link>
    </div>
  </div>
  <!-- shopping cart detail -->
  <div class="cart-detail" v-show="showCartList && cartList.length">
    <div class="detail-header">
      <div class="title">Shopping Cart</div>
      <div class="clear-operation" @click="emptyCart"><i class="far fa-trash-alt"></i>empty</div>
    </div>
    <transition name="show-cart">
      <div class="detail-list">
        <ul>
          <li v-for="(item, index) in cartList" :key="index" class="list-item">
            <span class="list-item-name">{{ item.name }}</span>
            <span class="list-item-price">${{ item.price * item.number }}</span>
            <span class="list-item-buttons">
              <svg @click="decreaseItem(item.category_id, item.item_id, item.specs_id)">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
              </svg>
              <span class="list-item-number">{{ item.number }}</span>
              <svg @click="increaseItem(item.category_id, item.item_id, item.specs_id, item.name, item.specs, item.price, item.sku)">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </transition>
    <transition name="show-shadow">
      <div class="shadow" v-show="showCartList && cartList.length" @click="toggleCartList">
      </div>
    </transition>
  </div>
</div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import cart from '@/components/common/Cart'
import shopHeader from '@/components/ShopHeader'
import { foods, shop } from '@/assets/mockdata'
export default {
  created() {
    this.shopId = 1
    this.getCart()
  },
  mounted() {
    this.getData()
  },
  data() {
    return {
      shopId: null,
      shopDetails: null,
      loading: true,
      currentIndex: 1,
      //food list
      menu: [],
      //cart
      cartList: [],
      showCartList: false,
      totalPrice: 0,
      //specs
      showSpecs: false,
      specsIndex: 0,
      selectedFood: null,
      //moving dot
      showMovingDot: []
    }
  },
  computed: {
    ...mapState([
      'cartItems'
    ]),
    //cart in current shop
    currentCart: function() {
      return {...this.cartItems[this.shopId]}
    },
    //cart item number
    totalNumber: function() {
      let num = 0;
      this.cartList.forEach(item => {
        num += item.number
      })
      return num
    },
    //minimum order total
    minimumTotal: function() {
      if(this.shopDetails) {
        return this.shopDetails.minimum_order_amount - this.totalPrice
      }
      return null
    }
  },
  watch: {
    currentCart: function(val) {
      this.refreshCart()
    },
    cartList: function(val) {
      if(!val.length) {
        this.showCartList = false
      }
    }
  },
  methods: {
    ...mapMutations([
      'ADD_CART', 'REMOVE_CART', 'CLEAR_CART', 'GET_CART'
    ]),
    getCart() {
      this.GET_CART()
    },
    getData() {
      this.menu = [
        {name: 'hot', description: 'hot items here', foods: foods}
      ]
      this.shopDetails = shop
    },
    selectTab(index) {
      this.currentIndex = index
    },
    //cart
    toggleCartList() {
      this.cartList.length ? this.showCartList = !this.showCartList : true
    },
    emptyCart() {
      this.toggleCartList()
      this.CLEAR_CART(this.shopId)
    },
    increaseItem(category_id, item_id, specs_id, name, specs, price, sku) {
      this.ADD_CART({ shop_id: this.shopId, category_id, item_id, specs_id, name, specs, price, sku })
    },
    decreaseItem(category_id, item_id, specs_id) {
      this.REMOVE_CART({ shop_id: this.shopId, category_id, item_id, specs_id })
    },
    refreshCart() {
      let newArray = []
      let cartFoodNum = 0
      this.totalPrice = 0
      this.cartList = []
      this.menu.forEach((item, index) => {
        if(this.currentCart && this.currentCart[item.foods[0].category_id]) {
          let num = 0
          Object.keys(this.currentCart[item.foods[0].category_id]).forEach(itemid => {
            Object.keys(this.currentCart[item.foods[0].category_id][itemid]).forEach(specsid => {
              let foodItem = this.currentCart[item.foods[0].category_id][itemid][specsid]
              num += foodItem.number
              this.totalPrice += foodItem.number * foodItem.price
              if (foodItem.number > 0) {
                this.cartList[cartFoodNum] = {}
                this.cartList[cartFoodNum].category_id = item.foods[0].category_id
                this.cartList[cartFoodNum].item_id = itemid
                this.cartList[cartFoodNum].specs_id = specsid
                this.cartList[cartFoodNum].number = foodItem.number
                this.cartList[cartFoodNum].name = foodItem.name
                this.cartList[cartFoodNum].specs = foodItem.specs
                this.cartList[cartFoodNum].price = foodItem.price
                this.cartList[cartFoodNum].sku = foodItem.sku
                cartFoodNum++
              }
            })
          })
          newArray[index] = num
        } else {
          newArray[index] = 0
        }
      })
      this.totalPrice = this.totalPrice.toFixed(2)
      //category number
    },
    //specs
    toggleSpecs(food) {
      if(food) {
        this.selectedFood = food
      }
      this.showSpecs = !this.showSpecs
      this.specsIndex = 0
    },
    selectSpecs(index) {
      this.specsIndex = index
    },
    addSpecs(category_id, item_id, specs_id, name, specs, price, sku) {
      this.ADD_CART({ shop_id: this.shopId, category_id, item_id, specs_id, name, specs, price, sku })
      this.toggleSpecs()
    },
    //moving dot
    listenInCart(){
      if (!this.receiveInCart) {
        this.receiveInCart = true
        this.$refs.cartContainer.addEventListener('animationend', () => {
            this.receiveInCart = false
        })
        this.$refs.cartContainer.addEventListener('webkitAnimationEnd', () => {
            this.receiveInCart = false
        })
      }
    },
    showMovingDotFunc(showMovingDot, elLeft, elBottom){
      this.showMovingDot = [...this.showMovingDot, ...showMovingDot]
      this.elLeft = elLeft
      this.elBottom = elBottom
    },
    beforeEnter(el){
      el.style.transform = `translate3d(0,${37 + this.elBottom - this.windowHeight}px,0)`
      el.children[0].style.transform = `translate3d(${this.elLeft - 30}px,0,0)`
      el.children[0].style.opacity = 0
    },
    afterEnter(el){
      el.style.transform = `translate3d(0,0,0)`
      el.children[0].style.transform = `translate3d(0,0,0)`
      el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)'
      el.children[0].style.transition = 'transform .55s linear';
      this.showMoveDot = this.showMoveDot.map(item => false)
      el.children[0].style.opacity = 1
      el.children[0].addEventListener('transitionend', () => {
          this.listenInCart()
      })
      el.children[0].addEventListener('webkitAnimationEnd', () => {
          this.listenInCart()
      })
    },
  },
  components: {
    cart,
    shopHeader
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/common';
.tabs {
  display: flex;
  border-bottom: 1px solid #eee;
  margin-top: -0.5rem;
  .tab-item {
    flex: 1;
    text-align: center;
    padding: 0.4rem 0;
    cursor: pointer;
    .tab-title {
      font-size: 1rem;
      vertical-align: middle;
    }
    .active {
      color: $blue;
      border-bottom: 2px solid $blue;
      padding-bottom: 0.4rem;
    }
  }
}
.list {
  padding-bottom: 3.3rem;
  display: flex;
  .list-menu {
    width: 20.5vw;
    .menu-wrapper {
      list-style: none;
      margin: 0;
      padding: 0;
      .menu-item {
        padding: .7rem .3rem;
        border-bottom: 0.025rem solid #ededed;
        box-sizing: border-box;
        position: relative;
        transform: translateZ(0);
      }
    }
  }
  .list-items {
    width: 79.5vw;
    .menu-header {
      padding: .6rem 2rem;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      .header-title {
        font-size: 1.1rem;
        color: #666;
        font-weight: 600;
        margin-right: .6rem;
      }
      .header-desc {
        font-size: 1.1rem;
        color: #999;
        text-overflow: ellipsis;
      }
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        .food-list {
          background-color: #fff;
          padding: .8rem 2rem;
          border-bottom: 1px solid #f8f8f8;
          position: relative;
          overflow: hidden;
          display: flex;
          .food-image {
            width: 3.2rem;
            height: 3.2rem;
            margin-right: .4rem;
            img {
              width: 100%;
              height: 100%;
              border-radius: 0.3rem;
            }
          }
          .food-desc {
            padding: 0 .3rem;
            .desc-name {
              font-size: 1.2rem;
              color: #333;
              margin: 0rem;
              display: flex;
              align-items: start;
            }
            .desc-content {
              font-size: 1rem;
              color: #999;
              line-height: 1.5rem;
              margin: 0rem;
              display: flex;
              align-items: start;
            }
            .desc-sale {
              line-height: 1.5rem;
              font-size: 0.8rem;
              color: #333;
              margin: 0rem;
              display: flex;
              align-items: start;
              .highlight {
                color: #f60;
                margin: 0 0.2rem;
              }
              .far {
                margin-left: 0.35rem;
                margin-top: 0.35rem;
              }
            }
            .desc-rating {
              line-height: 1.5rem;
              font-size: 0.8rem;
              color: #333;
              margin: 0rem;
              display: flex;
              align-items: start;
              .positive {
                color: #f60;
                margin-right: 0.2rem;
              }
              .negative {
                color: #26ad4e;
                margin-right: 0.2rem;
              }
            }
            .food-price {
              font-size: 1.2rem;
              margin-top: .3rem;
              color: #f60;
              display: flex;
              align-items: start;
            }
          }
        }
      }
    }
  }
}
.shop-cart {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: 30;
  @include wh(100%, 3.3rem);
  background-color: rgba(61,61,63,.9);
  .cart-icon-wrapper {
    position: absolute;
    padding: .6rem;
    background-color: #3d3d3f;
    border: .4rem solid #444;
    border-radius: 50%;
    left: 1rem;
    top: -1.2rem;
    cursor: pointer;
    .cart-icon {
      @include wh(1.6rem, 1.6rem);
    }
    .cart-items {
      position: absolute;
      top: -.3rem;
      right: -.5rem;
      background-color: #ff461d;
      line-height: 1.1rem;
      text-align: center;
      border-radius: 50%;
      min-width: 1.1rem;
      height: 1.1rem;
      @include sc(.7rem, #fff);
    }
  }
  .not-empty {
    background-color: $blue;
  }
  .cart-price {
    display: flex;
    font-size: 1.1rem;
    font-weight: bold;
    color: #fff;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .check-out {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #606060;
    @include wh(6.5rem, 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    .checkout-notice {
      color: #fff;
      font-size: 0.8rem;
    }
    .checkout-button {
      @include sc(1.1rem, #fff);
      text-decoration: none;
    }
  }
  .checkout-highlight {
    background-color: $blue;
  }
}
.cart-detail {
  position: fixed;
  width: 100%;
  padding-bottom: 3.3rem;
  z-index: 20;
  bottom: 0;
  left: 0;
  background-color: #fff;
  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem 1.2rem;
    background-color: #eceff1;
    .title {
      font-size: 1rem;
      color: #666;
    }
    .clear-operation {
      font-size: 0.9rem;
      color: #666;
      .far {
        margin-right: .2rem;
      }
    }
  }
}
.detail-list {
  background-color: #fff;
  max-height: 20rem;
  overflow-y: auto;
  ul {
    list-style: none;
    padding: 0;
    .list-item {
      display: flex;
      justify-content: space-between;
      padding: .5rem 1.2rem;
      .list-item-name {
        display: flex;
        font-size: 0.9rem;
        color: #666;
        font-weight: 600;
        width: 45vw;
        text-overflow: ellipsis;
      }
      .list-item-price {
        font-size: 0.8rem;
        color: #f60;
        font-weight: 600;
      }
      .list-item-buttons {
        display: flex;
        align-items: center;
        svg {
          width: 1.3rem;
          height: 1.3rem;
          fill: #3190e8;
        }
        .list-item-number {
          font-size: 0.8rem;
          color: #666;
          text-align: center;
          margin: 0 .5rem 0 .3rem;
        }
      }
    }
  }
}
.specs-popup {
  position: fixed;
  top: 35%;
  left: 15%;
  width: 70%;
  background-color: #fff;
  z-index: 18;
  border: 1px;
  border-radius: 0.2rem;
  box-shadow: 1px 1px 2px #ccc;
  .popup-header {
    .header-title {
      @include sc(.9rem, #222);
      font-weight: normal;
      text-align: center;
    }
    .header-cancel {
      position: absolute;
      right: .5rem;
      top: .5rem;
    }
  }
  .popup-content {
    ul {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      list-style-type: none;
      padding: 0;
      li {
        font-size: .8rem;
        padding: .3rem .5rem;
        border: 0.04rem solid #ddd;
        border-radius: .2rem;
        margin-right: .5rem;
        margin-bottom: .2rem;
      }
      .isSelected {
          border-color: $blue;
          color: $blue;
      }
    }
  }
  .specs-footer {
    display: flex;
	  justify-content: space-between;
    align-items: center;
    background-color: #f9f9f9;
    padding: 0.5rem;
    border: 1px;
    border-bottom-left-radius: .2rem;
    border-bottom-right-radius: .2rem;
    .footer-price {
      color: #ff6000;
      font-size: .9rem;
      font-family: Helvetica Neue,Tahoma;
    }
    .footer-add {
      @include wh(4rem, 1.5rem);
      background-color: $blue;
      border: 1px;
      border-radius: 0.15rem;
      @include sc(.7rem, #fff);
      text-align: center;
      line-height: 1.5rem;
    }
  }
}
.show-popup-enter-active, .show-popup-leave-active {
  transition: all .3s;
}
.show-popup-enter, .show-popup-leave-active {
  opacity: 0;
  transform: scale(.7);
}
</style>