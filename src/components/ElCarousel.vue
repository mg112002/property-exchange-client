<template>
<el-carousel :interval="3000" class="carousel" type="card" height="600px">
    <el-carousel-item>
        <img src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/au/wp-content/uploads/2022/08/AustralianHousing-scaled.jpg"
            alt="property">
    </el-carousel-item>
    <el-carousel-item>
        <img src="https://cdn-cms.pgimgs.com/news/2017/07/GettyImages-476560173.jpg" alt="property">
    </el-carousel-item>
    <el-carousel-item>
        <img src="https://images.moneycontrol.com/static-mcnews/2022/09/Home-Loan-1-770x433.png?impolicy=website&width=770&height=431"
            alt="property">
    </el-carousel-item>
</el-carousel>
</template>

<script>
export default {
name:'CarouselEl'
}
</script>
<style scoped>
img {
    width: 100%;
    height: 100%;
}
.carousel{
    margin-bottom: 1%;
}
</style>