<!--  -->
<template>
  <div class="redRemark">
    <tar-header :backUrl="backUrl" :title="title"></tar-header>
    <div class="redRemark_container">
      <div class="redRemark_tabbar">
        <div :class="classA ? 'class-b' : 'class-a'" class="redRemark_tabbar_left" @click="goToFillIn">
          <!-- <div> -->
            <span>我收到的</span>
          <!-- </div> -->
        </div>
        <div :class="classA ? 'class-a' : 'class-b'"  @click="goInGivePack" class="redRemark_tabbar_right">
          <!-- <div> -->
            <span>
              我发出的
            </span>
          <!-- </div> -->
        </div>
      </div>
      <div class="redRemark_content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import header from "../pages/comm/header";
export default {
  data () {
    return {
      classA: false,
      backUrl: '/redPaper',
      title: '红包记录'
    };
  },

  components: {
    tarHeader: header
  },

  computed: {},

  mounted() {
    var currentRoute = this.$router.currentRoute.path
    var strArr = currentRoute.split('/')
    if (strArr.includes('fillIn')) {
      this.classA = false
    } else if (strArr.includes('givePack')) {
      this.classA = true
    }
  },

  methods: {
    goToFillIn(){
      this.classA = false
      this.$router.push({
        path: '/redMemark/fillIn'
      })
    },
    goInGivePack(){
      this.classA = true
      this.$router.push({
        path: '/redMemark/givePack'
      })
    }
  }
}

</script>
<style lang='scss' scoped>
.redRemark{
  height: 100%;
  .redRemark_container{
    height: calc(100% - 100px);
    overflow: hidden;
    // border: 1px solid red;
    .redRemark_content{
      height: calc(100% - 100px);
      margin: 0 20px;
      // border: 1px solid red;
    }

    .redRemark_tabbar{
      opacity: 1;
      background:#f6f6f6;
      border-bottom: 1px solid #f6f6f6;/*no*/
      height: 100px;
      display: flex;
      font-size: 30px;/*px*/
      // color: black !important;
      .router-link-active{ //.router-link-active 指定
        color: #fdd401;
        padding-bottom: 25px;
        border-bottom: 4px solid #fdd401;/*no*/
      }
      .redRemark_tabbar_left, .redRemark_tabbar_right{
        font-size: 30px;/*px*/
        line-height: 100px;
        text-align: center;
        flex: 1;
      }
      .class-a{
        color: #fdd401;
        border-bottom: 4px solid #fdd401;
      }
      .class-b{
        border-bottom:none;
      }
    }
  }
}
</style>
