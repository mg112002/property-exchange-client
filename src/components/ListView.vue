<template>
  <div class="elements">
    <SideBar />
    <div class="results">
      <h2>Search Results:</h2>
      <div v-if="typeof properties === 'object'">
        <PropCard v-for="(property, index) in properties" :key="property" :property="property" :image="images[index]"/>
      </div>
      <h1 style="text-align: center; margin-bottom:21.9%;margin-top:10%">No Match Found</h1>
    </div>
  </div>
</template>

<script>

import PropCard from './PropCard.vue';
import SideBar from './SideBar.vue'


export default {
  name: 'ListView',
  components: {
    PropCard,
    SideBar
  },
  data() {
    return {
      images: ['13a.jpg', '14a.jpg', '15a.jpg', '16a.jpg', '17a.jpg', '18a.jpg', '13a.jpg', '14a.jpg', '15a.jpg', '16a.jpg', '17a.jpg', '18a.jpg', '13a.jpg', '14a.jpg', '15a.jpg', '16a.jpg', '17a.jpg', '18a.jpg', '13a.jpg', '14a.jpg', '15a.jpg', '16a.jpg', '17a.jpg', '18a.jpg', '13a.jpg', '14a.jpg', '15a.jpg', '16a.jpg', '17a.jpg', '18a.jpg', '13a.jpg', '14a.jpg', '15a.jpg', '16a.jpg', '17a.jpg', '18a.jpg', '13a.jpg', '14a.jpg', '15a.jpg', '16a.jpg', '17a.jpg', '18a.jpg', '13a.jpg', '14a.jpg', '15a.jpg', '16a.jpg', '17a.jpg', '18a.jpg', '13a.jpg', '14a.jpg', '15a.jpg', '16a.jpg', '17a.jpg', '18a.jpg', '13a.jpg', '14a.jpg', '15a.jpg', '16a.jpg', '17a.jpg', '18a.jpg', '13a.jpg', '14a.jpg', '15a.jpg', '16a.jpg', '17a.jpg', '18a.jpg', '13a.jpg', '14a.jpg', '15a.jpg', '16a.jpg', '17a.jpg', '18a.jpg', '13a.jpg', '14a.jpg', '15a.jpg', '16a.jpg', '17a.jpg', '18a.jpg', '13a.jpg', '14a.jpg', '15a.jpg', '16a.jpg', '17a.jpg', '18a.jpg', '13a.jpg', '14a.jpg', '15a.jpg', '16a.jpg', '17a.jpg', '18a.jpg', '13a.jpg', '14a.jpg', '15a.jpg', '16a.jpg', '17a.jpg', '18a.jpg', '13a.jpg', '14a.jpg', '15a.jpg', '16a.jpg', '17a.jpg', '18a.jpg']
      }
  },
  computed: {
    properties() {
      return this.$store.getters.properties
    }
  }
}
</script>

<style scoped>
h2{
  margin-left:4%
}
.results{
  margin-left: 25%;
}
</style>