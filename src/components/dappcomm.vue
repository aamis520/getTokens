<!--  -->
<template>
  <div>
    <div @click="goinDetail(item)" class="dappComm_container" v-for="(item,index) in content" :key="index">
      <div class="dappComm_container_left">
        <!-- <img src="../assets/newDapp/行情@2x.png" alt=""> -->
        <img :src = "item.imgurl" alt="icon">
      </div>
      <div class="dappComm_container_rigth">
        <div class="right_inner">
          <span class="market">{{item.title}}</span><br>
          <span class="apply">{{item.detail}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  props: {
    content: {
      type: Array,
      default: [{
      }]
    }
  },
  data () {
    return {

    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    goinDetail(item){
      if(item.title == '市场行情'){
        this.$router.push({
          path: '/hangqing'
        })
      } else if(item.title == '海盗旋转'){ // 点击进入游戏
        this.$emit("goInGame", true)
      } else if(item.title == '币知道'){
        // this.$router.push('/cnode')

        this.$router.push({
          path: '/beanKnow'
        })
      }else {
        Toast({
          message: '敬请期待...',
          duration: 1000 ,
        })
      }
    }
  }
}

</script>
<style lang='scss' scoped>
  .dappComm_container{
    // background: red;
    height: 150px;
    .dappComm_container_left{
      float: left;
      position: relative;
      width: 158px;
      height: 100%;
      text-align: center;
      // margin-top: 40px;
      img{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 108px;
        width: 108px;
      }
    }
    .dappComm_container_rigth{
      float: right;
      position: relative;
      border-bottom: 1px solid #e7e7e7;
      width: calc(100% - 158px);
      text-align: left;
      height: 100%;
      .right_inner{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .market{
        display: inline-block;
        // margin-top: 40px;
        margin-bottom: 10px;
        color: #262626;
        font-size: 31px;/*px*/
      }
      .apply{
        color: #b1b1b1;
        font-size: 23px;/*px*/
      }
    }
  }
</style>
