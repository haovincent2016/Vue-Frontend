<template>
<div class="main-container">
  <div class="shop-header">
    <svg class="icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
    </svg>
    <span class="title">Nearby Shops</span>
  </div>
  <ul class="shop-list">
    <li class="shop">                                
      <router-link to="/shop/1" class="shop-link">
        <!-- shop avatar -->                                    
        <div class="shop-avatar">
          <img src="http://p0.meituan.net/0.84.63/xianfu/7da5e7e935053ddb8cbb8d662e80e4f337555.jpg.webp" class="j-poi-pic avatar-img">
        </div>                                    
        <!-- shop content -->
        <div class="shop-content">                                           
          <div class="shop-title">李先生加州牛肉面（北京清华照澜院店）</div>
          <!-- rating -->
          <!--
          <div class="appr-status">
            <i class="appr-score"></i>
            <i class="appr-score"></i>
            <i class="appr-score"></i>
            <i class="appr-score"></i>
            <i class="appr-score"></i>
          </div>
          -->
          <div class="shop-sale">月售999+<span class="shop-location">1.9km | 30min</span></div> 
          <!-- fee detail -->                                                                   
          <div class="shop-minimum">起送价 ￥20 | 配送 ¥5<span class="shop-delivery">美团专送</span></div> 
        </div>
      </router-link>                                 
    </li>
    <li class="shop">shop 2</li>
  </ul>
</div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
@import '../../assets/common';
.shop-header {
  box-shadow: 1px 1px 2px #ccc;
  border-radius: 1rem;
  margin: 2.5rem;
  padding: .5rem;
  .icon{
    fill: #999;
    @include wh(0.8rem, 0.8rem);
  }
  .title {
    text-align: left;
    color: #999;
  }
}
.shop-list {
  list-style: none;
  padding: 0;
  .shop {
    box-shadow: 1px 1px 2px #ccc;
    margin: .2rem 1.6rem;
    padding: 0.4rem 0.2rem 0.4rem 0;
    .shop-link {
      text-decoration: none;
      outline: none;
      color: #999;
      .shop-avatar {
        position: relative;
        float: left;
        width: 4.5rem;
        height: 3.5rem;
        margin-right: 0.5rem;
        margin-top: 0.2rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.3rem;
          border: 1px solid #eee;
        }
      }
      .shop-content {
        position: relative;
        .shop-title {
          font-size: 1rem;
          color: $grey;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .shop-sale {
          display: flex;
          justify-content: space-between;
          margin: .5rem 0;
          font-size: 0.7rem;
          color: #666;
           .shop-location {
            float: right;
            font-size: 0.7rem;
            color: #666;
          }
        }

        .shop-minimum {
          display: flex;
          justify-content: space-between;
          margin-top: .5rem;
          font-size: 0.7rem;
          color: #666;
          .shop-delivery {
            float: right;
            background-color: #FFD161;
            line-height: 1rem;
            padding: 0 0.5rem;
            font-size: 0.7rem;
            color: #333;
          }
        }
      }
    }
  }
}
</style>