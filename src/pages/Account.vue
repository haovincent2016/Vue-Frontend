<template>
<div class="account-wrapper">
  <nav-header go-back="true" show-title="my account"></nav-header>
  <nav-footer />
  <div class="profile-section">
    <span class="profile-avatar">
      <svg>
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
      </svg>
    </span>
    <span class="profile-auth">
      <p class="profile-title">Login/Register</p>
      <p class="profile-info">
        <svg fill="#fff">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
        </svg>
        <span>Check more after login</span>
      </p>
    </span>
    <span class="profile-arrow">
      <svg fill="#fff">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
      </svg>
    </span>
  </div>
  <div class="money-section">
    <a href="javascript:;" class="item">
      <svg fill="#0098fb">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#profile-balance"></use>
      </svg>
      <p class="title">My Wallet</p>
    </a>
    <a href="javascript:;" class="item">
      <svg fill="#ff5f3e">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lucky-bag"></use>
      </svg>
      <p class="title">Lucky Bag</p>
    </a>
    <a href="javascript:;" class="item">
      <svg fill="#6ac20b">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#profile-coins"></use>
      </svg>
      <p class="title">My Coin</p>
    </a>
  </div>
  <section class="profile-location">
    <a href="javascript:;" class="index-2MEEn">
      <aside class="location-icon">
        <svg fill="#4aa5f0">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#address"></use>
        </svg>
      </aside>
      <div class="location-wrapper">
        <span class="location-name">My Location</span>
        <span class="location-arrow">
          <svg fill="#666">
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
<style lang="scss" scoped>
.account-wrapper {
  background-color: #efefef;
}
.profile-section {
  display: flex;
  background-image: linear-gradient(90deg,#0af,#0085ff);
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-top: 3.2rem;
  padding: 0.6rem 0 3rem 1rem;
  .profile-avatar {
    flex: 1;
    svg {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
  .profile-auth {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .profile-title {
      font-size: 1.1rem;
      color: #fff;
    }
    .profile-info {
      span {
        color: #fff;
        font-size: .9rem;
      }
      svg {
        width: .8rem;
        height: .8rem;
      }
    }
  }
  .profile-arrow {
    flex: 1;
    svg {
      width: 1rem;
      height: 1rem;
    }
  }
}
.money-section {
  display: flex;
  flex-wrap: nowrap;
  padding: 0.8rem 0;
  background: #fff;
  .item {
    flex: 1;
    color: #666;
    text-decoration: none;
    svg {
      width: 2rem;
      height: 2rem;
    }
    .title {
      font-size: .8rem;
    }
  }
}
.profile-location {
  background: #fff;
  margin-top: 1rem;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  font-size: 1rem;
  a {
    display: flex;
    align-items: center;
    padding: .5rem 2rem;
    aside {
      margin-right: .4rem;
      svg {
        height: 1rem;
        width: 1rem;
        vertical-align: top;
      }
    }
    .location-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .location-arrow {
        svg {
          height: .9rem;
          width: .9rem;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>