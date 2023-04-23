<template>
<el-input placeholder="Enter keyword to search" v-model.trim="keyword" class="search-bar">
    <el-select v-model="select" slot="prepend" placeholder="For">
        <el-option label="For Sale" value="Sell"></el-option>
        <el-option label="For Rent" value="Rent"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="searchProps"></el-button>
</el-input>
</template>

<script>

import {getSearchResults} from '@/services/propertyServices'

export default {
    name: 'SearchBar',
    data() {
        return {
            select: '',
            keyword:''
        }
    },
    methods: {
        async searchProps() {
            if (this.select === '' || this.keyword === '') {
                this.$message({
                    type: 'warning',
                    message: 'Select the FOR option and enter a keyword to search',
                    duration: 2500
                })
            } else {
                const loading = this.$loading({
                    lock: true,
                    text: 'Searching for properties...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                const info = {
                    for: this.select,
                    city: this.keyword
                }
                try {
                    const res = await getSearchResults(info)
                    const properties = res.data
                    if (properties.length === 0) {
                        this.$message({
                            type: 'warning',
                            message: 'No properties found :(',
                            duration:2000
                        })
                        loading.close()                
                    } else {
                        this.$message({
                            type: 'success',
                            message: 'Match found'
                        })
                        this.$store.commit('setProperties',properties)
                        this.$router.push({ name: 'list-property' })
                    }
                } catch (err) {
                    console.log('Catch')
                    this.$message({
                        type: 'error',
                        message: err.response.data.message,
                        duration: 2000
                    })               
                } finally {
                    loading.close()
                }
            }
        }
    }
}
</script>

<style scoped>
.search-bar{
width: 60%;
margin-left: 20%;
margin-bottom: 5%;

}
</style>