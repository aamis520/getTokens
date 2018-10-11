<template>
<div class="task">
  <tar-header :isSowBack='true' :title="title"></tar-header>
	<div class="main" ref="task_main">
    <div>
      <div class="top_container">
        <div class="top">
          <div class="top_top">{{Power}}</div>
          <div class="top_desc">当前算力</div>
        </div>
      </div>
      <div class="task_essential_cat"><span>基础任务</span><span>小手一抖 算力到手</span></div>
      <div class="task_essential">
        <div class="task_essential_con" @click="everyCheckIn">
          <div class="task_essential_img"><img src="~@/assets/task_1.png" /></div>
          <div class="task_essential_title">每日签到</div>
          <div class="task_essential_desc" v-if="!this.$store.state.UserInfo.signInAlready">每日＋1算力</div>
          <div class="task_essential_save" v-if="this.$store.state.UserInfo.signInAlready">
          <!-- <div class="task_essential_desc" v-if="false">每日＋1算力</div>
          <div class="task_essential_save" v-if="true"> -->
            <img src="../../assets/save.png" alt="save">
            <span>已完成</span>
          </div>
        </div>
        <div class="task_essential_con" @click="inviteFriend">
          <div class="task_essential_img"><img src="~@/assets/task_2.png" /></div>
          <div class="task_essential_title">邀请好友</div>
          <div class="task_essential_desc">+5算力/人</div>
        </div>
        <div class="task_essential_con" @click="everyLogin">
          <div class="task_essential_img"><img src="~@/assets/task/grayGongzhong.png"/></div>
          <div class="task_essential_title">关注公众账号</div>
          <div class="task_essential_desc" style="background:#d5d5d5;">
            <span>+5算力/人</span>
          </div>
        </div>
      </div>
      <div class="task_essential_clear"></div>
      <div class="task_essential_cat"><span>独家任务</span><span>更多算力 更多挖宝</span></div>
      <div class="task_essential">
        <div class="task_essential_con" @click="game">
          <div class="task_youxi_img"><img src="~@/assets/task/youxi.png" /></div>
          <div class="task_essential_title">玩游戏</div>
          <div class="task_essential_desc">每日＋1算力</div>
        </div>
        <div class="task_essential_con" @click="lookFast">
          <div class="task_essential_img"><img src="~@/assets/task_4.png" /></div>
          <div class="task_essential_title">看快讯</div>
          <div class="task_essential_desc">每日＋1算力</div>
        </div>
        <div class="task_essential_con" @click="lookMarket">
          <div class="task_essential_img"><img src="~@/assets/market.png" /></div>
          <div class="task_essential_title">看行情</div>
          <div class="task_essential_desc">每日＋1算力</div>
        </div>
      </div>
      <div class="moreTask_container">
        <div class="moreTask">
          更多任务敬请期待
        </div>
      </div>
      <!-- <div class="task_essential" v-if="false">
        <div class="task_essential_con" @click="everyLogin">
          <div class="task_youxi_img"><img src="~@/assets/task/aozhou.png" /></div>
          <div class="task_essential_title">绑定澳洲交易所</div>
          <div class="task_essential_desc">每日＋1算力</div>
        </div>
        <div class="task_essential_con" @click="everyLogin">
          <div class="task_essential_img"><img src="~@/assets/bangdingjiaoyi.png" /></div>
          <div class="task_essential_title">绑定尚亚交易所</div>
          <div class="task_essential_desc">每日＋1算力</div>
        </div>
        <div class="task_essential_con" @click="everyLogin">
          <div class="task_essential_img"><img src="~@/assets/task/bangdingtaiwan.png" /></div>
          <div class="task_essential_title">绑定台湾交易所</div>
          <div class="task_essential_desc">每日＋1算力</div>
        </div>
      </div> -->
    </div>
		<ErrorMessage :ErrorDescShow="ErrorDesc"></ErrorMessage>
	</div>
  <div class="hintProp" v-show="isShowFirst">
    <div class="hint_inner">
      <div class="closeIcon" @click="close">
        <img src="../../assets/x.png" alt="返回">
      </div>
      <h2>提示</h2>
      <div class="hint_title">{{propContent.content}}</div>
      <div @click="goInGoal(lookStatus)" class="hint_foot">{{propContent.distination}}</div>
    </div>
  </div>
  <div class="pop" v-if="isShowPop">

  </div>
</div>
</template>
<script>
import BScroll from "better-scroll";
import header from "../../pages/comm/header";
import { api } from "@/static/api";
import { Toast } from "mint-ui";
import ErrorMessage from "@/components/ErrorMessage";
export default {
  name: "Task",
  props: {},
  data() {
    return {
      lookStatus: '1',
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      isShowFirst: false,
      propContent: {
        content: '每天首次玩任意一款游戏每天首次玩任意一款游戏',
        distination: '去玩游戏'
      },
      isShowPop: false,
      ErrorDesc: false,
      title: '算力任务',
      Power: this.$store.getters.Power
    };
  },
  components: {
    tarHeader: header,
    ErrorMessage
  },
  created() {},
  mounted() {
    var a = this.$store.state.UserInfo.signInAlready
    console.log(a)
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  watch: {},
  methods: {
    // 取消事件
    close(){
      this.isShowFirst = false
    },
    // 每日签到
    everyCheckIn(){
      var obj = {}
      obj.type = '1'
      this.isFirst(obj, obj.type)
    },
    goInGoal(data){
      console.log(data)
      if (data == '3') {
        this.$router.push({
          path: '/market/hangqing'
        })
      } else if (data == '4') {
        this.$router.push({
          path: '/market/fastInfo'
        })
      } else if (data == '2'){
        this.$router.push({
          path: '/gameDetail'
        })
      } else if (data == '5'){
        this.$router.push({
          path: '/RequestPage'
        })
      }
    },
    lookFast(){
      var obj = {}
      obj.type = 4
      this.isFirst(obj, obj.type)
    },
    isFirst(data, num){
      // 3 是市场 4是快讯 2玩游戏 5邀请好友
      var _this = this
      api.isShowPower(data, _this.ApiConf)
      .then(res => {
        if (res.error_code == '1000') {
          if (!res.data) {
            _this.lookStatus = num
            if (num == '3') {
              _this.propContent.content = '每天查看行情即可获得1点算力'
              _this.propContent.distination = '去看行情'
              _this.isShowFirst = true
            } else if (num == '4'){
              _this.propContent.content = '每天查看快讯即可获得1点算力'
              _this.propContent.distination = '去看快讯'
              _this.isShowFirst = true
            } else if (num == '2'){
              _this.propContent.content = '每天玩GetTokens小游戏即可获得1点算力'
              _this.propContent.distination = '去玩游戏'
              _this.isShowFirst = true
            } else if (num == '5'){
              _this.propContent.content = '邀请好友即可获得5点算力'
              _this.propContent.distination = '去邀请好友'
              _this.isShowFirst = true
            }
            // _this.isShowFirst = true
          } else {
            if (num == '3') {
              this.$router.push({
                path: '/market/hangqing',
                query: {
                  status: '3'
                }
              })
            } else if (num == '4'){
              this.$router.push({
                path: '/market/fastInfo',
                query:{
                  status: '4'
                }
              })
            } else if (num == '2'){
              this.$router.push({
                path: '/gameDetail'
              })
            } else if (num == '5') {
              this.$router.push({
                path: '/RequestPage'
              })
            }
            // 如果没看过
          }
        }
      })
      .catch(() => {

      })
    },
    // better-scroll初始化dom节点
    _initScroll: function() {
      this.meunScroll = new BScroll(this.$refs.task_main, {
        // pullDownRefresh: {
        //   threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
        //   stop: 0 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
        // },
        // pullUpLoad: {
        //   threshod: -50,
        //   stop: 0
        // },
        click: true,
        scrollY: true,
        momentum: true, // 开启滑动惯性
        bounceTime: 200 // 回弹时间
      });
    },
    // 邀请好友
    inviteFriend(){
      var obj = {}
      obj.type = '5'
      this.isFirst(obj,obj.type)
      // this.$router.push({
      //   path: '/RequestPage'
      // })
    },
    // market
    lookMarket(){
      // this.isShowFirst = true
      var obj = {}
      obj.type = '3'
      this.isFirst(obj,obj.type)
    },
    // 玩游戏
    game(){
      var obj = {}
      obj.type = '2'
      this.isFirst(obj,obj.type)
      // this.$router.push({
      //   path: '/gameDetail'
      // })
    },
    everyLogin(){
      Toast({
        message: '敬请期待', //提示内容分
        duration: 1000 //持续时间（毫秒），若为 -1 则不会自动关闭
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.task{
  height: 100%;
  background: white;
}
.main {
  width: 100%;
  /* height: 321px; */
  height: calc(100% - 95px);
  // overflow-y: scroll;
  overflow: hidden;
  // padding-top: 120px;
  /* margin-bottom: 220px; */
}
.top_container{
  position: relative;
  width: 100%;
  height: 320px;
  background: url("~@/assets/task_3.png") no-repeat top;
  background-size: 100% auto;
}
.top {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // background: url("~@/assets/task_3.png") no-repeat top;
  width: 320px;
  height: 150px;
  // background: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  // padding-top: 30px;
  // margin-left: 210px;
  // margin-bottom: 50px;
}
.top_top {
  margin-top: 30px;
  width: 100%;
  height: 55px;
  color: white;
  font-size: 54px;/*px*/
  line-height: 55px;
}
.top_desc {
  width: 100%;
  height: 24px;
  margin-top: 10px;
  line-height: 24px;
  color: #aeb6ca;
}
.task_essential {
  display: flex;
  width: 100%;
  height: 250px;
  padding: 0 20px 0 20px;
}
.task_essential_cat {
  padding: 40px;
  width: 100%;
  height: 35px;
  font-size: 30px;/*px*/
  line-height: 35px;
}
.task_essential_cat > span:nth-child(1) {
  float: left;
  font-weight: 700;
}
.task_essential_cat > span:nth-child(2) {
  float: right;
  color: #a9a9a9;
}
.task_essential_con {
  text-align: center;
  flex: 1;
  /* width: 170px; */
  height: 160px;
  /* float: left; */
  /* margin-right: 73px; */
  margin-top: 70px;
}
.task_essential_img {
  display: inline-block;
  width: 170px;
  height: 54px;
}
.task_essential_img > img {
  width: 52px;
  height: 48px;
}
.task_youxi_img > img {
  width: 55px;
  height: 48px;
}
.task_essential_title {
  width: 100%;
  height: 30px;
  margin-top: 10px;
  font-size: 25px;/*px*/
  font-weight: 700;
}
.task_essential_desc {
  display: inline-block;
  width: 170px;
  height: 40px;
  line-height: 40px;
  background: linear-gradient(to right, #ffaf00, #fdf301);
  color: white;
  border-radius: 8px;
  margin-top: 20px;
}
.task_essential_save {
  position: relative;
  vertical-align: middle;
  width: 170px;
  height: 40px;
  line-height: 40px;
  color: #8e8e8e;
  background: white;
  /* background: linear-gradient(to right, #ffaf00, #fdf301); */
  border-radius: 8px;
  margin-top: 10px;
}
.task_essential_save img{
  position:absolute;
  display: inline-block;
  top: 3px;
  left: 15px;
  height: 30px;
  width: 30px;
}
.task_essential_clear {
  width: 100%;
  height: 20px;
  background: #f8f8f8;
}
/* 下边是弹窗的样式 */
.hintProp{
  // opacity: .5;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .hint_inner{
    .closeIcon{
      margin-top: 18px;
      margin-right: 18px;
      height: 28px;
      width: 28px;
      float: right;
      img{
        height: 100%;
        width: 100%;
      }
    }
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 20px;
    transform: translate(-50%,-50%);
    height: 330px;
    width: 640px;
    background: white;
    .hint_title{
      height: 100px;
      // background: red;
      margin-top: 25px;
      // margin-bottom: 10px;
      font-weight: 600;
      color: #1a1a1a;
      font-size: 30px;/*px*/
      padding: 0 80px 55px;
      border-bottom: 1px solid #d5d5d5;/*no*/
    }
    .hint_foot{
      height: 80px;
      line-height: 80px;
      margin-top: 15px;
      color: #fdd401;
      font-size: 34px;/*px*/
    }
    h2{
      margin-top: 52px;
      letter-spacing: 3px;
      font-weight: bold;
      font-size: 36px;/*px*/
      color: #1a1a1a;
    }
  }
}
.moreTask_container{
  height: 200px;
}
.moreTask{
  font-size: 26px;/*px*/
  color: #b6b6b6;
  margin: 0 auto;
  margin-top: 120px;
  line-height: 85px;
  width: 480px;
  height: 85px;
  border-radius: 50px;
  background: #f3f3f3;
}
</style>
