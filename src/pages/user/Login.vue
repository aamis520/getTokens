<template>
    <div class="main">
      <div class="login_span">
        <h1>用户登录</h1>
      </div>
      <div class="mobile">
        <input type="text" placeholder="请输入手机号码" v-model="mobile"/>
      </div>
      <div class="mobile" v-if="!loginByCode">
        <input type="password" placeholder="请输入密码" v-model="pass"/>
      </div>
      <div class="code" v-if="loginByCode">
        <input type="text" placeholder="请输入验证码" v-model="code"/>
        <span class="sendCode" href="javascript:void(0);" @click="SendCode">
          <countdown v-if="countingidentifyCode"
            :time="60000"
            :leadingZero="false"
            @countdownend="countidentifyCodeDownEnd" @countdownprogress="countdownprogress">
            <template slot-scope="props" >
              <span v-if="props.seconds > 0">{{ props.seconds }}s</span>
            </template>
          </countdown>
          <span v-else>{{SendBottonData.Title}}</span>
        </span>
      </div>
      <span class="register_a" v-if="loginByCode" @click="loginByCode = !loginByCode">密码登录</span>
      <span class="register_a" v-if="!loginByCode"  @click="loginByCode = !loginByCode">验证码登录</span>
      <div class="btn" :class="{btn_put:IsPut}" v-if="loginByCode" @click="login">进入GetTokens</div>
      <div class="btn btn_put"  v-if="!loginByCode" @click="loginByPass">进入GetTokens</div>
      <span class="register_a register_first" @click="$router.push('/register')">没有账号？去注册</span>

      <ErrorMessage :ErrorDescShow="ErrorDesc"></ErrorMessage>
    </div>
</template>
<script>
import { api } from "@/static/api";
import { checkerror } from "@/static/common";
import ErrorMessage from "@/components/ErrorMessage";
import { Toast, Indicator } from "mint-ui";

import countdown from "@xkeshi/vue-countdown"; // 倒计时插件

export default {
  name: "login",
  props: {},
  data() {
    return {
      mobile: "",
      pass: '',
      code: "",
      LocalName: "",
      IsPut: false, //是否能提交数据
      loginByCode: false,
      SendBottonData: {
        Time: 60,
        Title: "发送验证码",
        IsSend: true,
        Interval: ""
      },
      ErrorDesc: "",
      countingidentifyCode: false
    };
  },
  components: {
    ErrorMessage,
    countdown
  },
  created() {
  },
  mounted() {
    this.getWeixin()
    // this.getWeixin()
  },
  watch: {
    code() {
      this.CheckValue();
    },
    mobile() {
      this.CheckValue();
    }
  },
  methods: {
    getWeixin(data){
      var _this = this
      var url = location.search; //获取url中"?"符后的字串
      url = url + "&" + new Date().getTime()
      // var url = 'http://f.dev.zhuandian.net/userno/wxEntrance?code=061K32F008mGrG1SX1H00XZLE00K32Fm&state=1'; //获取url中"?"符后的字串
      if (url.indexOf("?") != -1) {  //判断是否有参数
        var str = url.substr(1) //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
        var strs = str.split("=")  //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
        var wxCode = strs[1]
        var twoSplit = ''
        if(wxCode.indexOf("&") != -1){
          var twoSplitArr= wxCode.split("&")
          twoSplit = twoSplitArr[0]
        } else {
          twoSplit = strs[1]
        }
        // var obj = {
        //   wxCode: data
        // }
        console.log(twoSplit)
        // alert(strs[1]);     //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
      }
      var obj = {
        wxCode: twoSplit
      }
      api.getWeixin(obj)
      .then(res => {
        if (res.error_code == 1000) {
          _this.$store.dispatch("UserLogin", res.data);
          _this.$router.push({
            path: '/Home'
          })
          // _this.LocalName = _this.$store.getters.Name;
          // if (_this.LocalName == "") {
          //   _this.$router.push({ name: "SetName" });
          // } else {
          //   _this.$router.push({ name: "Home" });
          // }
        } else if(res.error_code == 1003) {
          window.location.href = res.data
        } else {
          return false
        }
      })
    },
    SendInterval() {
      //发送短信倒计时
      var _this = this;
      var time = _this.SendBottonData.Time;
      _this.SendBottonData.Interval = setInterval(() => {
        if (time > 0) {
          _this.SendBottonData.Title = time + "秒";
          time--;
        } else {
          _this.SendBottonData.IsSend = true;
          _this.SendBottonData.Title = "发送验证码";
          clearInterval(_this.ErrorData.Interval);
          _this.SendBottonData.Interval = null;
        }
      }, 1000);
    },
    countidentifyCodeDownEnd(){
      this.SendBottonData.IsSend = true
      this.SendBottonData.Title = '重新发送'
      this.countingidentifyCode = false
    },
    countdownprogress(data){
      if(data.seconds == 1){
        this.countidentifyCodeDownEnd()
      }
    },
    // 发送验证码
    SendCode() {
      if(this.countingidentifyCode){
        return
      }
      var _this = this;

      if (!_this.SendBottonData.IsSend) {
        return;
      }

      // 检查错误
      _this.CheckErrorData = checkerror.SendLoginCode(_this.mobile);
      console.log(_this.CheckErrorData);
      if (_this.CheckErrorData.code != 1000) {
        _this.ErrorDesc = _this.CheckErrorData.desc + new Date().getTime();
        return;
      }

      var data = {
        mobile: _this.mobile
      };

      // 访问接口
      _this.countingidentifyCode = true
      api.SendLoginCode(data).then(res => {
        console.log(res)
        if (res.error_code == 1000) {
          // _this.SendInterval();

          // _this.countingidentifyCode = true
          _this.SendBottonData.IsSend = false;
          return;
        } else {
          _this.countingidentifyCode = false
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      }).catch(err => {
        _this.countingidentifyCode = false
      })
    },
    loginByPass(){
      let _this = this
      // if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.mobile)) {
      //   Toast({
      //     message: "请输入正确的手机号。", //提示内容分
      //     duration: 1000
      //   });
      //   return;
      // }
      var data = {
        mobile: _this.mobile,
        password: _this.pass,
        class: 2
      };
      Indicator.open({
        text: "登录中...",
        spinnerType: "fading-circle"
      });
      // TODO 调用使用密码登陆接口
      api.loginByPass(data).then(res => {
       if (res.error_code == 1000) {
          _this.$store.dispatch("UserLogin", res.data);
          Indicator.close();
          // Toast({
          //   message: '登录成功',
          //   duration: 1000 ,
          //   iconClass: 'mint-toast-icon mintui mintui-success'
          // })
          _this.LocalName = _this.$store.getters.Name;
          if (_this.LocalName == "") {
            _this.$router.push({ name: "SetName" });
          } else {
            _this.$router.push({ name: "Home" });
          }
        } else {
          Indicator.close();
          Toast({
            message: res.error_desc, //提示内容分
            duration: 1000, //持续时间（毫秒），若为 -1 则不会自动关闭
            iconClass: "mint-toast-icon mintui mintui-field-error" //icon 图标的类名
          });
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      }).catch(err => {
        Indicator.close()
      });
    },
    login() {
      var _this = this;
      if (!_this.IsPut) {
        return;
      }
      // if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.mobile)) {
      //   Toast({
      //     message: "请输入正确的手机号。", //提示内容分
      //     duration: 1000
      //   });
      //   return;
      // }
      _this.CheckErrorData = checkerror.Register(_this.mobile, _this.code);
      if (_this.CheckErrorData.code != 1000) {
        _this.ErrorData.Desc = _this.CheckErrorData.desc;
        _this.ShowError();
        return;
      }
      var data = {
        mobile: _this.mobile,
        code: _this.code
      };
      Indicator.open({
        text: "登录中...",
        spinnerType: "fading-circle"
      });
      // 访问接口
      api.Login(data).then(res => {
        if (res.error_code == 1000) {
          _this.$store.dispatch("UserLogin", res.data);
          Indicator.close();
          // Toast({
          //   message: '登录成功',
          //   duration: 1000 ,
          //   iconClass: 'mint-toast-icon mintui mintui-success'
          // })
          _this.LocalName = _this.$store.getters.Name;
          if (_this.LocalName == "") {
            _this.$router.push({ name: "SetName" });
          } else {
            _this.$router.push({ name: "Home" });
          }
        } else {
          Indicator.close();
          Toast({
            message: res.error_desc, //提示内容分
            duration: 1000, //持续时间（毫秒），若为 -1 则不会自动关闭
            iconClass: "mint-toast-icon mintui mintui-field-error" //icon 图标的类名
          });
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      }).catch(err => {
        Indicator.close()
      });
    },
    CheckValue() {
      //检查是否可以提交数据
      if ((this.mobile != "") && (this.code != "" && this.code.length == 4)) {
        this.IsPut = true;
      } else {
        this.IsPut = false;
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.main {
  /* background: #040016 url('~@/assets/login_1.png') no-repeat top; */
  /* background-size:100% auto; */
  width: 100%;
  height: 100%;
  overflow: hidden;
  // padding: 700px 100px;
  padding: 0 100px;
}

.mobile,
.code {
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #ececec; /*no*/
  overflow: hidden;
  margin-top: 40px;
  .sendCode{
    line-height: 70px;
  }
}
// .code{
//   margin-top: 10px;
// }
//
.mobile > input,
.code > input {
  width: 100%;
  float: left;
  height: 70px;
  line-height: 70px;
  background: none;
  border: none;
  font-size: 35px; /*px*/
  padding: 0 30px;
  color: #000000 !important;
}
.code > input {
  width: 350px;
}
.code > a {
  width: 170px;
  float: right;
  line-height: 30px;
  height: 30px;
  font-size: 24px; /*px*/
   color:#ffae00;
  // color: white;
  margin-top: 20px;
  border-left: 1px solid #ececec; /*no*/
}
.btn {
  width: 100%;
  margin: 0 auto;
  height: 90px;
  font-size: 30px; /*px*/
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
.register_a {
  // float:left;
  display: block;
  text-align: right;
  font-size: 27px; /*px*/
  color: #c0b9c5;
  margin-top: 20px;

  margin-right: 30px;
}
.register_first{
  margin-top: 80px;
  text-align: left;
  text-decoration: underline;
}
.login_span {
  padding-top: 208px;
  text-align: left;
  height: 320px;
  // background: red;
  h1 {
    color: #231815;
    font-size: 54px; /*px*/
  }
}
</style>
