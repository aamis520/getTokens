<template>
	<div class="Sign">
		<div class="sign_outer">
      <!-- <div class="sign_close" @click="close">
        <img src="../../assets/670384281904014531.png" alt="closeIcon">
      </div> -->
			<div class="Sign_container">
				<div class="sign_title">每日签到</div>
				<div class="sign_con">
				</div>
        <p>算力提升＋1</p>
				<div class="addfriend_btn" @click="SignIn()">领取奖励 + 1</div>
			</div>
		</div>
	</div>
</template>
<script>
import { api } from "@/static/api";
import ErrorMessage from "@/components/ErrorMessage";
export default {
  name: "Signin",
  props: [""],
  data() {
    return {
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      IsShowSignin: true,
      ErrorDesc: ""
    };
  },
  components: {
    ErrorMessage
  },
  created() {
    console.log(this.SignPower);
  },
  mounted() {},
  watch: {
    IsShowSignin: function() {
      this.$emit("SigninStatus", this.IsShowSignin);
    }
  },
  methods: {
    // 点击关闭事件
    close(){
      this.$emit("GetSigninStatusClose");
    },
    // 签到
    SignIn: function() {
      var _this = this;
      api.SignIn(_this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          _this.$store.dispatch("UpdatePower", res.data);
          _this.$store.commit('setAlready', true)
          _this.IsShowSignin = false;
        } else {
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.Sign {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* position: fixed; */
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  // .sign_outer{
  //   background: url('../../assets/login/75285567853764988.png');
  //   background: (100%, 100%);
  //   background-repeat:no-repeat;
  // }

}
.Sign > div {
  // background: url('../../assets/login/75285567853764988.png');
  background: (100%, 100%);
  background-repeat:no-repeat;
  margin: 0 auto;
  position: absolute;
  width: 550px;
  height: 700px;
  left: 0;
  right: 0;
  top: 50%;
  bottom: 0;
  margin-top: -320px;
  background: white !important;
  border-radius: 40px;
  .sign_close{
    position: absolute;
    right: 20px;
    top: 20px;
    width: 55px;
    height: 55px;
    img{
      height: 100%;
      width: 100%;
    }
  }
  .Sign_container{
    margin-top: 76px;
    .sign_con {
      margin: 0 auto;
      margin-top: 50px;
      margin-left: 50%;
      transform: translate(-50%);
      width: 345px;
      height: 225px;
      background: url("~@/assets/login/loginevery.png") no-repeat;
      background-size: (100%, 100%);
    }
    p {
      margin-top: 70px;
      font-size: 26.67px;/*px*/
      color: #ffc80b;
      display: block;
    }
    .addfriend_btn {
      margin: 0 auto;
      margin-top: 50px;
      width: 416px;
      height: 90px;
      line-height: 90px;
      color: white;
      background: -webkit-linear-gradient(right,#feb700, #fdf301); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right,#feb700, #fdf301); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right,#feb700, #fdf301); /* Firefox 3.6 - 15 */
      background: linear-gradient(to left,#feb700, #fdf301); /* 标准的语法 */
      font-size: 30px;/*px*/
      border-radius: 100px;
    }
    .sign_title{
      color: #515151;
      font-size: 31.34px;/*px*/
    }
  }
}
/* .Sign > div > div {
  margin: 0 auto;
  width: 580px;
  height: 58px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin-top: 30px;
  background: white;
  border-radius: 40px;
  padding: 40px;
} */



</style>
