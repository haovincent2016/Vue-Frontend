<template>
<div class="auth-wrapper">
  <nav-header go-back="true" show-title="login"></nav-header>
  <div class="auth-logo">
    <svg>
      <use xlink:href="#logo"></use>
    </svg>
    <div class="auth-option">
      <a @click="selected = 1" class="sms" :class="{ selected: selected === 1 }">
        SMS
      </a>
      <a @click="selected = 2" class="normal"  :class="{ selected: selected === 2 }">
        Password
      </a>
    </div>
  </div>
  <!-- sms login -->
  <form v-if="selected === 1">
    <section class="sms-mobile">
      <input type="tel" maxlength="11" placeholder="Mobile Number" v-model="mobile">
      <button :class="{ 'is-valid': mobile.length === 11 }" class="code">
        get code
      </button>
    </section>
    <section class="sms-code">
      <input type="tel" maxlength="8" placeholder="code" v-model="code">
    </section>
    <button class="submit-button">Login</button>
  </form>
  <!-- username/password login -->
  <form v-if="selected === 2">
    <section class="form-name">
      <input type="text" placeholder="Username">
    </section>
    <section class="form-password">
      <input v-if="mode" placeholder="Password" type="password">
      <input v-else placeholder="Password" type="text">
      <div class="switch-mode" @click="toggleMode" :class="{ highlight: !mode }">
        <div class="switch-button" :class="{ slide: !mode }"></div>
      </div>
    </section>
    <button class="submit">Login</button>
  </form>
  <a href="javascript:;" class="about-us">About Us</a>
</div>
</template>
<script>
import navHeader from '@/components/common/NavHeader'
export default {
  data() {
    return {
      selected: 1,
      mobile: '',
      code: '',
      mode: true
    }
  },
  methods: {
    toggleMode() {
      this.mode = !this.mode
    }
  },
  components: {
    navHeader
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/common";
.auth-wrapper {
  display: flex;
  flex-direction: column;
  width: 18rem;
  margin: auto;
  .auth-logo {
    svg {

    }
    .auth-option {
      margin-top: 2rem;
      margin-bottom: .2rem;
      a {
        margin: 0 .8rem;
        font-weight: 500;
        font-size: 1.1rem;
      }
      .selected {
        color: $blue;
        border-bottom: .1rem solid $blue;
      }
    } 
  }
  form {
    /* sms login */
    .sms-mobile, .sms-code {
      position: relative;
      margin-top: .8rem;
      height: 2.7rem;
      font-size: .9rem;
      background: #fff;
      input {
        width: 96%;
        height: 100%;
        padding-left: .6rem;
        border: 1px solid #ddd;
        border-radius: .5rem;
      }
      .code {
        display: inline-block;
        position: absolute;
        top: 19%;
        right: 3%;
        outline: none;
        border: none;
        background: #fff;
        color: #ccc;
        font-size: .9rem;
        padding: .4rem 0;
      }
      .is-valid {
        color: $blue;
      }
    }
    .submit-button {
      width: 100%;
      margin-top: 1.8rem;
      padding: .6rem 0;
      background: $green;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      border: none;
      outline: none;
      border-radius: .5rem;
    }
    /* password login */
    .form-name {
      position: relative;
      margin-top: .8rem;
      height: 2.7rem;
      font-size: .9rem;
      background: #fff;
      input {
        width: 96%;
        height: 100%;
        padding-left: .6rem;
        border: 1px solid #ddd;
        border-radius: .5rem;
      }
    }
    .form-password {
      position: relative;
      margin-top: .8rem;
      height: 2.7rem;
      font-size: .9rem;
      background: #fff;
      input {
        width: 96%;
        height: 100%;
        padding-left: .6rem;
        border: 1px solid #ddd;
        border-radius: .5rem;
      }
      .switch-mode {
        display: inline-block;
        position: absolute;
        padding-left: 6px;
        top: 33%;
        right: 3%;
        width: 36px;
        height: 15px;
        color: #999;
        font-size: 12px;
        border: 1px solid #ddd;
        border-radius: 16px;
        text-align: center;
        transition: background-color .3s,border-color .3s;
        .switch-button {
          position: absolute;
          left: -1px;
          top: -2px;
          width: 17px;
          height: 17px;
          border: 1px solid #ddd;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
        }
        .slide {
          transform: translateX(25px);
          transition: transform .4s;
        }
      }
      .highlight {
        background-color: $green;
      }
    }
    .submit {
      width: 100%;
      margin-top: 1.8rem;
      padding: .6rem 0;
      background: $green;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      border: none;
      outline: none;
      border-radius: .5rem;
    }
  }
  .about-us {
    margin-top: .8rem;
    font-size: .8rem;
  }
}
</style>