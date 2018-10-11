<template>
<div class="friend">
  <!-- <tar-header :isSowBack='true' :title="title"></tar-header> -->
	<div class="main" ref="friend_scroll">
    <div>
      <div class="qiu_div">
        <div class="top">
          <img @click="backUrl" src="../../assets/whiteBack.png" alt="返回">
          <span class="whoHomePage">{{name}}的主页</span>
        </div>
        <div v-for="(item,index) in BallCoinList" class="qiu" :class="{qiu_1:(item.ballcoin_type == 1),qiu_2:(item.ballcoin_type==2),qiu_over:(item.is_over==true),qiu_dug:item.user_ballcoin_vuestatus,qiu_draw:item.isdraw}" :key="index" @click="GetUserBallCoin(item.user_ballcoin_id,index, item)">
          <div class="qiu_fly" :class="{qiu_1:(item.ballcoin_type == 1),qiu_2:(item.ballcoin_type==2),qiu_fly_show:item.isfly}"><div class="qiu_img">{{item.ballcoin_name}}</div></div>
          <div class="qiu_img">{{item.ballcoin_name}}</div>
          <!-- <div class="qiu_bottom" v-if="item.user_ballcoin_vuestatus">{{item.user_ballcoin_surplustime}}</div>
          <div class="qiu_bottom" v-else>{{item.user_ballcoin_surplus}}</div> -->
          <div class="qiu_bottom">
                <countdown v-if="item.user_ballcoin_endtime > 0"
                  :time="item.user_ballcoin_endtime * 1000"
                  :leadingZero="true"
                  @countdownend="countBallDown(item)" @countdownprogress="countballprogress(item)">
                  <template slot-scope="props" >
                    <span v-if="props.seconds > 0 || props.hours > 0 || props.minutes > 0">{{props.hours}}:{{props.minutes}}:{{ props.seconds }}</span>
                    <span v-else>{{item.user_ballcoin_surplus}}</span>
                  </template>
                </countdown>
                <span v-else>{{item.user_ballcoin_surplus}}</span>
              </div>
        </div>
      </div>
      <div class="friend_comparison_div">
        <div class="friend_comparison_title">夺宝大比拼</div>
        <div class="friend_comparison">
          <div class="friend_comparison_friend">
            <div class="friend_comparison_top">
              <div class="friend_comparison_header_div" :class="{friend_comparison_header_win:Number(ContrastData.my.count)>Number(ContrastData.friend.count)}">
                <div class="friend_comparison_header"><img :src="ContrastData.my.header"/></div>
              </div>
              <div class="friend_comparison_con">
                <div>我收取TA</div>
                <div><span>{{ContrastData.my.count}}</span>次</div>
              </div>
            </div>
            <div class="friend_comparison_bottom">
              算力{{ContrastData.my.power}}
            </div>
          </div>
          <div class="friend_comparison_vs"></div>
          <div class="friend_comparison_my">
            <div class="friend_comparison_top">
              <div class="friend_comparison_top">
                <div class="friend_comparison_header_div_right" :class="{friend_comparison_header_win:Number(ContrastData.my.count)<Number(ContrastData.friend.count)}">
                  <div class="friend_comparison_header"><img :src="ContrastData.friend.header"/></div>
                </div>
                <div class="friend_comparison_con friend_comparison_con_right">
                  <div>TA收取你</div>
                  <div><span>{{ContrastData.friend.count}}</span>次</div>
                </div>
              </div>
            </div>
            <div class="friend_comparison_bottom_my">
              算力{{ContrastData.friend.power}}
            </div>
          </div>
        </div>
      </div>
    </div>
		<ErrorMessage :ErrorDescShow="ErrorDesc"></ErrorMessage>
	</div>
</div>
</template>
<script>
import header from "../../pages/comm/header";
import { api } from "@/static/api";
import { DateHandle } from "@/static/common";
import { checkerror } from "@/static/common";
import ErrorMessage from "@/components/ErrorMessage";
import BScroll from 'better-scroll'

import countdown from "@xkeshi/vue-countdown"; // 倒计时插件
export default {
  name: "Home",
  props: {},
  data() {
    return {
      title: "好友PK",
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      FriendUserId: this.$route.query.id,
      ErrorDesc: "",
      name: this.$route.query.name,
      BallCoinList: {},
      ContrastData: {
        my: {},
        friend: {}
      }
    };
  },
  components: {
    ErrorMessage,
    tarHeader: header,
    countdown
  },
  computed: {
    // name: function(){
    //   return this.$store.getters.Name
    // }
  },
  created() {
    this.GetUserBallCoinList();
    this.GetContrastData();
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
    })
    setInterval(() => {
      this.SetBallCoinData();
    }, 5000);
  },
  watch: {},
  methods: {
    // 返回事件
    backUrl(){
      this.$router.go(-1)
    },
    _initScroll:function () {
      if(!this.$refs.friend_scroll){
        return
      }
      this.meunScroll = new BScroll(this.$refs.friend_scroll, {
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 400 // 回弹时间
      })
    },
    SetBallCoinData() {
      for (var key in this.BallCoinList) {
        this.BallCoinList[key]["user_ballcoin_vuestatus"] = this.GetQiuStatus(
          this.BallCoinList[key]["user_ballcoin_overtime"]
        );
        this.BallCoinList[key][
          "user_ballcoin_surplustime"
        ] = this.GetQiuSurplusTime(
          this.BallCoinList[key]["user_ballcoin_overtime"]
        );
      }
    },
    // 获取球数据
    GetUserBallCoinList() {
      var _this = this;
      // if(_this.)
      var data = { friend_user_id: _this.FriendUserId };
      api.GetFriendBallCoinList(data, _this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          _this.BallCoinList = res.data;
          _this.initBallCoinData()
          _this.SetBallCoinData();
        } else {
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      });
    },
    initBallCoinData(){
      for(let i=0;i<this.BallCoinList.length;i++){
        if(this.BallCoinList[i].user_ballcoin_endtime > 0){
          this.BallCoinList[i].noClick = true
        }else{
          this.BallCoinList[i].noClick = false
        }
      }

    },
    countBallDown(item){
      item.noClick = false
    },
    countballprogress(item){

    },
    GetQiuStatus(time) {
      return DateHandle.GetNowTime() < DateHandle.GetDateTime(time);
    },
    GetQiuSurplusTime(time) {
      return DateHandle.GetSurplusTime(time);
    },
    GetUserBallCoin(ballcoin_id, key,item) {
      var _this = this;
      if (_this.BallCoinList[key]["isdraw"] == true) {
        return false;
      }
      if(item.noClick){
        this.$toast({
          message: '未到领取时间',
          duration: 1000
        })
        return
      }
      // console.log(123);
      var data = { user_ballcoin_id: ballcoin_id };
      api.GetUserBallCoin(data, _this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          _this.BallCoinList[key]["isdraw"] = true;
          _this.BallCoinList[key]["isfly"] = true;
          _this.BallCoinList[key]["user_ballcoin_surplus"] = res.data;
        } else {
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      });
    },
    GetContrastData() {
      var _this = this;
      var data = { friend_user_id: _this.FriendUserId };
      api.GetContrastData(data, _this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          _this.ContrastData = res.data;
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
.friend{
  height: 100%;
}
.main {
  width: 100%;
  // height: calc(100% - 95px);
  height: 100%;
  overflow: hidden;
  // background: url("~@/assets/index_1.png") no-repeat top;
  background-size: 100% auto;
  padding-bottom: 220px;
}
.qiu_div {
  // padding-top: 100px;
  // padding: 40px 0 0 40px;
  background: url("~@/assets/index_1.png") no-repeat top;
  background-size:cover;
  width: 100%;
  // height: 565px;
  height: 886px;
  // margin-top: 200px;
  position: relative;
  .top {
    position: relative;
    // border-top: 1px solid gray;
    // padding-top: 50px;
    // background: red;
    width: 100%;
    // padding: 40px 0 0 40px;
    height: 95px;
    .whoHomePage{
      font-weight: bold;
      // margin-left: -25px;
      font-size: 33px;/*px*/
      line-height: 95px;
      color: white;
    }
    img{
      position: absolute;
      display: inline-block;
      top: 23px;
      left: 30px;
      height: 50px;
      width: 50px;
    }
  }
}
.qiu {
  // top: 200px;
  // height: 400px;
  width: 110px;
  position: absolute;
  transition: margin-top 1s, margin-left 1s, opacity 1.5s;
}
.qiu_img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  color: white;
  font-size: 20px;/*px*/
  line-height: 90px;
}
.qiu_bottom {
  margin-left: -10px;
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 18px;/*px*/
}
.qiu_1 > .qiu_img {
  background: url("~@/assets/index_3.png") no-repeat top;
  background-size: 100%;
}
.qiu_1 > .qiu_bottom {
  color: white;
}
.qiu_2 > .qiu_img {
  background: url("~@/assets/index_4.png") no-repeat top;
  background-size: 100%;
}
.qiu_2 > .qiu_bottom {
  color: #8e9fff;
}
.qiu_3 > .qiu_img {
  background: url("~@/assets/index_2.png") no-repeat top;
  background-size: 100%;
}
.qiu_3 > .qiu_bottom {
  color: #37c3ff;
}
.qiu:nth-child(1) {
  margin-top: 260px;
  margin-left: 254px;
  animation: jump 2.7s ease-in-out infinite;
}
.qiu:nth-child(2) {
  margin-top: 225px;
  margin-left: 410px;
  animation: jump 3.2s ease-in-out infinite;
}
.qiu:nth-child(3) {
  margin-top: 407px;
  margin-left: 210px;
  animation: jump 2.5s ease-in-out infinite;
}
.qiu:nth-child(4) {
  margin-top: 407px;
  margin-left: 480px;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(5) {
  margin-top: 470px;
  margin-left: 364px;
  animation: jump 3.3s ease-in-out infinite;
}
.qiu:nth-child(6) {
  margin-top: 555px;
  margin-left: 190px;
  animation: jump 3.1s ease-in-out infinite;
}
.qiu:nth-child(7) {
  margin-top: 225px;
  margin-left: 140px;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(8) {
  margin-top: 380px;
  margin-left: 78px;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(9) {
  margin-top: 507px;
  margin-left: 70px;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(10) {
  margin-top: 395px;
  margin-left: 590px;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(11) {
  margin-top: 525px;
  margin-left: 630px;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(12) {
  margin-top: 237px;
  margin-left: 615px;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(13) {
  margin-top: 247px;
  margin-left: 24px;
  animation: jump 3s ease-in-out infinite;
}
@keyframes jump {
  0% {
    top: 0;
  }
  50% {
    top: 10px;
  }
  100% {
    top: 0;
  }
}
.qiu_dug {
  opacity: 0.7;
}
.qiu_over {
  opacity: 0;
  margin-top: 530px !important;
  margin-left: 200px !important;
}
.top_nav {
  height: 130px;
  width: 100%;
}
.friend_comparison_div {
  margin: 60px auto 0;
  width: 700px;
  // height: 310px;
  height: 320px;
  box-shadow: #e3e2e2 2px 2px 2px 2px ;
  // background: red;
  border: 1px solid #e5e5e5;/*no*/
  border-top: none;
  // margin-top: 210px;
  border-radius: 30px;
  margin-bottom: 50px;
}
.friend_comparison_title {
  // margin-top: 20px;
  border: 1px solid white;
  width: 100%;
  height: 70px;
  line-height: 70px;
  // margin-top: 37px;
  font-size: 32px;/*px*/
  color: #272727;
  font-weight: 700;
}
.friend_comparison {
  width: 100%;
  padding: 0 30px;
  margin-top: 40px;
  height: 140px;
  display: flex;
}
.friend_comparison_friend,
.friend_comparison_my {
  float: left;
  // width: 230px;
  height: 130px;
  flex:1;
}
.friend_comparison-vs{
  width: 60px;
}
.friend_comparison_top {
  width: 100%;
  height: 100px;
}
.friend_comparison_bottom,
.friend_comparison_bottom_my {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: left;
  color: #fdd401;
  font-size: 25px;/*px*/
}
.friend_comparison_header_div,
.friend_comparison_header_div_right {
  // border: 4px solid #a9a9a9;
  float: left;
  height: 88px;
  width: 88px;
  border-radius: 10px;
}
.friend_comparison_header {
  overflow: hidden;
  height: 80px;
  width: 80px;
  border-radius: 10px;
}
.friend_comparison_header_win {
  border-color: #fdd401;
  position: relative;
}
.friend_comparison_header_win::after {
  content: "";
  width: 44px;
  height: 44px;
  background: url("~@/assets/friend_2.png") no-repeat center;
  background-size: 45px 40px;
  display: block;
  top: 0;
  position: absolute;
  margin-top: -25px;
  margin-left: -8px;
}
.friend_comparison_header > img {
  width: 80px;
  height: 80px;
  float: left;
}
.friend_comparison_con {
  width: 130px;
  float: left;
  margin-left: 12px;
}
.friend_comparison_con > div {
  width: 100%;
  text-align: left;
  color: #3a3a3a;
  font-size: 25px;/*px*/
  height: 30px;
  line-height: 34px;
}
.friend_comparison_con > div:nth-child(2) {
  font-size: 28px;/*px*/
  margin-top: 25px;
}
.friend_comparison_con > div > span {
  font-weight: 700;
  font-size: 35px;/*px*/
}
.friend_comparison_vs {
  width: 170px;
  height: 100px;
  float: left;
  background: url("~@/assets/friend_1.png") no-repeat center;
  background-size: 113px 52px;
}
.friend_comparison_my {
  float: right;
}
.friend_comparison_bottom_my {
  text-align: right;
}
.friend_comparison_header_div_right {
  float: right;
}
.friend_comparison_con_right {
  float: right;
  margin-right: 12px;
  margin-left: 0;
}
.friend_comparison_con_right > div {
  text-align: right;
}
.qiu_draw {
  opacity: 0.5;
}
.qiu_fly {
  position: absolute;
  opacity: 0;
  width: 100%;
  transition: margin-top 1.5s;
}
.qiu_fly_show {
  margin-top: -100px;
  animation: qiu_fly_show ease-in-out 1s;
  animation-fill-mode: forwards;
}
@keyframes qiu_fly_show {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0;
  }
}
</style>
