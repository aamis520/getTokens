<!--  -->
<template>
  <div class="beanKnow">
    <tar-header :title="title"></tar-header>
    <div class="beanKnow_container" ref="beanKnow_container">
      <div>
        <div class="header">
          <div class="header_inner">
            <div class="inner_left">
              <img src="../assets/newDapp/聊天-2@2x.png" alt="icon">
            </div>
            <div class="inner_right">
              <div class="spanCon">
                <span class="right_top">币知道</span><br>
                <span class="right_bottom">数字货币大佬交流基地</span>
              </div>
            </div>
          </div>
          <div class="header_btn" @click="johnArea">
            <p>加入</p>
          </div>
        </div>
        <div class="beanKnow_body">
          <p class="beanKnow_body_title">
            <span class="beanKnow_body_left">
              热门帖子
            </span>
            <span @click="lookMoreChats" class="beanKnow_body_right">
              查看更多
            </span>
          </p>
          <commChats :content="content" :type="type"></commChats>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "../pages/comm/header"
import commChats from "../components/commChats"
import BScroll from 'better-scroll'
import { getArticleListByType, johnArea } from '@/static/apiCnode'

export default {
  data () {
    return {
      content: [],
      title: '社群',
      type: 'hot',
    };
  },

  components: {
    tarHeader: header,
    commChats
  },

  computed: {},

  mounted() {
    this.$nextTick(() => {
      this._initScroll()
    })
    this.getList()
  },
  methods: {
    // 获取hot文章
    getList(){
      getArticleListByType('hot', {pageNo: 1, pageSize: 20}).then(res => {
        console.log(res)
        if(res.statusCode == 200){
          this.content = res.data.rows
        }
      })
    },
    // 加入社区
    johnArea(){
      johnArea('1', this.$store.getters.UserId).then(res => {
        console.log(res)
      })
    },
    // 点击查看更多帖子
    lookMoreChats(){
      this.$router.push({
        path: '/lookMoreChats'
      })
    },
    _initScroll:function () {
      if(!this.$refs.beanKnow_container){
        return
      }
      this.meunScroll = new BScroll(this.$refs.beanKnow_container, {
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
    }
  }
}

</script>
<style lang='scss' scoped>
  .beanKnow{
    height: 100%;
    background: #f6f6f6;
    .beanKnow_container{
      height: calc(100% - 95px);
      padding: 0 20px;
      overflow: hidden;
      .beanKnow_body{
        padding: 0 20px;
        margin-top: 50px;
        .beanKnow_body_title{
          height: 50px;
          line-height: 50px;
          .beanKnow_body_left{
            font-weight: bold;
            color: #1d1d1d;
            font-size: 32px;/*px*/
            float: left;
          }
          .beanKnow_body_right{
            color: #abaaaa;
            font-size: 28px;/*px*/
            float: right;
          }
        }
      }
      .header{
        background: white;
        position: relative;
        box-shadow: 0 0 10px #f4f4f4;
        padding-top: 100px;
        border-radius: 10px;
        margin-top: 20px;
        height: 386px;
        .header_btn{
          border-radius: 0 0 10px 10px;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          color: white;
          height: 90px;
          font-size: 34px;/*px*/
          background: #fdd401;
          p{
            line-height: 90px;
          }
        }
        .header_inner{
          // margin-top: 10px;
          height: 150px;
          display: flex;
          .inner_left{
            // background: burlywood;
            text-align: right;
            flex: 3;
            img{
              margin-top: 12px;
              margin-right: 40px;
              height: 130px;
              width: 130px;
            }
          }
          .inner_right{
            text-align: left;
            // background: yellow;
            position: relative;
            flex: 4;
            .spanCon{
              margin-left: 10px;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              .right_top{
                color: #2c2c2c;
                font-size: 42px;/*px*/
              }
              .right_bottom{
                display: inline-block;
                margin-top: 10px;
                color: #939393;
                font-size: 23px;/*px*/
              }
            }
          }
        }
      }
    }
  }
</style>
