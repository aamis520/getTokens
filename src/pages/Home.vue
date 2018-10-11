<template>
	<div class="main">
    <div class="main_container" ref="home_main">
      <Signinvue v-if="IsShowSignin" @SigninStatus="GetSigninStatus" @GetSigninStatusClose="GetSigninStatusClose"></Signinvue>
      <div class="friendred" v-if="isshowfriendred">
        <div>
          <div class="friendred_close" @click="appearConform(friendreddata.rel)"></div>
          <div class="friendred_header"><img :src="friendreddata.user_header"/></div>
          <div class="friendred_name">{{friendreddata.user_name}}</div>
          <div class="friendred_btn" @click="getRed">立即领取</div>
          <!-- <div class="friendred_time">{{friendreddata.over_time_handle}} </div> -->
          <div class="friendred_time">
            <!-- {{friendreddata.surplus_time}} -->
            <countdown v-if="countingidentifyCode"
            :time="Number(friendreddata.surplus_time) * 1000"
            :leadingZero="true"
            @countdownend="countidentifyCodeDownEnd" @countdownprogress="countdownprogress">
            <template slot-scope="props" >
              <span v-if="props.seconds > 0 || props.hours > 0 || props.minutes > 0">{{props.hours}}:{{props.minutes}}:{{ props.seconds }}</span>
            </template>
          </countdown>
          </div>
        </div>
      </div>
        <div class="saveCancelRed" v-if="isShowCancelGetRed">
          <div class="saveCancelRed_container">
            <p class="title">提示</p>
            <div class="cancel">
              <span>是否放弃抢红包？</span>
            </div>
            <div class="bottom">
              <div class="bom_left" @click="cancelConfirm">
                取消
              </div>
              <div class="bom_right" @click="saveConfirm">
                <div class="bom_right_inner"></div>
                确定
              </div>
            </div>
          </div>
        </div>
      <div>
        <div class="top_bg">
          <p class="no_ball_tip" v-if="BallCoinListLen <= 0">正在挖矿中...</p>
          <div class="top">
            <router-link class="top_header" :to="{name:'FriendRequest'}">
              <img :src="Header" width="100%"/>
              <span v-if="MessageCount !== '0'">{{MessageCount}}</span>
            </router-link>
            <router-link class="top_name" :to="{name:'FriendRequest'}">{{UserName}}</router-link>
            <router-link :to="{name:'Task'}" class="top_power">算力{{Power}}</router-link>
          </div>
          <div class="qiu_div">
            <div v-for="(item,index) in BallCoinList" class="qiu" :class="{qiu_1:(item.ballcoin_type == 1),qiu_2:(item.ballcoin_type==2),qiu_over:(item.is_over==true),qiu_dug:item.user_ballcoin_vuestatus}" :key="index" @click="GetUserBallCoin(item.user_ballcoin_id,index,item)">
              <div class="qiu_img">{{item.ballcoin_name}}</div>
              <!-- <div class="qiu_bottom" v-if="item.user_ballcoin_vuestatus">{{item.user_ballcoin_surplustime}}</div>
              <div class="qiu_bottom" v-else>{{item.user_ballcoin_surplus}}</div> -->
              <div class="qiu_bottom">
                <countdown v-if="item.user_ballcoin_endtime > 0"
                  :time="(item.user_ballcoin_endtime + 60) * 1000"
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
          <div class="top_nav">
            <router-link :to="{name:'Task'}"></router-link>
            <router-link :to="{name: 'homeWallet'}"></router-link>
            <router-link :to="{name:'RequestPage'}"></router-link>
          </div>

        </div>
        <div class="win_treasure">
          <div class="cat_title">
            <span>夺宝记录</span>
          </div>
          <div class="win_treasure_list">
            <div v-for="(item,index) in NatchLog" class="win_treasure_con" :key="index">
              <div v-if="item.user_ballcoin_log_type == 1">
                我<span class="win_treasure_con_desc"> 领取了</span>自己<span class="win_treasure_con_count">{{parseFloat(item.user_ballcoin_log_count)}}</span>{{item.coin_name}}<span class="win_treasure_con_time">{{GetLogTime(item.user_ballcoin_log_addtime)}}</span>
              </div>
              <div v-else-if="item.user_ballcoin_log_type == 2 && item.user_id == UserId">
                我<span class="win_treasure_con_desc"> 偷走了 </span>
                <span class="threeLetters">{{item.user_ballcoin_user_name}}</span>
                <span class="win_treasure_con_count">{{parseFloat(item.user_ballcoin_log_count)}}</span> {{item.coin_name}}<span class="win_treasure_con_time">{{GetLogTime(item.user_ballcoin_log_addtime)}}</span>
              </div>
              <div v-else>
                <span class="threeLetters">{{item.user_name}}</span>
                <span class="win_treasure_con_desc"> 偷走了</span><span class="win_treasure_con_count">{{parseFloat(item.user_ballcoin_log_count)}}</span> {{item.coin_name}}<span class="win_treasure_con_time">{{GetLogTime(item.user_ballcoin_log_addtime)}}</span>
              </div>
            </div>

          </div>
          <router-link class="win_treasure_all" :to="{name:'WinTreasureList'}">查看全部</router-link>
        </div>
        <div class="clear"></div>
        <div class="friend_div">
          <div class="cat_title">我的好友 <div class="addfriend" @click="AddFriendShowClick">添加朋友</div></div>
          <!-- <div class="friend_list">
            <router-link class="friend_con" v-for="(item,index) in FriendList" :to="{name:'Friend',query:{id:item['friend_from_user_id'], name: item['user_name']}}" :key="index">
              <div class="friend_header"><img :src="item.user_header" width="100%"/></div>
              <div class="friend_other">
                <span>{{item.user_name}}</span>
                <span>算力{{item.user_power}}</span>
                <a v-if="item.IsWinTreasure"></a>
              </div>
            </router-link>
          </div> -->
          <div @click="powerDetail(item)" class="friend_list" v-for="(item,index) in FriendList" :key="index">
            <!-- <router-link class="friend_con" v-for="(item,index) in FriendList" :to="{name:'Friend',query:{id:item['friend_from_user_id'], name: item['user_name']}}" :key="index"> -->
              <div class="friend_header"><img :src="item.user_header" width="100%"/></div>
              <div class="friend_other">
                <span>{{item.user_name}}</span>
                <div class="iconHand" v-if="item.IsWinTreasure"></div>
                <div class="noShowIconHand" v-if="!item.IsWinTreasure"></div>
                <!-- <div class="iconHand">
                  <img v-if="item.IsWinTreasure" src="../assets/index_9.png" alt="">
                </div> -->
                <div class="powerSpan">算力{{item.user_power}}</div>
                <!-- <a v-if="item.IsWinTreasure"></a> -->
              </div>
            <!-- </router-link> -->
          </div>
          <router-link class="win_treasure_all" :to="{name:'FriendAllList'}">查看全部</router-link>
        </div>
        <div class="addfriend_div" v-if="AddFriendShow">
          <div>
            <!-- <div class="addfriend_close_div"><a @click="AddFriendShow = false"></a></div> -->
            <div class="addfriend_close_div"><span @click="AddFriendShow = false"></span></div>
            <div class="addfriend_title">添加好友</div>
            <div class="addfriend_input">
              <input type="text" placeholder='请输入TA的手机号/邀请码' v-model="AddFriendData.phone"/>
            </div>
            <div class="addfriend_btn" @click="AddFriend">确认添加</div>
            <div class="addfriend_clear"></div>
            <div class="addfriend_invite">邀请码：{{InviteCode}}</div>
            <div class="addfriend_invite_desc">邀请注册成功后，自动成为好友</div>
            <div class="addfriend_btn addfriend_btn_copy" type="button"
              v-clipboard:copy="InviteCode"
              v-clipboard:success="onCopy">复制专属邀请链接</div>
          </div>
        </div>

        <ErrorMessage :ErrorDescShow="ErrorDesc"></ErrorMessage>
      </div>
    </div>
	</div>

</template>
<script>
import BScroll from 'better-scroll'
import { api } from "@/static/api";
import { DateHandle } from "@/static/common";
import { checkerror } from "@/static/common";
import Signinvue from "@/pages/home/Signin";
import ErrorMessage from "@/components/ErrorMessage";
import { MessageBox, Toast } from "mint-ui";

import countdown from "@xkeshi/vue-countdown"; // 倒计时插件


export default {
  name: "Home",
  props: {},
  data() {
    return {
      saveData: '',
      isShowCancelGetRed: false,
      rel: '',
      isshowfriendred: false,
      friendreddata: {},
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      UserName: this.$store.getters.Name,
      Header: this.$store.getters.Header,
      UserId: this.$store.getters.UserId,
      Power: this.$store.getters.Power,
      InviteCode: this.$store.getters.InviteCode,
      MessageCount: '0',
      BallCoinList: {},
      WinTreasureList: {},
      FriendList: {},
      AddFriendShow: false,
      AddFriendData: { phone: "", invite_code: "" },
      NatchLog: {},
      ErrorDesc: "",
      IsShowSignin: false,
      SetInterValHandle:"",
      countingidentifyCode: false
    };
  },
  components: {
    Signinvue,
    ErrorMessage,
    countdown
  },
  created() {
    this.GetFriendRed();
    // this.$store.dispatch('UserLogout');
    this.GetIsShowSignin();
    this.GetUserBallCoinList();
    this.GetFriendList();
    this.GetUserNatchLog();
    this.GetFriendRequestCount();
    // this.SetIntervalHandle();
    // this.SetBallCoinData()
    // this.SetFriendRed();
  },
  mounted() {
    this.GetPower()
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  computed:{
    BallCoinListLen(){
      return this.BallCoinList.length
    }
  },
  watch: {},
  methods: {
    powerDetail(item){
      this.$router.push({
        path: '/Friend',
        query:{id:item['friend_from_user_id'], name: item['user_name']}
      })
    },
    _initScroll:function () {
      if(!this.$refs.home_main){
        return
      }
      this.meunScroll = new BScroll(this.$refs.home_main, {
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 400 // 回弹时间
      })
    },
    // 添加好友界面
    AddFriendShowClick(){
      // this.AddFriendShow = true
      this.$router.push({
        path: '/addFriend'
      })
    },
    SetIntervalHandle(){
      var _this = this
      clearInterval(_this.SetInterValHandle);
			_this.SetInterValHandle = setInterval(() => {
        _this.SetBallCoinData()
        // _this.SetFriendRed();
      }, 5000);
    },
    getRed(){

      this.$router.push({
        path: '/getPack',
        query: {
          id: this.friendreddata.rel
        }
      })
    },
    SetFriendRed() {
      // this.friendreddata.over_time_handle = this.GetFriendRedTime(
      //   this.friendreddata.over_time
      // );
    },
    GetFriendRedTime(time) {
      return DateHandle.GetFriendRedTime(time);
    },
    GetFriendRed() {
      var _this = this;
      api.GetFriendRed(_this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          if (res.data != "") {
            _this.isshowfriendred = true;
            _this.friendreddata = res.data;
            _this.countingidentifyCode = true // 倒计时
            // _this.friendreddata.over_time_handle = _this.GetFriendRedTime(
            //   _this.friendreddata.over_time
            // );
          }
        } else {
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      });
    },
    appearConform(data){
      this.saveData = data
      this.isshowfriendred = false
      this.isShowCancelGetRed = true
    },
    cancelConfirm(){
      this.isShowCancelGetRed = false
      this.isshowfriendred = true
    },
    saveConfirm(){
      this.CloseFriendRedHandle(this.saveData)
    },
    CloseFriendRedHandle(rel) {
      var _this = this;
      var data = { rel: rel };
      api.CloseFriendRed(data, _this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          _this.isshowfriendred = false
          _this.isShowCancelGetRed = false
        } else {
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      });
    },
    SetBallCoinData() {
      for (var key in this.BallCoinList) {
        this.BallCoinList[key]["user_ballcoin_vuestatus"] = this.GetQiuStatus(
          this.BallCoinList[key]["user_ballcoin_overtime"]
        );
        this.BallCoinList[key]["user_ballcoin_surplustime"] = this.GetQiuSurplusTime(
          this.BallCoinList[key]["user_ballcoin_overtime"]
        );
      }
    },
    // 获取用户算力
    GetPower() {
      var _this = this;
      api.GetPower(_this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          _this.$store.dispatch("UpdatePower", res.data);
          _this.Power = res.data;
        } else {
          _this.ErrorDesc = "";
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      });
    },
    // 获取球数据
    GetUserBallCoinList() {
      var _this = this;
      api.GetBallCoinList(_this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          _this.BallCoinList = res.data;
          _this.initBallCoinData()
          // _this.SetBallCoinData();
        } else {
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      });
    },
    initBallCoinData(){
      for(let i=0;i<this.BallCoinList.length;i++){
        this.BallCoinList[i].hasClicked = false
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
      var data = { user_ballcoin_id: ballcoin_id };
      if(item.hasClicked ){ // 是否点击领取过
        console.log(1111111)
        return
      }
      item.hasClicked = true
      if(item.noClick){
        this.$toast({
          message: '未到领取时间',
          duration: 1000
        })
        return
      }
      api.GetUserBallCoin(data, _this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          _this.BallCoinList[key]["is_over"] = true;
        } else {
          item.hasClicked = false
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      }).catch(err => {
        item.hasClicked = false
      });
    },
    GetFriendList() {
      var _this = this;
      api.GetFriendList(_this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          _this.FriendList = res.data;
          _this.$nextTick(() => {
            _this._initScroll()
          })
        } else {
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      });
    },
    AddFriend() {
      var _this = this;
      _this.CheckErrorData = checkerror.AddFriend(_this.AddFriendData.phone);
      if (_this.CheckErrorData.code != 1000) {
        _this.ErrorData.Desc = _this.CheckErrorData.desc;
        _this.ShowError();
        return;
      }
      var data = { phone: _this.AddFriendData.phone };
      api.AddFriend(data, _this.ApiConf).then(res => {
        // 如果注册成功
        if (res.error_code == 1000) {
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        } else {
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      });
      // AddFriend.phone
    },
    GetUserNatchLog() {
      var _this = this;
      api.GetUserNatchLog(_this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          _this.NatchLog = res.data;
        } else {
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      });
    },
    GetLogTime(time) {
      return DateHandle.GetLogTime(time);
    },
    GetIsShowSignin() {
      var _this = this;
      api.GetIsShowSignin(_this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          _this.IsShowSignin = res.data; // 显示签到
        } else {
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      });
    },
    GetSigninStatus(SigninStatus) {
      this.IsShowSignin = SigninStatus;
      this.GetPower()
      // this.hideEveryLogin()
    },
    GetSigninStatusClose(){
      this.IsShowSignin = false;
      this.GetPower()
      this.hideEveryLogin()
    },
    hideEveryLogin(){
      var _this = this
      api.hideLogin(_this.ApiConf)
      .then(res => {
        if (res.error_code == 1000) {
          _this.IsShowSignin = false
        } else {
          Toast({
            message: res.error_desc, //提示内容分
            duration: 1000 //持续时间（毫秒），若为 -1 则不会自动关闭
          })
        }
      })
      .catch(() => {
        _this.IsShowSignin = false
        Toast({
          message: res.error_desc, //提示内容分
          duration: 1000 //持续时间（毫秒），若为 -1 则不会自动关闭
        })
      })
    },
    GetFriendRequestCount() {
      var _this = this;
      api.GetFriendRequestCount(_this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          _this.MessageCount = res.data;
        } else {
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      });
    },
    onCopy(e) {
      this.ErrorDesc = "复制成功" + new Date().getTime();
      console.log(e.text);
    },
    countidentifyCodeDownEnd(){
      this.isshowfriendred = false
      this.countingidentifyCode = false
    },
    countdownprogress(data){
      if(data.seconds == 1){
        this.countidentifyCodeDownEnd()
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main {
  height: 100%;
  width: 100%;
  overflow: hidden;
  // background: url("~@/assets/index_1.png") no-repeat top;
  background-size: 100% auto;
  // margin-bottom: 220px;
  .main_container{
    overflow: hidden;
    height: calc(100% - 100px);
    .top_bg{
      height: 886px;
      width: 100%;
      background-repeat: no-repeat;
      background-size: (100%, 100%);
      background-image: url("~@/assets/index_1.png");
      position: relative;
      .no_ball_tip{
        position: absolute;
        width: 100%;
        height: 25px;/*no*/
        font-size: 15px;/*no*/
        line-height: 1;
        color: #fff;
        text-shadow: 0 0 3px #f1f1f1;
        top: 0;
        bottom: 0;
        margin: auto;
        text-align: center;
      }
    }
    // .getRedPop{
    //   position: absolute;
    //   top: 0;
    // }
  }
}
.top {
  width: 100%;
  padding: 40px 0 0 40px;
  height: 140px;
}
.top_header {
  width: 90px;
  height: 90px;
  float: left;
  position: relative;
}
.top_header > img {
  top: 0;
  width: 100%;
  float: left;
  border-radius: 50%;
  overflow: hidden;
}
.top_header > span {
  width: 36px;
  height: 36px;
  font-size: 20px; /*px*/
  color: white;
  position: absolute;
  display: block;
  background: #fc4c24;
  line-height: 36px;
  right: 0;
  margin-right: -12px;
  border-radius: 50%;
  margin-top: -10px;
}
.top_name {
  height: 0.9rem;
  color: white;
  float: left;
  font-size: 25px; /*px*/
  width: auto;
  line-height: 90px;
  margin-left: 22px;
}
.top_power {
  background: rgba(0, 0, 0, 0.5);
  height: 60px;
  float: right;
  font-size: 24px; /*px*/
  color: white;
  min-width: 170px;
  line-height: 60px;
  border-radius: 100px 0 0 100px;
}
.qiu_div {
  width: 100%;
  height: 565px;
  position: relative;
}
.qiu {
  height: 120px;
  width: 110px;
  position: absolute;
  transition: margin-top 0.6s, margin-left 0.6s, opacity 1.5s, width 0.8s,
    height 0.8s;
}
.qiu_img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  color: white;
  font-size: 20px; /*px*/
  line-height: 90px;
	margin:0px auto;
  transition: width 1s, height 1s;
}
.qiu_bottom {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 18px; /*px*/
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
  margin-top: 110px;
  margin-left: 254px;
  animation: jump 2.7s ease-in-out infinite;
}
.qiu:nth-child(2) {
  margin-top: 75px;
  margin-left: 470px;
  animation: jump 3.2s ease-in-out infinite;
}
.qiu:nth-child(3) {
  margin-top: 257px;
  margin-left: 210px;
  animation: jump 2.5s ease-in-out infinite;
}
.qiu:nth-child(4) {
  margin-top: 257px;
  margin-left: 480px;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(5) {
  margin-top: 32px;
  margin-left: 364px;
  animation: jump 3.3s ease-in-out infinite;
}
.qiu:nth-child(6) {
  margin-top: 405px;
  margin-left: 190px;
  animation: jump 3.1s ease-in-out infinite;
}
.qiu:nth-child(7) {
  margin-top: 75px;
  margin-left: 140px;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(8) {
  margin-top: 230px;
  margin-left: 78px;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(9) {
  margin-top: 357px;
  margin-left: 70px;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(10) {
  margin-top: 245px;
  margin-left: 590px;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(11) {
  margin-top: 375px;
  margin-left: 630px;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(12) {
  margin-top: 87px;
  margin-left: 615px;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(13) {
  margin-top: 97px;
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
  overflow: hidden;
  opacity: 0;
  margin-top: 600px !important;
  margin-left: 220px !important;
  width: 0px !important;
  height: 0px !important;
}
.qiu_over > .qiu_img {
  width: 0;
  height: 0;
}
.top_nav {
  height: 130px;
  width: 100%;
}
.top_nav > a:nth-child(1) {
  margin-left: 36px;
  float: left;
  width: 112px;
  height: 130px;
  background: url("~@/assets/index_6.png") no-repeat bottom;
  background-size: 112px 126px;
}
.top_nav > a:nth-child(2) {
  margin-left: 24px;
  float: left;
  width: 114px;
  height: 130px;
  background: url("~@/assets/index_5.png") no-repeat bottom;
  background-size: 114px 125px;
}
.top_nav > a:nth-child(3) {
  margin-right: 30px;
  float: right;
  width: 114px;
  height: 130px;
  background: url("~@/assets/index_7.png") no-repeat bottom;
  background-size: 111px 127px;
}
.win_treasure,
.friend_div {
  width: 100%;
  min-height: 470px;
  height: auto;
  margin-top: 100px;
  padding: 0 40px;
}
.cat_title {
  width: 100%;
  height: 40px;
  line-height: 33px;
  border-left: 3px solid #fdd401; /*no*/
  font-size: 32px; /*px*/
  text-align: left;
  padding-left: 20px;
  margin-bottom: 35px;
  overflow: hidden;

}
.win_treasure_list,
.friend_list {
  width: 100%;
  height: auto;
  overflow: hidden;
  border-top: 1px solid #e2e2e1; /*no*/
  // margin-top: 35px;
}
.win_treasure_con {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #e2e2e1; /*no*/
  font-size: 28px; /*px*/
  line-height: 100px;
  text-align: left;
}
.win_treasure_con:last-child {
  border: none;
}
.win_treasure_con_desc {
  margin-left: 14px;
  color: #767676;
}
.win_treasure_con_count {
  margin-left: 14px;
  color: #fcd301;
}
.win_treasure_con_time {
  float: right;
  color: #b6b6b6;
}
.win_treasure_all {
  display: block;
  width: 100%;
  height: 78px;
  line-height: 78px;
  color: #abaaaa;
  font-size: 25px; /*px*/
  border-top: 1px solid #e2e2e1; /*no*/
}
.clear {
  width: 100%;
  height: 20px;
  background: #f2f2f2;
}
.friend_div {
  margin-top: 64px;
}
.addfriend {
  float: right;
  width: 140px;
  height: 42px;
  line-height: 42px;
  text-align: right;
  font-size: 25px; /*px*/
  color: #fcd301;
  background: url("~@/assets/index_8.png") no-repeat left;
  background-size: 28px;
}
.friend_con {
  height: 136px;
  width: 100%;
  display: block;
}
.friend_con:last-child > .friend_other {
  border: none;
}
.friend_header {
  height: 80px;
  margin-top: 28px;
  width: 80px;
  float: left;
  border: 1px solid #e2e2e1; /*no*/
  border-radius: 50%;
  overflow: hidden;
}
.friend_header > img {
  float: left;
}
.friend_other {
  font-size: 30px; /*px*/
  height: 136px;
  float: right;
  line-height: 136px;
  width: 525px;
  // border-bottom: 1px solid #e2e2e1; /*no*/
  color: #000000;
}
.friend_other > span:nth-child(1) {
  float: left;
  width: auto;
  height: 100%;
}
.friend_other .iconHand{
  float: right;
  background: url("~@/assets/index_9.png") no-repeat center;
  height: 100%;
  // background: yellow;
  background-size: 46px;
  width: 80px;
}
.friend_other .noShowIconHand{
  float: right;
  // background: url("~@/assets/index_9.png") no-repeat center;
  height: 100%;
  // background: yellow;
  background-size: 46px;
  width: 80px;
}
.friend_other  .powerSpan{
  float: right;
  text-align: right;
  color: #6f6e6e;
  height: 100%;
  width: 130px;
  margin-right: 40px;
}
// .friend_other > span:nth-child(2) {
//   float: right;
//   width: auto;
//   color: #6f6e6e;
//   height: 100%;
// }
// .friend_other > a {
//   // float: right;
//   background: url("~@/assets/index_9.png") no-repeat center;
//   // height: 100%;
//   background-size: 46px;
//   display: inline-block;
//   width: 45px;
//   height: 45px;
//   // height: 46px;
//   // margin-right: 30px;
// }
.friend_other img{
  // float: right;
  // text-align: right;
  // position: absolute;
  // right: 0;
  margin-top: 43px;
  margin-right: 22px;
  float: right;
  display: block;
  // vertical-align: middle;
  height: 45px;
  width: 45px;
}
.addfriend_div {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 999;
  top: 0;
}
.addfriend_div > div {
  margin: 0 auto;
  width: 630px;
  height: 870px;
  background: white;
  top: 50%;
  left: 0;
  right: 0;
  position: absolute;
  border-radius: 30px;
  margin-top: -435px;
  padding: 40px;
}
.addfriend_close_div {
  width: 100;
  height: 33px;
}
.addfriend_close_div > a {
  width: 33px;
  height: 33px;
  float: right;
}
.addfriend_close_div > a::after {
  width: 33px;
  height: 33px;
  content: "+";
  font-size: 35px; /*px*/
  color: #626262;
  display: block;
  transform: rotate(45deg);
  line-height: 33px;
}
.addfriend_title {
  margin-top: 5px;
  width: 100%;
  height: 30px;
  font-size: 30px; /*px*/
  color: #404040;
}
.addfriend_input {
  margin-top: 87px;
  width: 100%;
  height: 80px;
  border: 1px solid #e2e2e1; /*no*/
  border-radius: 100px;
}
.addfriend_input > input {
  float: left;
  width: 100%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  color: #bcbcbc;
  border: none;
  background: none;
}
.addfriend_input > input[placeholder] {
  color: #bcbcbc;
}
.addfriend_btn {
  margin: 0 auto;
  width: 400px;
  height: 80px;
  line-height: 80px;
  color: white;
  background: #ffc601;
  /* background: linear-gradient(top, #ffdd2e, #ffc601); */
  /* Webkit: Safari 5.1+, Chrome 10+ */
  /* background: -webkit-linear-gradient(top, #ffdd2e, #ffc601); */
  /* Firefox 3.6+ */
  /* background: -moz-linear-gradient(top, #ffdd2e, #ffc601); */
  /* Opera 11.10+ */
  /* background: -o-linear-gradient(top, #ffdd2e, #ffc601); */
  /* IE 10 */
  /* background: -ms-linear-gradient(top, #ffdd2e, #ffc601); */
  font-size: 25px; /*px*/
  border-radius: 100px;
  margin-top: 42px;
}
.addfriend_clear {
  width: 100%;
  height: 2px;
  border-top: 3px dashed #ededed; /*no*/
  margin-top: 55px;
}
.addfriend_invite {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin-top: 60px;
  font-size: 30px; /*px*/
  color: #fdd401;
}
.addfriend_invite_desc {
  width: 100%;
  height: 25px;
  line-height: 25px;
  margin-top: 30px;
  color: #393939;
  font-size: 25px; /*px*/
}
.addfriend_btn_copy {
  margin-top: 70px;
}
/* 下边是新加的样式 */
.friendred {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 999;
  top: 0;
}
.friendred > div {
  width: 610px;
  height: 730px;
  top: 50%;
  margin-top: -350px;
  background: white;
  position: absolute;
  left: 50%;
  margin-left: -310px;
  background: url("~@/assets/index_11.png") no-repeat 0 90px;
  background-size: 618px 637px;
}
.friendred_close {
  width: 26px; /*no*/
  float: right;
  height: 26px; /*no*/
  background: url("~@/assets/index_12.png") no-repeat center;
  background-size: 26px; /*no*/
}
.friendred_header {
  width: 100%;
  height: 80px;
  margin-top: 400px;
}
.friendred_header > img {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  overflow: hidden;
}
.friendred_name {
  height: 22px;
  font-size: 22px;/*px*/
  width: 100%;
  line-height: 22px;
  color: #f3c1c6;
  margin-top: 10px;
}
.friendred_btn {
  height: 100px;
  width: 300px;
  margin: 0 auto;
  margin-top: 25px;
  background: -webkit-linear-gradient(left,#feb700, #fdf301); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right,#feb700, #fdf301); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right,#feb700, #fdf301); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right,#feb700, #fdf301); /* 标准的语法 */
/* background: linear-gradient(top, #ffdd2e, #ffc601); */
  font-size: 38px;/*px*/
  line-height: 100px;
  color: #ea3455;
  border-radius: 30px;
}
.friendred_time {
  /* color: white; */
  height: 20px;
  line-height: 20px;
  margin-top: 20px;
  width: 100%;
  font-size: 20px;/*px*/
  color: #f36f7e;
}
.saveCancelRed{
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  /* background: green; */
}
.saveCancelRed_container{
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  height: 330px;
  width: 640px;

}
.saveCancelRed_container .cancel{
  padding-bottom: 50px;
  border-bottom:1px solid #cfcece;/*no*/
  margin-top: 40px;
  color: #1a1a1a;
  font-size: 33px;/*px*/
}
.saveCancelRed_container .bottom{
  display: flex;
  height: 98px;
}
.saveCancelRed_container .title{
  margin-top: 50px;
  color: #1a1a1a;
  font-size: 37px;/*px*/
  font-weight: bold;
}
.bom_left, .bom_right{
  // position: relative;
  line-height: 98px;
  flex: 1;
  .bom_right_inner{
    float: left;
    // position: absolute;
    height: 90px;
    width: 2px;
    background: #cfcece;
  }
}
.bom_left{
  font-size: 30px;/*px*/
  color: #b7b7b7;
}
.bom_right{
  // border-left: 1px solid #cfcece;
  font-size: 30px;/*px*/
  color: #1a1a1a;
}
</style>
