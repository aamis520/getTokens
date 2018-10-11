<!--  -->
<template>
  <div class="outerGetPack" ref="outerGetPack_container">
    <!-- <tar-header :title="title"></tar-header> -->
    <div class="outerGetPack_container">
      <div class="head"></div>
      <div class="containerBody">
        <div class="redPacktitle">
        </div>
        <div class="containerBody_input">
          <div class="areaSelect">
            <span class="sanjiao">
              <i :class="upOrDown ? 'up' : 'down'"></i>
            </span>
            <!-- <img class="mobilePic" src="../assets/getPack/mobile.png" alt="icon"> -->
            <div class="selectCountry" @click="selectCountry">
              <span>国家/地区</span> &nbsp;&nbsp;
              <span>{{country}}</span>
            </div>
          </div>
          <div class="top">
            <img class="mobilePic" src="../assets/getPack/mobile.png" alt="icon">
            <span class="mobileCode">(+{{mobileCode}})</span>
            <input v-model="form.mobile" class="mobileInput" placeholder="请输入手机号" type="text">
          </div>
          <div class="bom">
            <input v-model="form.code" class="codeInput" placeholder="请输入验证码" type="text">
            <img class="codePic" src="../assets/getPack/code.png" alt="icon">
            <button class="bom_btn" @click="getCodeClick">
              <countdown v-if="countingidentifyCode"
                :time="60000"
                :leadingZero="false"
                @countdownend="countidentifyCodeDownEnd" @countdownprogress="countdownprogress">
                <template slot-scope="props" >
                  <span v-if="props.seconds > 0">{{ props.seconds }}s</span>
                </template>
              </countdown>
              <span v-else>{{codeTitle}}</span>
            </button>
          </div>
        </div>
        <div class="getTime">
          <button @click="getPackTime">立即领取</button>
        </div>
        <div class="redRule">
          <img src="../assets/getPack/rule.png" alt="">
        </div>
        <div class="redRuleContent">
          <div class="content" v-for="(item,index) in ruleArr" :key="index">
            <h2>{{item.title}}</h2>
            <p>{{item.content}}</p>
          </div>
        </div>
      </div>
    </div>
    <mt-actionsheet
      :actions="actionsArea"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
import header from "../pages/comm/header";
import {api} from '@/static/api'
import { Toast } from "mint-ui";
import BScroll from 'better-scroll'
import countdown from "@xkeshi/vue-countdown"; // 倒计时插件

export default {
  data () {
    return {
      areaType: '1',
      mobileCode: '86',
      country: '中国大陆',
      upOrDown: false,
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
      sheetVisible: false,
      form: {
        mobile: ''
        // area : '', // 国际区号
        // type: '' //1默认国内， 2是国际
      },
      LocalName: '',
      getBackData: '',
      ruleArr: [
        {title: '1.领取一次', content: '重复领取无效'},
        {title: '2.交易使用', content: '红包仅在GetTokens中使用，领取后红包金额自动存储'},
        {title: '3.账号一致', content: '领取人手机号需与GetTokens帐号一致'},
        {title: '4.咨询客服', content: '其它未尽事项，请咨询客服QQ群：710840875'}
      ],
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      title: 'GetTokens',
      countingidentifyCode: false,
      codeTitle: '获取验证码'
    };
  },

  components: {
    tarHeader: header,
    countdown
  },

  computed: {},

  mounted() {
    this.$nextTick(() => {
      this._initScroll()
    })
    this.getWeixin()
    // this.getInnerCode()
  },
  watch:{
    sheetVisible(value){
      if(value == false){
        this.upOrDown = false
      }
    }
  },
  methods: {
    getWeixin(data){
      var _this = this
      // var url = location.search;
      // url = url + "&" + new Date().getTime()
      // var url = 'http://f.dev.zhuandian.net/userno/wxEntrance?rel=hdflgkl&code=061K32F008mGrG1SX1H00XZLE00K32Fm&state=1'; //获取url中"?"符后的字串
      // if (url.indexOf("?") != -1) {
      //   var str = url.substr(1)
      //   var strs = str.split("=")
      //   var wxRel = this.$route.query.rel
      //   var wxCode = this.$route.query.code
        // debugger
        // var twoSplit = ''
        // if(wxCode.indexOf("&") != -1){
        //   var twoSplitArr= wxCode.split("&")
        //   twoSplit = twoSplitArr[0]
        // } else {
        //   twoSplit = strs[1]
        // }
        // console.log(twoSplit)
      // }
      var wxRel = _this.$route.query.rel
      var wxCode = _this.$route.query.code
      var obj = {
        wxCode: wxCode,
        rel: wxRel
      }
      api.getOuter(obj)
      .then(res => {
        if (res.error_code == 1000) {
          _this.$store.dispatch("UserLogin", res.data);
          _this.$router.push({
            path: '/outerGetPackage',
            query:{
              rel: _this.$route.query.rel
            }
          })
        } else if(res.error_code == 1003) {
          window.location.href = res.data
        } else {
          return false
        }
      })
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
    // 点击选择国家
    selectCountry(){
      this.sheetVisible = true
      this.upOrDown = true
    },
    _initScroll:function () {
      if(!this.$refs.outerGetPack_container){
        return
      }
      this.meunScroll = new BScroll(this.$refs.outerGetPack_container, {
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 400 // 回弹时间
      })
    },
    getPackTime() {
      var _this = this
      var obj = {}
      obj.rel = _this.$route.query.rel
      obj.mobile = _this.form.mobile
      obj.code = _this.form.code
      obj.area = _this.mobileCode
      obj.type = _this.areaType
      api.getRedInnerTime(obj)
      .then(res => {
        if (res.error_code == '1000') {
          _this.getBackData = res.data
          _this.$store.dispatch('UserLogin', res.data.user_data)
          _this.LocalName = _this.$store.getters.Name
          localStorage.setItem('packInfo', JSON.stringify(res.data))
          _this.$router.push({
            path: '/outerGetPackage',
            query: {
              rel: _this.$route.query.rel
            }
          })
        }
      })
    },
    getCodeClick(){
      var reg = {
        mobile: /^[1][3,4,5,7,8][0-9]{9}$/,
        hkPhone: /^\d{8}$/,
        twPhone: /^\d{10}$/
      }
      if (!this.form.mobile) {
        Toast({
          message: '请输入手机号',
          duration: 1000
        })
        return
      } else if(this.areaType == '1') {
        if(!reg.mobile.test(this.form.mobile)){
          Toast({
            message: '请输入正确的手机号',
            duration: 1000
          })
        } else {
          this.getInnerCode()
        }
      } else if(this.country == '香港') {
        if(!reg.hkPhone.test(this.form.mobile)) {
          Toast({
            message: '请输入正确的手机号',
            duration: 1000
          })
        } else {
          this.getInnerCode()
        }
      } else if(this.country == '台湾'){
        if(!reg.twPhone.test(this.form.mobile)){
          Toast({
            message: '请输入正确的手机号',
            duration: 1000
          })
        } else {
          this.getInnerCode()
        }
      }
    },
    countidentifyCodeDownEnd(){
      this.countingidentifyCode = false
    },
    countdownprogress(data){
      if(data.seconds == 1){
        this.countidentifyCodeDownEnd()
      }
    },
    getInnerCode(){
      var obj = {}
      obj.mobile = this.form.mobile
      obj.type = this.areaType
      obj.area = this.mobileCode
      api.getCode(obj)
      .then(res => {
        if (res.error_code == '1000') {
          this.codeTitle = '重新发送'
          this.countingidentifyCode = true
          Toast({
            message: '短信发送成功，请您稍加等待。', //提示内容分
            duration: 1000 , //持续时间（毫秒），若为 -1 则不会自动关闭
            iconClass: 'mint-toast-icon mintui mintui-success'  //icon 图标的类名
          })
        } else {
          this.countingidentifyCode = false
          Toast({
            message: res.error_desc, //提示内容分
            duration: 1000 , //持续时间（毫秒），若为 -1 则不会自动关闭
            iconClass: 'mint-toast-icon mintui mintui-field-error'  //icon 图标的类名
          })
        }
      })
      .catch(() => {
        Toast({
            message: res.error_desc, //提示内容分
            duration: 1000 , //持续时间（毫秒），若为 -1 则不会自动关闭
            iconClass: 'mint-toast-icon mintui mintui-field-error'  //icon 图标的类名
          })
        this.countingidentifyCode = false
      })
    }
  }
}

</script>
<style lang='scss' scoped>
  .outerGetPack{
    height: 100%;
    overflow: hidden;
    .outerGetPack_container{
      .head{
        height: 325px;
        width: 100%;
        background-repeat: no-repeat;
        // background-size: (100%, 100%);
        background-size: cover;
        background-image: url('../assets/getPack/head.png');
      }
      .containerBody{
        position: relative;
        margin-top: -280px;
        height: 1650px;
        // height: auto;
        width: 100%;
        background-repeat: no-repeat;
        background-size: (100%, 100%);
        background-image: url('../assets/getPack/bomPeople.png');
        .redPacktitle{
          position: absolute;
          top: 350px;
          height: 235px;
          width: calc(100% - 40px);
          margin: 0 20px;
          background-repeat: no-repeat;
          background-size: (100%, 100%);
          background-image: url('../assets/getPack/guo.png');
        }
        .getTime{
          position: absolute;
          top: 930px;
          width: 100%;
          height: 72px;
          button{
            width: calc(100% - 160px);
            // width: 480px;
            border-radius: 50px;
            height: 72px;
            background: #ffeb43;
            color: #e33b45;
          }
        }
        .redRule{
          position: absolute;
          top: 1050px;
          height: 30px;
          width: 100%;
          img{
            height: 100%;
            width: 100%;
          }
        }
        .redRuleContent{
          background: #fa4b58;
          position: absolute;
          top: 1100px;
          height: 550px;
          width: 100%;
          .content{
            margin-top: 30px;
            padding: 0 100px;
            text-align: left;
            // height: 130px;
            h2{
              color: white;
              font-size: 30px;/*px*/
            }
            p{
              color: #ffa1a7;
              font-size: 20px;/*px*/
              margin-top: 20px;
              margin-left: 20px;
              // text-indent: 2em;
            }
          }
        }
        .containerBody_input{
          text-align:left;
          position: absolute;
          top: 600px;
          left: 50%;
          transform: translateX(-50%);
          height: 400px;
          // width: 500px;
          width: calc(100% - 160px);
          /* 下边是input输入框的placehoder的颜色 */
          input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
            font-size: 30px;/*px*/
            /* WebKit browsers */
            color: #972229;
          }
          input:-moz-placeholder, textarea:-moz-placeholder {
            font-size: 30px;/*px*/
          /* Mozilla Firefox 4 to 18 */
            color: #972229;
          }
          input::-moz-placeholder, textarea::-moz-placeholder {
            font-size: 30px;/*px*/
            /* Mozilla Firefox 19+ */
            color: #972229;
          }
          input:-ms-input-placeholder, textarea:-ms-input-placeholder {
            font-size: 30px;/*px*/
            /* Internet Explorer 10+ */
            color: #972229;
          }
          .mobileCode{
            height: 35px;
            color: white;
            font-size: 26px;/*px*/
            width: 35px;
            position: absolute;
            top: 120px;
            left: 75px;
          }
          .mobilePic{
            height: 35px;
            width: 35px;
            position: absolute;
            top: 115px;
            left: 30px;
          }
          .codePic{
            height: 35px;
            width: 35px;
            position: absolute;
            top: 220px;
            left: 30px;
          }
          .sanjiao {
            display: inline-block;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 15px;
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
            top: -8px;
            left: -10px;
          }
          .sanjiao i.down {
            border-width: 10px 10px 0;
            border-color: #000000 transparent transparent;
          }
          .sanjiao i.up {
            border-width: 0 10px 10px;
            border-color: transparent transparent #000000;
          }
          .selectCountry{
            padding: 0 60px 0 60px;
            line-height: 72px;
            height: 72px;
            color: white;
            opacity: 0.6;
            width: 100%;
            border-radius: 50px;
            border: none;
            background: #e33b45;
          }
          .mobileInput{
            padding: 0 60px 0 170px;
            line-height: 30px;
            font-size: 30px;/*px*/
            color: white;
            opacity: 0.6;
            height: 72px;
            width: 100%;
            border-radius: 50px;
            border: none;
            background: #e33b45;
          }
          .bom_btn{
            border: 1px solid #ffeb43;/*no*/
            background:#fa4b58;
            font-size: 20px;/*px*/
            height: 68px;
            color: #ffeb43;
            width: 150px;
            margin-left: 30px;
            border-radius: 50px;
          }
          .codeInput{
            margin-top: 30px;
            padding: 0 60px 0 80px;
            font-size: 30px;/*px*/
            line-height: 30px;
            color: white;
            opacity: 0.6;
            // height: 72px;
            height: 72px;
            width: calc(100% - 195px);
            border-radius: 50px;
            border: none;
            background: #e33b45;
          }
          .areaSelect{
            position: relative;
            width: 100%;
            // position: absolute;
            // top: 500px;
            // left: 0;
            // right: 0;
            height: 100px;
            // background: yellow;
          }
        }
      }
    }
  }
</style>
