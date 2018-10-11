<!--  -->
<template>
  <div class="fillIn" ref="fillIn">
    <div class="friendRequestBg" v-if="isSowBack">
      <img src="../../assets/empty.png" alt="背景图">
      <p>暂无记录</p>
    </div>
    <div>
      <div class="fillIn_inner" v-for="(item,index) in getBackData" :key="index">
        <div class="left" @click="goinDetail(item)">
          <img src="../../assets/redPaper/redIcon.png" alt="红包图标">
        </div>
        <div class="middle" @click="goinDetail(item)">
          <span class="middle_top">{{item.coin_name}}</span><br>
          <span class="middle_bottom">已领取：{{item.remainder | availableFilter}}/{{item.money | moneyParse}}</span>
        </div>
        <div class="right">
          <!-- <span></span> -->
          <!-- <button class="right_btn" @click="remarkShare(item)">{{item.isOrShare}}</button> -->
          <button  :class="{'class-a': item.status !== '1', 'class-b': item.status == '1'}" @click="remarkShare(item)">{{item.isOrShare}}</button>
        </div>
        <div class="fillIn_time">
          <span>{{item.add_time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {api} from '@/static/api'
import { Toast, Indicator } from "mint-ui";

export default {
  data () {
    return {
      isSowBack: false,
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      getBackData: [],
      content: [
        {pic: '',name: 'UPoints', get: '0/100', isOrShare: '去分享'},
        {pic: '',name: 'UPoints', get: '0/100', isOrShare: '去分享'},
        {pic: '',name: 'UPoints', get: '0/100', isOrShare: '去分享'},
        {pic: '',name: 'UPoints', get: '0/100', isOrShare: '去分享'},
        {pic: '',name: 'UPoints', get: '0/100', isOrShare: '去分享'},
        {pic: '',name: 'UPoints', get: '0/100', isOrShare: '去分享'},
        {pic: '',name: 'UPoints', get: '0/100', isOrShare: '已过期'}
      ]
    }
  },

  components: {},

  computed: {},
  filters: {
    availableFilter(val){
      let arr = String(val).split('.')
      let str = ''
      if(arr.length > 1){
        str  = arr[1].slice(0,5)
      }
      console.log(str)
      if(str){
        return arr[0] + '.' + str
      }else{
        return arr[0]
      }
    },
    moneyParse: function (data) {
      return data.toFixed(2)
    }
  },

  created() {
    this.giveRedPack()
    this.$nextTick(() => {
      this._initScroll()
    })
  },

  methods: {
    goinDetail(item){
      this.$router.push({
        path: '/getPack',
        query: {
          id: item.share.rec
        }
      })
    },
    remarkShare(item){
      console.log(item)
      if (item.status == '3' || item .status == '2' || item.status == '4') {
        return
      }
      // console.log(item.share)
      this.callAndroid(item.share)
    },
    // 发出红包接口
    giveRedPack(){
      Indicator.open({
        text: '正在努力加载...',
        spinnerType: 'fading-circle'
      })
      api.remarkRedGive({}, this.ApiConf)
      .then(res => {
        console.log(res.data)
        if (res.error_code == '1000') {
          Indicator.close()
          res.data.forEach(ele => {
            ele.money = Number(ele.money)
            ele.remainder = Number(ele.money) - Number(ele.balance)
            if(ele.status == '1') {
              ele.isOrShare = '去分享'
            } else if (ele.status == '2') {
              ele.isOrShare = '已退款'
            } else if (ele.status == '3'){
              ele.isOrShare = '已过期'
            } else if (ele.status == '4') {
               ele.isOrShare = '已领完'
            }
          })
          this.getBackData = res.data
          if (this.getBackData.length == 0) {
            this.isSowBack = true
          }
        } else {
          Indicator.close()
          Toast({
            message: '获取发红包记录失败', //提示内容分
            duration: 1000 , //持续时间（毫秒），若为 -1 则不会自动关闭
            iconClass: 'mint-toast-icon mintui mintui-field-error'  //icon 图标的类名
          })
        }
      })
      .catch(() =>{

      })
    },
    // better-scroll初始化dom节点
    _initScroll:function () {
      this.meunScroll = new BScroll(this.$refs.fillIn, {
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 200 // 回弹时间
        // snap: {
        //   loop: true,
        //   speed: 600,
        // }
      })
    },
    callAndroid(data){
      var msg = JSON.stringify(data)
      if (msg == '') {
          return false;
      }
      var isIos = this.androidOrIosSys()
      if (isIos) {
        iosShare(msg);
      }else {
          share.androidShare(msg)
      }
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
<style lang='scss' scoped>
  .fillIn{
    position: relative;
    background: white;
    height: 100%;
    overflow: hidden;
     .friendRequestBg{
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 317px;
      width: 389px;
      img{
        height: 100%;
        width: 100%;
      }
      p{
        letter-spacing: 3px;
        font-size: 32px;
        color: #adadad;
      }
    }
    .fillIn_inner{
      margin: 0 40px;
      position: relative;
      height: 300px;
      display: flex;
      .fillIn_time{
        margin-bottom: 15px;
        left: 17%;
        bottom: 0;
        position: absolute;
        span{
          color: #a7a7a4;
          font-size: 20px;/*px*/
        }
      }
      .left{
        text-align: left;
        flex: 1;
        img{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          // border-radius: 50
          height: 80px;
          width: 80px;
        }
      }
      .middle{
        text-align: left;
        border-bottom: 1px solid #e2e2e1;/*no*/
        flex: 1;
        .middle_top{
          transform: translateY(-50%);
          position:absolute;
          top: calc(50% - 20px);
          font-size: 37px;
          font-weight: 500;
          color: #000;
        }
        .middle_bottom{
          transform: translateY(-50%);
          position:absolute;
          top: calc(50% + 30px);
          font-size: 30px;
          font-weight: 500;
          color: #000;
        }
      }
      .right{
        border-bottom: 1px solid #e2e2e1;/*no*/
        flex: 4;
        button{
          font-size: 28px;/*px*/
          color: white;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 70px;
          width: 151px;
          border-radius: 10px;
        }
        .class-a{
          background: #b5b9bc;
        }
        .class-b{
          background: #fdd401;
        }
      }
    }
  }
</style>
