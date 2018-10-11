<!--  -->
<template>
  <div class="newDapp" ref="newDapp">
    <div>
      <div class="newDapp_container">
        <div class="newDapp_head">
        </div>
        <div class="newDapp_head_bom">
          <div class="newDapp_head_bom_use">
            <span>最近使用</span>
          </div>
          <div class="newDapp_head_bom_hangqing comm" @click="goInHangqing">
            <img class="imgIcon" src="../assets/newDapp/行情@2x.png" alt="icon"><br>
            <span>市场行情</span>
          </div>
          <div class="newDapp_head_bom_fastInfo comm" @click="goInFastInfo">
            <img class="imgIcon" src="../assets/newDapp/002-nav-资讯@2x.png" alt="icon"><br>
            <span>市场币讯</span>
          </div>
          <div @click="goInGame" class="newDapp_head_bom_bean comm">
            <img class="imgIcon" src="../assets/newDapp/pirates@2x.png" alt="icon"><br>
            <span>游戏</span>
          </div>
          <div class="newDapp_head_bom_bean commShape" @click="goInLateUse">
            <img src="../assets/Shape.png" alt="">
            <!-- <img class="imgIcon" src="../assets/newDapp/猜硬币52@2x.png" alt="icon"><br> -->
          </div>
        </div>
        <div class="newDapp_body">
          <p class="recommend">
            <span class="recommend_left">热门推荐</span>
            <span class="recommend_right" @click="lookAtMore">查看更多</span>
            <!-- <img class="recommend_img" src="../assets/Shape.png" alt="icon"> -->
          </p>
          <dappcomm :content="content"></dappcomm>
          <div class="lookMore">查看更多</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dappcomm from "../components/dappcomm"
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      content: [
        {imgurl: require('../assets/newDapp/行情@2x.png'),title: '市场行情', detail: '查看数字行情实时的应用'},
        {imgurl: require('../assets/newDapp/购物车拷贝@2x.png'),title: '货币商城', detail: '用数字货币购买商品的应用'},
        {imgurl: require('../assets/newDapp/猜硬币52@2x.png'),title: '区块链预言家', detail: '业内趋势了解一下吗'}
      ]
    };
  },

  components: {
    dappcomm
  },

  computed: {},

  mounted() {
    this.$nextTick(() => {
      this._initScroll()
    })
  },

  methods: {
    lookAtMore(){
      this.$router.push({
        path: '/lookMore'
      })
    },
    goInLateUse(){
      this.$router.push({
        path: '/latelyuse'
      })
    },
    goInHangqing(){
      this.$router.push({
        path: '/hangqing'
      })
    },
    goInFastInfo(){
      this.$router.push({
        path: '/fastInfo'
      })
    },
    goInGame(){
      this.$router.push({
        path: '/gameDetail'
      })
    },
     _initScroll:function () {
      if(!this.$refs.newDapp){
        return
      }
      this.meunScroll = new BScroll(this.$refs.newDapp, {
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
    }
  }
}

</script>
<style lang='scss' scoped>
  .newDapp{
    background: #fcfcfc;
    height: calc(100% - 100px);
    .newDapp_container{
      height: 100%;
      overflow: hidden;
      .newDapp_head{
        height: 425px;
        background-image: url('../assets/newDapp/shutterstock_769335463@2x.png');
        background-size: (100%, 100%);
        background-repeat: no-repeat;
      }
      .newDapp_body{
        border-radius: 10px;
        margin: 30px 20px 0 20px;
        box-shadow: 0px 0px 5px #dfdada;
        // height: 600px;
        // background: greenyellow;
        .recommend{
          height: 105px;
          text-align: left;
          padding: 0 40px;
          line-height: 105px;
          // background: #707070;
          .recommend_left{
            font-size: 34px;/*px*/
            color: #232323;
            font-weight: bold;
            float: left;
          }
          .recommend_right{
            font-size: 20px;/*px*/
            float: right;
          }
          img{
            height: 30px;
            width: 30px;
            float: right;
          }
        }
        .lookMore{
          height: 110px;
          text-align: center;
          line-height: 110px;
          color: #abaaaa;
          font-size: 25px;/*px*/
        }
      }
      .newDapp_head_bom{
        background: white;
        height:200px;
        width: 715px;
        margin: 0 auto;
        border-radius: 10px;
        margin-top: -70px;
        box-shadow: 2px 2px 5px #f1f1f1;
        .newDapp_head_bom_use{
          width: 270px;
          // width: 40%;
          height: 100%;
          float: left;
          color: #232323;
          font-size: 34px;/*px*/
          line-height: 200px;
          font-weight: bold;
        }
        .comm{
          text-align: center;
          float: left;
          position: relative;
          width: 130px;
          height: 100%;
          span{
            color: #707070;
            font-size: 20px;/*px*/
          }
        }
        .commShape{
          height: 100%;
          width: calc(100% - 660px);
          float: left;
          text-align: center;
          img{
            margin-top: 70px;
            height:40px;
            width:30px;
          }
        }
        .imgIcon{
          height: 80px;
          width: 80px;
          border-radius: 50%;
          margin-top: 45px;
        }
      }
    }
  }
</style>
