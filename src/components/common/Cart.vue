<template>
<div class="cart-wrapper">
    <div class="cart-buttons">
        <transition name="show-decrease">
            <span v-if="foodNumber" @click="decreaseItem(food.category_id, food.item_id, food.name, food.specs)">
                <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                </svg>
            </span>
        </transition>
        <transition name="show-number">
            <span class="food-number" v-if="foodNumber">{{ foodNumber }}</span>
        </transition>
        <svg class="increase-icon" @touchstart="increaseItem(food.category_id, food.item_id, food.name, food.specs, $event)">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
        </svg>
    </div>
    <!-- choose specs -->

</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data(){
    return{
      showMovingDot: [], 
    }
  },
  computed: {
    ...mapState([
      'cartItems'
    ]),
    shopCart: function (){
      return Object.assign({},this.cartItems[this.shopId])
    },
    foodNumber: function (){
      let category_id = this.food.category_id
      let item_id = this.food.item_id
      if (this.shopCart && this.shopCart[category_id] && this.shopCart[category_id][item_id]) {
        let num = 0
        Object.values(this.shopCart[category_id][item_id]).forEach((item,index) => {
            num += item.num
        })
        return num
      }else {
        return 0
      }
    },
  },
  props:['food', 'shopId'],
  methods: {
    ...mapMutations([
      'ADD_CART','REMOVE_CART',
    ]),
    decreaseItem(category_id, item_id, name, specs){
      if (this.foodNumber > 0) {
        this.REMOVE_CART({shop_id: this.shopId, category_id, item_id, name, specs})
      }
    },
    increaseItem(category_id, item_id, name, specs, event){
      this.ADD_CART({shop_id: this.shopId, category_id, item_id, name, specs})
      let elLeft = event.target.getBoundingClientRect().left
      let elBottom = event.target.getBoundingClientRect().bottom
      this.showMovingDot.push(true)
      this.$emit('showMovingDot', this.showMovingDot, elLeft, elBottom)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/common';
.cart-wrapper{
  position: absolute;
  right: 2rem;
  bottom: 1.1rem;
  .increase-icon{
    position: relative;
    z-index: 300;
  }
  .cart-buttons{
    display: flex;
    align-items: center;
  }
  svg{
    @include wh(1.3rem, 1.3rem);
    fill: #3190e8;
  }
  .specs_reduce_icon{
    fill: #999;
  }
  .food-number{
    @include sc(.65rem, #666);
    min-width: 1rem;
    text-align: center;
    font-family: Helvetica Neue,Tahoma;
  }
 
}
.show-decrease-enter-active, .show-decrease-leave-active {
  transition: all .3s ease-out;
}
.show-decrease-enter, .show-decrease-leave-active {
  opacity: 0;
  transform: translateX(1rem);
}
.show-number-enter-active, .show-number-leave-active {
  transition: all .3s;
}
.show-number-enter, .show-number-leave-active {
  opacity: 0;
}
.fadeBounce-enter-active, .fadeBounce-leave-active {
  transition: all .3s;
}
.fadeBounce-enter, .fadeBounce-leave-active {
  opacity: 0;
  transform: scale(.7);
}
</style>

