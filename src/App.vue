<template>
  <div id="app">
    <router-view/>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import svgIcon from '@/components/common/svg'
export default {
  components: {
    svgIcon
  }
}
</script>

<style lang="scss">
@import './assets/global';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-left: -9px;
  margin-right: -9px;
}
</style>
