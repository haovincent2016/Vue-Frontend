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
  <!-- tab details -->
  <!-- shop cart, reset for different shops -->
  <div class="shop-cart">
    <div class="cart-icon-wrapper">
      <span class="cart-items">1</span>
      <svg class="cart-icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
      </svg>
    </div>
  </div>
  <div class="cart-detail">
  </div>
</div>
</template>
<script>
import shopHeader from '@/components/ShopHeader'
export default {
  data() {
    return {
      currentIndex: 1
    }
  },
  methods: {
    selectTab(index) {
      this.currentIndex = index
    }
  },
  components: {
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
.shop-cart {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
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
</style>