<template>
<div>
    <nav-header go-back="true" show-title="my account"></nav-header>
    <nav-footer />
    <div class="profile-section">
        <span class="profile-avatar">
            <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
            </svg>
        </span>
        <div class="profile-auth">
            <p class="profile-title">Login/Register</p>
            <p class="profile-info">
                <svg fill="#fff">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                </svg>
                <span>Check more after login</span>
            </p>
        </div>
        <span class="profile-arrow">
            <svg fill="#fff">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
        </span>
    </div>
    <div class="money-section">
        <a href="javascript:;" class="item">
            <p>
                <svg fill="#0098fb">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#profile-balance"></use>
                </svg>
            </p>
            <p class="index-3S6cZ">My Wallet</p>
        </a>
        <a href="javascript:;" class="item">
            <p>
                <svg fill="#ff5f3e">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#luckybag"></use>
                </svg>
            </p>
            <p class="index-3S6cZ">Red Packet</p>
        </a>
        <a href="javascript:;" class="item">
            <p>
                <svg fill="#6ac20b">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#profile-coins"></use>
                </svg>
            </p>
            <p class="index-3S6cZ">My Coin</p>
        </a>
    </div>
    <section class="profile-location">
        <a href="javascript:;" class="index-2MEEn">
            <aside class="location-icon">
                <svg fill="#4aa5f0">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#address"></use>
                </svg>
            </aside>
            <div class="location-title">
                My Location
                <span class="location-arrow">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </span>
            </div>
        </a>
    </section>
</div>
</template>
<script>
import navHeader from '@/components/common/NavHeader'
import navFooter from '../components/common/NavFooter'
export default {
    components: {
        navHeader,
        navFooter
    }
}
</script>
<style>
</style>