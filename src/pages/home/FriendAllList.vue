<template>
  <div class="friendAllList">
    <tar-header :isSowBack='true' :title="title"></tar-header>
    <div class="main" ref="friendAllList">
      <div class="friendRequestBg" v-if="isSowBack">
        <img src="../../assets/empty.png" alt="背景图">
        <p>暂无记录</p>
      </div>
      <div>
        <div class="friend_list" ref="friend_list">
          <div @click="goToPk(item)" class="friend_con" v-for="(item,index) in FriendList" :key="index">
            <div class="friend_header"><img :src="item.user_header" width="100%"/></div>
            <div class="friend_other">
              <span>{{item.user_name}}</span>
              <div class="iconHand" v-if="item.IsWinTreasure"></div>
              <div class="noShowIconHand" v-if="!item.IsWinTreasure"></div>
              <div class="powerSpan">
                <span>
                  算力{{item.user_power}}
                </span>
              </div>
            </div>

            <!-- <div class="getMore">
              <span>加载更多...</span>
            </div> -->
          </div>
        </div>
        <div class="uploadingMore" v-if="isShowBom">
          <img v-if="isLoading" class="loadingPic" src="../../assets/account/loading.gif" alt="loading">
          <p v-if="!isLoading">{{downLoadingSpan}}</p>
        </div>
      </div>
      <ErrorMessage :ErrorDescShow="ErrorDesc"></ErrorMessage>
    </div>
  </div>
</template>
<script>
import header from "../../pages/comm/header";
import BScroll from 'better-scroll';
import { api } from "@/static/api";
import { DateHandle } from "@/static/common";
import ErrorMessage from "@/components/ErrorMessage";
export default {
  name: "FriendList",
  props: {},
  data() {
    return {
      form: {
        page: 1
      },
      isLoading: false,
      isShowBom: false,
      downLoadingSpan: '加载更多...',
      isSowBack: false,
      title: "好友列表",
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      ErrorDesc: "",
      FriendList: {}
    };
  },
  components: {
    ErrorMessage,
    tarHeader: header
  },
  created() {
    this.GetFriendListAll();
  },
  mounted() {},
  watch: {
    // dataList() {
    //   this.$nextTick(()=>{
    //     this.refresh();
    //   })
    // },
  },
  methods: {
    _initScroll:function () {
      this.meunScroll = new BScroll(this.$refs.friendAllList, {
       pullDownRefresh: {
          threshold: 50,
          stop: 0
        },
        pullUpLoad: {
          threshold: -50,
          stop: 0
        },
        fade: true,
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 400 // 回弹时间
      })
       // 滚动结束时触发
      this.meunScroll.on('scrollEnd', (data) => {
        this.downLoadingSpan = '上拉加载更多...'
        this.isShowBom = false
      })
       // 监听滚动事件
      this.meunScroll.on('scroll',(pos) => {

        // if (contentHeight < offsetHeight ) {
        //   debugger
        //   this.uploadingMore = false
        // }
      })
       // 下拉触发
      this.meunScroll.on('pullingDown', () => {
        console.log('下拉')
        this.meunScroll.finishPullDown()
      }),
       // 上拉触发
      this.meunScroll.on('pullingUp', () => {
        // console.log('jgdfk')
        // console.log('上拉刷新')
          this.isLoading = false,
          this.isShowBom = true
          this.form.page++
          this.GetFriendListAll()
      })
    },
    // 点击好友进行跳转
    goToPk(item){
      this.$router.push({
        path: '/Friend',
        query:{id:item['friend_from_user_id'],name:item['user_name']}
      })
    },
    GetFriendListAll() {
      var _this = this;
      api.GetFriendListAll(_this.form, _this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          // _this.FriendList = res.data;
          if (res.data.length == 0 && _this.form.page == 1) {
            _this.isSowBack = true
          }
          if(_this.form.page == 1){
            _this.FriendList = res.data;
            _this.$nextTick(() => {
              _this._initScroll()
            })
          } else if (_this.form.page >= 2){
            if(res.data.length){
              res.data.forEach(ele => {
                _this.FriendList.push(ele)
              });
              _this.isLoading = false
              _this.meunScroll.finishPullUp()
              _this.meunScroll.refresh();
              // _this.$nextTick(() => {
              //   _this._initScroll()
              // })
            } else {
              _this.isLoading = false
              _this.downLoadingSpan = '没有更多...'
              _this.form.page--
              _this.meunScroll.finishPullUp()
              _this.meunScroll.refresh();
            }
          }
          // var contentHeight = _this.$refs.friend_list.offsetHeight
          // var offsetHeight = _this.$refs.friendAllList.offsetHeight
          // console.log(contentHeight,offsetHeight)
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
.friendAllList{
  height: 100%;
}
.main {
  width: 100%;
  height: calc(100% - 95px);
  /* height: auto; */
  overflow: hidden;
  // overflow-y: scroll;
  // margin-bottom: 220px;
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
}
.friend_list {
  padding: 0 40px;
}
.friend_con {
  height: 136px;
  width: 100%;
  display: block;
  .uploadingMore{
    display: inline-block;
    transition:  2s;
    -moz-transition:  2s;	/* Firefox 4 */
    -webkit-transition:  2s;	/* Safari 和 Chrome */
    -o-transition:  2s;	/* Opera */
    font-size: 30px;/*px*/
    height: 50px;
    width: 100%;
    p{
      line-height: 50px;
    }
  }
}
.loadingPic{
  height: 45px;
  width: 45px;
}
/*.friend_con:last-child>.friend_other{border:none;}*/
.friend_header {
  height: 80px;
  margin-top: 28px;
  width: 80px;
  float: left;
  border: 1px solid #f1f1f1;/*no*/
  border-radius: 50%;
  overflow: hidden;
}
.friend_header > img {
  float: left;
}
.friend_other {
  font-size: 30px;/*px*/
  height: 136px;
  float: right;
  line-height: 136px;
  width: 525px;
  border-bottom: 1px solid #eeeef1;/*no*/
  color: #000000;
}
.friend_other > span:nth-child(1) {
  float: left;
  width: auto;
  height: 100%;
}
// .powerSpan span

.friend_other .powerSpan{
  height: 100%;
  width: 130px;
  // background: red;
  margin-right: 30px;
  float: right;
  text-align: right;
  // width: auto;
  color: #6f6e6e;
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
.friend_other > span:nth-child(2) {
}
</style>
