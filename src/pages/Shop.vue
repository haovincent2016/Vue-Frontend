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
        <li v-for="(item, index) in menu" :key="index">
          <div class="food-list" v-for="(food, foodIndex) in item.foods" :key="foodIndex">
            <div class="food-image">
              <img :src="food.image" >
            </div>
            <div class="food-desc">
              <p class="desc-name">{{ food.name }}</p>
              <p class="desc-content">{{ food.description }}</p>
              <p class="desc-rating">
                <span v-if="food.month_sales">sold {{ food.month_sales }} items</span>
                <span v-if="food.month_sales">{{ food.satisfy_rate }}% satisfied customers</span>
              </p>
              <strong class="food-price">
              <span>${{ food.specs[0].price }}</span>
              </strong>
              <!-- per food cart operations -->
              <cart 
                :shopId = 'shopId' 
                :food = 'food' 
                @showMovingDot = "showMovingDotFunc"
              />
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
  <!-- shopping cart, reset for different shops -->
  <div class="shop-cart" @click="toggleCartList">
    <div class="cart-icon-wrapper">
      <span class="cart-items">{{ totalNumber }}</span>
      <svg class="cart-icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
      </svg>
    </div>
    <div class="cart-price">
      <span>${{ totalPrice }}</span>
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
            <span class="list-item-price">{{ item.specs[0].price * item.number }}</span>
            <span class="list-item-buttons">
              <svg @click="decreaseItem(item.category_id, item.item_id, item.name, item.specs)">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
              </svg>
              <span class="list-item-number">{{ item.number }}</span>
              <svg @click="increaseItem(item.category_id, item.item_id, item.name, item.specs)">
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
import { foods } from '@/assets/mockdata'
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
      loading: true,
      currentIndex: 1,
      //food list
      menu: [],
      //cart
      cartList: [],
      showCartList: false,
      totalPrice: 0,
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
    increaseItem(category_id, item_id, name, specs) {
      this.ADD_CART({ shop_id: this.shopId, category_id, item_id, name, specs })
    },
    decreaseItem(category_id, item_id, name, specs) {
      this.REMOVE_CART({ shop_id: this.shopId, category_id, item_id, name, specs })
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
            let foodItem = this.currentCart[item.foods[0].category_id][itemid]
            num += foodItem.number
            this.totalPrice += foodItem.number * foodItem.price
            if (foodItem.number > 0) {
              this.cartList[cartFoodNum] = {}
              this.cartList[cartFoodNum].category_id = item.foods[0].category_id
              this.cartList[cartFoodNum].item_id = itemid
              this.cartList[cartFoodNum].number = foodItem.number
              this.cartList[cartFoodNum].price = foodItem.price
              this.cartList[cartFoodNum].name = foodItem.name
              this.cartList[cartFoodNum].specs = foodItem.specs
              cartFoodNum++
            }
          })
          newArray[index] = num
        } else {
          newArray[index] = 0
        }
      })
      //console.log(newArray, this.totalPrice)
      this.totalPrice = this.totalPrice.toFixed(2)
      //category number
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
      padding: .45rem 2rem;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      .header-title {
        font-size: 1.4rem;
        color: #666;
        font-weight: bold;
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
            padding: .3rem;
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
              line-height: 1.6rem;
              margin: 0rem;
              display: flex;
              align-items: start;
            }
            .desc-rating {
              line-height: 1.8rem;
              font-size: 1.5rem;
              color: #333;
              margin: 0rem;
              display: flex;
              align-items: start;
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
</style>