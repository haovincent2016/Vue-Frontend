<template>
<div>
  <nav-header>
    <router-link to="/search" class="search-field">
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <circle cx="8" cy="8" r="7" stroke="rgb(153,153,153)" stroke-width="1" fill="none"/>
        <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(153,153,153);stroke-width:2"/>
      </svg>
      <span>Search restaurant</span>
    </router-link>
  </nav-header>
  <banner />
  <category />
  <nav-footer />
</div>
</template>
<script>
import navHeader from '@/components/common/NavHeader'
import navFooter from '@/components/common/NavFooter'
import Banner from '@/components/Banner'
import Category from '@/components/Category'
export default {
  components: {
    navHeader,
    navFooter,
    Banner,
    Category
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/common';
.search-field {
  display: flex;
  height: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background: #fff;
  color: $grey;
  font-size: 1.1rem;
  margin: 0.6rem 1rem;
  text-decoration: none;
}
</style>