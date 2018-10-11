<!--  -->
<template>
  <div class="advertise">
    <!-- <tar-header :isSowBack='false' :title="title"></tar-header> -->
    <div class="advertise_contain" ref="advertise_contain">
      <div>
        <!-- <div class="loadingRefesh" v-show="isShowTopRefesh">
          <p >下拉刷新...</p>
        </div> -->
        <div class="advertise_contain_banner" v-for="(item,index) in getBackData" :key="index">
            <video :src="item.vadioUrl" width="100%" height="100%" :poster="item.imgStatus" preload="true" controls="true" v-if="item.videoStatus" type="video/mp4"></video>
            <img :src="item.imgStatus" alt="pic" v-show="item.imgShow" @click="lookDetail(item)">
          <!-- <div class="banner_head" @click="lookDetail(item)"> -->
          <!-- </div> -->
          <div class="banner_footer">
            <div class="banner_footer_left">
              <div class="pic_container">
                <img :src="item.ad_auther_avatar" alt="avatar">
              </div>
            </div>
            <div class="banner_footer_middle">
              <span class="left_spanTop">{{item.ad_auther}} </span> <br>
              <span class="left_spanBom">{{item.ad_name}}</span>
            </div>
            <div class="banner_footer_right">
              <button @click="lookDetail(item)">查看详情</button>
            </div>
          </div>
        </div>
        <!-- <div :class="isShowBomRefesh ? 'uploadingMore' : 'noUploadingMore'"> -->
        <div class="uploadingMore" v-if="isShowBom">
          <img v-if="isLoading" class="loadingPic" src="../assets/account/loading.gif" alt="loading">
          <p v-if="!isLoading && getBackData.length > 0">{{downLoadingSpan}}</p>
        </div>
      </div>
    </div>
     <!-- <div :class="isShowBomRefesh ? 'uploadingMore' : 'noUploadingMore'">
        <p>{{downLoadingSpan}}</p>
      </div> -->
    <!-- <span style="">
      广告页面
    </span> -->
  </div>
</template>

<script>
import header from "../pages/comm/header";
import {api} from '@/static/api'
import BScroll from 'better-scroll'
import { Toast, Indicator} from "mint-ui";

export default {
  data () {
    return {
      isShowBom: false,
      isLoading: false,
      downLoadingSpan: '加载更多...',
      isShowBomRefesh: true,
      isShowTopRefesh: false,
      form: {page: 1},
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      getBackData: [], // 保存后台返回的数据
      title: '广告'
    }
  },

  components: {
    tarHeader: header
  },

  computed: {

  },

  mounted(){
    this.getPort()
  },

  methods: {
        // better-scroll初始化dom节点
    _initScroll:function () {
      this.meunScroll = new BScroll(this.$refs.advertise_contain, {
       pullDownRefresh: {
          threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
          stop: 0 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
        },
        pullUpLoad: {
          threshold: -50,
          stop: 0
        },
        fade: true,
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 400 // 回弹时间
      })
       // 滚动结束时触发
      this.meunScroll.on('scrollEnd', (data) => {
        this.downLoadingSpan = '上拉加载更多...'
        this.isShowBom = false
        // this.isShowBomRefesh = true
        // this.isShowBomRefesh = false
        // console.log(data)
        // 请求接口成功之后--隐藏上拉刷新字样
        // if(this.upRefeshStatus) {
        //   this.isTopShow = false
        //   this.isBomShow = false
        // }
      })
       // 监听滚动事件
      this.meunScroll.on('scroll',(pos) => {

        // this.isShowBom = false
        // console.log(pos)
        // if(pos.y < -650){
        //   console.log('jdgk')
        //   this.isShowTopRefesh = true
        // }
      })
       // 上拉触发
      this.meunScroll.on('pullingDown', () => {
        console.log('下拉')
        // this.getBackData = []
        // this.getPort()
        // this.isShowTopRefesh = true
        // this.type = '2'
        // this.UpdataPage.page++
        // console.log(this.UpdataPage)
        // this.getBackPort()
        // this.isBomShow = true
        this.meunScroll.finishPullDown() // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
      }),
       // 上拉触发
      this.meunScroll.on('pullingUp', () => {
        console.log('上拉刷新')
          this.isShowBom = true
          this.isLoading = true
          this.form.page++
          this.getPort()
          setTimeout(function(){
          this.$nextTick(function(){
              this.meunScroll.finishPullUp()
            });
          }.bind(this),2000);
        // this.meunScroll.finishPullUp() // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
      })
    },
    // 调接口
    getPort() {
      var _this = this
      api.getAdverment(_this.form, _this.ApiConf)
      .then(res => {
        if (res.error_code == '1000') {
          Indicator.close()
          res.data.forEach(ele => {
            if (ele.ad_type == '1') {
              ele.imgStatus = ele.images[0].image_url
              ele.imgShow = true
              ele.videoStatus = false
            } else if (ele.ad_type == '2'){
              ele.imgStatus = ele.images[0].image_url
              ele.vadioUrl = ele.images[1].image_url
              ele.imgShow = false
              ele.videoStatus = true
            }
          })
          // 大于第二页
          if (_this.form.page >= 2) {
            if (res.data.length > 0){
              _this.getBackData.push(res.data)
               _this.$nextTick(() => {
                _this._initScroll()
              })
            } else if(res.data.length == 0){
              _this.form.page--
              _this.isLoading = false
              _this.downLoadingSpan = '没有更多内容...'

              // _this.$nextTick(() => {
              //   _this._initScroll()
              // })
            }
          }
          if(_this.form.page == 1) {
            if (_this.getBackData.length > 0) {
              return
            }
            _this.getBackData = res.data
            _this.$nextTick(() => {
              _this._initScroll()
            })
          }
          console.log('成功')
        } else {
          Indicator.close()
          Toast({
            message: res.error_desc, //提示内容分
            duration: 2000 , //持续时间（毫秒），若为 -1 则不会自动关闭
            iconClass: 'mint-toast-icon mintui mintui-field-error'  //icon 图标的类名
          })
        }
      })
      .catch(() => {
        Indicator.close()
        Toast({
          message: res.error_desc, //提示内容分
          duration: 2000 , //持续时间（毫秒），若为 -1 则不会自动关闭
          iconClass: 'mint-toast-icon mintui mintui-field-error'  //icon 图标的类名
        })
      })
    },
    lookDetail(item) {
      console.log(item)
      this.$router.push({
        path: 'adverDetail',
        query: {
          id: item.ad_id
        }
      })
    }
  }
}

</script>
<style lang='scss' scoped>
  .advertise{
    height:100%;
  }
  .loadingPic{
    height: 45px;
    width: 45px;
  }
  // loadingRefesh
  .uploadingMore{
    display: inline-block;
    transition:  2s;
    -moz-transition:  2s;	/* Firefox 4 */
    -webkit-transition:  2s;	/* Safari 和 Chrome */
    -o-transition:  2s;	/* Opera */
    font-size: 30px;
    // margin:0 20px;
    height: 50px;
    width: 100%;
    // background: red;
    p{
      line-height: 50px;
    }
  }
  .noUploadingMore{
    display: inline-block;
    transition:  1s;
    -moz-transition:  1s;	/* Firefox 4 */
    -webkit-transition:  1s;	/* Safari 和 Chrome */
    -o-transition:  1s;	/* Opera */
    font-size: 30px;
    height: 0;
    width: 100%;
    overflow: hidden !important;
  }
  .advertise_contain{
    position: relative;
    height: calc(100% - 100px);
    overflow: hidden;
    // margin-top: -50px;
    // padding: 27px;
    /* height:; */
  }
  /* .advertise_contain:nth-child(1){
    padding: none;
  } */
  .advertise_contain_banner{
    // background: red;
    // margin-top: 50px;
    position: relative;
    width: 90%;
    /* border-top: 1px solid red;no */
    border-radius: 20px;
    margin: 50px auto 0;
    height:774px;
    img{
      border-radius:20px;
      height: 100%;
      width: 100%;
      height: 100%;
      width: 100%;
    }
  }
  .banner_footer{
    border-radius:0 0 20px 20px;
    /* background: #1c2235;; */
    display: flex;
    padding: 10px 20px;
    width: 100%;
    position: absolute;
    height:130px;
    bottom: 0;
  }
  .banner_footer_left{
    // display: inline-block;
    // border-radius:10px;
    // height: 100px;
    // width: 100px;
    flex: 1;
    .pic_container{
      margin-left: 22px;
      height: 100px;
      width: 100px;
      img{
        border-radius: 21px;
        height: 100%;
        width: 100%;
      }
    }
  }
  .banner_footer_right{
    flex: 1;
  }
  .banner_footer_middle{
    margin-left: 50px;
    text-align: left;
    flex: 3;
  }
  .left_spanTop{
    display: inline-block;
    margin-top: 10px;
    font-size: 30px;/*px*/
    color: white;
    font-weight: bold;
  }
  .left_spanBom{
    font-size: 24px;/*px*/
    color: white;
    font-weight: bold;
  }
  .banner_footer_right button{
    margin-top: 10px;
    font-size: 26px;/*px*/
    color: white;
    border-radius: 32px;
    background: #fdd402;
    height: 65px;
    width: 159px;
  }
</style>
