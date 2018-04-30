<template>
<div class="main-container">
  <!-- navigation header -->
  <nav-header go-back="true" show-title="my location"></nav-header>
  <!-- currently picked city -->
  <div class="current">
    <span>Your Location:</span>
    <span>If not correct, please pick from bellow</span>
  </div>
  <div class="location" @click="goSearch">
    <span>{{ address }}</span>
    <span><i class="fas fa-chevron-right"></i></span>
  </div>
  <!-- list of popular cities -->
  <div class="popular">
    <div class="popular-title">Popular Cities</div>
    <ul class="popular-list">
      <li v-for="city in popular" :key="city.id" class="list-item">{{ city }}</li>
    </ul>
  </div>
  <!-- list of all cities based on alphabet -->
  <div class="cities">
    <div class="cities-title">All Cities <span>(ordered by alphabet)</span></div>
    <ul class="cities-list">
      <li class="list-item" v-for="item in sortedall" :key="item.id">
        <div class="item-alphabet">{{ item | alpha }}</div>
        <ul class="item-details">
          <li v-for="city in item" :key="city.id" @click="goCity(city)">
            {{ city }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import navHeader from '@/components/common/NavHeader'
import { gmapApi } from 'vue2-google-maps'
import { Toast } from 'mint-ui'
export default {
  mounted() {
    this.getPopular()
    this.getAll()
    this.getInitial()
    //this.getLocation()
  },
  data() {
    return {
      popular: [],
      all: [],
      sortedall: {},
      address: ''
    }
  },
  computed: {
    ...mapState([
      'location'
    ]),
    google: gmapApi
  },
  filters: {
    alpha: function(val) {
      return val[0].charAt(0)
    }
  },
  methods: {
    ...mapMutations([
      'USER_LOCATION', 'GET_LOCATION'
    ]),
    getInitial() {
      this.GET_LOCATION()
      if(this.location) {
        this.address = this.location
      } else {
        this.getLocation()
      }
    },
    getPopular() {
      this.popular = [
        'Richmond', 'Vancouver', 'Coquitlum', 'UBC'
      ]
    },
    getAll() {
      this.all = [
        'Abbotsford', 'Armstrong', 'Burnaby', 'Campbell River', 'Castlegar', 'Chilliwack', 'Colwood', 'Coquitlam'
      ]
      this.all.forEach(item => {
        if(!this.sortedall[item.charAt(0)]) {
          this.sortedall[item.charAt(0)] = []
        } 
        this.sortedall[item.charAt(0)].push(item)
      })
      //console.log(this.sortedall)
    },
    goSearch() {
      let autoAddress
      if(this.address && this.address.split(',').length > 3) {
        autoAddress = this.address.split(',')[1].slice(1)
      } else if(this.address.split(',').length > 0) {
        autoAddress = this.address
      } else {
        autoAddress = ''
      }
      this.$router.push({ name: "Location", query: { city: autoAddress }})
    },
    goCity(city) {
      this.$router.push({ name: "Location", query: { city: city }})
    },
    getLocation() {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          //success handler
          const latLng = new this.google.maps.LatLng(position.coords.latitude, position.coords.longitude)
          const geocoder = new this.google.maps.Geocoder()
          geocoder.geocode({
            'latLng': latLng
          }, (result, status) => {
            if(status == this.google.maps.GeocoderStatus.OK) {
              if(result[0]) {
                this.address = result[0].formatted_address
                this.USER_LOCATION(this.address)
                //const geometry = result[0].geometry
                //const center = { lat: geometry.location.lat(), lng: geometry.location.lng() }
              } else {
                Toast({
                  message: 'failed to track your address: ' + status,
                  duration: 3000
                })
              }
            }
          }) 
        }, () => {
          //fail handler
          Toast({
            message: 'please open GPS and retry',
            duration: 3000
          })
        })
      } else {
        //not permitted by user
        Toast({
          message: 'please permit app to track your address',
          duration: 3000
        })
      }
    }
  },
  components: {
    navHeader
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/common';
.current, .location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
  padding: .5rem .6rem;
  border-bottom: 0.025rem solid #ededed;
}
.current {
  margin-top: 3.2rem;
}
.popular {
  margin-top: 0.8rem;
  .popular-title {
    text-align: center;
    font-size: 1.1rem;
    color: #444;
    padding: 0.2rem 0;
    margin: 2.5rem;
    box-shadow: 1px 1px 2px #ccc;
    border-radius: 1rem;
  }
  .popular-list {
    display: flex;
    flex-wrap: nowrap;
    margin: 0 .4rem;
    .list-item {
      flex: 1;
      border: 0.02rem solid #ededed;
      color: $blue;
      padding: .5rem 0;
    }
  }
}
.cities {
  .cities-title {
    text-align: center;
    font-size: 1.1rem;
    color: #444;
    padding: 0.2rem 0;
    margin: 2.5rem;
    box-shadow: 1px 1px 2px #ccc;
    border-radius: 1rem;
    span {
      font-size: 0.9rem;
    }
  }
  .cities-list {
    display: flex;
    flex-direction: column;
    margin: 0.8rem .4rem;
    .list-item {
      .item-alphabet {
        border: .02rem solid #ededed;
        margin: .5rem .3rem;
      }
      .item-details {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        li {
          border: 0.02rem solid #ededed;
          padding: .5rem;
          margin: .3rem;
          color: $blue;
        }
      }
    }
  }
}
</style>