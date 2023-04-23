<template>
    <el-card shadow="hover" class="card">
        <div class="img-container">
            <img :src="img" alt='hot-property'>
        </div>
        <!-- <img src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=992&q=80" alt='hot-property'> -->
        <h4>2 BHK Apartment</h4>
        <p>Rs. 50L</p>
        <h4>Navi Mumbai</h4>
        <el-button class="view-btn" @click="viewProp">VIEW PROPERTY</el-button>
    </el-card>
</template>

<script>
export default {
    name: 'HotPropCard',
    methods: {
        viewProp() {
            this.$router.push('/props/1')
        }
    },
    props: {
        img: {
            required:true
        }
    }
}
</script>

<style scoped>
.card{
    width:18%;
    overflow: hidden;
    border-radius: 20px;
    margin: 2%;
    display: inline-block;
}
.img-container{
    height:10rem;
    margin-bottom: 1%;
}
img{
    height:100%;
    width: 100%;
    margin-bottom: 5%;
}
img:hover{
    transform: scale(1.3);
    transition: all 1800ms ease;
}
.view-btn{
    width: 100%;
    border-radius: 20px;
    background-color: #6E3CBC;
    color: white
}
h4,p{
    margin: 5% 0
}
</style>
