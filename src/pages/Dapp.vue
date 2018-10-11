<!--  -->
<template>
  <div class="dapp">
    <!-- <tar-header :isSowBack='false' :title="title"></tar-header> -->
    <div class="container" ref="container">
      <div>
        <div class="gameIn comm" @click="gameClick">
          <img style="height:100%;width:100%;" src="../assets/Dapp/index_youxi.png" alt="游戏">
        </div>
        <div class="beanInfo comm" @click="beanClick">
          <img style="height:100%;width:100%;" src="../assets/Dapp/index_shichang.png" alt="市场币讯">
        </div>
        <div class="guessDay comm" @click="guessClick">
          <img style="height:100%;width:100%;" src="../assets/Dapp/index_jincai.png" alt="竞猜">
        </div>
        <div class="shop comm" @click="shopClick">
          <img style="height:100%;width:100%;" src="../assets/Dapp/index_shangcheng.png" alt="GetTokens商城">
        </div>
        <!-- <div class="shop comm" @click="goCnode">
          <img style="height:100%;width:100%;" src="../assets/Dapp/index_shangcheng.png" alt="GetTokens商城">
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import youxiPic from '../assets/Dapp/index_youxi.png'
// import shangchengPic from '../assets/Dapp/index_shangcheng.png'
import { Toast } from 'mint-ui'
import header from './comm/header'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      title: 'DAPP'
    }
  },

  components: {
    tarHeader: header
  },

  computed: {},

  mounted() {

    this.$nextTick(() => {
      this._initScroll()
    })
  },

  methods: {
    _initScroll:function () {
      if(!this.$refs.container){
        return
      }
      this.meunScroll = new BScroll(this.$refs.container, {
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 400 // 回弹时间
      })
    },
    gameClick() {
      this.$router.push({
        path: 'gameDetail'
      })
    },
    guessClick() {
      Toast({
        message: '敬请期待...',
        duration: 1000
      })
    },
    beanClick() {
      this.$router.push({
        path: 'market'
      })
    },
    shopClick() {
      Toast({
        message: '敬请期待...',
        duration: 1000
      })
    },
    goCnode(){
      this.$router.push('/cnode')
    }
  }
}

</script>
<style lang='scss' scoped>
  .dapp{
    height: calc(100% - 100px);
  }
  .container{
    // background: red;
    // border: 1px solid white;
    // padding-top: 25px;
    // height:calc(100% - 212px);
    // height: 100%;
    height: 100%;
    overflow: hidden;
    // overflow-y: scroll;
    /* margin: 20px 10px; */
    /* margin: 0 10px; */
  }
  .comm{
    height:274px;
    width: 732px;
    margin: 0 auto;
  }
</style>
