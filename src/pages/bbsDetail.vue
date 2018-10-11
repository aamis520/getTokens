<!-- 论坛详情-->
<template>
  <div class="bbsDetail">
    <tar-header :title="title"></tar-header>
    <div class="fixInput" v-show="isShowSendChats">
      <div class="top">
        <input type="text" placeholder="请输入">
        <span>发送</span>
      </div>
      <div class="bom">
        <img src="../assets/newDapp/grayright.png" alt="icon">
        <span>匿名发送</span>
      </div>
    </div>
    <div class="bbsDetail_container" ref="bbsDetail_container">
      <div>
        <p>{{getBackData.title}}</p>
        <div class="bbsDetail_title clearfix">
          <div class="bbsDetail_title_img">
            <img src="../assets/newDapp/聊天-2@2x.png" alt="icon">
          </div>
          <div class="bbsDetail_title_right">
            <span class="bbsDetail_title_right_top">{{getBackData.userName}}</span><br>
            <span class="bbsDetail_title_right_bom">{{changeTime(getBackData.createTime)}}</span>
          </div>
        </div>
        <div class="bbsDetail_body">
          <p>
            {{getBackData.content}}
          </p>
        </div>
        <div class="line"></div>
        <div class="bbsDetail_remark">
          <div class="title">
            <span>热门评论</span>
          </div>
          <div class="content">
            <commRemark @talkClick="talkClick"></commRemark>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import BScroll from 'better-scroll'
import header from "../pages/comm/header"
import commRemark from "../components/commRemark"
import { getArticleDetailById, getReplysByArticleId } from '@/static/apiCnode'
export default {
  data () {
    return {
      getBackAllReply: '',
      userId : this.$store.getters.UserId,
      getBackData: {},
      articleId: '',
      isShowSendChats: true,
      title: '详情'
    };
  },

  components: {
    tarHeader: header,
    commRemark
  },

  computed: {},

  mounted() {
    this.articleId = this.$route.query.articleId
    this.$nextTick(() => {
      this._initScroll()
    })
    this.getArticleDetailById()
    this.getAllReply()
  },

  methods: {
    // 获取文章祥情
    getArticleDetailById(){
      getArticleDetailById(this.articleId)
      .then(res =>{
        if(res.statusCode == 200){
          this.getBackData = res.data
        }
      })
    },
    // 获取评论的内容
    getAllReply(){
      var obj = {}
      obj.userId = this.userId
      obj.articleId = this.$route.query.articleId
      getReplysByArticleId(obj)
      .then(res =>{
        if(res.statusCode == 200){
          this.getBackAllReply = res.data
        }
      })
    },
    talkClick(data){
      this.isShowSendChats = data
    },
    _initScroll:function () {
      if(!this.$refs.bbsDetail_container){
        return
      }
      this.meunScroll = new BScroll(this.$refs.bbsDetail_container, {
        pullDownRefresh: {
          threshold: 50,
          stop: 0
        },
        pullUpLoad: {
          threshod: 50,
          stop: 0
        },
        click: true,
        scrollY:true,
        momentum: true,
        bounceTime: 400
      })
      this.meunScroll.on('scroll',(pos) => {
        this.isShowSendChats = false
      })
    }
  }
}

</script>
<style lang='scss' scoped>
  .bbsDetail{
    height: 100%;
    .fixInput{
      z-index: 999;
      height: 216px;
      width: 100%;
      bottom: 0;
      // background: red;
      background: #f9f9f9;
      position: fixed;
      box-shadow: 2px 2px 10px #d2d2d2;
      .bom{
        margin-top: 25px;
        text-align: left;
        padding: 0 40px;
        img{
          vertical-align: middle;
          height: 40px;
          width: 40px;
        }
      }
      .top{
        height: 125px;
        span{
          display: inline-block;
          margin-top: 60px;
          color: #bebebe;
          font-size: 30px;/*px*/
        }
        input{
          margin-left: 20px;
          padding: 0 50px;
          font-size: 26px;/*px*/
          color: gray;
          background: white;
          float: left;
          // border: none;
          border: 1px solid #d2d2d2;
          width: calc(100% - 150px);
          margin-top: 40px;
          height: 85px;
        }
      }
    }
    .bbsDetail_container{
      height: calc(100% - 95px);
      overflow: hidden;
      padding-bottom:120px;
      p{
        margin-top: 30px;
        color: #313131;
        font-weight: bold;
        font-size: 48px;/*px*/
      }
      .line{
        margin-top: 20px;
        height: 20px;
        background: #f2f2f2;
      }
      .bbsDetail_remark{
        padding: 0 40px;
        .title{
          line-height: 100px;
          font-weight: bold;
          text-align: left;
          color:#1a1a1a;
          font-size: 34px;/*px*/
          border-bottom:1px solid #efefef;/*no*/
        }
      }
      .bbsDetail_body{
        margin-top: 70px;
        padding: 0 40px;
        p{
          line-height: 48px;
          font-weight: 400;
          text-align: left;
          color: #1a1a1a;
          font-size: 30px;/*px*/
        }
      }
      .bbsDetail_title{
        margin-top:50px;
        .bbsDetail_title_img{
          margin-left: 45px;
          float: left;
          height: 75px;
          width: 75px;
          img{
            height: 100%;
            width: 100%;
          }
        }
        .bbsDetail_title_right{
          float: left;
          margin-left: 20px;
          text-align: left;
          .bbsDetail_title_right_top{
            color: #1a1a1a;
            font-size: 30px;/*px*/
            font-weight: bold;
          }
          .bbsDetail_title_right_bom{
            display: inline-block;
            margin-top: 5px;
            color: #b1b1b1;
            font-size: 20px;/*px*/
          }
        }
      }
    }
  }
</style>
