<template>
<div class="wrapper">
    <slot class="search"></slot>
    <div class="content">
      <span class="back" v-if="goBack">
        <i class="fas fa-chevron-left" @click="$router.go(-1)"></i>
      </span>
      <span class="title" v-if="showTitle">
        {{ showTitle }}
      </span>
      <span class="right">
      </span>
    </div>
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
  z-index: 70;
  left: 0;
  top: 0;
  @include wh(100%, 3.2rem);
  .content { 
    display: flex;
    align-items: center;
    height: 100%;
    .back {
      flex: 1;
      .fas {
        color: #fff;
        font-size: 1.4rem;
        padding: 0.4rem;
        margin-left: 1.2rem;
      }
    }
    .title {
      flex: 4;
      font-size: 1.1rem;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .right {
      flex: 1;
    }
  }
}
</style>