<template>
<div class="friendRequest">
  <tar-header :isSowBack='true' :title="title"></tar-header>
	<div class="main ">
    <div class="friendRequestBg" v-if="isSowBack">
      <img src="../../assets/empty.png" alt="背景图">
      <p>暂无记录</p>
    </div>
		<!--<div class="message" v-for="(item,index) in MessageList" :key="index">-->
		<div class="message"  v-for="(item,index) in FriendRequestList" :key="index">
			<div class="header">
				<img :src="item.user_header" />
			</div>
			<div class="name">
				<div class="name_top">{{item.user_name}}</div>
				<div class="name_bottom">申请添加我为好友</div>
			</div>
			<div class="btn">
				<!--{{item.friend_status}}-->
				<span v-if="item.friend_status ==1">
					已同意
				</span>
				<span v-else-if="item.friend_status ==2">
					已删除
				</span>
				<span v-else-if="item.friend_status == 3">
					已拒绝
				</span>
				<div v-else-if="item.friend_status == 0">
					<div class="btn_left" @click="AddFriend(item.friend_from_user_id,item.friend_id,2,index)">拒绝</div>
					<div class="btn_right" @click="AddFriend(item.friend_from_user_id,item.friend_id,1,index)">同意</div>
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
import ErrorMessage from "@/components/ErrorMessage";
export default {
  name: "GetFriendRequest",
  props: {},
  data() {
    return {
      isSowBack: false,
      title: '消息通知',
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      ErrorDesc: "",
      FriendRequestList: {}
    };
  },
  components: {
    tarHeader: header,
    ErrorMessage
  },
  created() {
    this.GetFriendRequestList();
  },
  mounted() {},
  watch: {},
  methods: {
    GetFriendRequestList() {
      var _this = this;
      api.GetFriendRequestList(_this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          _this.FriendRequestList = res.data;
          if (_this.FriendRequestList.length == 0){
            this.isSowBack = true
          }
        } else {
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      });
    },
    AddFriend(id, friend_id, type, key) {
      var _this = this;
      var data = { friend_from_user_id: id, friend_id: friend_id, type: type };
      api.AgreenFriend(data, _this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          _this.FriendRequestList[key]["friend_status"] = res.data;
        } else {
          _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      });
      console.log(id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel='stylesheet/scss' scoped>
.friendRequest{
  height: 100%;
  width: 100%;
}
.friendRequestBg{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-65%);
  height: 317px;
  width: 389px;
}
.friendRequestBg img{
  height: 100%;
  width: 100%;
}
.friendRequestBg p{
  letter-spacing: 3px;
  font-size: 32px;
  color: #adadad;
}
.main {
  position: relative;
  height: calc(100% - 95px);
  overflow: hidden;
  padding: 0 30px;
}
.message {
  width: 100%;
  height: 170px;
  border-bottom: 1px solid #e2e2e1;/*no*/
}
.header {
  width: 100px;
  height: 100px;
  margin-top: 35px;
  float: left;
}
.header img{
  height: 100%;
  width: 100%;
}
.name {
  width: 260px;
  margin-left: 30px;
  height: 100px;
  margin-top: 35px;
  float: left;
}
.name_top {
  font-size: 30px;/*px*/
  line-height: 80px;
  height: 50px;
  font-size: 30px;/*px*/
  text-align: left;
}
.name_bottom {
  line-height: 70px;
  height: 50px;
  font-size: 25px;/*px*/
  color: #adadad;
  text-align: left;
}
.btn {
  width: 300px;
  float: right;
  text-align: right;
  color: #b9b9b9;
  font-size: 28px;/*px*/
  height: 170px;
  line-height: 170px;
}
.btn_left {
  float: left;
  border: 1px solid #fdd401;/*no*/
  color: #fdd401;
  font-size: 28px;/*px*/
  line-height: 65px;
  height: 60px;
  margin-top: 55px;
  width: 140px;
  text-align: center;
  border-radius: 200px;
}
.btn_right {
  float: right;
  background: #fdd401;
  color: white;
  font-size: 28px;/*px*/
  line-height: 65px;
  height: 60px;
  margin-top: 55px;
  width: 140px;
  text-align: center;
  border-radius: 200px;
}
</style>
