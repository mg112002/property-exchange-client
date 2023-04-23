<template>
    <el-card class="box-card">
        <h1 style="text-align:center;text-decoration: underline;">Agent/Owner Registration Form</h1>
        <el-form :model="ruleForm" status-icon ref="ruleForm" class="demo-ruleForm">
            <p class="label">Name<span class="reqd">*</span></p>
            <el-form-item>
                <el-input placeholder="Enter name" v-model="ruleForm.name" class="name" clearable></el-input>
            </el-form-item>
            <p class="label">Email<span class="reqd">*</span></p>
            <el-form-item>
                <el-input placeholder="Enter email" :class="emailValidated&&!emailValid?'invalid':'valid'" v-model.trim="ruleForm.email" @focus="set('email')" clearable></el-input>
                <i v-if="emailValidated" :class="emailValid ?'el-icon-circle-check':'el-icon-circle-close'"></i>
                <p v-if="emailValidated&&!emailValid" class="errmsg">Invalid Email</p>
            </el-form-item>
            <p class="label">Phone<span class="reqd">*</span></p>
                <el-form-item>
                    <el-input placeholder="Enter phone number" :class="phoneValidated && !phoneValid ? 'invalid' : 'valid'" v-model.trim="ruleForm.phone" @focus="set('phone')" maxlength="10" minlength="10" clearable></el-input>
                    <i v-if="phoneValidated" :class="phoneValid ? 'el-icon-circle-check' : 'el-icon-circle-close'"></i>
                    <p v-if="phoneValidated && !phoneValid" class="errmsg">Invalid Phone Number(Number should start with 6,7,8 or 9 and exactly of length 10)</p>
                </el-form-item>
            <p class="label">Password<span class="reqd">*</span></p>
            <el-form-item >
                <el-input placeholder="Enter password" :class="passValidated&&!passValid?'invalid':'valid'" v-model.trim="ruleForm.password" @focus="set('pass')" show-password></el-input>
                <i v-if="passValidated" :class="passValid ? 'el-icon-circle-check' : 'el-icon-circle-close'"></i>
                <p v-if="passValidated&&!passValid" class="errmsg">Password length should be atleast 6 characters and must have uppercase, lowercase,
            special character and number. </p>
            </el-form-item>
            <p class="label">Repeat Password<span class="reqd">*</span></p>
            <el-form-item>
                <el-input placeholder="Re-enter password" :class="rpassValidated&&!rpassValid?'invalid':'valid'" v-model.trim="ruleForm.rpass"  @focus="set('rpass')" show-password></el-input>
                <i v-if="rpassValidated" :class="rpassValid ? 'el-icon-circle-check' : 'el-icon-circle-close'"></i>
                <p v-if="rpassValidated&&!rpassValid" class="errmsg">Passwords do not match</p>
            </el-form-item>
            <p class="label">ID Proof<span class="reqd">*</span></p>
            <el-form-item>
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture">
                    <el-button size="small" type="primary" @click="addFile">Upload Govt. ID</el-button>
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                </el-upload>
            </el-form-item>
            <p>Already have an account?<router-link to="/login"> Login here!</router-link></p>
            <el-form-item>
                <el-button class="register" @click="submitForm">Register</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>

import {userRegistration} from '@/services/userServices'

export default {
    name: 'RegisterPage',
    data() {
        
        return {
            fileInfo: { name: 'aadhar.jpeg', url: 'https://infostackflow.com/wp-content/uploads/2018/09/Aadhaar-Image.jpg' },
            fileList: [],
            ruleForm: {
                name: '',
                email: '',
                phone: '',
                password: '',
                rpass: ''
            },
            emailValidated: false,
            passValidated: false,
            phoneValidated:false,
            rpassValidated:false
        };
    },
    methods: {
        addFile() {
            this.fileList=[]
            setTimeout(() => {
                this.fileList.push(this.fileInfo)
            },8100)
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        set(elmt) {
            if (elmt === 'email') {
                this.emailValidated = true
            }
            if (elmt === 'pass') {
                this.passValidated=true
            }
            if(elmt==='rpass') {
                this.rpassValidated=true
            }
            if (elmt === 'phone') {
                this.phoneValidated=true
            }
        },
        async submitForm() {
            if (this.emailValid && this.passValid && this.rpassValid) {
                const userInfo = {
                    firstname: this.ruleForm.name,
                    email: this.ruleForm.email,
                    phone:this.ruleForm.phone,
                    password: this.ruleForm.password
                }
                const res = await userRegistration(userInfo)
                const user = res.data
                if (user.firstname === this.ruleForm.name) {
                    this.$message({
                        type: 'success',
                        message: 'Registration successful :)',
                        duration: 1000
                    })
                    setTimeout(() => {
                        this.$message({
                            type: 'info',
                            message: 'You can post properties once you are verified by admin',
                            duration: 3000
                        })
                    },1100)
                    this.$router.push({name:'login'})
                } else {
                    this.$message({
                        type: 'error',
                        message: 'Something went wrong :(',
                        duration: 3000
                    })
                }
            } else if(this.ruleForm.name===''||this.ruleForm.email===''||this.ruleForm.password===''||this.ruleForm.rpass===''||this.ruleForm.phone==='') {
                this.$message({
                    type: 'warning',
                    message: 'All fields are required!!',
                    duration: 2000
                })
            }else {
                this.$message({
                    type: 'warning',
                    message: 'Please resolve the errors and try re-submitting!',
                    duration:2000
                })
            }
        }        
    },
    computed: {
        emailValid() {
            return /^[^@]+@\w+(\.\w+)+\w$/.test(this.ruleForm.email)
        },
        phoneValid() {
            return /^[6789]\d{9}$/.test(this.ruleForm.phone)
        },
        passValid() {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/.test(this.ruleForm.password)
        },
        rpassValid() {
            return this.ruleForm.rpass!==''?this.ruleForm.password === this.ruleForm.rpass:false
        }
    }
}
</script>

<style scoped>
a{
    text-decoration: none;
    color: blue;
}
.reqd{
    color: crimson;
}
.box-card {
    width: 40%;
    height: 100%;
    margin: 2% auto;
    padding-left: 3%;
}
.el-input{
    width: 90%;
}
.el-form-item{
    margin-bottom: 0;
}
.label {
    margin: 5% 0 2%;
}
.errmsg{
    color:crimson;
    margin: 0;
    font-size: small;
    line-height: 1.5;
}
.el-icon-circle-close {
    font-size: x-large;
    color: crimson;
}
.el-icon-circle-check {
    font-size: x-large;
    color: green;
}
.register{
    background-color: #3f51b5;
    color: white;
}
/* @media only screen and (max-width: 710px) {
    .box-card {
        width: 90%;
        margin-top: 25%;
    }
    .el-input {
        width: 85%;
    }
} */
</style>