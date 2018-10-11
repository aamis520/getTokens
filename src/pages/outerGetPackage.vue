<!--  -->
<template>
  <div class="outerGetPack" ref="outerGetPack_container">
    <div class="saveCancelRed" v-if="isShowCancelGetRed">
      <div class="saveCancelRed_container">
        <p class="title">提示</p>
        <div class="cancel">
          <span>请先下载GetTokensAPP~</span>
        </div>
        <div class="bottom">
          <div class="bom_left" @click="cancelConfirm">
            取消
          </div>
          <div class="bom_right" @click="saveConfirm">
            <div class="bom_right_inner"></div>
            下载
          </div>
        </div>
      </div>
    </div>
    <!-- <tar-header :title="title"></tar-header> -->
    <div class="outerGetPack_container">
      <div class="head"></div>
      <div class="containerBody">
        <div class="redPacktitle">
        </div>
        <div class="container_content">
          <p class="numCon">
            <span class="left" v-if="Number(getBackData.msg.money_num) >= 0">{{getBackData.msg.money_num | availableFilterone}}</span>
            <span class="left leftText" style="line-height: 100px" v-else >{{getBackData.msg.money_num}}</span>
            <!-- <span class="right" v-if="getBackData.data">个</span> -->
          </p>
          <div class="content">
            <p class="points" v-if="getBackData.data">{{getBackData.user.coin_name}}</p>
            <!-- <p class="price" v-if="getBackData.data">≈ {{getBackData.msg.money_num * getBackData.user.market_price | availableFilterTwo}}CNY</p> -->
          </div>
          <div>
            <button @click="goInZhuandian" class="conBtn">下载GetTokens</button>
          </div>
          <p class="remark" v-if="getBackData.data">红包已放入账户
            <span>{{getBackData.user.tel}}</span>
            登录GetTokens即可使用</p>
          <!-- <p class="remark">红包已放入账户
            <span>{{getBackData.user.tel}}</span>
            登录GetTokens即可使用</p> -->
        </div>
        <div class="getTime">
          <!-- <button @click="getPackTime">立即领取</button> -->
        </div>
        <div class="firendHand">
          <img src="../assets/getPack/friendHand.png" alt="icon">
        </div>
        <div class="firendHandContent" ref="firendHandContent">
          <div>
            <div class="content" v-for="(item,index) in getBackList" :key="index">
              <div class="left">
                <div class="left_pic">
                  <img :src="item.user_header" alt="icon">
                </div>
                <div class="left_time">
                  <span class="top">{{item.user_name}}</span><br>
                  <span class="bom">换个姿势领红包，金额会更高</span>
                </div>
              </div>
              <div class="right">
                <!-- TODO 六位 -->
                <span>{{item.money_num | availableFilterone}}</span>
              </div>
            </div>
          </div>
          <!-- <div class="content" v-for="(item,index) in ruleArr" :key="index"> -->
          <!-- <div class="content" v-for="(item,index) in ruleArr" :key="index">
            <h2>{{item.title}}</h2>
            <p>{{item.content}}</p>
          </div> -->
        </div>
         <div class="redPaperrule">
          <img src="../assets/getPack/rule.png" alt="icon">
        </div>
        <div class="firendHandRule">
          <div class="content" v-for="(item,index) in ruleArr" :key="index">
            <h2>{{item.title}}</h2>
            <p>{{item.content}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import header from "../pages/comm/header";
import {api} from '@/static/api'
import { Toast } from "mint-ui";

export default {
  data () {
    return {
      isShowCancelGetRed: false,
      form: {
        mobile: ''
      },
      rel: '',
      getBackList: [],
      getBackData: {
        msg: {},
        user: {}
      },
      ruleArr: [
        {title: '1.领取一次', content: '每个链接仅限1人领取，重复领取无效'},
        {title: '2.交易使用', content: '红包仅在GetTokens中使用，领取后红包金额自动存储 到账户-钱包中，可进行兑换'},
        {title: '3.账号一致', content: '领取人手机号需与GetTokens帐号一致'},
        {title: '4.咨询客服', content: '其它未尽事项，请咨询客服QQ群：710840875'}
      ],
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      title: 'GetTokens'
    };
  },

  components: {
    tarHeader: header
  },
  filters: {
    availableFilterone(val){
      let arr = String(val).split('.')
      let str = ''
      if(arr.length > 1){
        str  = arr[1].slice(0,6)
      }
      console.log(str)
      if(str){
        return arr[0] + '.' + str
      }else{
        return arr[0]
      }
    },
    availableFilterTwo(val){
      let arr = String(val).split('.')
      let str = ''
      if(arr.length > 1){
        str  = arr[1].slice(0,2)
      }
      console.log(str)
      if(str){
        return arr[0] + '.' + str
      }else{
        return arr[0]
      }
    },
    numParse: function (data) {
      return Number(data).toFixed(4)
    }
  },
  computed: {},

  mounted() {
    this.rel = this.$route.query.rel
    this.getPort()
    // this.getWeixin()
    this.$nextTick(() => {
      this._initScroll()
      this._initScrollTwo()
    })
  },
  methods: {
    getWeixin(data){
      var _this = this
      var wxRel = _this.$route.query.rel
      // var wxCode = _this.$route.query.code
      var obj = {
        // wxCode: wxCode,
        rel: wxRel
      }
      api.getOuter(obj)
      .then(res => {
        if (res.error_code == 1000) {
          localStorage.setItem('packInfo', JSON.stringify(res.data))
          // localStorage.setItem('packInfo', res.data)
          // var mobile = JSON.parse(localStorage.setItem('packInfo')).user_data
          // _this.$store.dispatch("UserLogin", res.data);
          // _this.$router.push({
          //   path: '/outerGetPackage',
          //   query:{
          //     rel: _this.$route.query.rel
          //   }
          // })
        } else if(res.error_code == 1003) {
          window.location.href = res.data
        } else {
          return false
        }
      })
    },
    cancelConfirm(){
      this.isShowCancelGetRed = false
    },
    saveConfirm(){
      // window.location.href="http://vue.dev.zhuandian.net/downLoadApp"
      window.location.href="https://ft.zhuandian.net/downLoadApp"
      // this.$router.push({
      //   path: 'http://vue.dev.zhuandian.net/downLoadApp'
      // })
    },
    goInZhuandian(){
      this.isShowCancelGetRed = true
    },
    _initScroll:function () {
      if(!this.$refs.outerGetPack_container){
        return
      }
      this.meunScroll = new BScroll(this.$refs.outerGetPack_container, {
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 400 // 回弹时间
      })
    },
    _initScrollTwo:function () {
      if(!this.$refs.firendHandContent){
        return
      }
      this.meunScroll = new BScroll(this.$refs.firendHandContent, {
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 400 // 回弹时间
      })
    },
    // 接口
    getPort() {
      var _this = this
      var obj = {}
      obj.rel = _this.rel
      api.getOuterRed(obj, _this.ApiConf)
      .then(res => {
        if (res.error_code == '1000') {
          _this.getList()
          _this.getBackData = res.data
          var mobile = JSON.parse(localStorage.getItem('packInfo')).user_data
          if (mobile.user_name) {
            _this.getBackData.user.tel = mobile.user_name
          } else {
            _this.getBackData.user.tel = mobile.user_mobile
          }
        } else if (res.error_code == '6013') {
          _this.$router.push({
            path: '/outerGetPack',
            query: {
              rel: _this.rel
            }
          })
        }
      })
      .catch(() => {

      })
    },
    getList() {
      var _this = this
      var obj = {}
      obj.page = '1'
      obj.rel = _this.rel
      api.getOuterList(obj, _this.ApiConf)
      .then(res => {
        _this.getBackList = res.data
      })
      .catch(() => {

      })
    }
  }
}

</script>
<style lang='scss' scoped>
  .outerGetPack{
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
      .cancel{
        padding-bottom: 50px;
        border-bottom:1px solid #cfcece;/*no*/
        margin-top: 40px;
        color: #1a1a1a;
        font-size: 33px;/*px*/
      }
      .bottom{
        display: flex;
        height: 98px;
      }
      .title{
        margin-top: 50px;
        color: #1a1a1a;
        font-size: 37px;/*px*/
        font-weight: bold;
      }
      .bom_left, .bom_right{
        line-height: 98px;
        flex: 1;
        .bom_right_inner{
          float: left;
          width: 90px;
          height: 1px;
          background: #cfcece;
        }
      }
      .bom_left{
        font-size: 30px;/*px*/
        color: #b7b7b7;
      }
      .bom_right{
        font-size: 30px;/*px*/
        color: #f3cd0d;
      }
    }
    height: 100%;
    overflow: hidden;
    .outerGetPack_container{
      .head{
        height: 325px;
        width: 100%;
        background-repeat: no-repeat;
        background-size: (100%, 100%);
        background-image: url('../assets/getPack/head.png');
      }
      .containerBody{
        position: relative;
        margin-top: -280px;
        height: 2200px;
        width: 100%;
        background-repeat: no-repeat;
        background-size: (100%, 100%);
        background-image: url('../assets/getPack/bomPeople.png');
        .redPacktitle{
          position: absolute;
          top: 350px;
          height: 230px;
          width: calc(100% - 40px);
          margin: 0 20px;
          background-repeat: no-repeat;
          background-size: (100%, 100%);
          background-image: url('../assets/getPack/guo.png');
        }
        .container_content{
          border-radius: 20px;
          position: absolute;
          left: 20px;
          right: 20px;
          top: 610px;
          background:#e33b45;
          height: 400px;
          .content{
            height: 100px;
            // background: red;
          }
          .numCon{
            margin-top: 50px;
            color: #ffe538;
            height: 100px;
            .left{
              font-size: 76px;/*px*/
            }
            .leftText{
              font-size: 40px;/*px*/
            }
            .right{
              font-size: 24px;/*px*/
            }
          }
          .points{
            color: #ffe538;
            font-size: 30px;/*px*/
          }
          .price{
            margin-top: 10px;
            color: #ffe538;
            font-size: 20px;/*px*/
          }
          .conBtn{
            margin-top: 10px;
            border-radius: 50px;
            background: #ffe538;
            font-weight: 600;
            color: #dd2229;
            font-size: 24px;/*px*/
            height: 78px;
            width: 490px;
          }
          .remark{
            margin-top: 20px;
            color: #ffe538;
            font-size: 18px;/*px*/
          }
        }
        .firendHand{
          position: absolute;
          top: 1050px;
          height: 30px;
          width: 100%;
          img{
            height: 100%;
            width: 100%;
          }
        }
        .redPaperrule{
          position: absolute;
          top: 1580px;
          height: 30px;
          width: 100%;
          img{
            height: 100%;
            width: 100%;
          }
        }
        .firendHandContent{
          position: absolute;
          overflow-y: scroll;
          top: 1150px;
          height:400px;
          // background: greenyellow;
          left: 20px;
          right: 20px;
          .content{
            height: 100px;
            width: 100%;
            display: flex;
            .left{
              flex: 3;
              .left_pic{
                margin-left: 20px;
                float:left;
                width: 70px;
                height: 70px;
                background: white;
                img{
                  height: 100%;
                  width: 100%;
                }
              }
              .left_time{
                text-align: left;
                margin-left: 50px;
                float: left;
                .top{
                  font-size: 21.45px;/*px*/
                  color: white;
                }
                .bom{
                  display: inline-block;
                  margin-top: 10px;
                  font-size: 20px;/*px*/
                  color: white;
                  opacity: .5;
                }
              }
            }
            .right{
              flex: 1;
              text-align: right;
              color: #ffe538;
              font-size: 24px;/*px*/
              span{
                display: inline-block;
                margin-top: 20px;
              }
            }
          }
        }
        .firendHandRule{
          background: #fa4b58;
          position: absolute;
          padding:0 20px;
          top: 1608px;
          height:600px;
          // left: 20px;
          // right: 20px;
           .content{
            margin-top: 30px;
            padding: 0 80px;
            text-align: left;
            // height: 130px;
            h2{
              color: white;
              font-size: 30px;/*px*/
            }
            p{
              color: #ffa1a7;
              font-size: 20px;/*px*/
              margin-top: 20px;
              margin-left: 20px;
              // text-indent: 2em;
            }
          }
        }
      }
    }
  }
</style>
