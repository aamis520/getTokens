<!--  -->
<template>
<div class="hangqingCotainer">
  <!-- <tar-header :title="title"></tar-header> -->
  <div class="hangqing">
    <div class="headTitle">
      <span class="headTitle_left">平台：</span>
      <span class="headTitle_right">{{content.platform}}</span>
    </div>
    <div class="hangqing_gap">

    </div>
    <div class="container">
        <div class="container_head ">
          <div class="container_head_left" style="flex: 1">名称/24H成交</div>
          <div class="container_head_middle" style="flex: 1">最新价</div>
          <div class="container_head_right" style="flex: 1">24H涨幅</div>
        </div>
        <div class="container_body_outer" ref="container_body_outer">
          <div>
            <div class="container_body" v-for="(item,index) in getBackData" :key="index">
              <div class="container_body_left">
                <span class="container_body_name">{{item.name}}</span>
                <span class="container_body_bean">USDT</span> <br>
                <span class="container_body_total">成交量{{item.baseVolume | BrowsingVolume}}</span>
              </div>
              <!-- <div class="container_body_middle"></div> -->
              <div class="container_body_middle">
                <!-- <span class="container_body_price"></span><br> -->
                <span class="container_body_price">{{item.last | BrowsingVolume}}</span>
                <!-- <span class="container_body_money">{{item.percentChange}}</span> -->
              </div>
              <div class="container_body_right">
                <span class="container_body_percentage"></span>
                <span :class="Number(item.percentChange) > 0 ? 'isA' : 'isB' " class="container_body_percentage">{{item.percentChange | BrowsingVolume}}%</span>
                <img src="../../assets/Dapp/shapeDoen.png" alt="下箭头" v-show="Number(item.percentChange) <= 0">
                <img src="../../assets/Dapp/shapeUp.png" alt="下箭头" v-show="Number(item.percentChange) > 0">
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
import {api} from '@/static/api'
import { Toast, Indicator } from "mint-ui";
import header from "../../pages/comm/header"

// import {api} from '@/static/api'
export default {
  data () {
    return {
      title: '市场行情',
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      content:{
        platform: 'Gate.io', // 平台
      },
      getBackData: [],
      container_body: [
        {name: 'BTC', bean: 'USDT',baseVolume: '成交量9.92亿',last: '7215.4', percentChange: '≈￥46,106.52',percentage: '+5.66%'},
        {name: 'BTC', bean: 'USDT',total: '成交量9.92亿',last: '7215.4', percentChange: '≈￥46,106.52',percentage: '-5.66%'},
        {name: 'BTC', bean: 'USDT',total: '成交量9.92亿',last: '7215.4', percentChange: '≈￥46,106.52',percentage: '+5.66%'},
        {name: 'BTC', bean: 'USDT',total: '成交量9.92亿',last: '7215.4', percentChange: '≈￥46,106.52',percentage: '+5.66%'},
        {name: 'BTC', bean: 'USDT',total: '成交量9.92亿',last: '7215.4', percentChange: '≈￥46,106.52',percentage: '+5.66%'},
        {name: 'BTC', bean: 'USDT',total: '成交量9.92亿',last: '7215.4', percentChange: '≈￥46,106.52',percentage: '+5.66%'},
        {name: 'BTC', bean: 'USDT',total: '成交量9.92亿',last: '7215.4', percentChange: '≈￥46,106.52',percentage: '+5.66%'},
        {name: 'BTC', bean: 'USDT',total: '成交量9.92亿',last: '7215.4', percentChange: '≈￥46,106.52',percentage: '+5.66%'},
        {name: 'BTC', bean: 'USDT',total: '成交量9.92亿',last: '7215.4', percentChange: '≈￥46,106.52',percentage: '-5.66%'},
        {name: 'BTC', bean: 'USDT',total: '成交量9.92亿',last: '7215.4', percentChange: '≈￥46,106.52',percentage: '-5.66%'},
        {name: 'BTC', bean: 'USDT',total: '成交量9.92亿',last: '7215.4', percentChange: '≈￥46,106.52',percentage: '-5.66%'},
        {name: 'BTC', bean: 'USDT',total: '成交量9.92亿',last: '7215.4', percentChange: '≈￥46,106.52',percentage: '+5.66%'}
      ]
    }
  },
  filters:{
    BrowsingVolume:function(data){
      return Number(data).toFixed(2)
    }
  },
  components: {
    tarHeader: header
  },

  computed: {},
  methods: {
    lookMarket(){
      var obj = {}
      obj.type = '3'
      api.addPower(obj,this.ApiConf)
      .then(res => {
        console.log(res)
      })
      .catch(() => {

      })
    },
    gateIo(){
      this.upOrDown = false
      this.title = 'gate.io'
    },
    coin(){
      this.upOrDown = false
      this.title = '火币'
    },
    fcoin(){
      this.upOrDown = false
      this.title = 'Fcoin'
    },
    // better-scroll初始化dom节点
    _initScroll:function () {
      this.meunScroll = new BScroll(this.$refs.container_body_outer, {
        probeType: 2,
        pullDownRefresh: {
          threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
          stop: 0 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
        },
        pullUpLoad: {
          threshod: -50,
          stop: 0
        },
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 400 // 回弹时间
      })
    },
    getHangQingPort(){
      Indicator.open({
        text: '正在努力加载...',
        spinnerType: 'fading-circle'
      })
      var _this = this
      api.getDappHangqing(_this.ApiConf)
      .then(res => {
        Indicator.close()
        if (res.error_code == '1000') {
          // Toast({
          //   message: '更新成功啦',
          //   duration: 1000 ,
          //   iconClass: 'mint-toast-icon mintui mintui-success'
          // })
          _this.getBackData = res.data
          _this.$nextTick(() => {
            _this._initScroll()
          })
        } else {
          Indicator.close()
          Toast({
            message: res.error_desc,
            duration: 1000 ,
            iconClass: 'mint-toast-icon mintui mintui-success'
          })
        }
      })
      .catch(() => {
          Indicator.close()
        })
    }
  },
  mounted() {
    this.lookMarket()
    this.getHangQingPort()
  }

}

</script>
<style lang="scss" scoped>
  .isA{
    color: #24ae3a;
  }
  .isB{
    color: #fb3d38;
  }
  .hangqingCotainer{
    height: 100%;
  }
  .hangqing{
    height:calc(100% - 95px);
    /* border: 1px solid red; */
    overflow: hidden;
    .hangqing_gap{
      height: 40px;
    }
    /* overflow-y: scroll; */
  }
  .hangqing .headTitle{
    border-bottom: 1px solid #f2f2f2;/*no*/
    padding-left: 35px;
    margin-top:10px;
    text-align: left;
    line-height: 70px;
    height: 70px;
  }
  .container{
    height: 100%;
    /* border: 1px solid red; */
    /* padding: 35px; */
  }
  .container_body_outer{
    height: calc(100% - 178px);
    overflow: hidden;
  }
  .container_head{
    height:60px;
    display: flex;
    .container_head_left{
      text-align: left;
      margin-left: 40px;
    }
    .container_head_right{
      margin-right: 50px;
      text-align: right;
    }
  }
  .container_head div{
    line-height: 60px;
    color:#8d8d8d;
    font-size: 24px;/*px*/
  }
  .container_body:nth-child(1){
    margin-top: 30px;
  }
  .container_body{
    /* margin: 0 20px; */
    border-bottom: 1px solid #f2f2f2;/*no*/
    margin-top: 15px;
    height:100px;
    display: flex;
  }
  .container_body_left{
    margin-left: 40px;
    text-align: left;
    flex: 1;
  }
  .container_body_right{
    flex: 1;
    img{
      vertical-align: middle;
      height: 50px;
      width: 50px;
    }
  }
  .container_body_middle{
    flex: 1;
  }
  .headTitle_left{
    color: #333333;
    font-size: 28px;/*px*/
  }
  .headTitle_right{
    color: #333333;
    font-size: 30px;/*px*/
  }
  .container_body_name{
    font-weight: 500;
    font-size: 30px;/*px*/
    color: #333333;
  }
  .container_body_bean{

    color: #a7a7a7;
    font-size: 24px;/*px*/
  }
  .container_body_total{
    color: #a7a7a7;
    font-size: 21px;/*px*/
  }
  .container_body_price{
    font-weight: bold;
    line-height: 70px;
    color: #a7a7a7;
    font-size: 25px;/*px*/
  }
  .container_body_percentage{
    font-weight: bold;
    line-height: 70px;
    font-size: 30px;/*px*/
  }
</style>
