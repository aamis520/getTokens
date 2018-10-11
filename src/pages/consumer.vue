<!--  -->
<template>
  <div class="consumer">
    <div class="consumer_header"></div>
    <!-- <tar-header :isSowBack='false' :title="title"></tar-header> -->
    <div class="consumer_info">
      <div class="consumer_headPic">
        <img style="height:100%;width:100%;border-radius:50%;" src="../assets/change/morenHeadPic.png" alt="头像">
      </div>
      <p class="user_name">
        <span>{{name}}</span>
      </p>
      <div class="consumer_info_bottom">
        <div class="consumer_info_money" @click="goInWallet">
          <!-- <span class="consumer_info_moneyTop">我的钱包（≈CNY）</span><br> -->
          <span class="consumer_info_moneyTop">我的钱包</span><br>
          <!-- <span class="consumer_info_moneyBom">{{getRemainMoney.balence | availableFilter}}</span> -->
        </div>
        <div class="consumer_info_trade">
          <span class="consumer_info_tradeTop"></span> <br>
          <button class="consumer_info_tradeBom" @click="giveRedPaper">发红包</button>
        </div>
      </div>
      <!-- <div class="consumer_inner">
      </div> -->
    </div>
    <div class="consumer_giveMoney" @click="giveRedPaper">
      <img style="height:100%; width:100%;" src="../assets/account/发红包.png" alt="发红包">
    </div>
    <div class="container">
      <div class="consumer_zhuandian">
        <div class="leftBound"></div>
        <p>
          <span>我的GetTokens</span>
        </p>
      </div>
      <div class="consumer_remark">
        <p @click="goInCome">
          <span>收支记录</span>
          <img class="consumer_remark_shape" src="../assets/Shape.png" alt="">
        </p>
      </div>
      <div class="consumer_setting" @click="setting">
        <p>
          <span>设置</span>
          <img class="consumer_setting_shape" src="../assets/Shape.png" alt="导航">
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import header from "../pages/comm/header"
import { MessageBox, Popup, Toast, Indicator } from "mint-ui";
import {api} from '@/static/api'

export default {
  data () {
    return {
      getRemainMoney: {balence: '0.00'},
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      title: '账户'
    }
  },
  filters: {
    parseFilter: function(data){
      return Number(data).toFixed(2)
    },
    availableFilter(val){
      let arr = String(val).split('.')
      let str = ''
      if(arr.length > 1){
        str  = arr[1].slice(0,2)
      }
      console.log(str)
      if(str){
        return arr[0] + '.' + str
      }else{
        return arr[0]
      }
    }
  },
  components: {
    tarHeader: header
  },

  computed: {
    name: function(){
      return this.$store.getters.Name
    }
  },

  mounted() {
    this.getUserRemain()
  },

  methods: {

    setting(){
      this.$router.push({
        path: '/loginOut'
      })
      console.log('设置')
    },

     // 调用接口获取用户余额
    getUserRemain(){
      Indicator.open({
        text: '正在获取钱包总额...',
        spinnerType: 'fading-circle'
      })
      api.accountRemain(this.ApiConf)
      .then(res => {
        if (res.error_code == 1000) {
          Indicator.close()
          this.getRemainMoney = res.data
          //  Toast({
          //   message: '获取资产成功。', //提示内容分
          //   duration: 100000 , //持续时间（毫秒），若为 -1 则不会自动关闭
          //   iconClass: 'mint-toast-icon mintui mintui-success'  //icon 图标的类名
          // })
        } else {
          Indicator.close()
           Toast({
            message: '获取资产失败。', //提示内容分
            duration: 1000 , //持续时间（毫秒），若为 -1 则不会自动关闭
            iconClass: 'mint-toast-icon mintui mintui-field-error'  //icon 图标的类名
          })

        }
        console.log(res)
      })
      .catch(() => {

      })
    },
    trade(){
      // Toast({
      //   message: '敬请期待...', //提示内容分
      //   duration: 1000 , //持续时间（毫秒），若为 -1 则不会自动关闭
      //   iconClass: 'mint-toast-icon mintui mintui-field-warning'  //icon 图标的类名
      // })
      this.$router.push(
        {path: '/redPaper'}
      )
    },
    // 进入钱包
    goInWallet() {
      this.$router.push({
        path: '/homeWallet'
        // query: {
        //   id: this.getRemainMoney.balence
        // }
      })
      console.log('钱包首页')
    },
    giveRedPaper(){
      // if(process.env.NODE_ENV === 'development'){
      //     location.href = "localhost://8080/redPaper"
      //   }else if(process.env.NODE_ENV === 'testing'){
      //     location.href = 'http://vue.dev.zhuandian.net/redPaper'

      //   }else{
      //     location.href = 'https://ft.zhuandian.net/redPaper'
      //   }
      var _this = this
      var ua = navigator.userAgent.toLowerCase();
      console.log(ua)
      var isWeixin = ua.indexOf('micromessenger') != -1;
      if (isWeixin) {
        this.$toast({
          message: '请下载APP使用红包功能',
          duration: 1000
        })
      }else{
        this.$router.push({
          path: '/redPaper'
        })
      }
    },
    goInCome(){
      this.$router.push({
        path: '/income'
      })
      console.log('收支')
    },
    androidOrIosSys(){
      var browser = {
        versions : function() {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {// 移动终端浏览器版本信息
                trident : u.indexOf('Trident') > -1, // IE内核
                presto : u.indexOf('Presto') > -1, // opera内核
                webKit : u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
                gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
                mobile : !!u.match(/AppleWebKit.*Mobile.*/)
                || !!u.match(/AppleWebKit/), // 是否为移动终端
                ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
                iPhone : u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
                iPad : u.indexOf('iPad') > -1, // 是否iPad
                webApp : u.indexOf('Safari') == -1
                // 是否web应该程序，没有头部与底部
            };
        }(),
        language : (navigator.browserLanguage || navigator.language)
            .toLowerCase()
      }
      if (browser.versions.ios || browser.versions.iPhone
          || browser.versions.iPad) {
          return 1;
      } else if (browser.versions.android) {
          return 0;
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  .consumer{
    background: #f6f7f8;
    height: 100%;
  }
  .consumer_info{
    position: relative;
    border-top: 1px solid white;/*no*/
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('../assets/conumer/164302976029199179.png');
    width: 100%;
    height: 475px;
  }
  .consumer_info .user_name{
    position: absolute;
    top: 140px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 40px;/*px*/
    font-weight: bold;
    text-align: center;
  }
  .consumer_info_bottom{
    height: 140px;
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 30px;
  }
  .consumer_info_money, .consumer_info_trade{
    text-align: center;
    flex: 1;
  }
  .consumer_info_moneyTop, .consumer_info_tradeTop{
    /* line-height: 50px; */
    // font-weight: bold;
    // font-size: 30px;/*px*/
    // color: #808080;
  }
  .consumer_info_moneyTop{
    line-height: 145px;
    color: #000;
    font-weight: bold;
    font-size: 30px;/*px*/
  }
  .consumer_info_tradeBom{
    color: white;
    margin-top:10px;
    border-radius: 50px;
    background: #fdd718;
    width:162px;
    height:70px;
  }
  .consumer_info_moneyBom{
    display: inline-block;
    margin-top: 20px;
    font-size: 56px;/*px*/
    color: #fdd718;
  }
  .consumer_headPic{
    position: absolute;
    -webkit-transform: translateX(-52px);
    -moz-transform:translateX(-52px);
    transform: translateX(-52px);
    left: 50%;
    top: 26px;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    /* background:red; */
  }
  .consumer_giveMoney{
    padding: 0 20px;
    padding-top: 20px;
    margin-bottom: 20px;
    background: white;
    height: 214px;
    // margin: 14px;
    /* padding: 14px; */
  }
  .container{
    background: white;
    padding: 0 30px;
  }
  .consumer_zhuandian{
    // padding: 0 40px;
    /* margin-left: 40px; */
    line-height: 106px;
    text-align: left;
    height: 106px;
    border-bottom: 1px solid #e2e2e1;/*no*/
    .leftBound{
      margin-top: 32px;
      float: left;
      margin-right: 20px;
      height: 35px;
      width: 7px;
      background: #fdd718;
    }
  }
  .consumer_remark, .consumer_setting{
    position: relative;
    text-align:left;
    // padding: 0 40px;
    /* margin-left: 40px; */
    line-height: 104px;
    border-bottom: 1px solid #e2e2e1;/*no*/
    height: 104px;
    color: #2d2d2d;
    font-size: 27px;/*px*/
  }
  .consumer_setting{
    border-bottom: none;
  }
  .consumer_remark_shape , .consumer_setting_shape{
    height: 35x;
    width: 35px;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
  }
  .consumer_zhuandian span{
    color: #000;
    font-size: 35px;/*px*/
    font-weight: 600;
  }
</style>
