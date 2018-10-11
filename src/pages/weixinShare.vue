<!--  -->
<template>
  <div>
    微信分享
  </div>
</template>

<script>
import {api} from '@/static/api'
import wx from 'weixin-js-sdk';
export default {
  data () {
    return {
      ref: this.$route.query.rec
    };
  },

  components: {},

  computed: {},

  created() {
    this.getconfigInfo()
  },

  methods: {
      // 微信分享
    wxInit(res) {
      let links = res.link
      let title = res.title
      let desc = res.title
      let imgUrl = res.logo
      wx.config({
        debug: true,
        appId: res.wxShare.appId,
        timestamp: res.wxShare.timestamp,
        nonceStr: res.wxShare.nonceStr,
        signature: res.wxShare.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
      });
      wx.ready(function() {
        wx.onMenuShareTimeline({
          title: title,
          desc: desc,
          link: links,
          imgUrl: imgUrl,
          success: function() {
//               alert("分享到朋友圈成功")
            //Toast({
              //message: "成功分享到朋友圈"
            //});
          },
          cancel: function() {
//               alert("分享失败,您取消了分享!")
            //Toast({
              //message: "分享失败,您取消了分享!"
            //});
          }
        });
        //微信分享菜单测试
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function() {
            // alert("成功分享给朋友")
//              Toast({
//                message: "成功分享给朋友"
//              });
          },
          cancel: function() {
            // alert("分享失败,您取消了分享!")
//              Toast({
//                message: "分享失败,您取消了分享!"
//              });
          }
        });

        wx.onMenuShareQQ({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function() {
            // alert("成功分享给QQ")
//              Toast({
//                message: "成功分享到QQ"
//              });
          },
          cancel: function() {
            // alert("分享失败,您取消了分享!")
//              Toast({
//                message: "分享失败,您取消了分享!"
//              });
          }
        });
        wx.onMenuShareWeibo({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function() {
            // alert("成功分享给朋友")
//              Toast({
//                message: "成功分享到腾讯微博"
//              });
          },
          cancel: function() {
            // alert("分享失败,您取消了分享!")
//              Toast({
//                message: "分享失败,您取消了分享!"
//              });
          }
        });
        wx.onMenuShareQZone({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function() {
            // alert("成功分享给朋友")
//              Toast({
//                message: "成功分享到QQ空间"
//              });
          },
          cancel: function() {
            // alert("分享失败,您取消了分享!")
//              Toast({
//                message: "分享失败,您取消了分享!"
//              });
          }
        });

      });
      wx.error(function(err) {
        alert(JSON.stringify(err))
      });
    },
    getconfigInfo(){
      var _this = this
      var obj = {}
      obj.rel = _this.ref
      obj.url = location.href
      api.weixinShare(obj)
      .then(res => {
        if (res.error_code == 1000){
          _this.wxInit(res.data)
        }

      })
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
