<template>
  <el-card shadow="always" class="card" id="about">
    <div>
        <div class="icon-container">
            <img src='https://cdn-icons-png.flaticon.com/512/7344/7344095.png' alt='phone' />
            <p>+00 0000000000 <br>+11 1111111111</p>
        </div>
        <div class="icon-container">
            <img src='https://cdn-icons-png.flaticon.com/512/7930/7930566.png' alt='mail' />
            <p>bookmyproperties@mail.com</p>
        </div>
        <div class="icon-container">
            <img src='https://cdn-icons-png.flaticon.com/512/7258/7258534.png' alt='location' />
            <p>Mumbai, Maharashtra, India</p>
        </div>
    </div>
  </el-card>
</template>

<script>
export default {
    name: 'ContacInfo',
    
}
</script>

<style scoped>
.card{
    margin:1% 10%;
}
.icon-container{
    display: inline-block;
    text-align: center;
    width: 33%;
}
img {
    width: 100%;
    height: 100%;
    margin: 5%;
    display: inline-block;
}
p{
    font-size: large;
    font-weight: bold;
    font-family: 'Montserrat';
}
</style>