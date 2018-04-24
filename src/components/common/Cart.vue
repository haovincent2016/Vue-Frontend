<template>
<!-- if no specs to choose, only default one -->
<div class="cart-wrapper" v-if="food.specs.length === 1">
  <transition name="show-decrease">
    <span v-if="foodNumber" class="decrease-icon" @click="decreaseItem(food.category_id, food.item_id, food.specs[0].specs_id, 1)">
      <svg>
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
      </svg>
    </span>
  </transition>
  <transition name="show-number">
      <span class="food-number" v-if="foodNumber">{{ foodNumber }}</span>
  </transition>
  <span class="increase-icon">
    <svg @click="increaseItem(food.category_id, food.item_id, food.specs[0].specs_id, food.name, food.specs[0].name, food.specs[0].price, food.specs[0].sku, 1, $event)">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
    </svg>
  </span>
</div>
<!-- choose specifications -->
<div class="specs-wrapper" v-else>
  <span class="choose-specs" @click="chooseSpecs()">Specs</span>
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
        Object.values(this.shopCart[category_id][item_id]).forEach((item) => {
          num += item.number
        })
        return num
      } else {
        return 0
      }
    }
  },
  props:['food', 'shopId'],
  methods: {
    ...mapMutations([
      'ADD_CART','REMOVE_CART',
    ]),
    decreaseItem(category_id, item_id, specs_id, number){
      if (this.foodNumber > 0) {
        this.REMOVE_CART({shop_id: this.shopId, category_id, item_id, specs_id, number})
      }
    },
    increaseItem(category_id, item_id, specs_id, name, specs, price, sku, number, event){
      this.ADD_CART({shop_id: this.shopId, category_id, item_id, specs_id, name, specs, price, sku, number})
      let elLeft = event.target.getBoundingClientRect().left
      let elBottom = event.target.getBoundingClientRect().bottom
      this.showMovingDot.push(true)
      console.log(this.showMovingDot)
      //console.log(this.showMovingDot)
      //pass add cart svg left and bottom position to it.
      this.$emit('showMovingDot', this.showMovingDot, elLeft, elBottom)
    },
    chooseSpecs() {
      this.$emit('showSpecsPopup', this.food)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/common';
.cart-wrapper{
  position: absolute;
  right: 0;
  bottom: -0.3rem;
  .food-number{
    @include sc(.9rem, #666);
    text-align: center;
    font-family: Tahoma;
    vertical-align: top;
  }
}
.specs-wrapper {
  position: absolute;
  right: 0;
  bottom: 0.15rem;
  .choose-specs {
    @include sc(.8rem, #fff);
    padding: .1rem .2rem;
    background-color: $blue;
    border-radius: 0.2rem;
    border: 1px solid $blue;
    margin-top: -.1rem;
    margin-left: .2rem;
    cursor: pointer;
  }
  .food-number{
    @include sc(.9rem, #666);
    text-align: center;
    font-family: Tahoma;
    vertical-align: middle;
  }
}

svg{
  @include wh(1.3rem, 1.3rem);
  fill: #3190e8;
}
.increase-icon{
  margin-left: .2rem;
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
</style>

