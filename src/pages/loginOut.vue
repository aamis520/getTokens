<!--  -->
<template>
  <div class="loginOut">
    <tar-header :isSowBack='true' :title="title"></tar-header>
    <div class="loginOut_container">
      <div class="loginOut_title" @click="goinSetName">
        <div class="imgLeft">
          <img src="../assets/loginoutTitle.png" alt="pic">
        </div>
        <div class="middle">
          <span>设置昵称</span>
        </div>
        <div class="right">
          <img src="../assets/Shape.png" alt="pic">
        </div>
      </div>
    </div>
    <div class="loginOut_container">
      <div class="loginOut_title" @click="changePwd">
        <div class="imgLeft">
          <img src="../assets/loginoutTitle.png" alt="pic">
        </div>
        <div class="middle">
          <span>修改密码</span>
        </div>
        <div class="right">
          <img src="../assets/Shape.png" alt="pic">
        </div>
      </div>
    </div>
    <div class="loginOut_foot">
      <button @click="loginOut">退出登录</button>
    </div>
  </div>
</template>

<script>
import header from "../pages/comm/header";
import {api} from '@/static/api'
export default {
  data () {
    return {
      title: '设置',
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
    };
  },

  components: {
    tarHeader: header
  },

  computed: {},

  mounted() {},

  methods: {
    changePwd(){
      this.$router.push({
        path: '/setPassword',
        query: {
          from: 'change'
        }
      })
    },
    loginOut(){
      api.userLogOut({user_id: this.$store.getters.UserId}, this.ApiConf).then(res => {
        if(res.error_code == 1000){
          this.$store.dispatch('UserLogout')
          this.$router.push({
            name: 'Home'
          })
        }
      }).catch(err => {
        this.$toast({
          message: err.error_desc,
          duration: 1000
        })
      })
    },
    goinSetName(){
      this.$router.push({
        path: 'setName'
      })
    }
  }
}

</script>
<style lang='scss' scoped>
  .loginOut{
    height: 100%;
    .loginOut_container{
      width: 100%;
      height: 110px;
      .loginOut_title{
        margin: 10px 30px;
        border-bottom: 1px solid #eee;/*no*/
        height: 100%;
        // background: red;
        .imgLeft{
          float: left;
          margin: 50px 0 0 0;
          height: 30px;
          width: 30px;
          img{
            height: 100%;
            width: 100%;
          }
        }
        .middle{
          font-size: 28px;/*px*/
          margin: 45px 0 0 50px;
          height: 30px;
          float: left;
        }
        .right{
          margin-top: 50px;
          float: right;
          height: 30px;
          width: 18px;
          img{
            height: 100%;
            width: 100%;
          }
        }
      }
      // border: 1px solid
    }
    .loginOut_foot{
      position:fixed;
      bottom: 0;
      width: 100%;
      height: 95px;
      button{
        letter-spacing: 5px;
        font-size: 25px;/*px*/
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
