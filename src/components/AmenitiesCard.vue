<template>
    <el-card shadow="never" class="amenities" :style="amenities[2] ? 'box-shadow: 5px 5px 5px 5px #6E3CBC;': {}">
        <font-awesome-icon :icon="amenities[1]" size="2xl" />
        <p>{{ amenities[0] }}</p>
    </el-card>
</template>

<script>
export default {
    name: 'AmenitiesCard',
    props: {
        amenities: {
            required:true,
        }
    }
}
</script>

<style scoped>
.amenities{
    display: inline-block;
  width: 10%;
  height: 110px;
  text-align: center;
  font-size: x-large;
}
p{
    font-size: x-small;
}
</style>