<template>
<el-menu class="navbar" mode="horizontal" :router=true>
    <el-menu-item index="/" class="name" style="border:none">Book My Properties</el-menu-item>
    <el-menu-item index="/postprop" class="navigators">SELL/RENT</el-menu-item>
    <el-menu-item v-if="isAuthenticated" index="/login" class="navigators" @click="logout">LOGOUT</el-menu-item>
    <el-menu-item v-else index="/login" class="navigators">LOGIN/SIGNUP</el-menu-item>
    <el-menu-item @click="goTo" class="navigators">ABOUT US</el-menu-item>
    <el-menu-item index="/" class="navigators">HOME</el-menu-item>
</el-menu>
</template>

<script>
export default {
    name: 'NavBar',
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        },
        email() {
            return this.$store.state.email
        },
    },
    methods: {
        async logout() {
            try {
                await this.$store.dispatch('logout')
                this.$message({
                    type: 'success',
                    message: 'Logged out!',
                    duration: 2000
                })
            } catch {
                this.$message({
                    type: 'error',
                    message: 'Something went wrong',
                    duration: 2000

                })
            }
        },
        // goTo() {
        //     this.$router.push({ name: 'home', hash: '#about' }).catch(err => err)
        // },
        goTo() {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            })
        }
    }
}
</script>

<style scoped>

.navbar{
    background: transparent;
    border: none;
    margin-bottom: 1%;
}
.name{
    color: black;
    font-size: 1.2rem;
}
.navigators{
    font-size: 1.1rem;
    float: right;
}
</style>