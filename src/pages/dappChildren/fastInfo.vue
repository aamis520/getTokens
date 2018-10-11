<!--  -->
<template>
<div class="fastInfoContainer">
  <!-- <tar-header :title="title"></tar-header> -->
  <div class="fastInfo" ref="fastInfo">
    <div>
      <div v-show="isTopShow" class="topRefesh">
        <span>松手刷新数据...</span>
      </div>
      <!-- @click="singleClick($event)"  -->
      <div class="content" @click="singleClick($event)" v-for="(item, index) in getBackData" :key="index">
        <p class="content_title_top">{{item.title}}</p>
        <p class="content_title changeStyle">{{item.newstext}}</p>
        <p class="content_bottom">
          <!-- <span class="content_left">{{item.username}}</span> -->
          <span class="content_right">{{item.newstime | dateParse}}</span>
        </p>
      </div>
      <div v-show="isBomShow" class="bottomRefesh">
        <span>加载更多...</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import {api} from '@/static/api'
import { Toast } from "mint-ui";
import header from "../../pages/comm/header"
export default {
  data () {
    return {
      title: '市场快讯',
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      type: '1',
      UpdataPage: {
        page: 1
      },
      upRefeshStatus: false,
      isTopShow: false,
      isBomShow: false,
      getBackData: [],
      infoList: [
        {title: '5-29行情分析：洗洗盘', source: '区块链说' ,date: '0529日14时01分'},
        {title: 'Crypto51总结，近20种小型加密 可以零成本零成 本发起51%算力攻击；市场整体下跌，市值一天内 蒸发200亿美元', source: '探链价值' ,date: '0529日14时01分'},
        {title: '央视重磅对话区块链：区块链产生哪些价价值？需要 哪些监管？', source: '央视新闻网' ,date: '0529日14时01分'},
        {title: '央视重磅对话区块链：区块链产生哪些价价值？需要 哪些监管？央视重磅对话区块链:哪些监管？央视重磅对话区块链.哪些监管？央视重磅对话区块链哪些监管？央视重磅对话区块链央视重磅对话区块链：区块链产生哪些价价值？需要', source: '央视新闻网' ,date: '0529日14时01分'},
        {title: '央视重磅对话区块链：区块链产生哪些价价值？需要 哪些监管？', source: '央视新闻网' ,date: '0529日14时01分'},
        {title: '央视重磅对话区块链：区块链产生哪些价价值？需要 哪些监管？', source: '央视新闻网' ,date: '0529日14时01分'},
        {title: '央视重磅对话区块链：区块链产生哪些价价值？需要 哪些监管？', source: '央视新闻网' ,date: '0529日14时01分'},
        {title: '央视重磅对话区块链：区块链产生哪些价价值？需要 哪些监管？', source: '央视新闻网' ,date: '0529日14时01分'},
        {title: '央视重磅对话区块链：区块链产生哪些价值？', source: '区块链说' ,date: '0529日14时01分'},
        {title: '5-29行情分析：洗洗盘', source: '区块链说' ,date: '0529日14时01分'}
      ]
    }
  },
  filters: {
    // 时间格式化
    dateParse: function(data){
      var date = new Date(Number(data) * 1000);
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y+M+D+h+m+s;
      return new Date(Number(data))
    }
  },
  components: {
    tarHeader: header
  },

  computed: {},
  watch: {
    dataList() {
      this.$nextTick(()=>{
        this.refresh();
      })
    },
    "$route": function(){
      var currentRoute = this.$router.currentRoute.path
      var strArr = currentRoute.split('/')
      if (strArr.includes('hangqing')) {
        this.classA = true
        console.log('1')
      } else if (strArr.includes('fastInfo')) {
        this.classA = false
        console.log('2')
      }
    }
  },

  mounted() {
    this.getBackPort()
    this.lookMarket()
  },

  methods: {
    lookMarket(){
      var obj = {}
      obj.type = '4'
      api.addPower(obj,this.ApiConf)
      .then(res => {
        console.log(res)
      })
      .catch(() => {

      })
    },
    // 请求接口
    getBackPort(){
      var _this = this
      _this.upRefeshStatus = false
      api.getDappFastInfo(_this.UpdataPage, _this.ApiConf)
      .then(res => {
        _this.upRefeshStatus = true
        if (res.error_code == '1000'){
          _this.isTopShow = false
          if (_this.type == '1') {
            // Toast({
            //   message: '更新成功啦', //提示内容分
            //   duration: 1000 , //持续时间（毫秒），若为 -1 则不会自动关闭
            //   iconClass: 'mint-toast-icon mintui mintui-success'  //icon 图标的类名
            // })
          }
        }
        res.data.forEach(ele => {
          _this.getBackData.push(ele)
          // _this.$nextTick(() => {
            // _this._initScroll()
          // })
        })
        this.$nextTick(() => {
          this._initScroll()
        })
      })
      .catch(() => {

      })
    },
    // 点击div事件
    singleClick(e){
      e.preventDefault()
      e.stopPropagation()
      var arrclassname = e.target.className.split(' ')
      console.log(arrclassname)
      var status = arrclassname.includes('content_title')
      var index = arrclassname.indexOf('changeStyle')
      console.log(status)
      if (status) {
        　e.target.classList.toggle("changeStyle")
      }
    },

    _initScroll:function () {
      if(!this.$refs.fastInfo){
        return
      }
      this.meunScroll = new BScroll(this.$refs.fastInfo, {
        pullDownRefresh: {
          threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
          stop: 0 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
        },
        pullUpLoad: {
          threshod: 50,
          stop: 0
        },
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 400 // 回弹时间
      })
      // 滚动结束时触发
      this.meunScroll.on('scrollEnd', (data) => {
        // 请求接口成功之后--隐藏上拉刷新字样
        // if(this.upRefeshStatus) {
        //   this.isTopShow = false
        //   this.isBomShow = false
        // }
      })
      // 监听滚动事件
      this.meunScroll.on('scroll',(pos) => {
        if(pos.y > 15){
          // this.isTopShow = true
        }
      })
      // 上拉触发
      this.meunScroll.on('pullingUp', () => {
        this.type = '2'
        this.UpdataPage.page++
        console.log(this.UpdataPage)
        this.getBackPort()
        this.isBomShow = true
        this.meunScroll.finishPullUp() // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
      }),
      // 下拉触发
      this.meunScroll.on('pullingDown', (data) => {
        // this.type = '1'
        // this.UpdataPage.page = 1
        // this.getBackData = []
        // this.getBackPort()
        // console.log(data)
        // console.log('下拉')
        // this.isTopShow = true
        this.meunScroll.finishPullDown()
      })
    }
  }
}

</script>
<style rel="stylesheet/scss" scoped>
  .fastInfoContainer{
    height: 100%;
  }
  .fastInfo{
    /* margin-top: 30px; */
    height:calc(100% - 95px);
    overflow: hidden;
    padding: 30px;
    /* border: 1px solid red; */
  }
  /* .fastInfo .container{ */
  /* } */
  .changeStyle {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    /* display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; */
  }
  .fastInfo .content_title_top{
    /* display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; */
    /* transition: clamp 1s; */
    overflow: hidden;
    /* text-indent: 2em; */
    text-align: left;
    font-weight: bold;
    font-size: 25px;/*px*/
    line-height: 40px;
  }
  .fastInfo .content_title{
    margin-top: 8px;
    text-indent: 2em;
    /* transition: clamp 1s; */
    overflow: hidden;
    /* text-indent: 2em; */
    text-align: left;
    font-size: 20px;/*px*/
    line-height: 40px;
    /* height: 120px; */
    /* background: red; */
  }
  .content_bottom{
    padding-right:20px;
    margin-top:20px;
  }
  .fastInfo .content{
    border-bottom: 1px solid #e2e2e1;/*no*/
    vertical-align: middle;
    padding: 20px 0;
    /* height:170px; */
    overflow: hidden;
  }
  .fastInfo .content .content_left{
    color: #b5b5b5;
    font-size: 20px;/*px*/
    float: left;
    line-height: 40px;
  }
  .fastInfo .content .content_right{
    color: #b5b5b5;
    font-size: 20px;/*px*/
    float: right;
    line-height: 30px;
  }
  /* 上拉下拉刷新 */
  .topRefesh{
    line-height: 50px;
    height: 50px;
    /* background: red; */
  }
  .bottomRefesh{
    line-height: 50px;
    height: 50px;
    /* background: red; */
  }
  /* .isNone{
    display
  } */
</style>
