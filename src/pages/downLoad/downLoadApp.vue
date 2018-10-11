<!--  -->
<template>
  <div class="downLoad">
    <!-- <tar-header :title="title"></tar-header> -->
    <div class="downLoad_container">
      <div class="downLoad_head">
        <img src="../../assets/change/morenHeadPic.png" alt="icon">
        <p class="name">GetTokens</p>
        <p class="remark">区块链社交分享平台</p>
        <p class="version">v 2.0.0</p>
      </div>
      <div class="downLoad_foot">
        <span @click="goInBrowser">下载APP</span>
      </div>
    </div>
    <div class="goBrowser" v-if="isShow">
      <div class="guide">
        <img src="../../assets/download/browser.png" alt="icon">
        <p>在浏览器中打开</p>
      </div>
    </div>
  </div>
</template>

<script>
// import header from "../comm/header";

export default {
  data () {
    return {
      isShow: false,
      title: 'GetTokens'
    };
  },

  components: {
    // tarHeader: header
  },

  computed: {},

  mounted(){},

  methods: {
     callAndroid(data){
      // var msg = JSON.stringify(data)
      // if (msg == '') {
      //     return false;
      // }
      var isIos = this.androidOrIosSys()
      console.log(isIos)
      if (isIos == '1') {
        // ios

        window.location.href="https://ipa.pic3.cn/getios"
        // iosShare(msg);
      }else if (isIos == '2'){
        // anzhuo
        window.location.href="https://ipa.pic3.cn/getandroid"
          // share.androidShare(msg)
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
          return '1';
      } else if (browser.versions.android) {
          return '2';
      }
    },
    goInBrowser(){
      var ua = navigator.userAgent.toLowerCase();
      console.log(ua)
      var isWeixin = ua.indexOf('micromessenger') != -1;
      if (isWeixin) {
        this.isShow = true
      } else {
        this.callAndroid()
      }
    }
  }
}

</script>
<style lang='scss' scoped>
  .downLoad{
    height: 100%;
    .downLoad_container{
      border-top: 1px solid #ebe9e9;/*no*/
      background:url('../../assets/download/downloadApp.png') no-repeat 5px 5px;
      background-size:(100%, 100%);
      height:100%;
      .downLoad_head{
        margin-top: 99px;
        height: 350px;
        // background: red;
        img{
          height: 175px;
          width: 175px;
          // border-radius: 50px;
        }
        .name{
          margin-top: 13px;
          font-weight: bold;
          color: #2a2a2a;
          font-size: 40px;/*px*/
        }
        .remark{
          margin-top: 18px;
          color: #9d9d9d;
          font-size: 28px;/*px*/
        }
        .version{
          margin-top: 58px;
          color:#c6c6c6;
          font-size: 30px;/*px*/
        }
      }
      .downLoad_foot{
        margin-top: 500px;
        height: 100px;
        a{
          font-size: 30px;/*px*/
          line-height: 100px;
          display: inline-block;
          background: -webkit-linear-gradient(left,#feb700, #fdf301); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(right,#feb700, #fdf301); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(right,#feb700, #fdf301); /* Firefox 3.6 - 15 */
          background: linear-gradient(to right,#feb700, #fdf301); /* 标准的语法 */
          color: white;
          border-radius: 50px;
          width: 378px;
          height: 100px;
        }
        span {
          font-size: 30px;/*px*/
          line-height: 100px;
          display: inline-block;
          background: -webkit-linear-gradient(left,#feb700, #fdf301); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(right,#feb700, #fdf301); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(right,#feb700, #fdf301); /* Firefox 3.6 - 15 */
          background: linear-gradient(to right,#feb700, #fdf301); /* 标准的语法 */
          color: white;
          border-radius: 50px;
          width: 378px;
          height: 100px;
        }
      }
    }
    .goBrowser{
      text-align: right;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,.5);
      opacity: .5;
      .guide{
        margin-top: 50px;
        height: 200px;
        padding-right: 50px;
        img{
          height: 150px;
          width: 150px;
        }
        p{
          margin-top: 15px;
          padding-right: 28px;
          font-size: 30px;/*px*/
          color: white;
        }
      }
    }
  }
</style>
