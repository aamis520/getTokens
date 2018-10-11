<template>
  <div class="setName">
    <tar-header :isSowBack='isSowBack' :title="title"></tar-header>
    <div class="main">
      <div class="setName_head">
        <h1>设置密码</h1>
      </div>
      <div class="name">
        <input type="password" placeholder="请设置登录密码" v-model="password"/>
      </div>
      <div class="name">
        <input type="password" placeholder="请确认登录密码" v-model="rePassword"/>
      </div>
      <span class="register_a">6-12位数字与字母组合</span>
      <span class="btn btn_put" @click="SetName">确认</span>
      <!-- <ErrorMessage :ErrorDescShow="ErrorDesc"></ErrorMessage> -->
    </div>
  </div>
</template>
<script>
import header from "../../pages/comm/header"
import { api } from "@/static/api";
import {reg } from '@/static/common.js'
import { checkerror } from "@/static/common";
import { Toast } from "mint-ui";

// import ErrorMessage from "@/components/ErrorMessage";
export default {
  name: "SetName",
  props: {},
  data() {
    return {
      password: '',
      rePassword: '',
      isSowBack: true,
      backUrl:'/register',
      title: '设置密码',
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      name: "",
      IsPut: false, //是否能提交数据
      CheckErrorData: {},
      ErrorDesc: "",
      query: { from: '' }
    };
  },
  components: {
    tarHeader: header
   },
  created() {
    this.query = this.$router.currentRoute.query
  },
  mounted() {},
  watch: {
    name() {
      console.log(1);
      if (this.name != "") {
        this.IsPut = true;
      } else {
        this.IsPut = false;
      }
    }
  },
  methods: {
  // 设置名称
  // TODO 修改密码
    SetName() {
      if(this.password == "" || this.rePassword == ""){
        Toast({
          position: 'top',
          message: '请输入密码', //提示内容分
          duration: 1000 //持续时间（毫秒），若为 -1 则不会自动关闭
        })
        return
      }
      if(this.password !== this.rePassword){
        Toast({
          position: 'top',
          message: '两次输入的密码不一致', //提示内容分
          duration: 1000 //持续时间（毫秒），若为 -1 则不会自动关闭
        })
        return
      }
      if(!reg.password.test(this.password)){
          Toast({
            position: 'top',
            message: '请输入6-12位数字与密码的组合', //提示内容分
            duration: 1000 //持续时间（毫秒），若为 -1 则不会自动关闭
          })
          return
        }

      var data = {
        repassword: this.rePassword,
        password: this.password
      };
      // 访问接口
      let _this = this
      api.setPassword(data, _this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          Toast({
            message: '设置密码成功',
            duration: 1000
          })
          _this.$router.push({ name: "Home" })
          return;
        } else {
           Toast({
            message: res.error_desc,
            duration: 1000
          })

        }
      });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.setName{
  height: 100%;
  width: 100%;
}
.main {
  /* background: #040016; */
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 100px;
}
.name {
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #ececec;
  overflow: hidden;
  margin-top: 40px;
}

.name > input {
  width: 100%;
  float: left;
  height: 70px;
  line-height: 70px;
  background: none;
  border: none;
  font-size: 35px;
  padding: 0 30px;
  color: #000000;
}
.btn {
  width: 100%;
  display: block;
  height: 90px;
  font-size: 30px;
  line-height: 90px;
  color: white;
  margin-top: 110px;
  border-radius: 100px;
  background: #ececec; /* Safari 5.1 - 6.0 */
}
.btn_put {
  background: -webkit-linear-gradient(
    left,
    #ffae00,
    #fdee01
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #ffae00,
    #fdee01
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #ffae00,
    #fdee01
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #ffae00, #fdee01); /* 标准的语法 */
}
.setName_head{
  text-align: left;
  height: 120px;
  // background: red;
  h1{
    font-size: 54px;/*px*/
    color:#231815;
  }
}
.register_a {
  display: block;
  text-align: left;
  font-size: 27px; /*px*/
  color: red;
  margin-top: 20px;/*no*/
}
</style>
