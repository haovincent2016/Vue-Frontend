<template>
<div v-if="!loading" class="main-container">
  <!-- navigation bar -->
  <nav-header go-back="true" show-title="V's Cake"></nav-header>
  <!-- shop header -->
  <div class="header-wrapper" @click="toggleDetail">
    <shop-header />
  </div>
  <!-- shop tabs -->
  <div class="tabs" :class="{sticky: addSticky === true}">
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
  <!-- tab details 1: item list -->
  <div class="list" v-show="currentIndex === 1">
    <!-- menu section -->
    <section class="list-menu" id="menu-wrapper" ref="menuWrapper" :class="{'sticky-menu': addSticky === true}">
      <ul class="menu-wrapper">
        <li v-for="(item, index) in menu" :key="index" class="menu-item" :class="{isActive: index === menuIndex}" @click="selectMenu(index)">
          <span>{{ item.name }}</span>
          <span class="menu-number" v-if="menuNumber[index]">{{ menuNumber[index] }}</span>
        </li>
      </ul>
    </section>
    <!-- item list -->
    <section class="list-items" ref="menuList" :class="{'fix-list': addSticky === true}">
      <ul>
        <!-- all menu items -->
        <li v-for="(item, index) in menu" :key="index">
          <!-- menu part -->
          <div class="menu-header">
            <div class="header-title">{{ item.name }}</div>
            <div class="header-desc">{{ item.description }}</div>
          </div>
          <!-- foods per menu -->
          <div class="food-list" v-for="(food, foodIndex) in item.foods" :key="foodIndex">
            <div class="food-image">
              <img v-lazy="food.image">
            </div>
            <div class="food-desc">
              <div class="desc-name">{{ food.name }}</div>
              <div class="desc-content">{{ food.description }}</div>
              <div class="desc-sale" v-if="food.month_sales">sold<span class="highlight">{{ food.month_sales }}</span>items<i v-if="food.month_sales > 100" class="far fa-thumbs-up"></i></div>
              <div class="desc-rating" v-if="food.satisfy_rate && food.satisfy_rate > 50"><span class="positive">{{ food.satisfy_rate }}%</span>satisfied customers</div>
              <div class="desc-rating" v-if="food.satisfy_rate && food.satisfy_rate <= 50"><span class="negative">{{ food.satisfy_rate }}%</span>satisfied customers</div>
              <div class="food-price">${{ food.specs[0].price }}</div>
              <!-- per food item add/remove operations -->
              <cart 
                :shopId = 'shopId' 
                :food = 'food' 
                @showMovingDot = "movingDotFunc"
                @showSpecsPopup = "toggleSpecs"
              />
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
  <!-- tab detail 2: customer ratings -->
  <div class="comments" v-show="currentIndex === 2">
    <div class="rating-section">
      <div class="total-rating">
        <span class="total-score">4.5</span>
        <span class="total-desc">Overall</span>
      </div>
      <div class="other-rating">
        <span class="rating-item">Service:</span>
        <span class="rating-item">Food:</span>
        <span class="rating-item">Delivery:</span>
      </div>
      <div class="ratings">
        <span><rating-star stars="4.5"></rating-star></span>
        <span><rating-star stars="4.6"></rating-star></span>
        <span><rating-star stars="4.6"></rating-star></span>
      </div>
    </div>
    <div class="comment-section">
    </div>
  </div>
  <!-- shop header detail -->
  <transition name="show-popup">
    <div class="header-detail" v-if="showDetail">
      <div class="detail-title">Opening hours</div>
      <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="detail-cancel" @click="toggleDetail">
        <line x1="0" y1="0" x2="16" y2="16"  stroke="#666" stroke-width="1.2"/>
        <line x1="0" y1="16" x2="16" y2="0"  stroke="#666" stroke-width="1.2"/>
      </svg>
      <ul class="detail-content">
        <li class="detail-item" v-for="item in shopDetails.opening_hours" :key="item.id">
          {{ item }}
        </li>
      </ul> 
    </div>
  </transition>
  <!-- food specs selection popup -->
  <transition name="show-popup">
    <div class="specs-popup" v-if="showSpecs">
        <header class="popup-header">
          <div class="header-title">{{selectedFood.name}}</div>
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
              <span>${{selectedFood.specs[specsIndex].price * specsNumber}}</span>
            </div>
            <!-- add multiple food of certain specs -->
            <div class="specs-wrapper">
              <transition name="specs-decrease">
                <span v-if="specsNumber > 1" class="decrease-icon" @click="decreaseSpecsItem">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                  </svg>
                </span>
              </transition>
              <transition name="specs-number">
                  <span class="specs-number" v-if="specsNumber">{{ specsNumber }}</span>
              </transition>
              <span class="increase-icon">
                <svg @click="increaseSpecsItem">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                </svg>
              </span>
            </div>
            <div class="footer-add" @click="addSpecs(selectedFood.category_id, selectedFood.item_id, selectedFood.specs[specsIndex].specs_id, selectedFood.name, selectedFood.specs[specsIndex].name, selectedFood.specs[specsIndex].price, selectedFood.specs[specsIndex].sku, specsNumber)">
              <span>Add Cart</span>
            </div>
        </footer>
    </div>
  </transition>
  <!-- shopping cart, reset for different shops -->
  <div class="shop-cart" @click="toggleCartList">
    <div class="cart-icon-wrapper" :class="{'not-empty': totalNumber > 0, incart: receiveInCart}" ref="cartContainer">
      <span v-if="totalNumber" class="cart-items">{{ totalNumber }}</span>
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
            <div class="list-item-title">
              <span class="list-item-name">{{ item.name }}</span>
              <span class="list-item-specs">{{ item.specs }}</span>
            </div>
            <span class="list-item-price">${{ item.price * item.number }}</span>
            <span class="list-item-buttons">
              <svg @click="decreaseItem(item.category_id, item.item_id, item.specs_id, 1)">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
              </svg>
              <span class="list-item-number">{{ item.number }}</span>
              <svg @click="increaseItem(item.category_id, item.item_id, item.specs_id, item.name, item.specs, item.price, item.sku, 1)">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
  <!-- animation part -->
  <transition name="show-shadow">
    <div class="shadow" v-show="(showCartList && cartList.length)" @click="toggleCartList">
    </div>
  </transition>
  <transition name="show-shadow">
    <div class="shadow" v-show="showSpecs" @click="toggleSpecs">
    </div>
  </transition>
  <transition name="show-shadow">
    <div class="shadow" v-show="showDetail" @click="toggleDetail">
    </div>
  </transition>
  <transition
    appear
    @before-appear="beforeEnter"
    @after-appear="afterEnter"
    v-for="(item,index) in showMovingDot"
    :key="index"
    >
      <span class="moving-dot" v-if="item">
        <svg>
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
        </svg>
      </span>
  </transition>
</div>
<div v-else>
  <svg class="loading-screen">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop-loading"></use>
  </svg>
</div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import $ from 'jquery'
import navHeader from '@/components/common/NavHeader'
import cart from '@/components/common/Cart'
import ratingStar from '@/components/common/Rating'
import shopHeader from '@/components/ShopHeader'
import { menu } from '@/data/foods'
import { shop1 } from '@/data/shops'
export default {
  created() {
    this.shopId = 1
    this.getCart()
  },
  mounted() {
    this.windowHeight = window.innerHeight
    this.getData()
  },
  data() {
    return {
      //loading
      loading: true,
      //mock data
      menu: [],
      //shop
      shopId: null,
      shopDetails: null,
      loading: true,
      currentIndex: 1,
      //shop header
      showDetail: false,
      //cart
      cartList: [],
      showCartList: false,
      totalPrice: 0,
      //specs
      showSpecs: false,
      specsIndex: 0,
      selectedFood: null,
      specsNumber: 1,
      //moving dot
      receiveInCart: false,
      showMovingDot: [],
      elLeft: 0,
      elBottom: 0,
      windowHeight: null,
      //menu
      shopTop: [],
      menuNumber: [],
      menuIndex: 0,
      menuIndexChanged: true,
      listScroll: null,
      addSticky: false
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
    loading: function(val) {
      if(!val) {
        this.$nextTick(() => {
          this.getListHeight()
        })
      }
    },
    currentCart: function(val) {
      this.refreshCart()
    },
    cartList: function(val) {
      if(!val.length) {
        this.showCartList = false
      }
    },
    //reset specs number when change specs
    specsIndex: function(val) {
      this.specsNumber = 1
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
      this.shopDetails = shop1
      this.menu = menu
      this.loading = false
    },
    selectTab(index) {
      this.currentIndex = index
    },
    //shop header
    toggleDetail() {
      this.showDetail = !this.showDetail
    },
    //menu and food list
    getListHeight() {
      const container = this.$refs.menuList
      //<li> elements
      const subContainers = Array.from(container.children[0].children)
      subContainers.forEach((item, index) => {
        //first menu add (shop header height - tabs height = 100 - 34 = 66), so bigger
        if(index === 0) {
          this.shopTop[index] = item.offsetTop - 193
        } else {
          this.shopTop[index] = item.offsetTop - 127
        }
      })
      window.addEventListener('scroll', (e) => {
        //scroll more than shop header height
        if(window.scrollY > 99) {
          this.addSticky = true
        } else {
          this.addSticky = false
        }
        this.shopTop.forEach((item, index) => {
          if(window.scrollY >= item) {
            this.menuIndex = index
          }
        })
      })
    },
    
    selectMenu(index) {
      this.menuIndex = index
      $("html").animate({ scrollTop: this.shopTop[index] }, 400)
      
    },
    //cart
    toggleCartList() {
      this.cartList.length ? this.showCartList = !this.showCartList : true
    },
    emptyCart() {
      this.toggleCartList()
      this.CLEAR_CART(this.shopId)
    },
    increaseItem(category_id, item_id, specs_id, name, specs, price, sku, number) {
      this.ADD_CART({ shop_id: this.shopId, category_id, item_id, specs_id, name, specs, price, sku, number })
    },
    decreaseItem(category_id, item_id, specs_id, number) {
      this.REMOVE_CART({ shop_id: this.shopId, category_id, item_id, specs_id, number })
    },
    refreshCart() {
      let newArray = []
      let cartFoodNum = 0
      this.totalPrice = 0
      this.cartList = []
      this.menu.forEach((item, index) => {
        let category = item.foods[0].category_id
        //first food's category in each menu => all categories
        if(this.currentCart && this.currentCart[category]) {
          let num = 0
          Object.keys(this.currentCart[category]).forEach(itemid => {
            Object.keys(this.currentCart[category][itemid]).forEach(specsid => {
              let foodItem = this.currentCart[category][itemid][specsid]
              num += foodItem.number
              this.totalPrice += foodItem.number * foodItem.price
              if (foodItem.number > 0) {
                this.cartList[cartFoodNum] = {}
                this.cartList[cartFoodNum].category_id = category
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
      this.menuNumber = [...newArray]
    },
    //specs
    increaseSpecsItem() {
      this.specsNumber++;
    },
    decreaseSpecsItem() {
      if(this.specsNumber > 1) {
        this.specsNumber--;
      }
    },
    toggleSpecs(food) {
      if(food) {
        this.selectedFood = food
      }
      this.showSpecs = !this.showSpecs
      this.specsIndex = 0
      this.specsNumber = 1
    },
    selectSpecs(index) {
      this.specsIndex = index
    },
    addSpecs(category_id, item_id, specs_id, name, specs, price, sku, number) {
      this.ADD_CART({ shop_id: this.shopId, category_id, item_id, specs_id, name, specs, price, sku, number })
      this.toggleSpecs()
    },
    //moving dot (bug 1: when another item first added to cart no animation)
    listenInCart(){
      if(!this.receiveInCart) {
        this.receiveInCart = true
        this.$refs.cartContainer.addEventListener('animationend', () => {
          this.receiveInCart = false
        })
        this.$refs.cartContainer.addEventListener('webkitAnimationEnd', () => {
          this.receiveInCart = false
        })
      }
    },
    movingDotFunc(showMovingDot, elLeft, elBottom){
      this.showMovingDot = [...showMovingDot]
      this.elLeft = elLeft
      this.elBottom = elBottom
    },
    //dot transition event listeners
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
      //fix bug 1
      //reset before getting values from cart component
      this.showMovingDot = []
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
    navHeader,
    cart,
    shopHeader,
    ratingStar
  }
}
</script>
<style lang="scss" scoped>
/*
z-index
tabs: 70
shop-header: 60
navbar: 70
shadow: 80
specs-popup: 90
cart-detail: 90
shop-cart: 100
*/
@import '../assets/common';
@keyframes mymove {
  0%   { transform: scale(1) }
  25%  { transform: scale(.8) }
  50%  { transform: scale(1.1) }
  75%  { transform: scale(.9) }
  100% { transform: scale(1) }
}
@-moz-keyframes mymove {
  0%   { transform: scale(1) }
  25%  { transform: scale(.8) }
  50%  { transform: scale(1.1) }
  75%  { transform: scale(.9) }
  100% { transform: scale(1) }
}
@-webkit-keyframes mymove {
  0%   { transform: scale(1) }
  25%  { transform: scale(.8) }
  50%  { transform: scale(1.1) }
  75%  { transform: scale(.9) }
  100% { transform: scale(1) }
}
@-o-keyframes mymove {
  0%   { transform: scale(1) }
  25%  { transform: scale(.8) }
  50%  { transform: scale(1.1) }
  75%  { transform: scale(.9) }
  100% { transform: scale(1) }
}
.main-container {
  position: absolute;
  right: 0;
  left: 0;
  margin-top: -0.5rem;
}
.tabs {
  display: flex;
  border-bottom: 1px solid #eee;
  position: relative;
  width: 100%;
  height: 2.1rem;
  background: #fff;
  z-index: 70;
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
      padding-bottom: 0.5rem;
    }
  }
}
.sticky {
  position: fixed;
  top: 3.2rem;
}
.list {
  padding-bottom: 3.3rem;
  display: flex;
  .list-menu {
    width: 20%;
    .menu-wrapper {
      list-style: none;
      margin: 0;
      padding: 0;
      //height: 100vh;
      .menu-item {
        padding: 1.1rem .3rem;
        border-bottom: 0.025rem solid #ededed;
        box-sizing: border-box;
        position: relative;
        cursor: pointer;
        .menu-number {
          position: absolute;
          top: .15rem;
          right: .05rem;
          background-color: $orange;
          text-align: center;
          border-radius: 50%;
          border: 0.05rem solid $orange;
          min-width: 0.8rem;
          @include sc(.7rem, #fff);
          font-family: Tahoma, Arial;
        }
      }
      .isActive {
        border-left: 0.2rem solid #3190e8;
        background-color:#fff;
      }
    }
  }
  .sticky-menu {
    position: fixed;
    top: 5.3rem;
  }
  .list-items {
    width: 80%;
    //height: 100vh;
    ul {
      list-style: none;
      margin: 0;
      padding: 0 0 8rem 0;
      li {
        .menu-header {
          box-shadow: 1px 1px 2px #ccc;
          border-radius: 1rem;
          margin: 0.5rem 0.6rem;
          padding: .6rem 0.8rem;
          border-bottom: 1px solid #eee;
          .header-title {
            font-size: 1rem;
            color: #666;
            font-weight: 500;
            margin-right: .6rem;
            text-align: left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .header-desc {
            font-size: 0.8rem;
            color: $grey;
            text-align: left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .food-list {
          background-color: #fff;
          margin: 0.5rem 0.6rem;
          padding: .8rem;
          border-bottom: 1px solid #f8f8f8;
          box-shadow: 1px 1px 2px #ccc;
          .food-image {
            position: relative;
            float: left;
            width: 3.9rem;
            height: 3.9rem;
            margin-right: .6rem;
            img {
              width: 100%;
              height: 100%;
              border-radius: 0.3rem;
              border: 1px solid #eee;
            }
          }
          .food-desc {
            position: relative;
            margin-left: 4.5rem;
            .desc-name {
              position: relative;
              margin-right: 0.6rem;
              font-size: 1.1rem;
              color: #555;
              line-height: 1.2rem;
              text-align: left;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .desc-content {
              position: relative;
              margin-right: 0.6rem;
              font-size: 0.9rem;
              color: #999;
              margin-top: .4rem;
              margin-bottom: .4rem;
              line-height: 1rem;
              text-align: left;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
            .desc-sale {
              font-size: 0.8rem;
              color: $grey;
              margin-top: .4rem;
              display: flex;
              justify-content: flex-start;
              .highlight {
                color: #f60;
                margin: 0 0.2rem;
              }
              .far {
                margin-left: 0.35rem;
                margin-top: 0.1rem;
              }
            }
            .desc-rating {
              font-size: 0.8rem;
              color: $grey;
              margin-bottom: .4rem;
              display: flex;
              justify-content: flex-start;
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
              justify-content: flex-start;
            }
          }
        }
      }
    }
  }
  .fix-list {
    margin-left: 20%;
  }
}
.comments {
  padding: 0.4rem 3rem;
  border-bottom: 1px solid #eee;
  .rating-section {
    display: flex;
    height: 2.6rem;
    align-items: center;
    .total-rating {
      flex: 2;
      display: flex;
      flex-direction: column;
      font-size: 0.8rem;
      .total-score {
        color: $yellow;
        font-weight: 600;
        font-size: 1.3rem;
      }
    }
    .other-rating {
      flex: 1;
      display: flex;
      flex-direction: column;
      font-size: 0.8rem;
      .rating-itm {
      }
    }
    .ratings {
      flex: 1;
      display: flex;
      flex-direction: column;
      span {
        padding: .3rem 2rem .3rem 0;
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
  z-index: 100;
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
      background-color: $orange;
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
  .incart {
    animation: mymove .5s ease-in-out;
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
  z-index: 90;
  bottom: 0;
  left: 0;
  background-color: #fff;
  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem 1.2rem;
    background-color: $whitegrey;
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
    margin-bottom: .9rem;
    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .5rem 1.2rem;
      .list-item-title {
        display: flex;
        flex-direction: column;
        color: #666;
        font-weight: 600;
        width: 25vw;
        .list-item-name {
          font-size: 0.8rem;
          color: #666;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .list-item-specs {
          font-size: 0.6rem;
          color: #666;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
        }
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
.header-detail {
  position: fixed;
  top: 35%;
  left: 15%;
  width: 70%;
  background-color: #fff;
  color: $grey;
  z-index: 90;
  border: 1px;
  border-radius: 0.3rem;
  .detail-title {
    @include sc(1.1rem, #333);
    font-weight: normal;
    text-align: center;
    display: flex;
    align-items: center;
    height: 2.2rem;
    justify-content: center;
  }
  .detail-cancel {
    position: absolute;
    right: .5rem;
    top: .6rem;
  }
  .detail-content {
    text-align: center;
    list-style: none;
    padding: 0;
    margin-bottom: 0;
    .detail-item:nth-child(odd) {
      background: $whitegrey;
      padding: 0.1rem 0;
      margin: 0.1rem;
    }
    .detail-item:nth-child(even) {
      background: #fff;
      padding: 0.1rem 0;
      margin: 0.1rem;
    }
  }
}
.specs-popup {
  position: fixed;
  top: 35%;
  left: 15%;
  width: 70%;
  background-color: #fff;
  z-index: 90;
  border: 1px;
  border-radius: 0.3rem;
  //box-shadow: 1px 1px 2px #ccc;
  .popup-header {
    .header-title {
      @include sc(1rem, #222);
      margin: .5rem;
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
    margin: 1rem 0;
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
        cursor: pointer;
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
    background-color: $whitegrey;
    padding: 0.4rem;
    border: 1px;
    border-bottom-left-radius: .2rem;
    border-bottom-right-radius: .2rem;
    .footer-price {
      color: #ff6000;
      font-size: .9rem;
      font-family: Helvetica Neue,Tahoma;
    }
    .specs-wrapper{
      margin-top: .4rem;
      .decrease-icon {
        svg{
          @include wh(1.3rem, 1.3rem);
          fill: #3190e8;
        }
      }
      .specs-number{
        @include sc(.9rem, #666);
        text-align: center;
        font-family: Tahoma;
        vertical-align: top;
      }
      .increase-icon {
        margin-left: .2rem;
        svg{
          @include wh(1.3rem, 1.3rem);
          fill: #3190e8;
        }
      }
    }
    .footer-add {
      @include wh(4rem, 1.5rem);
      background-color: $blue;
      border: 1px;
      border-radius: 0.15rem;
      @include sc(.7rem, #fff);
      text-align: center;
      line-height: 1.5rem;
      cursor: pointer;
    }
  }
}
.shadow {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.3);
  z-index: 80;
}
.moving-dot {
  position: fixed;
  bottom: 1.9rem;
  left: 1.9rem;
  svg {
    @include wh(.9rem, .9rem);
    fill: #3190e8;
  }
}
.loading-screen {
  position: absolute;
  height: 100%;
  width: 100%;
  top: -2rem;
  left: 0;
}
.show-popup-enter-active, .show-popup-leave-active {
  transition: all .3s;
}
.show-popup-enter, .show-popup-leave-to {
  opacity: 0;
  transform: scale(.7);
}

.show-shadow-enter-active, .show-shadow-leave-active {
  transition: opacity .5s;
}
.show-shadow-enter, .show-shadow-leave-to {
  opacity: 0;
}

.fade-choose-enter-active, .fade-choose-leave-active {
  transition: opacity .5s;
}
.fade-choose-leave, .fade-choose-leave-to {
  display: none;
}
.fade-choose-enter, .fade-choose-leave-to {
  opacity: 0;
}

.specs-decrease-enter-active, .specs-decrease-leave-active {
  transition: all .3s ease-out;
}
.specs-decrease-enter, .specs-decrease-leave-to {
  opacity: 0;
  transform: translateX(1rem);
}
.specs-number-enter-active, .specs-number-leave-active {
  transition: all .3s;
}
.specs-number-enter, .specs-number-leave-to {
  opacity: 0;
}
</style>