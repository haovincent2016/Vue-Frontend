<template>
<div class="wrapper">
    <slot class="search"></slot>
    <section class="back" v-if="goBack">
      <i class="fas fa-chevron-left" @click="$router.go(-1)"></i>
    </section>
    <section class="title" v-if="showTitle">
      <span class="title-text">{{ showTitle }}</span>
    </section>
</div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props: ['showTitle', 'goBack']
}
</script>
<style lang="scss" scoped>
@import '../../assets/common';
.wrapper {
  background-color: $blue;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  @include wh(100%, 3.2rem); 
  .back {
    display: flex;
    align-items: center;
    height: 100%;
    .fas {
      color: #fff;
      font-size: 1.4rem;
      padding: 0.4rem;
      margin-left: 1.2rem;
    }
  }
}
</style>