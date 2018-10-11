<template>
  <div class="reister">
    <tar-header :backUrl="backUrl" :title="title"></tar-header>
      <div class="main">
        <div class="register_head">
          <span>
            用户注册
          </span>
        </div>
        <div class="mobile">
          <div class="selectCotuny" @click="selectClick">
            <span class="selectCotuny_left">国家/地区：</span>
            <span class="selectCotuny_left">{{country}}</span>

            <span class="sanjiao">
              <i :class="upOrDown ? 'up' : 'down'"></i>
            </span>
          </div>
        </div>
        <div class="mobile selectCode">
          <div class="mobileAreaCode">
            <!-- <span>{{(mobileCode)}}</span> -->
            <span>(+ {{mobileCode}})</span>
          </div>
          <input type="text" placeholder="手机号" v-model="mobile" />
        </div>
      <div class="code">
        <input type="text" placeholder="验证码" v-model="code" />
        <a href="javascript:void(0);" @click="SendCode">
          <countdown v-if="countingidentifyCode"
            :time="59000"
            :leadingZero="true"
            @countdownend="countidentifyCodeDownEnd" @countdownprogress="countdownprogress">
            <template slot-scope="props" >
              <span v-if="props.seconds > 0">{{ props.seconds }}s</span>
            </template>
          </countdown>
          <span v-else>{{SendBottonData.Title}}</span>
        </a>
      </div>
      <div class="mobile">
        <input type="text" placeholder="邀请码（选填）" v-model="InviteCode"/>
      </div>
      <div class="btn" :class="{btn_put:IsPut}" href="javascript:void(0);" @click="register">注册</div>
      <!-- <ErrorMessage :ErrorDescShow="ErrorDesc"></ErrorMessage> -->
      </div>
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
      </mt-actionsheet>
      <mt-actionsheet
        :actions="actionsArea"
        v-model="selectArea">
      </mt-actionsheet>
  </div>
</template>
<script>
import header from "../../pages/comm/header";
import { api } from "@/static/api";
// import { checkerror } from "@/static/common";
import { checkerror } from "@/static/common";
import ErrorMessage from "@/components/ErrorMessage";
import countdown from "@xkeshi/vue-countdown"; // 倒计时插件
export default {
  name: "Register",
  props: {},
  data() {
    return {
      country: '中国大陆',
      areaType: '1',
      mobileCode: '86',
      // placeholderTel: '手机号',
      upOrDown: false,
      selectArea: false, // 选择国际/国内
      sheetVisible: false, // 选择区号
      backUrl: "Home",
      title: "注册",
      mobile: "",
      code: "",
      InviteCode: "",
      LocalName: "",
      IsPut: false, //是否能提交数据
      SendBottonData: {
        Time: 60,
        Title: "发送验证码",
        IsSend: true,
        Interval: ""
      },
      CheckErrorData: {},
      countingidentifyCode: false,
      actions: [
        {
          name: "+86",
          method: this.gateIo
        },
        {
          name: "+852", // 香港
          method: this.gateIo
        },
        {
          name: "+886", // 台湾
          method: this.gateIo
        }
      ],
      actionsArea: [
        {
          name: "中国大陆",
          method: this.gateIo
        },
        {
          name: "香港",
          method: this.gateIo
        },
        {
          name: "台湾",
          method: this.gateIo
        }
      ],
      ErrorDesc:''
    };
  },
  components: {
    ErrorMessage,
    countdown,
    tarHeader: header
  },
  created() {},
  mounted() {},
  watch: {
    //监控选择图标之后的方向变化
    selectArea(value){
      if(value == false){
        this.upOrDown = false
      }
    },
    code() {
      this.CheckValue();
    },
    mobile() {
      this.CheckValue();
    }
  },
  methods: {
    selectClick(){
      this.upOrDown = true,
      this.selectArea = true
      // console.log('国家')
    },
    gateIo(data) {
      console.log(data)
      this.upOrDown = !this.upOrDown
      if(data.name == '中国大陆') {
        this.country = '中国大陆'
        this.areaType = '1'
        this.mobileCode = '86'
      } else if(data.name == '香港'){
        this.country = '香港'
        this.areaType = '2'
        this.mobileCode = '852'
      } else if (data.name == '台湾'){
        this.country = '台湾'
        this.areaType = '2'
        this.mobileCode = '886'
      }
      // console.log("选择");
      // console.log(data)
      // this.upOrDown = false
      // this.beanClassify = data.name
      // this.form.cointype = data.coin_id
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
    register() {
      var _this = this;
      if (!_this.IsPut) {
        return;
      }
      _this.CheckErrorData = checkerror.Register(_this.mobile, _this.code);
      if (_this.CheckErrorData.code != 1000) {
        // _this.ErrorDesc = res.error_desc+((new Date()).getTime());
        return;
      }
      var data = {
        area : _this.mobileCode, // 国际区号
        type: _this.areaType, //1默认国内， 2是国际
        mobile: _this.mobile,
        code: _this.code,
        invite_code: _this.InviteCode
      };
      // 访问接口
      api.Register(data)
        .then(res => {
          // 如果注册成功
          if (res.error_code == 1000) {
            _this.$store.dispatch("UserLogin", res.data);
            if (res.data.set_nickname == "0") {
              _this.$router.push({
                path: "/SetName",
                query: {
                  from: "regist"
                }
              });
            } else {
              _this.$router.push({ name: "Home" });
            }
            _this.LocalName = _this.$store.getters.Name;
            // _this.ErrorData.Desc = '注册成功'
            // _this.ShowError()
            // setTimeout(function() {
            // if(_this.LocalName == ''){
            // 	_this.$router.push({name:'SetName'})
            // }else{
            // 	_this.$router.push({name:'Home'})
            // }
            // }, 0);
          } else if (res.error_code == 3010) {
            _this.$router.push({ name: "Login" });
          } else {
            this.$toast({
              message: res.error_desc,
              duration: 1000
            });
            // _this.ErrorDesc = res.error_desc+((new Date()).getTime());
          }
        })
        .catch(err => {
          if (err.error_desc) {
            this.$toast({
              message: err.error_desc,
              duration: 1000
            });
          }
        });
      // self.err = CheckError.login(self.mobile,self.pwd,self.sliderStatus)
    },
    countidentifyCodeDownEnd() {
      this.SendBottonData.IsSend = true;
      this.SendBottonData.Title = "重新发送";
      this.countingidentifyCode = false;
    },
    countdownprogress(data) {
      if (data.seconds == 1) {
        this.countidentifyCodeDownEnd();
      }
    },
    SendCode() {
      if (this.countingidentifyCode) {
        return;
      }
      // 发送验证码
      var _this = this;

      // if (!_this.SendBottonData.IsSend) { // false
      //   return;
      // }

      // 检查错误
      _this.CheckErrorData = checkerror.SendRegisterCode(_this.mobile, _this.country);
      if (_this.CheckErrorData.code !== 1000) {
        _this.$toast({
          message: _this.CheckErrorData.desc,
          duration: 1000
        });
        // _this.ErrorDesc = res.error_desc+((new Date()).getTime());
        return;
      }
      var data = {
        mobile: _this.mobile,
        area : _this.mobileCode, // 国际区号
        type: _this.areaType, //1默认国内， 2是国际
      };

      // 访问接口
      _this.countingidentifyCode = true;
      api
        .SendRegisterCode(data)
        .then(res => {
          if (res.error_code == 1000) {
            _this.countingidentifyCode = true;
            // _this.SendInterval();
            _this.SendBottonData.IsSend = false;

            return;
          } else {
            _this.countingidentifyCode = false;
            this.$toast({
              message: res.error_desc,
              duration: 1000
            });
            _this.SendBottonData.IsSend = false;
            // _this.ErrorDesc = res.error_desc+((new Date()).getTime());
          }
        })
        .catch(err => {
          _this.SendBottonData.IsSend = false;
          this.$toast({
            message: res.error_desc,
            duration: 1000
          });
          _this.countingidentifyCode = false;
        });
    },
    CheckValue() {
      //检查是否可以提交数据
      if ((this.mobile != "") & (this.code != "")) {
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
.reister {
  height: 100%;
  width: 100%;
}
.main {
  /* background-repeat: no-repeat; */
  /* background-size: (100%, 100%); */
  /* background-image:url('../../assets/register.jpg'); */
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 100px;
}
.mobile,
.code {
  position: relative;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #ececec; /*no*/
  overflow: hidden;
  margin-top: 50px;
  .mobileAreaCode{
    position: absolute;
    left: 30px;
    font-size: 27px;/*px*/
    line-height: 75px;
    // background: red;
  }
}
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
  color: #000000;
}
.selectCode > input{
  padding-left: 130px;
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
  color: #ffae00 !important;
  margin-top: 20px;
  border-left: 1px solid #ececec; /*no*/
}
.btn {
  width: 100%;
  margin: 0 auto;
  // display: block;
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
.register_head {
  margin-top: 40px;
  color: #231815;
  font-size: 54px; /*px*/
  text-align: left;
  height: 120px;
  // background: red;
}
// 后加上去的
.selectCotuny{
  text-align: left;
  position: relative;
  height: 100%;
  width: 100%;
  padding-left: 30px;
  .selectCotuny_left{
    color: #000000;
    font-size: 26.67px;/*px*/
    line-height: 70px;
    // text-align: left;
  }
  // background: red;
}
.sanjiao {
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  border-width: 0 16px 16px;
  border-style: solid;
  border-color: transparent transparent transparent;
}
.sanjiao i {
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  top: 6px;
  left: -10px;
}
.sanjiao i.down {
  border-width: 8px 8px 0;
  border-color: #000000 transparent transparent;
}
.sanjiao i.up {
  border-width: 0 8px 8px;
  border-color: transparent transparent #000000;
}
</style>
