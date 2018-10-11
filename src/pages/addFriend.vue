<!--  -->
<template>
  <div class="addFriend">
    <!-- <tar-header :backUrl="backUrl" :title="title"></tar-header> -->
    <tar-header :title="title"></tar-header>
    <div class="addFriend_container">
      <div class="addFriend_container_input">
        <input class="inner_input" v-model="searchFrom.search" type="text" placeholder="手机号/昵称">
        <span @click="search">搜索</span>
      </div>
      <div class="addFriend_container_body">
        <div class="container_content">
          <div class="friend_list" v-if="isShowFriends" v-for="(item,index) in friendInfo" :key="index">
            <div class="friend_list_left">
              <div class="friend_headPic">
                <img :src="item.user_header" alt="头像">
              </div>
              <div class="friend_info">
                <span class="friend_name">{{item.user_name}}</span><br>
                <span class="friend_mobile">{{item.user_mobile}}</span>
              </div>
            </div>
            <div class="friend_list_right">
              <button :class="item.is_friend ? 'class-b' : 'class-a' " @click="add(item)">{{item.is_friend | statusParse}}</button>
            </div>
          </div>
          <div v-if="isShowRemark">
            <p>
              <img src="../assets/addFriend/lingdang.png" alt="picIcon">
              <span class="title">提示：</span>
            </p>
            <div class="remark">
              <span> 如没有搜到好友，记得先邀请好友注册GetTokens，邀请注册成功，自动成为好友，开启夺宝之旅。</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 下边是提示框 -->
    <div class="popRemark" v-show="isShowClose">
      <div class="popRemark_inner">
        <div class="closeIcon" @click="isShowClose=false">
          <img src="../assets/670384281904014531.png" alt="closeIcon">
        </div>
        <div class="title">
          <span>提示</span>
        </div>
        <div class="popRemark_content">
          <span>您搜索的朋友暂时不是GetTokens用户，复制您的专属邀请码去邀请吧～</span>
        </div>
        <div class="popRemark_btn">
          <button @click="goInvite">去邀请</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "../pages/comm/header";
import { Toast } from "mint-ui";
import {api} from '@/static/api'
export default {
  data () {
    return {
      searchFrom:{
        search: ''
      },
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      isShowFriends: false,
      isShowRemark: true,
      isShowClose: false,
      title: '添加朋友',
      friendInfo: {}
    }
  },
  filters: {
    statusParse: function(data) {
      if (data) {
        return '已添加'
      } else {
        return '添加'
      }
    }
  },
  components: {
    tarHeader: header
  },
  watch: {
    // 'searchFrom.search': function (data) {
    //   if (!data){

    //   }
    // }
  },
  computed: {},

  mounted() {},

  methods: {
    // 去邀请事件
    goInvite(){
      this.$router.push({
        path: '/RequestPage'
      })
      console.log('邀请事件')
    },
    // 点击搜索事件
    search(){
      if (!this.searchFrom.search){
        return
      }
      // if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.searchFrom.search)) {
      //   Toast({
      //     message: "请输入正确的手机号。", //提示内容分
      //     duration: 1000
      //   });
      //   return;
      // }
      api.searchFriend(this.searchFrom, this.ApiConf)
      .then(res => {
        if (res.error_code == 1000) {
          this.friendInfo = res.data
          if (this.friendInfo.length > 0) {
            this.isShowRemark = false
            this.isShowFriends = true
          } else if (this.friendInfo.length == 0) {
            this.isShowClose = true
          }
        }
      })
      .catch(() => {

      })
      console.log('gjldk')
    },
    // 添加朋友事件
    add(item) {
      if (item.is_friend) {
        Toast({
          message: '已经是好友...',
          duration: 1500
        })
      }
      var obj = {}
      obj.adduser = item.user_id
      api.addFriend(obj, this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          Toast({
            message: '请求已经发送...',
            duration: 1500
          })
        } else {
           Toast({
            message: res.error_desc,
            duration: 1500
          })
        }
      })
      .catch(() => {
        Toast({
          message: res.error_desc,
          duration: 1000
        })
      })
      // AddFriend.phone
    },
  }
}

</script>
<style lang='scss' scoped>
  .addFriend{
    height: 100%;
    .popRemark{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,.5);
      .popRemark_inner{
        box-shadow: 0 0 10px gray;
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 570px;
        width: 550px;
        background: white;
        border-radius: 10px;
        .closeIcon{
          position: absolute;
          right: 20px;
          top: 20px;
          height: 50px;
          width: 50px;
          img{
            height: 100%;
            width: 100%;
          }
        }
        .title{
          margin-top: 50px;
          height: 80px;
          // background: red;
          span{
            line-height: 80px;
            letter-spacing: 10px;
            color: #515151;
            font-weight: 600;
            font-size: 37.34px;/*px*/
          }
        }
        .popRemark_btn{
          position: absolute;
          bottom: 100px;
          width: 100%;
          height: 90px;
          button{
            color: white;
            height: 100%;
            font-size: 32px;/*px*/
            width: 412px;
            border-radius: 45px;
            background: -webkit-linear-gradient(right,#feb700, #fdf301); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(left,#feb700, #fdf301); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(left,#feb700, #fdf301); /* Firefox 3.6 - 15 */
            background: linear-gradient(to left,#feb700, #fdf301); /* 标准的语法 */
          }
        }
        .popRemark_content{
          font-family: '微软雅黑';
          text-align: left;
          padding: 30px 50px;
          height: 200px;
          // background: red;
          span{
            line-height: 55px;
            color: #515151;
            font-size: 30px;/*px*/
          }
        }
      }
    }
    .addFriend_container{
      // padding: 20px;
      height: calc(100% - 185px);
      .addFriend_container_input{
        padding: 0 40px;
        height: 130px;
        background: #f2f2f2;
        input{
          border-radius: 10px;
          color: #898989;
          font-size: 26px;/*px*/
          padding: 0 30px;
          line-height: 80px;
          margin: 20px auto;
          height: 80px;
          width: calc(100% - 100px);
          border: none;
          background: white;
        }
        span{
          display: inline-block;
          margin-left: 5px;
          color: #fdd401;
          font-size: 34px;/*px*/
        }
      }
      .addFriend_container_body{
        padding: 0 35px 56px;
        text-align: left;
        height: calc(100% - 130px);
        // background: red;
        .container_content{
          .friend_list{
            height: 185px;
            display: flex;
            border-bottom: 1px solid #e2e2e1;/*no*/
            .friend_list_left{
              position: relative;
              flex:1;
              .friend_headPic{
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  float: left;
                  height: 100px;
                  width: 100px;
                img{
                  border-radius: 50%;
                  height: 100%;
                  width: 100%;
                  vertical-align: middle;
                }
              }
              .friend_info{
                position: absolute;
                top: 50%;
                left: 120px;
                transform: translateY(-50%);
                float: left;
                // width: calc(100% - 30px);
                // margin-left: 20px;
                .friend_name{
                  color: #000000;
                  font-size: 30px;/*px*/
                }
                .friend_mobile{
                  display: inline-block;
                  margin-top: 15px;
                  color: #adadad;
                  font-size: 24px;/*px*/
                }
              }
            }
            .friend_list_right{
              position: relative;
              text-align: center;
              flex:1;
              .class-a{
                background: -webkit-linear-gradient(right,#feb700, #fdf301); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(left,#feb700, #fdf301); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(left,#feb700, #fdf301); /* Firefox 3.6 - 15 */
                background: linear-gradient(to left,#feb700, #fdf301); /* 标准的语法 */
              }
              .class-b{
                background: gray;
              }
              button{
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 140px;
                height: 63px;
                font-size: 28px;/*px*/
                border-radius: 45px;
                color: white;
              }
            }
          }
          .remark{
            margin-top: 15px;
            font-weight: 500;
            line-height: 40px;
            color: #f0cb10;
            font-size: 24px;
          }
          p{
            margin-top: 50px;
            img{
              vertical-align: middle;
              height: 50px;
              width: 50px;
            }
            .title{
              vertical-align: middle;
              color:#f0cb10;
              font-size: 24.43px;/*px*/
            }
          }
        }
      }
    }

  }
</style>
