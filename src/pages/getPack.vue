<!--  -->
<template>
  <div class="getPack">
    <!-- <tar-header :backUrl="backUrl" :isSowBack='true' :title="title"></tar-header> -->
    <tar-header :isSowBack='true' :title="title"></tar-header>
    <div class="getPack_container">
      <div class="container_head">
        <div class="headPortrait">
          <img :src="getBackData.user.user_header" alt="">
        </div>
        <p class="whoPack">{{getBackData.user.user_name}}</p>
        <p class="classify">{{getBackData.user.coin_name}}</p>
        <P class="numMoney" v-if="Number(getBackData.msg.money_num) >= 0">{{getBackData.msg.money_num | availableFilterSix}}</P>
        <P class="numMoney numMoneyText" v-else>{{getBackData.msg.money_num}}</P>
        <P class="shouQi">{{getBackData.user.content}}</P>
      </div>
      <div class="container_body">
        <div class="friendLucy">小伙伴们的手气</div>
        <div class="listDetail_outer" ref="listDetail_outer">
          <div>
            <div class="listDetail" v-for="(item,index) in getBackList" :key="index">
              <div class="left">
                <img class="leftImg" :src="item.user_header" alt="">
                <span class="leftSpan">{{item.user_name}}</span>
              </div>
              <!-- <div class="middle"></div> -->
              <div class="right">
                <span class="rightSpan">{{item.money_num | availableFilterSix}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import header from "../pages/comm/header"
import {api} from '@/static/api'

export default {
  data () {
    return {
      backUrl: '/Home',
      rel: '',
      getBackList: [
        {user_header: '',user_name: '', money_num: ''}
      ],
      getBackList1: [
        {user_name: 'zpc'},
        {user_name: 'zpc'},
        {user_name: 'zpc'},
        {user_name: 'zpc'},
        {user_name: 'zpc'},
        {user_name: 'zpc'},
        {user_name: 'zpc'},
        {user_name: 'zpc'},
        {user_name: 'zpc'},
        {user_name: 'zpc'},
        {user_name: 'zpc'}
      ],
      getBackData: {
        user: {
          user_header: '',
          user_name: '',
          coin_name: '',
          content: ''
        },
        msg:{}
      },
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      title: '好友红包'
    };
  },
  filters: {
    availableFilter(val){
      let arr = String(val).split('.')
      let str = ''
      if(arr.length > 1){
        str  = arr[1].slice(0,5)
      }
      console.log(str)
      if(str){
        return arr[0] + '.' + str
      }else{
        return arr[0]
      }
    },
    availableFilterSix(val){
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
    }
  },
  components: {
    tarHeader: header
  },

  computed: {},

  mounted() {
    this.rel = this.$route.query.id
    this.getPort()

  },

  methods: {
    _initScroll:function () {
      if(!this.$refs.listDetail_outer){
        return
      }
      this.meunScroll = new BScroll(this.$refs.listDetail_outer, {
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
      api.getInnerRedPack(obj, _this.ApiConf)
      .then(res => {
        if (res.error_code == '1000') {
          _this.getBackData = res.data
          _this.getList()
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
      api.getInnerList(obj, _this.ApiConf)
      .then(res => {
        _this.getBackList = res.data
        _this.$nextTick(() => {
          _this._initScroll()
        })
      })
      .catch(() => {

      })
    }
  }
}

</script>
<style lang='scss' scoped>
  .getPack{
    height: 100%;
    .getPack_container{
      height: calc(100% - 95px);
      .container_head{
        position: relative;
        height: 462px;
        background: #d62e41;
        .headPortrait{
          padding-top: 45px;
          height: 190px;
          img{
            height: 125px;
            width: 125px;
            border-radius: 50%;
          }
        }
        .whoPack{
          font-size: 30px;/*px*/
          line-height: 30px;
          color: white;
          font-weight: bold;
        }
        .classify{
          margin-top: 25px;
          font-size: 36px;/*px*/
          line-height: 36px;
          color: white;
        }
        .numMoney{
          font-size: 94px;/*px*/
          line-height: 94px;
          color: white;
          font-weight: bold;
        }
        .numMoneyText{
          font-size: 44px;/*px*/
        }
        .shouQi{
          letter-spacing: 5px;
          font-size: 24px;/*px*/
          line-height: 24px;
          color: #ffa2a2;;
          font-weight: bold;
        }
      }
      .container_body{
        // margin-top: 10px;
        height: calc(100% - 462px);
        // background: blue;
        padding: 20px;
        // height:199px;
        .friendLucy{
          font-weight: 600;
          margin-top: 20px;
          text-align: left;
          font-size: 30px;/*px*/
          margin-bottom: 30px;
          line-height: 30px;
          color: #686868;
        }
        .listDetail_outer{
          height: calc(100% - 170px);
          // background: red;
          overflow: hidden;
          // .listDetail_datail{
            // margin-top: 10px;
          // }
          // background: red;
        }
        .listDetail{
          border-bottom: 1px solid #f9f9f9;
          margin-top: 50px;
          height: 100px;
          display: flex;
          .leftImg{
            float: left;
            height: 50px;
            width: 50px;
            border: 1px solid red;
            border-radius: 50%;
          }
          .leftSpan{
            margin-top: 10px;
            font-size: 31px;/*px*/
            line-height: 31px;
            font-weight: bold;
            color: #161616;
            margin-left: 30px;
            float: left;
          }
          .rightSpan{
            margin-top: 10px;
            color: #d62e41;
            font-weight: bold;
            margin-right: 20px;
            float: right;
            line-height: 31px;
            font-size: 31px;/*px*/
          }
          .left{
            flex: 1
          }
          .right{
            vertical-align: middle;
            flex: 1
          }
        }
      }
    }
  }
</style>
