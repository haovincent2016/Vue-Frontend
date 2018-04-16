<template>
<div class="main-container">
  <!-- navigation header -->
  <!-- currently picked city -->
  <div class="current">
    <span></span>
    <span>if not correct, please pick city bellow</span>
  </div>
  <!-- list of popular cities -->
  <div class="popular">
    <div class="popular-title">Popular Cities</div>
    <ul class="popular-list">
      <li class="list-item"></li>
    </ul>
  </div>
  <!-- list of all cities based on alphabet -->
  <div class="cities">
    <div class="cities-title">All Cities</div>
    <ul class="cities-list">
      <li class="list-item">
        <div class="alphabet">
          <span>(ordered by alphabet)</span>
        </div>
        <ul class="cities-details">
          <router-link></router-link>
        </ul>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
export default {
  mounted() {

  },
  data() {
    return {
      currentCity: '',
      currentId: '',
      popular: [],
      all: []
    }
  },
}
</script>
<style>
</style>