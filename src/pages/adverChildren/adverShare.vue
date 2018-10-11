<!--  -->
<template>
   <div class="adverDetail">
    <!-- <tar-header :title="title"></tar-header> -->
    <div class="outer_body" ref="outer_body">
      <div>
        <div class="adver_contain">
          <div class="adver_contain_pic">
            <div class="adver_contain_pic_head">
              <img :src="getBackData.imgUrl" alt="图片">
            </div>
            <div class="adver_contain_pic_foot">
              <div class="pic_foot_left">
                <img :src="getBackData.ad_auther_avatar" alt="avater">
              </div>
              <div class="pic_foot_middle">
                <div class="spanContain">
                  <span class="pic_foot_middle_top">{{getBackData.ad_auther}}</span> <br>
                  <span class="pic_foot_middle_bom">{{getBackData.ad_name}}</span>
                </div>
              </div>
              <div class="pic_foot_right">
                <!-- <button @click="goInShare">我要挖宝</button> -->
              </div>
            </div>
          </div>
        </div>
        <div class="adver_body">
          <div v-html="getBackData.ad_info">
          </div>
        </div>
        <div class="adver_foot">
          <p>
            <!-- <button @click="goInShare">我要挖宝</button> -->
          </p>
          <p class="adver_foot_share">
            <!-- <span>分享此广告即可获得UTCT</span> -->
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import header from "../../pages/comm/header";
import {api} from '@/static/api'
export default {
  data () {
    return {
      // ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      getBackData: '',
      title: '广告详情'
    }
  },
  components: {
    tarHeader: header
  },
  computed: {},
  mounted() {
    this.getPort()
  },
  methods: {
    _initScroll:function () {
      this.meunScroll = new BScroll(this.$refs.outer_body, {
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 400 // 回弹时间
      })
    },

    getPort() {
      var _this = this
      var obj = {}
      var rel = _this.$route.query.rel
      obj.rel = rel
      api.getAdvermentShare(obj)
      .then(res => {
        res.data.images.forEach(ele => {
          if (ele.images_type == '1') {
            res.data.imgUrl = ele.image_url
          }
        })
        _this.getBackData = res.data
        setTimeout(function() {
          _this.$nextTick(() => {
            _this._initScroll()
          })
        },1000)
      })
      .catch(() => {

      })
    }
  }
}

</script>
<style lang='scss' scoped>
  .adverDetail{
    height: 100%;
    .outer_body{
      height: 100%;
      overflow: hidden;
    }
  }
  .footer{
    display: none;
  }
  .adver_foot{
    margin-top: 50px;
    width: 100%;
    /* position: fixed; */
    /* bottom: 100px; */
  }
  .adver_contain_pic{
    position: relative;
    /* background: gray; */
    width: 100%;
    height:774px;
    /* border-bottom: 1px solid red; */
  }
  .adver_body{
    // overflow: scroll;
    padding: 20px;
    /* margin-top: 20px; */
    text-align: left;
    line-height: 50px;
    letter-spacing:3px;
    /deep/ img{
      max-width: 100% !important;
    }
  }
  .adver_body span{
    display: inline-block;
    font-size: 31.64px;/*px*/
    color:#7b7b7f;
  }
  .adver_contain_pic_head{
    // height: calc(100% - 156px);
    height: 100%;
    border-radius: 20px 20px 0 0;
    width: 100%;
    /* border:1px solid red; */
  }
  .adver_contain_pic_head img{
    // border-radius: 20px 20px 0 0;
    display: block;
    width: 100%;
    height: 100%;
  }
  .adver_contain_pic_foot{
    // background: #1c2235;
    /* background: green; */
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 0;
    height:156px;
  }
  .pic_foot_left{
    position: relative;
    flex: 1;
  }
  .pic_foot_left img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    height: 100px;
    width: 100px;
    border-radius: 10px;
  }
  .pic_foot_middle{
    text-align: left;
    position: relative;
    flex: 3;
  }
  .pic_foot_middle .spanContain{
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .pic_foot_middle .pic_foot_middle_top{
    font-size: 30px;
    color: white;
    font-weight: bold;
  }
  .pic_foot_middle .pic_foot_middle_bom{
    font-size: 24px;
    color: white;
    font-weight: bold;
  }
  .pic_foot_right{
    position: relative;
    margin-right: 20px;
    flex: 1;
  }
  .pic_foot_right button{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    margin-right: 10px;
    font-weight: bold;
    border-radius: 40px;
    background: #fdd402;;
    height:62px;
    font-size: 26px;/*px*/
    text-align: center;
    color: white;
    width: 160px;
  }
  .adver_foot button{
    font-weight: bold;
    border-radius: 40px;
    background: #fdd402;;
    height:80px;
    font-size: 28px;/*px*/
    text-align: center;
    color: white;
    width: 210px;
  }
  .adver_foot_share{
    font-size: 24px;/*px*/
    color: #b3b3b3;
    margin-top:20px;
  }
</style>
