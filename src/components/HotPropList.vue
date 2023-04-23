<template>
  <div class="prop-list">
    <HotPropCard v-for="image in images" :key="image" :img="image" />
  </div>
</template>

<script>

import HotPropCard from '@/components/HotPropCard.vue';


export default {
    name: 'HOtPropList',
    components: {
        HotPropCard
  },
  data() {
    return {
        images:['1a.jpg', '2a.jpg', '3a.jpg', '4a.jpg', '5a.jpg', '6a.jpg',]
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