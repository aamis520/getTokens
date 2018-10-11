<template>
<div class="friend">
  <tar-header :isSowBack='true' :title="title"></tar-header>
	<div class="main">
		<div class="top"></div>
		<div class="qiu_div">
			<div v-for="(item,index) in BallCoinList" class="qiu" :class="{qiu_1:(item.ballcoin_type == 1),qiu_2:(item.ballcoin_type==2),qiu_over:(item.is_over==true),qiu_dug:item.user_ballcoin_vuestatus}" :key="index" @click="GetUserBallCoin(item.user_ballcoin_id,index)">
				<div class="qiu_img">{{item.ballcoin_name}}</div>
				<div class="qiu_bottom" v-if="item.user_ballcoin_vuestatus">{{item.user_ballcoin_surplustime}}</div>
				<div class="qiu_bottom" v-else>{{item.user_ballcoin_count}}</div>
			</div>
		</div>
		<div class="friend_comparison">

		</div>
		<div class="error" v-if="ErrorData.IsShow"><span>{{ErrorData.Desc}}</span></div>
	</div>
</div>
</template>
<script>
import header from "../../pages/comm/header";
import { api } from "@/static/api";
import { DateHandle } from "@/static/common";
import { checkerror } from "@/static/common";
export default {
  name: "Home",
  props: {},
  data() {
    return {
      title: '好友列表',
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      ErrorData: {
        time: 2000, //弹窗消失时间
        Interval: "",
        IsShow: false,
        Desc: ""
      },
      BallCoinList: {}
    };
  },
  components: {
    tarHeader: header
  },
  created() {
    this.GetUserBallCoinList();
  },
  mounted() {
    // console.log('gjkdlj')
    setInterval(() => {
      this.SetBallCoinData();
    }, 5000);
  },
  watch: {},
  methods: {
    ShowError() {
      // 显示错误提示
      var _this = this;
      clearTimeout(_this.ErrorData.Interval);
      _this.ErrorData.IsShow = true;
      _this.ErrorData.time_surplus = _this.ErrorData.time;
      _this.ErrorData.Interval = setTimeout(() => {
        _this.ErrorData.IsShow = false;
        clearTimeout(_this.ErrorData.Interval);
        _this.ErrorData.Interval = null;
      }, _this.ErrorData.time);
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
      api.GetBallCoinList(_this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          _this.BallCoinList = res.data;
          this.SetBallCoinData();
        } else {
          _this.ErrorData.Desc = res.error_desc;
          _this.ShowError();
        }
      });
    },
    GetQiuStatus(time) {
      return DateHandle.GetNowTime() < DateHandle.GetDateTime(time);
    },
    GetQiuSurplusTime(time) {
      return DateHandle.GetSurplusTime(time);
    },
    GetUserBallCoin(ballcoin_id, key) {
      var _this = this;
      var data = { user_ballcoin_id: ballcoin_id };
      api.GetUserBallCoin(data, _this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          this.BallCoinList[key]["is_over"] = true;
        } else {
          _this.ErrorData.Desc = res.error_desc;
          _this.ShowError();
        }
      });
      console.log(ballcoin_id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel='stylesheet/scss' scoped>
.main {
  width: 100%;
  height: auto;
  overflow: hidden;
  background: url("~@/assets/index_1.png") no-repeat top;
  background-size: 100% auto;
  margin-bottom: 2.2rem;
}
.top {
  width: 100%;
  padding: 0.4rem 0 0 0.4rem;
  height: 1.4rem;
}
.qiu_div {
  width: 100%;
  height: 5.65rem;
  position: relative;
}
.qiu {
  height: 1.2rem;
  width: 1.1rem;
  position: absolute;
  transition: margin-top 1s, margin-left 1s, opacity 1.5s;
}
.qiu_img {
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  overflow: hidden;
  color: white;
  font-size: 0.2rem;
  line-height: 0.9rem;
}
.qiu_bottom {
  width: 100%;
  height: 0.3rem;
  line-height: 0.3rem;
  font-size: 0.18rem;
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
  margin-top: 1.1rem;
  margin-left: 2.54rem;
  animation: jump 2.7s ease-in-out infinite;
}
.qiu:nth-child(2) {
  margin-top: 0.75rem;
  margin-left: 4.1rem;
  animation: jump 3.2s ease-in-out infinite;
}
.qiu:nth-child(3) {
  margin-top: 2.57rem;
  margin-left: 2.1rem;
  animation: jump 2.5s ease-in-out infinite;
}
.qiu:nth-child(4) {
  margin-top: 2.57rem;
  margin-left: 4.8rem;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(5) {
  margin-top: 3.2rem;
  margin-left: 3.64rem;
  animation: jump 3.3s ease-in-out infinite;
}
.qiu:nth-child(6) {
  margin-top: 4.05rem;
  margin-left: 1.9rem;
  animation: jump 3.1s ease-in-out infinite;
}
.qiu:nth-child(7) {
  margin-top: 0.75rem;
  margin-left: 1.4rem;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(8) {
  margin-top: 2.3rem;
  margin-left: 0.78rem;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(9) {
  margin-top: 3.57rem;
  margin-left: 0.7rem;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(10) {
  margin-top: 2.45rem;
  margin-left: 5.9rem;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(11) {
  margin-top: 3.75rem;
  margin-left: 6.3rem;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(12) {
  margin-top: 0.87rem;
  margin-left: 6.15rem;
  animation: jump 3s ease-in-out infinite;
}
.qiu:nth-child(13) {
  margin-top: 0.97rem;
  margin-left: 0.24rem;
  animation: jump 3s ease-in-out infinite;
}
@keyframes jump {
  0% {
    top: 0;
  }
  50% {
    top: 0.1rem;
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
  margin-top: 5.3rem !important;
  margin-left: 2rem !important;
}
.top_nav {
  height: 1.3rem;
  width: 100%;
}
.friend_comparison {
  width: 7rem;
  height: 3.1rem;
  border: 0.01rem solid #e5e5e5;
  margin-top: 2.1rem;
  border-radius: 0.3rem;
}
.friend_comparison_title {
  width: 100%;
  height: 0.35rem;
  margin-top: 0.37rem;
  font-size: 0.32rem;
  color: #272727;
}
</style>
