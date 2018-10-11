<!--  -->
<template>
  <div class="downLoad">
    <!-- <tar-header :title="title"></tar-header> -->
    <div class="downLoad_container">
      <div class="downLoad_head">
        <img src="../../assets/change/morenHeadPic.png" alt="icon">
        <p class="name">GetTokens</p>
        <p class="remark">区块链社交分享平台</p>
        <p class="version">v 2.0.0</p>
      </div>
      <div class="downLoad_foot">
        <a>下载APP</a>
      </div>
    </div>
    <div class="goBrowser">
      <div class="guide">
        <img src="../../assets/download/browser.png" alt="icon">
        <p>在浏览器中打开</p>
      </div>
    </div>
  </div>
</template>

<script>
// import header from "../comm/header";

export default {
  data () {
    return {
      isShow: false,
      title: 'GetTokens'
    };
  },

  components: {
    // tarHeader: header
  },

  computed: {},

  mounted(){},

  methods: {
    goInBrowser(){
      // this.$router.push({
      //   path: '/goBrowser'
      // })
      // console.log('fhldjk')
      this.isShow = true
    }
  }
}

</script>
<style lang='scss' scoped>
  .downLoad{
    height: 100%;
    .downLoad_container{
      border-top: 1px solid #ebe9e9;/*no*/
      background:url('../../assets/download/downloadApp.png') no-repeat 5px 5px;
      background-size:(100%, 100%);
      height:calc(100% - 95px);
      .downLoad_head{
        margin-top: 99px;
        height: 350px;
        // background: red;
        img{
          height: 175px;
          width: 175px;
          // border-radius: 50px;
        }
        .name{
          margin-top: 13px;
          font-weight: bold;
          color: #2a2a2a;
          font-size: 40px;/*px*/
        }
        .remark{
          margin-top: 18px;
          color: #9d9d9d;
          font-size: 28px;/*px*/
        }
        .version{
          margin-top: 58px;
          color:#c6c6c6;
          font-size: 30px;/*px*/
        }
      }
      .downLoad_foot{
        margin-top: 500px;
        height: 100px;
        a{
          font-size: 30px;/*px*/
          line-height: 100px;
          display: inline-block;
          background: -webkit-linear-gradient(left,#feb700, #fdf301); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(right,#feb700, #fdf301); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(right,#feb700, #fdf301); /* Firefox 3.6 - 15 */
          background: linear-gradient(to right,#feb700, #fdf301); /* 标准的语法 */
          color: white;
          border-radius: 50px;
          width: 378px;
          height: 100px;
        }
      }
    }
    .goBrowser{
      text-align: right;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,.5);
      opacity: .5;
      .guide{
        margin-top: 50px;
        height: 200px;
        padding-right: 50px;
        img{
          height: 150px;
          width: 150px;
        }
        p{
          margin-top: 15px;
          padding-right: 28px;
          font-size: 30px;/*px*/
          color: white;
        }
      }
    }
  }
</style>
