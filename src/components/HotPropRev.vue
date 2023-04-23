<template>
  <div class="prop-list">
    <HotPropCard v-for="image in images" :key="image" :img="image" />
  </div>
</template>

<script>

import HotPropCard from '@/components/HotPropCard.vue';


export default {
    name: 'HOtPropRev',
    components: {
        HotPropCard
  },
    data() {
    return {
      images: ['7a.jpg', '8a.jpg', '9a.jpg', '10a.jpg', '11a.jpg', '12a.jpg',]
    }
  }
}
</script>

<style scoped>
.prop-list{
    white-space: nowrap;
    overflow-x: scroll;
    margin-bottom: 5%;
}
::-webkit-scrollbar{
    width: 1px;
}
::-webkit-scrollbar-track {
        background: #6d3cbc63;
      }
::-webkit-scrollbar-thumb {
        background-color: #6E3CBC;
}
</style>