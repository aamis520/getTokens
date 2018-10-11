<!--  -->
<template>
  <div class="lookMore">
    <tar-header :backUrl = 'backUrl' :title="title"></tar-header>
    <div class="lookMore_search">
      <input type="text" placeholder="搜索应用">
    </div>
    <div class="lookMore_tabbar">
      <div :class="classA ? 'class-a' : 'class-b' " class="lookMore_tabbar_left comm" @click="getApply">
        <span>
          应用
        </span>
      </div>
      <div :class="classA ? 'class-b' : 'class-a' " class="lookMore_tabbar_right comm" @click="getCrowd">
        <div class="partingLine"></div>
        <span>
          社群
        </span>
      </div>
    </div>
    <!-- 上边是应用，下边是社群 -->
    <dappcomm @goInGame = "goInGame" :content="content" v-if="classA"></dappcomm>
    <dappcomm :content="contentCrowd" v-if="!classA"></dappcomm>
  </div>
</template>

<script>
import header from "../pages/comm/header"
import dappcomm from "../components/dappcomm"
import {api} from '@/static/api'
export default {
  data () {
    return {
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      getInfoStatus: false,
      backUrl: '/newdapp',
      getBackData: '',
      classA: true,
      title: 'DAPP',
      content: [
        {imgurl: require('../assets/newDapp/行情@2x.png'),title: '市场行情', detail: '查看数字行情实时的应用'},
        {imgurl: require('../assets/newDapp/购物车拷贝@2x.png'),title: '货币商城', detail: '用数字货币购买商品的应用'},
        {imgurl: require('../assets/newDapp/猜硬币52@2x.png'),title: '区块链预言家', detail: '业内趋势了解一下吗'},
        {imgurl: require('../assets/newDapp/聊天-2@2x.png'),title: '币知道', detail: '数字货币大佬交流基地'},
        {imgurl: require('../assets/newDapp/pirates@2x.png'),title: '海盗旋转', detail: '装备升级，更多惊喜'}
      ],
      contentCrowd: [
        {imgurl: require('../assets/newDapp/行情@2x.png'),title: '区块链预言家', detail: ''},
        {imgurl: require('../assets/newDapp/购物车拷贝@2x.png'),title: '大佬，是吧', detail: ''}
      ]
    };
  },

  components: {
    tarHeader: header,
    dappcomm
  },

  computed: {},

  mounted() {
    this.getBackPort()
  },

  methods: {
    // 点击进入游戏时间
    goInGame(data){
      this.goGame()
    },
    getApply(){
      this.classA = true
    },
    getCrowd(){
      this.classA = false
    },
    // 游戏接口--获取后台参数-保存之后跳进游戏时传入
    getBackPort(){
      api.getameInfo(this.ApiConf)
      .then(res => {
        this.getInfoStatus = true
        this.getBackData = res.data
      })
      .catch(() => {

      })
    },
    goGame(){
      if (this.getInfoStatus){
        window.location.href = 'http://g2.zhuandian.net/index.html?msg=aW50ZWdyYWwvMTEw' + this.getBackData
      } else {
        Toast('获取游戏失败')
      }
    }
  }
}

</script>
<style lang='scss' scoped>
  .lookMore{
    background: #f2f2f2;
    height: 100%;
    .lookMore_search{
      height: 100px;
      background: #f2f2f2;
      input{
        border-radius: 5px;
        margin-top: 10px;
        padding: 0 40px;
        width: calc(100% - 40px);
        height: 70px;
        background: white;
        border: none;
      }
    }
    .lookMore_tabbar{
      background: white;
      // margin-top: 10px;
      height: 100px;
      display: flex;
      // width: 100%;
      .comm{
        line-height: 100px;
        text-align: center;
        flex: 1;
        font-size: 32px;/*px*/
      }
      .lookMore_tabbar_right{
        .partingLine{
          float: left;
          height: 60px;
          margin-top: 20px;
          width: 2px;
          background: #f2f2f2;
        }
      }
      .class-a{
        color: #fdd718;
        border-bottom: 1px solid #fdd718 ;/*no*/
      }
      .class-b{
      }
    }
  }
</style>
