<template>
<div class="categories">
  <mt-swipe :auto="0">
    <mt-swipe-item>
      <router-link v-for="category in oneCategories" :to="category.link" :key="category.id">
        <div class="container">
          <img :src="category.source" :alt="category.name">
          <span class="title">{{ category.name }}</span>
        </div>
      </router-link>
    </mt-swipe-item>
    <mt-swipe-item>
      <router-link v-for="category in twoCategories" :to="category.link" :key="category.id">
        <div class="container">
          <img :src="category.source" :alt="category.name">
          <span class="title">{{ category.name }}</span>
        </div>
      </router-link>
    </mt-swipe-item>
  </mt-swipe>
</div>
</template>
<script>
import { baseUrl } from '@/config'
export default {
  data() {
    return {
      categories: [
        {name: 'Food', source: baseUrl+'static/categories/1.jpeg', link: '', page: 'one'},
        {name: 'Store', source: baseUrl+'static/categories/2.jpeg', link: '', page: 'one'},
        {name: 'Vege', source: baseUrl+'static/categories/3.jpeg', link: '', page: 'one'},
        {name: 'Coffee', source: baseUrl+'static/categories/4.jpeg', link: '', page: 'one'},
        {name: 'Med', source: baseUrl+'static/categories/5.jpeg', link: '', page: 'one'},
        {name: '50%Off', source: baseUrl+'static/categories/6.jpeg', link: '', page: 'one'},
        {name: 'Flower', source: baseUrl+'static/categories/7.jpeg', link: '', page: 'one'},
        {name: 'Hotpot', source: baseUrl+'static/categories/8.jpeg', link: '', page: 'one'},
        {name: 'Special', source: baseUrl+'static/categories/9.jpeg', link: '', page: 'two'},
        {name: 'Pizza', source: baseUrl+'static/categories/10.jpeg', link: '', page: 'two'}
      ]
    }
  },
  computed: {
    oneCategories() {
      return this.categories.filter(category => { return category.page == 'one' })
    },
    twoCategories() {
      return this.categories.filter(category => { return category.page == 'two' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/common';
.categories {
  width: 100%;
  height: 14.5rem;
}
.container {
  position: relative;
  display: inline-block;
  width: 5rem;
  height: 5rem;
  img {
    width: 100%;
    height: 100%;
  }
  .title {
    font-size: 0.9rem;
    color: $grey;
  }
}
</style>

