<template>
  <el-sidebar class="sidebar">
    <p style="margin-left:2%;margin-top: 5%;">Price in Rs.</p>
    <el-slider
          class="slider"
          v-model="value"
          range
          :format-tooltip="formatTooltip"
          :marks="marks">
    </el-slider><br>
    <el-select class="input" v-model="propFor" placeholder="For">
        <el-option label="For Sale" value="Sell" />
        <el-option label="For Rent" value="Rent" />
    </el-select>
    <el-select class="input" v-model="furnishing" placeholder="Furnishing">
            <el-option label="Furnished" value="Furnished" />
            <el-option label="Semi Furnished" value="Semifurnished" />
            <el-option label="UnFurnished" value="Unfurnished" />
    </el-select>
    <el-input-number class="input" v-model="bedrooms" controls-position="right" :min="1" :max="10"></el-input-number>
    <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="color:black;margin-left: 3%;">Check all</el-checkbox>
    <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedBoxes" @change="handleCheckedBoxesChange">
        <el-checkbox v-for="e in boxes" :label="e" :key="e" style="color:black;margin:1% 3%">{{ e }}</el-checkbox>
    </el-checkbox-group><br> -->
        <p style="margin-left:2%;margin-top: 2%;">Area in sq.ft.</p>
    <el-slider
        class="slider"
        v-model="aRange"
        range
        :format-tooltip="formatATooltip"
        :marks="aMarks"
        style="color:black">
    </el-slider><br>
    <el-button class="btn" type="info" @click="applyFilter">Apply</el-button>
  </el-sidebar>
</template>

<script>
import { getSearchResults } from '@/services/propertyServices';
const options = ['On Rent', 'Furnished', 'On Sale', 'UnFurnished', 'Semi Furnished']
export default {
    name: 'SideBar',
    data() {
        return {
            propFor: '',
            furnishing: '',
            bedrooms:1,
            // checkAll: false,
            // checkedBoxes: ['on Rent', 'Furnished'],
            boxes: options,
            isIndeterminate: true,
            value: [30, 60],
            aRange:[30,50],
            marks: {
                5: {
                    style: {
                        color:'black'
                    },
                    label: '10L'
                },
                25: {
                    style: {
                        color: 'black'
                    },
                    label: '50L'
                },
                50: {
                    style: {
                        color: 'black'
                    },
                    label: '1Cr'
                },
                75: {
                    style: {
                        color: 'black'
                    },
                    label: '1.5Cr'
                },
                90: {
                    style: {
                        color: 'black'
                    },
                    label: '1.8Cr'
                }
                
                // 50: {
                //     style: {
                //         color: '#1989FA'
                //     },
                //     label: this.$createElement('strong', '50%')
                // }
            },
            aMarks: {
                10: {
                    style: {
                        color: 'black',
                    },
                    label: '200sq.ft'
                },
                80: {
                    style: {
                        color:'black'
                    },
                    label: '1600sq.ft'
                }
            }
        }
    },
    methods: {
        handleCheckAllChange(val) {
            this.checkedBoxes = val ? options : [];
            this.isIndeterminate = false;
        },
        handleCheckedBoxesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.boxes.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.boxes.length;
        },
        formatTooltip(val) {
            return val*200000
        },
        formatATooltip(val) {
            return val*20
        },
        async applyFilter() {
            const params = {
                for: this.propFor,
                city: 'a',
                furnishing: this.furnishing,
                noOfBedrooms: this.bedrooms,
                minPrice: this.value[0]*200000,
                maxPrice: this.value[1]*200000,
                minArea: this.aRange[0]*20,
                maxArea:this.aRange[1]*20
            }
            try {
                const res = await getSearchResults(params)
                const properties = res.data
                if (properties.length > 0) {
                    this.$message({
                        type: 'success',
                        message: 'Match Found',
                        duration:2000
                    })
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
                this.$store.commit('setProperties', properties)
            } catch (err) {
                this.$message({
                    type: 'warning',
                    message: err.response.data.message,
                    duration:2000
                })
            }
        }
    }
}
</script>

<style scoped>
.sidebar{
    width: 20%;
    height: 55%;
    margin-left: 1.5%;
    background-color: #d4c5ed;
    /* background-color: #9b77d4; */
    position:fixed;
}
.slider{
    margin: 0 2%;
}
.btn{
    margin:0 2%
}
.input{
    margin:2%
}
</style>