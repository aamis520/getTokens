<template>
  <div class="ivativeFriend" ref="ivativeFriend_container">
    <!-- <tar-header :isSowBack='true' :title="title"></tar-header> -->
      <div>
    <div class="main">
        <div class="ivativeFriend_close" @click="closeInvate">
          <img src="../../assets/guanbi.png" alt="close">
        </div>
        <!-- <div class="logo"></div> -->
        <div class="logo"></div>
        <div class="logo_desc"></div>
        <div class="code">
          <div class="code_title">我的邀请码</div>
          <div class="code_con">{{user_data.invite_code}}</div>
          <!-- <div class="code_con_desc">*输入邀请码可以添加朋友~</div> -->
          <div class="code_btn" type="button"
            v-clipboard:copy="user_data.invite_code"
            v-clipboard:success="onCopy">复制邀请码</div>
          <div class="code_clear"></div>
          <!-- <div class="code_img_desc">邀请二维码</div> -->
          <!-- <div class="code_img"><img :src="user_data.img" width="100%" height="100%"/></div> -->
          <div class="code_img"><img src="https://f.zhuandian.net/Adverout/getcode" width="100%" height="100%"/></div>
          <div class="code_code_desc">截图发给朋友，扫码下载GetTokensAPP</div>
          <div class="code_people">
            <div>已成功邀请：<span>{{user_data.invite_count}}</span>人</div>
            <div>累计获得算力：<span>{{user_data.invite_power_count}}</span></div>
          </div>
        </div>
        <div class="copy_url_div_outer">
          <div class="copy_url_div">
            <div class="copy_title">
              <img src="../../assets/ling.png" alt="icon">
              <span>奖励规则</span>
            </div>
            <div class="content_body">
              <p v-for="(item,index) in content" :key="index">
                {{item.inner}}
              </p>
            </div>
          </div>
        </div>
        <ErrorMessage :ErrorDescShow="ErrorDesc"></ErrorMessage>

    </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import header from "../../pages/comm/header";
import { api } from "@/static/api";
import ErrorMessage from "@/components/ErrorMessage";
export default {
  name: "RequestPage",
  props: {},
  data() {
    return {
      title: '邀请好友',
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      ErrorDesc: "",
      user_data: {},
      content: [
        {inner: '1、您邀请好友成功注册后，您即可获得5个算力，并可得到0.1UTCT奖励;'},
        {inner: '2、邀请注册成功的好友也将获得0.1UTCT奖励;'},
        {inner: '3、邀请奖励每日领取上限为10次;'},
        {inner: '4、GetTokens拥有法律范围内对于活动的最终解释权，并将严查虚假邀请行为，一经发现将取消奖励资格;'}
      ]
    };
  },
  components: {
    tarHeader: header,
    ErrorMessage
  },
  created() {
    this.GetUserData();
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  watch: {},
  methods: {
    _initScroll:function () {
      if(!this.$refs.ivativeFriend_container){
        return
      }
      this.meunScroll = new BScroll(this.$refs.ivativeFriend_container, {
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 400 // 回弹时间
      })
    },
    closeInvate(){
      this.$router.go(-1)
    },
    GetUserData() {
      var _this = this;
      api.GetUserRequestData(_this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          _this.user_data = res.data;
        } else {
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      });
    },
    onCopy(e) {
      this.ErrorDesc = "复制成功" + new Date().getTime();
      console.log(e.text);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.ivativeFriend{
  height: 100%;
  .main {
    // height: 100%;
    position: relative;
    width: 100%;
    overflow: hidden;
    // background: #fdd601 url("~@/assets/request_5.png") no-repeat 100px 0;
    background: #fdd601 url("~@/assets/change/index_yaoqinghaoyou@2x.png");
    background-size: 100% 100%;

    // padding-bottom: 80px;
  }
}
.ivativeFriend_close{
  position: absolute;
  top: 20px;
  right: 20px;
  height: 55px;
  width: 55px;
  img{
    height: 100%;
    width: 100%;
  }
}

.logo {
  width: 100%;
  margin-top: 80px;
  height: 66px;
  // background: url("~@/assets/request_2.png") no-repeat center;
  background-size: 214px 74px;
}
.logo_desc {
  width: 100%;
  height: 22px;
  line-height: 22px;
  margin-top: 13px;
  color: white;
}
.code {
  overflow: hidden;
  width: 627px;
  min-height: 677px;
  height: auto;
  background: white;
  border-radius: 20px;
  padding-top: 65px;
  margin-left: 63px;
  // margin-top: 62px;
  margin-top: 110px;
}
.code_title {
  width: 100%;
  height: 30px;
  font-size: 28px;
  color: #cac8d1;
}
.code_con {
  font-weight:bold;
  width: 100%;
  height: 80px;
  line-height: 80px;
  font-size: 80px;
  margin-top: 30px;
  background: linear-gradient(to right, #ffaf00, #fdf301);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.code_con_desc {
  width: 100%;
  margin-top: 10px;
  height: 24px;
  line-height: 24px;
  font-size: 24px;
  color: #fec301;
}
.code_btn {
  margin: 0 auto;
  width: 256px;
  height: 70px;
  line-height: 70px;
  border-radius: 300px;
  margin-top: 40px;
  font-size: 30px;
  color: white;
  background: linear-gradient(to right, #ffaf00, #fdf301);
}
.code_clear {
  width: 100%;
  height: 34px;
  background: url("~@/assets/request_1.png") no-repeat center;
  margin-top: 20px;
  background-size: 100% auto;
}
.code_img {
  width: 100%;
  height: 200px;
  margin-top: 10px;
}
.code_img > img {
  width: 230px;
  height: 230px;
}
.code_img_desc {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin-top: 15px;
  color: #cdcbd3;
}
.code_code_desc {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin-top: 35px;
  color: #fec301;
}
.code_people {
  width: 100%;
  height: 100px;
  line-height: 100px;
  padding: 0 30px;
  background: #f5f5f5;
  margin-top: 38px;
  font-size: 21px;
}
.code_people > div:nth-child(1) {
  float: left;
  text-align: left;
  width: 50%;
}
.code_people > div > span {
  color: #fe935a;
}
.code_people > div:nth-child(2) {
  float: right;
  text-align: right;
  width: 50%;
}
.copy_url_div_outer{
  height: 500px;
  background: #fdd601;
}
.copy_url_div {
  padding: 0 35px;
  border: 1px solid white;
  padding-top: 45px;
  width: 627px;
  margin-left: 63px;
  // height: 370px;
  height: 400px;
  margin-top: 35px;
  border-radius: 20px;
  background: white;
  // background: white url("~@/assets/request_3.png") no-repeat center;
  // background-size: 650px 360px;
  .content_body{
    text-align: left;
    color:#8f8f8f;
    font-size: 21.34px;/*px*/
    p{
      line-height: 40px;
      margin-top: 10px;
    }
  }
}
.copy_title {
  width: 100%;
  height: 50px;
  color: #cccbd3;
  img{
    height: 35px;
    width: 35px;
    vertical-align: middle;
  }
  span{
    font-family: '微软雅黑';
    color:#231815;
    font-size: 24px;/*px*/
    line-height: 30px;
  }
}
// .copy_url {
//   width: 100%;
//   height: 20px;
//   line-height: 20px;
//   color: #fbd61c;
//   margin-top: 36px;
//   font-size: 20px;
// }
// .copy_btn {
//   width: 192px;
// }
</style>
