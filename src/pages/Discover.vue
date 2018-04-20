<template>
<div>
<nav-header go-back="true" show-title="discover"></nav-header>
<nav-footer />
</div>
</template>
<script>
import navHeader from '@/components/common/NavHeader'
import navFooter from '@/components/common/NavFooter'
export default {
    components: {
        navFooter,
        navHeader
    }
}
</script>
<style>
</style>