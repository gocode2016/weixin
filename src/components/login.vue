<template>
  <div class="login">
     <div class="container">
       <div class="con">
          <div class="title">
            <span>家视天下系统</span>
          </div>
          <div class="main_login" v-loading="loading" :element-loading-text="loading_text">
              <div class="zhang">账号登录</div>
              <div class="error iconfont icon-error" v-show="isShow">{{tips}}</div>
              <el-form ref="form" :model="form" label-width="80px" label-position="left" :rules="rules" :show-message="message"  v-on:keyup.enter="submitForm('form')">
                  <el-form-item prop="name">
                        <el-input placeholder="用户名" v-model="form.name" class="iconfont icon-iconfontyonghuming" icon="circle-close"  :on-icon-click="nameIconClick"></el-input>
                  </el-form-item>
                  <el-form-item prop="pass">
                        <el-input  type="password"placeholder="密码" v-model="form.pass"  class="iconfont icon-mima" icon="circle-close" :on-icon-click="passIconClick"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">{{login}}</el-button>
                  </el-form-item>
          </el-form></div>
       </div>
       <div class="footer">
            <div class="footerL">
              <div class="message">
                  <p>
                    <span>联系电话：XXXXXXXX</span>
                    <span>Q Q：XXXXXXXX</span>
                    <span>E-mail：XXXXXXXX</span>
                    <span>地址：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                  </p>
                  <p>COPYRIGHT © 2002-2011 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
              </div>
            </div>
            <div class="footerR">
               <img src="../common/img/zqzy.png">
               <p>家视天下</p>
            </div>
        </div>
       </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      isShow:false,
      login:'登录',
      loading:false,
      tips:'请输入密码',
      message:false,
      loading_text:'加载中',
      form:{
        name:'',
        pass:''
      },
      rules: {
          name: [
            { required: true, message: '', trigger: 'blur' },
          ],
          pass: [
            { required: true, message: '', trigger: 'blur' }
          ]
      }
    }
  },
  components:{
  },
  created(){

  },
  methods:{
    nameIconClick(value){
          this.form.name = ''
    },
    passIconClick(value){
          this.form.pass = ''
    },
    submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.loading = true
             this.loading_text = '登陆中'

          } else {
            if(this.form.pass == '' && this.form.name == '' ){
               this.tips = "请输入用户名和密码"
            }else{
                if(this.form.name == ''){
                    this.tips = "请输入用户名"
                }
                if(this.form.pass == ''){
                  this.tips = "请输入密码"
                }
            }
            this.isShow = true
            setTimeout(() => {
                this.isShow = false
            }, 3000);
            return false;
          }
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
.login{
    width:100%;
    height:100%;
    background:url('../common/img//bg.png') no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -webkit-background-size: 100% 100%;

    .container{
      width: 60%;
      height:100%;
      margin:0 auto;
      .con{
        width:460px;
        height:70%;
        margin:0 auto;
        overflow: hidden;
        .title{
          width:100%;
          height:35%;
          position:relative;
          span{
              font-size: 60px;
              margin: auto;
              width: 100%;
              left: 0;
              top: 0;
              bottom: 0;
              right: 0;
              position: absolute;
              color: #fff;
              height: 70px;
              margin: auto;
          }
        }
        .main_login{
          height:57%;
          background:rgba(255, 255, 255, 0.9);
          overflow: hidden;
          position: relative;
          .error {
              width: 380px;
              height: 35px;
              margin: 0px auto;
              line-height: 35px;
              text-align: left;
              background: #bce3f5;
              left: 0;
              top: 0;
              bottom: 0;
              right: 0;
              position: absolute;
              margin: 17% auto;
          }
          .el-form{
            width:380px;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            position: absolute;
            margin: 26% auto;
            .el-form-item{
                margin-left: -80px;
                height: 55px;
                margin-bottom: 35px;
                .el-form-item__content{
                  height:100%;
                  .el-input{
                     height:100%;
                     .el-input__inner{
                         height:100%;
                         border-radius: 0px;
                         border-color: #e2dbdb;
                         padding-left: 65px;
                         &:focus {
                            border-color:#24a5e0;
                            box-shadow:none;
                          }
                     }
                  }
                }
                .el-button--primary {
                    color: #fff;
                    width: 100%;
                    background-color: #20a0ff;
                    border-color: #20a0ff;
                    width: 100%;
                    height: 100%;
                    font-size: 22px;
                }
            }
          }
          .zhang{
            font-size: 28px;
            text-align: left;
            padding: 22px 0 1px 41px;
            font-size:30px;
          }
        }
      }
      .footer{
       width:100%;
       height:30%;
       .footerL{
         width:80%;
         height:80px;
         margin-top: 10%;
         border-right: 1px solid rgba(255, 255, 255, 0.5);
         font-size:14px;
         float:left;
         position: relative;
         .message{
            position: absolute;
            margin: auto;
            left:0;
            right: 0;
            top: 0;
            bottom: 0;
            width:100%;
            height:50px;
            line-height: 30px;
            p{
                color:#fff;
                opacity:0.5;
                filter:alpha(opacity=50);
                span{
                  padding:10px;
                }
            }
         }
       }
       .footerR{
          width:62px;
          height:80px;
          float:left;
          left:50%;
          margin-top: 10%;
          margin-left:40px;
          p{
            color:#fff;
             font-size:14px;
             opacity:0.5;
             filter:alpha(opacity=50);
          }

       }
     }
    }
}
@media screen  and (max-height:910px){
  .login .container .con {
      height: 82%;
  }
  .login .container .footer {
      height: 12%;
  }
  .login .container .footer .footerL,.login .container .footer  .footerR {
    margin-top: 0;
  }

}
@media screen  and (max-height:770px){

  .login .container .con .title {
    height: 25%;
  }
  .login .container .con .main_login {
    height: 73%;
}
}
</style>
