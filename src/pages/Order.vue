<template>
<div>
<nav-header go-back="true" show-title="order"></nav-header>
<nav-footer />
</div>
</template>
<script>
import navHeader from '@/components/common/NavHeader'
import navFooter from '@/components/common/NavFooter'
export default {
    components: {
        navHeader,
        navFooter
    }
}
</script>
<style>
</style>