<template>
  <div style="background-color: #6E3CBC; height: max-content;">
              <div class='footer-info'>
                  <h3 style="color: white; text-align: right; font-weight: bold; font-size: 50px;">Book my Property</h3>
                  <p style="color: white; display: inline-block; font-size: 20px; text-align: justify; margin-bottom: 0;">Connect with us and follow us on our Social media handles by clicking below.</p>
                  <div class="icons">
                      <font-awesome-icon :icon="['fab', 'instagram']" style="color: white;margin:1% 2%;cursor: pointer;" size="2xl" @click="handleClick('instagram')" />
                      <font-awesome-icon :icon="['fab', 'facebook']" style="color: white;margin:1% 2%;cursor: pointer;" size="2xl" @click="handleClick('fb')"/>
                      <font-awesome-icon :icon="['fab', 'twitter']" style="color: white;margin:1% 2%;cursor: pointer;" size="2xl" @click="handleClick('twiiter')"/>
                  </div>
              </div>
              <div class='footer-links'>
                  <h2 style="font-weight: bold; color: white">Quick Links</h2>
                  <router-link to='/' class='footerlinks' style="margin-top: 5%">Home</router-link>
                  <router-link to="/" class='footerlinks'>About Us</router-link>
                  <router-link to='#' class='footerlinks'>Help center</router-link>
                  <router-link to='#' class='footerlinks'>Terms & conditions</router-link>
                  <router-link to='#' class='footerlinks'>FAQs</router-link>
              </div>
              <div class='footer-form'>
                  <input type='text' style="margin: 1% 0; border-radius: 10px; width: 70%; font-size: large;" name='ftremail' variant='outlined' placeholder='Enter your email' /><br />
                  <p style="margin: 0 0 2%; color: white;">(Your email won't be shared)</p>
                  <textarea type='text' rows=5 style="margin: 0 0 2%; border-radius: 10px; width: 70%; resize: none;font-size: large;" name='comment' variant='outlined' required placeholder='Leave your thoughts!!' /><br />
                  <Button style="border-radius: 50px; width: 30%; color: #6E3CBC; background-color: white; height:fit-content; padding: 2%;" variant='contained'> SUBMIT </Button>
              </div>
          </div>
</template>

<script>
export default {
    name: 'FooterEl',
    methods: {
        handleClick(socialmedia) {
            console.log(socialmedia)
        },
    }
}
</script>

<style scoped>
h3{
   font-family: 'Parisienne',cursive;
   margin-bottom: 0;
}
.footer-form {
    width: 30%;
    margin: 2% 3% 2% 0;
    display: inline-block;
    position: absolute;
}

.footer-info {
    width: 30%;
    margin: 2% 0 2% 10%;
    display: inline-block;
    position: absolute;
}

.footer-links {
    width: 20%;
    margin: 2% 2% 2% 45%;
    display: inline-block;
}

.footerlinks {
    display: block;
    text-decoration: none;
    color: white;
    margin-top: 2%;
    font-size: 20px;
}

.footerlinks:hover {
    color: black;
}

.icons{
    font-size: x-large;
    text-align: center;
}
</style>