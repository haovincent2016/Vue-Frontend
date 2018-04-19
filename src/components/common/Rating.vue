<template>
<div class="rating">
  <div class="star-container">
    <svg class="star-bg" v-for="num in 5" :key="num.id">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
    </svg>
  </div>
  <div class="star-overlay" :style="'width:' + ratingW + 'rem'">
    <div class="star-container">
      <svg class="star-color" v-for="num in 5" :key="num.id">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
      </svg>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  props: ['stars'],
  computed: {
    ratingW: function() {
      return this.stars * 2/5
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/common';
.rating {
  position: relative;
  width: 2rem;
  height: 0.4rem;
  float: right;
  .star-overlay{
    overflow: hidden;
    position: relative;
    height: 100%;
  }
}
.star-container{
  position: absolute;
  display: flex;
  width: 2rem;
  height: 0.4rem;
  top: 0;
  left: 0;
  .star-bg{
    fill: $lightgrey;
  }
  .star-color{
    fill: $yellow;
  }
}
</style>