<template>
  <div class="winList">
    <tar-header :isSowBack='true' :title="title"></tar-header>
    <div class="main">
      <div class="win_treasure_check">
        <div class="win_treasure_other" :class="{win_treasure_my_hover:checktype == 2}" @click="CheckType(2)">偷我的</div>
        <div class="win_treasure_my" :class="{win_treasure_my_hover:checktype == 3}" @click="CheckType(3)">我偷的</div>
      </div>
      <div class="win_treasure_list" ref="win_treasure_list">
        <div class="friendRequestBg" v-if="isSowBack">
          <img src="../../assets/empty.png" alt="背景图">
          <p>暂无记录</p>
        </div>
        <div>
          <div v-for="(item,index) in NatchLogAll" class="win_treasure_con" :key="index">
            <div v-if="item.user_ballcoin_log_type == 1">
              我<span class="win_treasure_con_desc"> 领取了</span>自己<span class="win_treasure_con_count">{{parseFloat(item.user_ballcoin_log_count)}}</span>{{item.coin_name}}<span class="win_treasure_con_time">{{GetLogTime(item.user_ballcoin_log_addtime)}}</span>
            </div>
            <div v-else-if="item.user_ballcoin_log_type == 2 && item.user_id == UserId">
              我<span class="win_treasure_con_desc"> 偷走了 </span>{{item.user_ballcoin_user_name}}<span class="win_treasure_con_count">{{parseFloat(item.user_ballcoin_log_count)}} </span>{{item.coin_name}}<span class="win_treasure_con_time">{{GetLogTime(item.user_ballcoin_log_addtime)}}</span>
            </div>
            <div v-else>
              {{item.user_name}}<span class="win_treasure_con_desc"> 偷走了</span><span class="win_treasure_con_count">{{parseFloat(item.user_ballcoin_log_count)}}</span> &nbsp;{{item.coin_name}}&nbsp;<span class="win_treasure_con_time">{{GetLogTime(item.user_ballcoin_log_addtime)}}</span>
            </div>
          </div>
        </div>
      </div>
      <ErrorMessage :ErrorDescShow="ErrorDesc"></ErrorMessage>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import header from "../../pages/comm/header";
import { api } from "@/static/api";
import { DateHandle } from "@/static/common";
import ErrorMessage from "@/components/ErrorMessage";
export default {
  name: "WinTreasureList",
  props: {},
  data() {
    return {
      isSowBack: false,
      title: "夺宝记录",
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      NatchLogAll: [],
      checktype: 2,
      UserId: this.$store.getters.UserId,
      ErrorDesc: ""
    };
  },
  components: {
    tarHeader: header,
    ErrorMessage
  },
  created() {
    this.GetUserNatchLogAll();
  },
  mounted() {

  },
  watch: {
    // NatchLogAll() {
    //   this.$nextTick(()=>{
    //     this.refresh();
    //   })
    // }
  },
  methods: {
    _initScroll:function () {
      this.meunScroll = new BScroll(this.$refs.win_treasure_list, {
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 400 // 回弹时间
      })
    },
    GetUserNatchLogAll() {
      var _this = this;
      _this.isSowBack = false
      var data = { type: _this.checktype };
      api.GetUserNatchLogAll(data, _this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          _this.NatchLogAll = res.data;
          if (_this.NatchLogAll.length == 0){
            _this.isSowBack = true
          }
          _this.$nextTick(() => {
            _this._initScroll()
          })
        } else {
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      });
    },
    CheckType(type) {
      this.checktype = type;
      this.GetUserNatchLogAll();
    },
    GetLogTime(time) {
      return DateHandle.GetLogTime(time);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.winList{
  height: 100%;
}
.main {
  width: 100%;
  height: calc(100% - 95px);
  overflow-y: scroll;
  /* background: red; */
  /* height: auto; */
  /* overflow: hidden; */
  /* margin-bottom: 220px; */
}
.win_treasure_list {
  width: 100%;
  height: calc(100% - 100px);
  // background: red;
  overflow: hidden;
  padding: 0 40px;
  /* border-top: 2px solid #eeeef1;no */
  .friendRequestBg{
    // background: red;
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
}
.win_treasure_con {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #e2e2e1;/*no*/
  font-size: 28px;/*px*/
  line-height: 100px;
  text-align: left;
}
/*.win_treasure_con:first-child{border:none;}*/
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
.win_treasure_check {
  width: 100%;
  height: 100px;
}
.win_treasure_other,
.win_treasure_my {
  width: 220px;
  float: left;
  margin-left: 80px;
  height: 100px;
  line-height: 100px;
  color: black;
  font-size: 30px;/*px*/
}
.win_treasure_my {
  float: right;
  margin-right: 80px;
}
.win_treasure_my_hover {
  border-bottom: 5px solid #fdd401;/*no*/
  color: #fdd401;
}
</style>
