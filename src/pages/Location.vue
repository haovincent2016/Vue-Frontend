<template>
<div class="main-container">
  <!-- navigation header with city name -->
  <nav-header go-back="true" :show-title="$route.query.city"></nav-header>
  <!-- address input autocomplete -->
  <div class="address">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="address-icon">
      <path fill-opacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path>
    </svg>
    <GmapAutocomplete @place_changed="setPlace"></GmapAutocomplete>
  </div>
  <!-- current location -->
  <section class="location">
    <div class="location-title">Current Location</div>
    <div class="location-detail">
      <span>{{ this.location }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" class="location-icon" @click="getLocation">
        <g fill="none" fill-rule="evenodd">
          <circle cx="7.5" cy="7.5" r="7" stroke="#2395FF"></circle>
          <path fill="#2395FF" d="M7 0h1v5H7zM7 10h1v5H7zM10 7h5v1h-5zM0 7h5v1H0z"></path>
        </g>
      </svg>
    </div>
  </section>
  <!-- search history -->
  <section class="history">
    <div class="history-title">Search History</div>
    <ul class="history-list">
      <li v-for="history in locationHistory" :key="history.id">
        <span @click="replacePlace(history)">{{ history }}</span>
      </li>
    </ul>
  </section>
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { Toast } from 'mint-ui'
import { gmapApi } from 'vue2-google-maps'
import navHeader from '@/components/common/NavHeader'
export default {
  mounted() {
    this.getInitial()
  },
  data() {
    return {
      place: null
    }
  },
  computed: {
    ...mapState([
      'location', 'locationHistory'
    ]),
    google: gmapApi
  },
  methods: {
    ...mapMutations([
      'USER_LOCATION', 'LOCATION_HISTORY', 'GET_LOCATION', 'GET_LOCATIONS'
    ]),
    getInitial() {
      this.GET_LOCATION()
      this.GET_LOCATIONS() 
    },
    setPlace(place) {
      this.place = place.formatted_address
      if(this.place) {
        this.USER_LOCATION(this.place)
        this.LOCATION_HISTORY(this.place)
      } else {
        Toast({
          message: 'please enter an address first',
          position: 'top',
          duration: 3000
        })
      }
    },
    replacePlace(place) {
      this.USER_LOCATION(place)
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
                  position: 'top',
                  duration: 3000
                })
              }
            }
          }) 
        }, () => {
          //fail handler
          Toast({
            message: 'please open GPS and retry',
            position: 'top',
            duration: 3000
          })
        })
      } else {
        //not permitted by user
        Toast({
          message: 'please permit app to track your address',
          position: 'top',
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
.address {
  margin-top: 3.2rem;
  padding: .5rem .6rem;
  background: #fff;
  .address-icon {
    position: absolute;
    width: 1rem;
    height: 1rem;
    left: 1rem;
    top: 4.2rem;
  }
  input {
    width: 85%;
    color: #666;
    padding: 0 1.7rem;
    height: 2rem;
    font-size: 1rem;
    background: #eee;
  }
}
.location {
  text-align: center;
  .location-title {
    padding: .6rem 0;
    font-size: 1rem;
    color: #666;
    background: #f4f4f4;
  }
  .location-detail {
    background: #fff;
    padding: .6rem;
    display: flex;
    justify-content: space-between;
    span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: .8rem;
    }
    .location-icon {
      width: .9rem;
      height: .9rem;
    }
  }
}
.history {
  .history-title {
    padding: .6rem 0;
    font-size: 1rem;
    color: #666;
    background: #f4f4f4;
  }
  .history-list {
    background: #fff;
    padding: .6rem;
    li {
      display: flex;
      justify-content: space-between;
      padding: .5rem 0;
      font-size: .8rem;
      color: $blue;
      border-bottom: .05rem dotted #eaeaea;
    }
  }
}
.none {
  padding-top: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 15rem;
    height: 15rem;
    box-shadow: 2px 2px 2px #eee;
    border-radius: 8px;
  }
  .hint {
    color: #666;
    margin: 1rem 0;
  }
}
</style>