<template>
<div class="menus">
  <router-link :to="{name: 'Home'}" @click="selectMenu(1)" :class="{ active: selected === 1 }">
    <div class="menu-item">
      <i class="fas fa-shopping-cart"></i>
      <div class="menu-name">Stores</div>
    </div>
  </router-link>
  <router-link :to="{name: 'Discover'}" @click="selectMenu(2)" :class="{ active: selected === 2 }">
    <div class="menu-item"> 
      <i class="fas fa-search"></i>
      <div class="menu-name">Discover</div>
    </div>
  </router-link>
  <router-link :to="{name: 'Order'}" @click="selectMenu(3)" :class="{ active: selected === 3 }">
    <div class="menu-item"> 
      <i class="far fa-file-alt"></i>
      <div class="menu-name">Order</div>
    </div>
  </router-link>
  <router-link :to="{name: 'Account'}" @click="selectMenu(4)" :class="{ active: selected === 4 }">
    <div class="menu-item">
      <i class="far fa-user"></i>
      <div class="menu-name">Account</div>
    </div>
  </router-link>
</div>
</template>
<script>
export default {
  data() {
    return {
      selected: null
    }
  },
  methods: {
    selectMenu(id) {
      this.selected = id
    }
  }
}
</script>
<style lang="scss" scoped>
.menus {
  height: 3rem;
  background-color: #fff;
  box-shadow: 0 -0.025rem 0.055rem rgba(0,0,0,.1);
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  a {
    flex: 1;
    text-decoration: none;
    color: #666;
  }
  .router-link-exact-active {
    color: #26a2ff;
  }
}
.fas, .far {
  font-size: 15px;
}
.menu-name {
  font-size: 12px;
  margin-top: 5px;
}



</style>