<template>
  <div class="login bg">
    <!-- <div class="logo"></div> -->
    <div class="loginForm">
      <div class="logintext"></div>
      <div class="loginBox">
        <div :class="{username_icon:!usernameFocus,username_icon_focus:usernameFocus}"></div>
        <div :class="{password_icon:!passwordFocus,password_icon_focus:passwordFocus}"></div>
        <div :class="{code_icon:!codeFocus,code_icon_focus:codeFocus}"></div>
        <div class="code_img" @click="getCode" :title="'点击刷新'"><img :src="srcImg"/></div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
          <div class="lable">
            <span class="ch">账号</span>
            <span class="en">Username</span>
          </div>
          <el-form-item  prop="username">
            <el-input  placeholder="请输入账号" @blur.prevent="usernameOnblur()" @focus.prevent="usernameOnfocus()" v-model="ruleForm.username">
              <i
                class="el-input__icon"
                slot="prefix">
              </i>
            </el-input>
          </el-form-item>
          <div class="lable marTop">
            <span class="ch">密码</span>
            <span class="en">Password</span>
          </div>
          <el-form-item  prop="password" :error="errorMsg">
            <el-input placeholder="请输入密码"  @blur.prevent="passwordOnblur()" @focus.prevent="passwordOnfocus()" @keyup.enter.native="submitForm('ruleForm')" type="password" v-model="ruleForm.password" autocomplete="off">
              <i
                class="el-input__icon"
                slot="prefix">
              </i>
            </el-input>
          </el-form-item>
          <div class="lable marTop">
            <span class="ch"></span>
            <span class="en"></span>
          </div>
          <el-form-item prop="verfyCode" :error="codeErrorMsg">
            <el-input placeholder="请输入验证码" style="width:220px;"  @blur.prevent="codeOnblur()" @focus.prevent="codeOnfocus()" @keyup.enter.native="submitForm('ruleForm')" v-model="ruleForm.verfyCode" autocomplete="off">
              <i
                class="el-input__icon"
                slot="prefix">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item class="marginTop">
            <div class="submitbtn" @click="submitForm('ruleForm')">进去袁之家</div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
// import loginApi from '@/api/login'
import {loginApi}  from 'api/commonApi';
export default {
  data() {
    return {
      srcImg:"",
      usernameFocus:false,
      passwordFocus:false,
      codeFocus:false,
      ruleForm: {
        // password: 'qwert12345',
        // username: 'admin',
        password: '',
        username: '',
        verfyCode:'',
        captcha_id:""
      },
      errorMsg:"",
      codeErrorMsg:"",
      rules: {
        username:[
            {required: true, trigger: "blur",message:"请输入账号"}
        ],
        password:[
            {required: true, trigger: "blur",message:"请输入密码"}
        ],
        verfyCode:[
            {required: true, trigger: "blur",message:"请输入验证码"}
        ],
      }
    };
  },
  created() {
    this.getCode();
    let reg_user = JSON.parse(window.localStorage.getItem('register-user'))
    if (reg_user) {
      this.account.username = reg_user.username
      this.account.pwd = ''
      this.pwdFocus = true
    }
  },
  methods: {
    getCode(){
      console.log(loginApi)
      loginApi.getCode().then(res=>{
        console.log(res.data)
        this.ruleForm.captcha_id = res.data.captcha_id;
        this.srcImg = `data:image/png;base64,${res.data.ubase64}`;
      })
    },
    usernameOnblur(){
      this.usernameFocus = false;
    },
    usernameOnfocus(){
      this.usernameFocus = true;
    },
    passwordOnblur(){
      this.passwordFocus = false;
    },
    passwordOnfocus(){
      this.passwordFocus = true;
    },
    codeOnblur(){
      this.codeFocus = false;
    },
    codeOnfocus(){
      this.codeFocus = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.verfyCode.toLowerCase()!=this.ruleForm.captcha_id.toLowerCase()) {
            this.codeErrorMsg = '验证码错误'
            this.getCode();
            return;
          }
          let param = {
            username:this.ruleForm.username,
            password:this.ruleForm.password,
            captcha_id:this.ruleForm.captcha_id,
            idcode:this.ruleForm.verfyCode
          }
          loginApi.login(param).then(res=>{
            console.log(res)
            if(res.data.code=='10000'){
              this.$router.push({
                path: "/configManagement/jijin",
                query: {}
              });
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style lang="scss" scoped>

.login{
  &.bg{
    width: 100%;
    height: 100vh;
    background: url('/static/views/login/1/bg.png');
  }
  .logo{
    position: absolute;
    top: 120px;
    left: 176px;
    width: 270px;
    height: 68px;
    background: url('/static/views/login/1/logo.png');
  }
  .loginForm{
    width: 533px;
    height: 684px;
    position: absolute;
    top: 220px;
    right: 307px;
    background-color: #fff;
    border-radius: 4px;
    .logintext{
      width: 77px;
      height: 33px;
      margin: 0 auto;
      color: #1449b2;
      background: url('/static/views/login/1/logintext.png');
      background-position: center;
      background-repeat: no-repeat;
      font-size: 34px;
      line-height: 45px;
      text-align: center;
      margin-bottom: 70px;
      margin-top: 50px;
    }
    .loginBox{
      position: relative;
      width: 370px;
      margin: 0 auto;
      height: 250px;
      .submitbtn{
        width: 370px;
        height: 55px;
        background: linear-gradient(to right, #1a5ee4 , #1348af);
        // background-repeat: repeat-x;
        color: #fff;
        text-align: center;
        font-size: 22px;
        font-weight: 600;
        letter-spacing:10px;
        line-height: 54px;
        border-radius: 4px;
        cursor: pointer;
      }
      /deep/ .el-form-item__label{
        color: #fff;
      }
      /deep/ .el-input__inner{
        background-color: #ffffff;
        height: 55px;
        padding-left: 55px;
        font-size: 16px;
        line-height: 55px;
        border: 1px solid #2e729c;
      }
      /deep/ .el-input__inner:focus{
        border: 1px solid #ea5ee5;
      }
      .lable{
        margin-bottom: 15px;
        .ch{
          font-size: 24px;
        }
        .en{
          font-size: 18px;
          font-weight: 400;
        }
        &.marTop{
          margin-top: 50px;
        }
      }
      .username_icon{
        position:absolute;
        width: 16px;
        height: 20px;
        top:64px;
        left: 24px;
        z-index: 1;
        background: url('/static/views/login/1/username.png');
      }
      .username_icon_focus{
        position:absolute;
        width: 16px;
        height: 20px;
        top:64px;
        left: 24px;
        z-index: 1;
        background: url('/static/views/login/1/username_focus.png');
      }
      .password_icon{
        position:absolute;
        width: 16px;
        height: 20px;
        top:216px;
        left: 22px;
        z-index: 1;
        background: url('/static/views/login/1/password.png');
      }
      .password_icon_focus{
        position:absolute;
        width: 16px;
        height: 20px;
        top:216px;
        left: 22px;
        z-index: 1;
        background: url('/static/views/login/1/password_focus.png');
      }
      .code_icon{
        position:absolute;
        width: 16px;
        height: 20px;
        top:320px;
        left: 22px;
        z-index: 1;
        background: url('/static/views/login/1/code.png');
      }
      .code_icon_focus{
        position:absolute;
        width: 16px;
        height: 20px;
        top:320px;
        left: 22px;
        z-index: 1;
        background: url('/static/views/login/1/code_focus.png');
      }
      .code_img{
        position:absolute;
        width: 139px;
        height: 55px;
        top: 302px;
        left: 231px;
        border: 1px solid #2e729c;
        z-index: 1;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .marginTop{
      margin-top: 40px;
    }
  }
}
</style>
