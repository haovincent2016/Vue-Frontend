<template>
<mt-tabbar v-model="selected" fixed>
  <mt-tab-item id="tab1">
    <i class="fas fa-shopping-cart" :class="{ active: selected === 'tab1' }"></i>
    <div class="tab-name">Stores</div>
  </mt-tab-item>
  <mt-tab-item id="tab2">
    <i class="fas fa-search" :class="{ active: selected === 'tab2' }"></i>
    <div class="tab-name">Search</div>
  </mt-tab-item>
  <mt-tab-item id="tab3">
    <i class="far fa-file-alt" :class="{ active: selected === 'tab3' }"></i>
    <div class="tab-name">Order</div>
  </mt-tab-item>
  <mt-tab-item id="tab4">
    <i class="far fa-user" :class="{ active: selected === 'tab4' }"></i>
    <div class="tab-name">Account</div>
  </mt-tab-item>
</mt-tabbar>
</template>
<script>
export default {
  data() {
    return {
      selected: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.mint-tabbar {
  height: 3rem;
  background-color: #fff;
  box-shadow: 0 -0.025rem 0.055rem rgba(0,0,0,.1);
}
.fas, .far {
  font-size: 15px;
  color: lightgrey;
}
.tab-name {
  font-size: 12px;
  margin-top: 5px;
}
.active {
  color: #26a2ff;
}
</style>