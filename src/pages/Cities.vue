<template>
<div class="main-container">
  <!-- navigation header -->
  <nav-header go-back="true" show-title="my location"></nav-header>
  <!-- currently picked city -->
  <div class="current">
    <span>Your Location:</span>
    <span>If not correct, please pick bellow</span>
  </div>
  <div class="location" @click="goSearch">
    <span>Richmond</span>
    <span><i class="fas fa-chevron-right"></i></span>
  </div>
  <!-- list of popular cities -->
  <div class="popular">
    <div class="popular-title">Popular Cities</div>
    <ul class="popular-list">
      <li v-for="city in popular" :key="city.id" class="list-item">{{ city }}</li>
    </ul>
  </div>
  <!-- list of all cities based on alphabet -->
  <div class="cities">
    <div class="cities-title">All Cities <span>(ordered by alphabet)</span></div>
    <ul class="cities-list">
      <li class="list-item">
        <ul class="cities-details">
        </ul>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
import navHeader from '@/components/common/NavHeader'
export default {
  mounted() {
    this.getPopular()
  },
  data() {
    return {
      currentCity: '',
      currentId: '',
      popular: [],
      all: []
    }
  },
  methods: {
    getPopular() {
      this.popular = [
        'Richmond', 'Vancouver', 'Coquitlum', 'UBC'
      ]
    },
    goSearch() {
      this.$router.push({ name: "Location" })
    }
  },
  components: {
    navHeader
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/common';
.current, .location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
  padding: .5rem .6rem;
  border-bottom: 0.025rem solid #ededed;
}
.current {
  margin-top: 3.2rem;
}
.popular {
  margin-top: 0.8rem;
  .popular-title {
    text-align: center;
    font-size: 1.1rem;
    color: #444;
    padding: 0.2rem 0;
    margin: 2.5rem;
    box-shadow: 1px 1px 2px #ccc;
    border-radius: 1rem;
  }
  .popular-list {
    display: flex;
    flex-wrap: nowrap;
    margin: 0 .4rem;
    .list-item {
      flex: 1;
      border: 0.02rem solid #ededed;
      color: $blue;
      padding: .5rem 0;
    }
  }
}
.cities {
  .cities-title {
    text-align: center;
    font-size: 1.1rem;
    color: #444;
    padding: 0.2rem 0;
    margin: 2.5rem;
    box-shadow: 1px 1px 2px #ccc;
    border-radius: 1rem;
    span {
      font-size: 0.9rem;
    }
  }
  .cities-list {
    display: flex;
    flex-wrap: nowrap;
    margin: 0.8rem .4rem;
  }
}
</style>