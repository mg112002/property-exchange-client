<template>
  <div v-loading="isLoading" elemeent-loading-text="Getting your blog details...">
    <el-carousel class="carousel" :interval="4000" height="28rem" indicator-position="inside">
          <el-carousel-item><img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="property-image"/></el-carousel-item>
          <el-carousel-item><img src="https://images.unsplash.com/photo-1633505899118-4ca6bd143043?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80" alt="property-image" /></el-carousel-item>
          <el-carousel-item><img src="https://images.unsplash.com/photo-1633505765486-e404bbbec654?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80" alt="property-image" /></el-carousel-item>
    </el-carousel>
    <div class="content">
      <div>
        <h1 class="heading">{{property.noOfBedrooms}} BHK Apartment</h1>
        <el-button class="icon" v-if="isOwner" icon="el-icon-edit" @click="editProperty" />
        <el-button class="icon" :disabled="!isAuthenticated" :icon="applyClass" @click="handleLikes"/>
        <el-button class="icon" icon="el-icon-share" @click="openDialog" />
        <el-button class="icon" v-if="isOwner" icon="el-icon-delete" @click="deleteProp(property._id)" />
        <p style="margin:1% 0 3%;">{{ property.society }}- {{ property.city }}</p>
        <p>Rs. <span><h1>{{ rate }}</h1></span> &emsp; Status: <span>Available</span> &emsp; For: {{property.for}}</p>
        <p>Area- <span><h1>{{property.builtUpArea}} sq.ft.</h1></span></p>
        <hr>
      </div>
      <div class="container">
        <div style="width:68%">
          <h1>Description</h1>
          <p style="font-size: large;">{{ property.description }}</p>
          <el-card shadow="hover" style="width:60%">
            <h4>Number of Bathrooms: <span style="float:right">Age of Property:</span></h4>
            <h4 style="text-shadow: 1px 0">{{property.noOfBathrooms}} Bathrooms<span style="margin-left: 10.2rem;">{{property.age}} </span></h4><br>
            <h4>No. of Balconies: <span style="margin-left: 8.35rem" >Floors: </span></h4>
              <h4 style="text-shadow: 1px 0">{{property.noOfBalconies}} Balconies<span style="margin-left: 11rem">{{property.floor}} of {{property.totalFloors}} floors</span></h4>
          </el-card>
        </div>
        <div style="width:30%;">
          <el-card class="card" shadow="hover" v-loading="loading" element-loading-text="Sending details on mail...">
            <el-avatar :size=100 class="avatar" icon="el-icon-user-solid"></el-avatar>
            <input type="text" disabled="true" class='agent-details' :placeholder='property.postedBy.firstname+ " "+property.postedBy.lastname' />
            <input type="text" disabled="true" class='agent-details' :placeholder='property.postedBy.email' />
            <input type="text" disabled="true" class='agent-details' :placeholder='property.postedBy.phone' />
            <el-button class="btn" @click="sendMail(property._id)">GET DETAILS ON MAIL</el-button>
          </el-card>
        </div>
      </div>
      <hr>
      <h1>Features & Amenities</h1>
      <div class="feature-container">
        <AmenitiesCard v-for="amenity in amenities" :amenities="amenity" :key="amenity[0]" />
      </div>
    </div>
    
  </div>
</template>

<script>

import AmenitiesCard from './AmenitiesCard.vue'
import { deletePropById, getRate } from '@/services/propertyServices'
import {getDetailsOnMail} from '@/services/userServices'

export default {
  name: 'DetailedView',
  data() {
    return {
      liked: false,
      loading:false,
      amenities: [
        ['Gym', ['fas', 'dumbbell'],true],
        ['Parking',['fas','square-parking'],true ],
        ['24/7 Water Supply',['fas','droplet'],true],
        ['Power Supply',['fas','bolt'],true],
        ['Club House',['fas','dice'],false],
        ['Pool', ['fas', 'person-swimming'],true],
        ['Children Play Area', ['fas', 'children'],false],
        ['Lift', ['fas', 'elevator'],true]
      ],
      
    }
  },
  computed: {
    applyClass() {
      return this.liked ? 'el-icon-star-on' : 'el-icon-star-off'
    },
    property() {
      return this.$store.getters.property
    },
    isLoading() {
      return this.$store.getters.isLoading
    },
    isOwner() {
      return this.$store.getters.property.postedBy.email === this.$store.getters.email
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    rate() {
      return getRate(this.property.price)
    },
    url() {
      return 'http://localhost:3000/props/' + this.property._id
    },
  },
  methods: {
    handleLikes() {
      this.liked = !this.liked
      if (this.liked === true) {
        this.$message({
          type: 'info',
          message: 'Property liked',
          duration: 1000
        })
      } else {
        this.$message({
          type: 'info',
          message: 'Property removed from likes',
          duration: 1000
        })
      }
    },
    openDialog() {
      this.$alert(this.url, 'Share', {
        confirmButtonText: 'Copy',
        callback: action => {
          if (action === 'confirm') {
            navigator.clipboard.writeText(this.url)
            this.$message({
              type: 'success',
              message: `Copied to clipboard`,
              duration: 2000
            })
          }
        }
      })
    },
    async deleteProp(id) {
      const loading = this.$loading({
        lock: true,
        text: 'Deleting the property...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        const res = await deletePropById(id)
        if (res.status === 'success') {
          loading.close()
          this.$message({
            type: 'success',
            message: 'Property deleted successfully!',
            duration: 3000
          })
          this.$router.push({name:'home'})
        }
      } catch (err) {
          this.$message({
            type: 'error',
            message: err.response.data.message,
            duration: 2000
          })
      }
    },
    async sendMail(id) {
      if (!this.isAuthenticated) {
        this.$message({
          type: 'info',
          message: 'Login to get details on registered mail!!',
          duration:2000
        })
        return
      }
      try {
        this.loading = true
        const res = await getDetailsOnMail(id)
        const data = res.data
        this.loading = false
        if (data.email === this.property.postedBy.email) {
          this.$message({
            type: 'success',
            message: 'Details sent on mail :)',
            duration:1500
          })
        } else {
          this.$message({
            type: 'warning',
            message: 'Something went wrong :(',
            duration: 1500
          })
        }
      } catch (err) {
        this.$message({
          type: 'warning',
          message: err.response.data.message,
          duration: 1500
        })
      }
    }
  },
  components: {
    AmenitiesCard
  }
}
</script>

<style scoped>
.carousel{
  margin-bottom: 2%;
}
img{
  width: 100%;
  height:100%
}
.content{
  margin:0 15%;
}
h1{
  display: inline;
  text-shadow: 1px 0;
}
h1.heading{
  font-size:2.5rem;
  margin-right: 5%;
  text-shadow: 1px 0;
}
p{
  font-size:1.25rem;
  text-align: justify;
}
.icon{
  font-size: xx-large;
  border: none;
  padding: 0;
  background-color: #F4F2F9;
}
hr{
  border:1px solid lightgrey;
  margin-bottom: 5%;
}
.container{
  display: flex;
  justify-content: space-between;
  margin-bottom: 5%;
}
.avatar{
  margin: 0 30% 10%;
  font-size: 3rem;
  background-color: white;
  color: black;
  border: 1px solid black;
}
.agent-details{
    margin: 3% 7% 5%;
    border-top: none;
    border-left: none;
    border-bottom: 1px solid;
    border-right: 1px solid;
    font-size: larger;
}
.btn{
  background-color: #3f51b5;
  border-radius: 50px;
  margin: 5% 15%;
  color: white;
}
.card{
  margin-top: 25%;
}
.feature-container{
  display: flex;
  justify-content: space-between;
  margin: 5% 0;
}

</style>

<!-- <template>
  <div>
    <el-carousel class="carousel" :interval="4000" height="28rem" indicator-position="inside">
      <el-carousel-item><img
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="property-image" /></el-carousel-item>
      <el-carousel-item><img
          src="https://images.unsplash.com/photo-1633505899118-4ca6bd143043?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
          alt="property-image" /></el-carousel-item>
      <el-carousel-item><img
          src="https://images.unsplash.com/photo-1633505765486-e404bbbec654?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
          alt="property-image" /></el-carousel-item>
    </el-carousel>
    <div class="content">
      <div>
        <h1 class="heading">{{ property.heading }}</h1>
        <el-button class="icon" icon="el-icon-edit" @click="editProperty" />
        <el-button class="icon" :icon="applyClass" @click="handleLikes" />
        <el-button class="icon" icon="el-icon-share" @click="openDialog" />
        <p style="margin:1% 0 3%;">{{ property.society }}</p>
        <p>Rs. <span>
            <h1>{{property.price}}</h1>
          </span> &emsp; Status: <span>{{property.status}}</span> &emsp; New</p>
        <p>Area- <span>
            <h1>{{ property.builtUpArea }}</h1>
          </span></p>
        <hr>
      </div>
      <div class="container">
        <div style="width:68%">
          <h1>Description</h1>
          <p style="font-size: large;">{{property.description}}</p>
          <el-card shadow="hover" style="width:60%">
            <h4>Number of Bathrooms: <span style="float:right">Age of Property:</span></h4>
            <h4 style="text-shadow: 1px 0">{{ property.noOfBathrooms }}<span style="margin-left: 10.2rem;">{{property.age}} </span></h4><br>
            <h4>No. of Balconies: <span style="margin-left: 8.35rem">Floors: </span></h4>
            <h4 style="text-shadow: 1px 0">{{ property.noOfBalconies }}<span style="margin-left: 11rem">{{ property.floor }} of {{ property.totalFloors }} floors</span></h4>
          </el-card>
        </div>
        <div style="width:30%;">
          <el-card class="card" shadow="hover">
            <el-avatar :size=100 class="avatar" icon="el-icon-user-solid"></el-avatar>
            <input type="text" disabled="true" class='agent-details' :placeholder='property.postedBy.name' />
            <input type="text" disabled="true" class='agent-details' :placeholder='property.postedBy.email' />
            <input type="text" disabled="true" class='agent-details' :placeholder='property.postedBy.phone' />
            <el-button class="btn">GET DETAILS ON MAIL</el-button>
          </el-card>
        </div>
      </div>
      <hr>
      <h1>Features & Amenities</h1>
      <div class="feature-container">
        <AmenitiesCard v-for="amenity in amenities" :amenities="amenity" :key="amenity[0]" />
      </div>
    </div>

  </div>
</template>

<script>

import AmenitiesCard from './AmenitiesCard.vue'

export default {
  name: 'DetailedView',
  data() {
    return {
      liked: false,
      amenities: [
        ['Gym', ['fas', 'dumbbell'], true],
        ['Parking', ['fas', 'square-parking'], true],
        ['24/7 Water Supply', ['fas', 'droplet'], true],
        ['Power Supply', ['fas', 'bolt'], true],
        ['Club House', ['fas', 'dice'], false],
        ['Pool', ['fas', 'person-swimming'], true],
        ['Children Play Area', ['fas', 'children'], false],
        ['Lift', ['fas', 'elevator'], true]
      ]
    }
  },
  computed: {
    applyClass() {
      return this.liked ? 'el-icon-star-on' : 'el-icon-star-off'
    }
  },
  methods: {
    handleLikes() {
      this.liked = !this.liked
    },
    openDialog() {
      console.log('copied')
    }
  },
  components: {
    AmenitiesCard
  }
}
</script>

<style scoped>
.carousel {
  margin-bottom: 2%;
}

img {
  width: 100%;
  height: 100%
}

.content {
  margin: 0 15%;
}

h1 {
  display: inline;
  text-shadow: 1px 0;
}

h1.heading {
  font-size: 2.5rem;
  margin-right: 5%;
  text-shadow: 1px 0;
}

p {
  font-size: 1.25rem;
  text-align: justify;
}

.icon {
  font-size: xx-large;
  border: none;
  padding: 0;
  background-color: #F4F2F9;
}

hr {
  border: 1px solid lightgrey;
  margin-bottom: 5%;
}

.container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5%;
}

.avatar {
  margin: 0 30% 10%;
  font-size: 3rem;
  background-color: white;
  color: black;
  border: 1px solid black;
}

.agent-details {
  margin: 3% 7% 5%;
  border-top: none;
  border-left: none;
  border-bottom: 1px solid;
  border-right: 1px solid;
  font-size: larger;
}

.btn {
  background-color: #3f51b5;
  border-radius: 50px;
  margin: 5% 15%;
  color: white;
}

.card {
  margin-top: 25%;
}

.feature-container {
  display: flex;
  justify-content: space-between;
  margin: 5% 0;
}
</style> -->
