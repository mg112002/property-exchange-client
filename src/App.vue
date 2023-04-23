<template>
  <div>
    <NavBar />
    <router-view></router-view>
    <FooterEl />
  </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue';
import FooterEl from '@/components/FooterEl.vue';
export default {
  name: 'BookMyProperties',
  components: {
    NavBar,
    FooterEl
  }
}
</script>

<style scoped>

</style>
