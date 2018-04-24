<template>
<div class="banner">
  <mt-swipe :auto="8000">
    <mt-swipe-item v-for="banner in banners" :key="banner.id">
      <img :src="banner.source" :alt="banner.name">
    </mt-swipe-item>
  </mt-swipe>
</div>
</template>
<script>
import { baseUrl } from '@/config'
export default {
  data() {
    return {
      banners: [
        {name: 'first banner', source: baseUrl + 'static/banners/1.jpeg'},
        {name: 'second banner', source: baseUrl + 'static/banners/2.jpeg'}
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.banner {
  margin-top: 50px;
  width: 100%;
  height: 6.5rem;
}
img {
  width: 100%;
  height: 100%;
}
</style>