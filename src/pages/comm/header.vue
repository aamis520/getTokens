<!--  -->
<template>
  <div class="commHead">
    <!-- <div > -->
    <img @click="back" v-if="isSowBack" class="headerBackIcon" style="color:black;" src="../../assets/back.png" alt="返回">
    <!-- </div> -->
    <span>{{title}}</span>
    <img @click="goRedPackRemark" class="headerFileIcon" v-if="fileIcon" src="../../assets/redPaper/file.png" alt="文件">
    <img @click="addAssets" class="headerFileIcon" v-if="addAsset" src="../../assets/wallet/add.png" alt="添加资产">
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    isSowBack: {
      type: Boolean,
      default: true
    },
    backUrl:{
      type: String,
      default: ''
    },
    fileIcon:{
      type: Boolean,
      default: false
    },
    addAsset: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    goRedPackRemark() {
      this.$router.push({
        path: '/redRemark'
      })
    },
    back(){
      if(this.backUrl){
        this.$router.push(this.backUrl)
      }else{
        this.$router.go(-1)

      }
    },
    addAssets() {
      this.$router.push({
        path: "/assetsClassify"
      });
    },
  }
}

</script>
<style rel="stylesheet/scss" scoped>
  .commHead{
    position: relative;
    font-weight: bold;
    line-height: 95px;
    /* opacity: .5; */
    background: #f2f2f2;
    height: 95px;
    font-family:'微软雅黑';
    width:100%;
    text-align: center;
    font-size: 34px;/*px*/
  }
  .headerBackIcon{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 50px;
    height: 35px;
    width: 35px;
  }
  .headerFileIcon{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 50px;
    height: 35px;
    width: 35px;
  }
</style>
