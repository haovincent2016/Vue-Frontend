<template>
<div class="shop-header">
  <div class="img-wrapper">
    <img class="header-img" src="/static/shops/brand1.png">
  </div>
  <div class="title-wrapper">
    <span class="header-type">Brand</span>
    <span class="header-name">{{ shop.name }}</span>
    <!-- open modal -->
    <i class="fas fa-expand-arrows-alt"></i>
    <div class="info-wrapper">
      <span class="header-sale">sales: {{shop.sale}} | </span>
      <span class="header-delivery">{{shop.delivery}} |</span>
      <span class="header-time">about 50 min | </span>
      <span class="header-distance">2.2km</span>
    </div>
    <div class="header-notice">{{ shop.notice }}</div>
  </div>
</div>
</template>
<script>
import { shop1 } from '@/data/shops'
export default {
  mounted() {
    this.getShop()
  },
  data() {
    return {
      shop: {}
    }
  },
  methods: {
    getShop() {
      this.shop = shop1
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/common";
.shop-header {
  padding: 1.5rem 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  text-align: center;
  margin-top: 3.2rem;
  height: 3.2rem;
  z-index: 60;
  .img-wrapper {
    .header-img {
      width: 2.3rem;
      height: 2.3rem;
      border-radius: .5rem;
      box-shadow: 0 0 0.4rem 0 rgba(0,0,0,.2);
    }
  }
  .title-wrapper {
    max-height: 3.75rem;
    .header-type {
      border-radius: .2rem;
      background-image: linear-gradient(90deg,#fff100,#ffe339);
      color: #6a3709;
      font-style: normal;
      font-weight: 700;
      font-size: .7rem;
      padding: .15rem;
    }
    .header-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: .9rem;
    }
    .fas {
      font-size: .6rem;
    }
    .info-wrapper {
      font-size: .8rem;
      margin-top: .3rem;
    }
    .header-notice {
      font-size: .7rem;
      font-weight: 400;
      color: $grey;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: .3rem;
      padding: 0 .6rem;
      
    }
  }
}
</style>