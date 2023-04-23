<template>
  <el-card class="steps" v-loading="loading" element-loading-text="Submitting your property details...">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="Basic Details" :status=step1Status />
      <el-step title="Location Details" :status=step2Status />
      <el-step title="Property Profile" :status=step3Status />
      <el-step title="Features/Amenities" :status=step4Status />
      <el-step title="Photos" :status=step5Status />
      <el-step title="Pricing" :status=step6Status />
    </el-steps>
    <div class="form">
      <div class="basic-details" v-if="active===0">
        <p class="label">RERA Number<span class="reqd">*</span></p>
        <el-input class="input" placeholder="Enter RERA Number" v-model.trim="rera" @focus="reraValidated=true" clearable></el-input>
        <i v-if="reraValidated" :class="reraValid ? 'el-icon-circle-check' : 'el-icon-circle-close'"></i>
        <p class="label">For<span class="reqd">*</span></p>
        <el-select v-model="propFor" clearable placeholder="Property For">
          <el-option label="For Rent" value="Rent"></el-option>
          <el-option label="For Sale" value="Sell"></el-option>
        </el-select>
        <p class="label">Type<span class="reqd">*</span></p>
        <el-select v-model="type" clearable placeholder="Select Property Type">
            <el-option label="Residential Apartment" value="Residential Apartment" />
            <el-option disabled label="1 RK" value="1rk" />
            <el-option disabled label="Builder" value="builder" />
            <el-option disabled label="Land" value="land" />
            <el-option disabled label="Villa" value="villa" />
            <el-option disabled label="Farm House" value="farmhouse" />
            <el-option disabled label="Other" value="other" />
        </el-select>
      </div>
      <div class="location-details" v-if="active === 1">
        <p class="label">State<span class="reqd">*</span></p>
        <el-select v-model="selectedState" placeholder="Select State" clearable>
          <el-option v-for="(state, index) in states" :key="index" :label="state" :value="state"/>
        </el-select>
        <p class="label">Location or City<span class="reqd">*</span></p>
        <el-input v-model="selectedCity" placeholder="Enter city or location" clearable class="input" @focus="cityValidated=true"></el-input>
        <i v-if="cityValidated" :class="cityValid ? 'el-icon-circle-check' : 'el-icon-circle-close'"></i>
        <p class="label">Area(Society)<span class="reqd">*</span></p>
        <el-input class="input" placeholder="Enter Area(Society) of Property" v-model="area" @focus="areaValidated = true" clearable></el-input>
        <i v-if="areaValidated" :class="areaValid ? 'el-icon-circle-check' : 'el-icon-circle-close'"></i>
        <p class="label">Zip Code<span class="reqd">*</span></p>
        <el-input class="input" placeholder="Enter Area(Society) of Property" maxlength="6" v-model.trim="zipcode" @focus="zipcodeValidated = true" clearable></el-input>
        <i v-if="zipcodeValidated" :class="zipValid ? 'el-icon-circle-check' : 'el-icon-circle-close'"></i>
      </div>
      <div class="property-profile" v-if="active === 2">
        <p class="label">No. of Bedrooms</p>
        <el-input-number v-model="bedrooms" :min="0" :max="10" />
        <p class="label">No. of Bathrooms</p>
        <el-input-number v-model="bathrooms" :min="0" :max="10" />
        <p class="label">No. of Balconies</p>
        <el-input-number v-model="balconies" :min="0" :max="10" />
        <p class="label">Built Up Area in sq. ft.</p>
        <el-input-number v-model="builtUpArea" :min="200" :step="20" />
        <p class="label">Property on Floor</p>
        <el-input-number v-model="floor" :min="0" :max="10" />
        <p class="label">Total Floors</p>
        <el-input-number v-model="totalFloors" :min="0" :max="100" />
        <p class="label">Age of Property<span class="reqd">*</span></p>
        <el-input class="input" placeholder="Eg. 2 to 5 years, new" v-model="age" @focus="ageValidated = true" clearable></el-input>
        <i v-if="ageValidated" :class="ageValid ? 'el-icon-circle-check' : 'el-icon-circle-close'"></i>
        <p class="label">Posession by Year</p>
        <el-select v-model="posessionByYear" clearable placeholder="Select Year of Posession">
          <el-option :label="year" :value="year" />
          <el-option :label="year+1" :value="year+1" />
          <el-option :label="year+2" :value="year+2" />
          <el-option :label="year+3" :value="year+3" />
          <el-option :label="year+4" :value="year+4" />
          <el-option :label="year+5" :value="year+5" />
          <el-option :label="year+6" :value="year+6" />
          <el-option :label="year+7" :value="year+7" />
          <el-option :label="year+8" :value="year+8" />
          <el-option :label="year+9" :value="year+9" />
        </el-select>
        <p class="label">Posession by Month</p>
        <el-select v-model="posessionByMonth" clearable placeholder="Select posession month">
          <el-option v-for="month in months" :key="month" :label="month" :value="month" />
        </el-select>
        <p class="label">Availability Status<span class="reqd">*</span></p>
        <el-select v-model="availabilityStatus" clearable placeholder="Select Status">
          <el-option label="Available" value="Available" />
          <el-option label="Under Construction" value="Under Construction" />
        </el-select>
        <p class="label">Furnishing Type<span class="reqd">*</span></p>
        <el-select v-model="furnishing" clearable placeholder="Select Furnishing Type">
          <el-option label="Furnished" value="Furnished" />
          <el-option label="Semi Furnished" value="Semi Furnished" />
          <el-option label="Unfurnished" value="Unfurnished" />
        </el-select>
        <p class="label">Description<span class="reqd">*</span></p>
        <el-input class="input" type="textarea" placeholder="Describe the property in detail" v-model="description" minlength="300" maxlength="1000" show-word-limit  @focus="descValidated = true"/>
      </div>
      <div class="features-amenities" v-if="active === 3">
        <h1 style="text-align: center;">Features</h1>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">Check all</el-checkbox>
        <el-checkbox-group v-model="checkedFeatures" @change="handleCheckedFeaturesChange">
          <el-checkbox v-for="feature in features" :label="feature" :key="feature">{{ feature }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="photos" v-if="active === 4">
        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
          <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
        </el-upload>
      </div>
      <div class="pricing" v-if="active === 5">
        <h1 style="text-align: center;">Pricing</h1>
        <p class="label">Price of Property<span class="reqd">*</span></p>
        <el-input class="price" clearable v-model="price"></el-input>
      </div>
    </div>
    <div class="btns">
      <el-button :disabled="active=== 0" @click="previous">Previous</el-button>
      <el-button v-if="active!==5" :disabled="active=== 5" style="background-color:#3f51b5;color:white" @click="next">Next</el-button>
      <el-button  v-if="active=== 5" type="primary" @click="openPremiumDialog">Submit</el-button>
    </div>
  </el-card>
</template>

<script>

const date = new Date()
const year = date.getFullYear()
const featureOptions = ['GYM', 'Car Parking','Lift','Power Supply','Water Supply','Play Area','Club House','Swimming Pool']
import { loadStripe } from '@stripe/stripe-js';
import {postProperty} from '@/services/propertyServices'


export default {
  name: 'StepperForm',
  data() {
    return {
      loading:false,
      stripe: null,
      priceId: 'price_1Myr5XSCuSinckWQ7LUOCIXO',
      // lineItems: [
      //   {
      //     price: 'price_1Myr5XSCuSinckWQ7LUOCIXO',
      //     quantity:1
      //   },
      //   {
      //     price: 'price_1Myr5XSCuSinckWQn2UwW5bf',
      //     quantity:1
      //   }
      // ],
      successUrl:'https://localhost:3000',
      cancelUrl: 'https://localhost:3000',
      active:0,
      status1:'process',
      status2:'process',
      status3:'process',
      status4:'process',
      status5: 'process',
      status6: 'process',
      rera: '',
      reravalidated: false,
      areaValidated: false,
      zipcodeValidated:false,
      propFor: '',
      type: '',
      selectedState: "",
      states: [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
      ],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      selectedCity: '',
      area: '',
      bedrooms: 0,
      bathrooms: 0,
      balconies: 0,
      builtUpArea: 200,
      floor: 0,
      totalFloors: 0,
      age: '',
      posessionByYear: '',
      posessionByMonth: '',
      availabilityStatus: '',
      furnishing: '',
      description: '',
      ageValidated: false, 
      year: year,
      checkAll: false,
      checkedFeatures: [],
      features: featureOptions,
      isIndeterminate: true,
      price: 0,
      zipcode:0
      }
  },
  computed: {
    step1Status() {
      return this.status1
    },
    step2Status() {
      return this.status2
    },
    step3Status() {
      return this.status3
    },
    step4Status() {
      return this.status4
    },
    step5Status() {
      return this.status5
    },
    step6Status() {
      return this.status6
    },
    reraValid() {
      return this.rera.length>=15 && this.rera.length<=30
    },
    forValid() {
      return this.propFor.length>0
    },
    typeValid() {
      return this.type.length>0
    },
    stateValid() {
      return this.selectedState.length > 0
    },
    cityValid() {
      return this.selectedCity.length > 0
    },
    areaValid() {
      return this.area.length>3
    },
    ageValid() {
      return this.age.length>0
    },
    floorValid() {
      return this.floor<=this.totalFloors
    },
    descValid() {
      return this.description.length>=300 && this.description.length<=1000
    },
    furnishValid() {
      return this.furnishing.length>0
    },
    availabilityValid() {
      return this.availabilityStatus.length>0
    },
    zipValid() {
      return this.zipcode.length===6
    }
  },
  methods: {
    openPremiumDialog() {
      if (this.$store.getters.isAuthenticated) {
        this.$alert('Buy the premium subscription to highlight your property in the Hotlist! Proceed for the subscription by clicking the proceed button below!', 'Premium', {
          confirmButtonText: 'Proceed to Buy',
          callback: action => {
            this.submit()
            if (action === 'confirm') {
              this.redirectToCheckout()
            } else {
              this.$message({
                message: 'Property is being posted without premium...',
                type: 'info',
                duration: 2000
              })
            }

          }
        })
      } else {
        this.$message({
          type: 'error',
          message: 'Login to post a property',
          duration: 2000
        })
        this.$router.push({name:'login'})
      }
    },
    async redirectToCheckout() {
      const rera = this.rera
      this.$store.commit('setRera',rera)
      if (!this.stripe) {
        this.stripe = await loadStripe('pk_test_51MygxuSCuSinckWQMAw9Ig81En7GCnRHQnvB8HuXLUfujlne3pTtX2UvcxRY7iWQKu4A5eTOJOLzmXQQyj6wLR4k00JHmgAyNM'); // replace with your own public key
      }
      const { error } = await this.stripe.redirectToCheckout({
        lineItems: [{ price: this.priceId, quantity: 1 }],
        mode: 'subscription',
        successUrl: 'http://localhost:3000/success',
        cancelUrl: 'http://localhost:3000/errorPage',
      });
      
      if (error) {
        console.error(error);
      }
    },
    handleCheckAllChange(val) {
      this.checkedFeatures = val ? featureOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.features.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.features.length;
    },
    setStatus1() {
      if (this.rera.length === 0 || this.propFor.length === 0 || this.type.length === 0) {
        this.$message({
          type: 'error',
          message: 'Fields cannot be empty',
          duration:2000
        })
      }
      if (!this.reraValid) {
        this.$message({
          message: 'RERA number should be minimum 15 and maximum 30 letters',
          type: 'warning',
          duration:2000
        })
      }
      if (this.reraValid && this.forValid && this.typeValid) {
        this.status1 = 'success'
      } else {
        this.status1 = 'error'
      }
    },
    setStatus2() {
      // if (typeof this.zipcode !== 'number') {
      //   this.$message({
      //     type: 'warning',
      //     message: 'Zipcode should be a number',
      //     duration: 1500
      //   })
      // }
      if (this.selectedState.length === 0 || this.selectedCity.length === 0 || this.area.length === 0 || this.zipcode.length===0) {
        this.$message({
          type: 'error',
          message: 'Fields cannot be empty',
          duration: 2000
        })
      }
      if (this.stateValid && this.cityValid && this.areaValid && this.zipValid) {
        this.status2 = 'success'
      } else {
        this.status2 = 'error'
      }
    },
    setStatus3() {
      if (this.age.length === 0 || this.description.length === 0 || this.furnishing.length === 0 || this.availabilityStatus.length === 0) {
        this.$message({
          type: 'error',
          message: 'Fields(Age, Furnishing, Availability Status, Description) cannot be empty',
          duration: 2000
        })
      }
      if (this.ageValid && this.floorValid && this.descValid && this.furnishValid && this.availabilityValid) {
        this.status3 = 'success'
      } else {
        this.status3 = 'error'
      }
    },
    next() {
      if (this.active === 0) {
        this.setStatus1()
        if (this.step1Status==='success') {
          this.active++
        }
      }
      else if (this.active === 1) {
        this.setStatus2()
        if (this.step2Status === 'success') {
          this.active++
        }
      }
      else if (this.active === 2) {
        this.setStatus3()
        if (this.step3Status === 'success') {
          this.active++
        }
      }
      else if (this.active === 3) {
        this.status4='success'
          this.active++
      }
      else if (this.active === 4) {
        this.status5='success'
          this.active++
      }
    },
    previous() {
      if (this.active === 1) {
        this.status1 = 'process'
        this.active--
      } else if (this.active === 2) {
        this.status2 = 'process'
        this.active--
      } else if (this.active === 3) {
        this.status3 = 'process'
        this.active--
      } else if (this.active === 4) {
        this.status4 = 'process'
        this.active--
      } else if (this.active === 5) {
        this.status5 = 'process'
        this.active--
      } else {
        this.status6 = 'process'
        this.active--
      }
    },
    async submit() {
      if (this.price < 5000) {
        this.$message({
          message: 'Enter Property price atleast Rs.5000',
          type: 'error',
          duration: 2000
        })
        this.status6 = 'error'
        return
      } else {
        const propInfo = {
          reraNumber: this.rera,
          society: this.area,
          type: this.type,
          city: this.selectedCity,
          state: this.selectedState,
          lattitude: "19.047353",
          longitude: "72.8200676",
          noOfBalconies: this.balconies,
          noOfBedrooms: this.bedrooms,
          noOfBathrooms: this.bathrooms,
          builtUpArea: this.builtUpArea,
          furnishing: this.furnishing,
          age: this.age,
          floor: this.floor,
          totalFloors: this.totalFloors,
          price: this.price,
          description: this.description,
          for: this.propFor,
          zipcode: this.zipcode
        }
        try {
          this.loading=true
          const res = await postProperty(propInfo)
          const data = res.data
          this.loading=false
          if (data._id === this.rera) {
            this.$store.commit('setRera',data._id)
          } else {
            this.$message({
              type: 'error',
              message: 'Something went wrong',
              duration: 2000
            })
          }
        } catch (err) {
          this.$message({
            type: 'error',
            message: err.response.data.message,
            duration: 2000
          })
        }
        this.status6 = 'success'
      }      
    }
  }
}
</script>

<style scoped>
.steps{
  margin:5% 15%
}
.form{
  margin: 5% 5% 2%;
}
.input{
  width: 95%;
}
.el-icon-circle-close {
    font-size: x-large;
    color: crimson;
}

.el-icon-circle-check {
    font-size: x-large;
    color: green;
}
.datalist{
  width: 24%;
}
.btns{
  margin-left: 5%;
}
.label{
    margin:2% 0 1%
}
.reqd{
    color: crimson;
}

</style>