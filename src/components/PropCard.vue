<template>
  <el-card class="card" shadow="hover" v-if="Object.keys(property).length">
    <div class="content">
      <el-button class="icon" icon="el-icon-share" @click="openDialog" />
      <el-button class="icon" :disabled="!$store.getters.isAuthenticated" :icon="applyClass" @click="handleLikes"/>
      <router-link class="link" :to="'/props/'+property._id"><h1>{{ property.noOfBedrooms }} BHK Apartment in {{ property.city }}</h1></router-link>
      <!-- <router-link class="link" to="/props/1"><h1>4 BHK Apt in Navi Mumbai</h1></router-link> -->
      <h2 v-if="property.for==='Sell'">Rs. {{ rate }} &emsp; &emsp; &emsp; &emsp; {{property.builtUpArea}} sq.ft.</h2>
      <h2 v-else>Rs. {{property.price}} / month &emsp; &emsp; &emsp; &emsp; {{ property.builtUpArea }} sq.ft.</h2>
      <em><p style="font-size: x-large;">{{property.furnishing}}</p></em>
      <p class="description">{{ property.description.slice(0,270) }}<router-link class="link more" :to="'/props/' + property._id">...Read more</router-link></p>
    </div>
    <div class="image">
      <img :src="image" alt="property-image">
    </div>
    <el-button class="btn contact-btn" @click="viewProp">CONTACT HERE</el-button>
    <el-button class="btn report-btn" @click="viewProp">REPORT</el-button>
  </el-card>
</template>

<script>

import { getRate } from '@/services/propertyServices'


export default {
    name: 'PropCard',
    data() {
        return {
          liked: false,
        }
  },
  props: {
    image: {
      required:true
    },
    property: {
      required:true
    }
  },
  computed: {
    url() {
      return 'http://localhost:3000/props/'+this.property._id
    },
    applyClass() {
      return this.liked ? 'el-icon-star-on' :'el-icon-star-off'
    },
    rate() {
      return getRate(this.property.price)
    }
    },
    methods: {
      viewProp() {
            this.$store.commit('setProperty',this.property)
            this.$router.push('/props/'+this.property._id)
      },
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
      }
    }
}
</script>

<style scoped>
.card{
  margin: 4%;
height: 500px;
display: flex;
justify-content: space-between;
}
.icon{
  font-size: xx-large;
  border: none;
}
.content{
  margin:2%;
width:60%;
display:inline-block;
}
p{
  text-align: justify;
}
.link{
  text-decoration: none;
}
/* .more{
  font-size: larger;
} */
.description{
  font-size: large;
}
.image{
  display: inline-block;
  width: 33%;
  height: 75%;
  margin:2% 1% 1% 1%;
  overflow: hidden;
}
img{
  width: 100%;
height: 100%;
border-radius: 10%;
}
img:hover{
  transform: scale(1.2);
  transition: all 1500ms ease;
}
.btn{
  width: 100%;
    border-radius: 20px;
    width: fit-content;
}
.contact-btn{
    background-color: #6E3CBC;
    color: white;
}
.report-btn{
  color:#6E3CBC;
  border: 1px solid #6E3CBC;
}
</style>