<!--  -->
<template>
  <div class="commRemark">
    <!-- <div class="commRemark_list" v-for="(item,index) in content" :key="index"> -->
    <div class="commRemark_list" :key="index" v-for="(item,index) in 3">
      <div class="commRemark_list_content clearfix">
        <div class="left">
          <img src="../assets/newDapp/聊天-2@2x.png" alt="icon">
        </div>
        <div class="right">
          <div class="name">
            <span>
              推广大使
            </span>
          </div>
          <div class="content">
            <span>
              知道了施主
            </span>
          </div>
          <div class="reply">
            <p class="reply_list" v-for="(item,index) in 2" :key="index">
              <span class="name">大西瓜味儿：</span>
              <span class="content">麻烦你了。了解到了,哈哈哈哈哈哈哈 哈哈哈哈哈</span>
            </p>
            <div class="totalReply">
              <span>共15条回复</span>
            </div>
          </div>
          <div class="support clearfix">
              <span class="time">7-13 18:24</span>
              <span class="number">97</span>
              <!-- <img src="../assets/newDapp/点赞1@2x.png" alt="icon"> -->
              <img class="clickZan" src="../assets/newDapp/点赞2@2x.png" alt="icon">
              <img @click="commentClick" class="apply" src="../assets/newDapp/评论拷贝@2x.png" alt="icon">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { goodReply } from '@/static/apiCnode'
export default {
  data () {
    return {
      getBackDataSupport: '', // 获取点赞接口后台返回的数据
      content: [
        {}
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    // 点赞接口
    getBackPortSupport(){
      var obj = {}
      goodReply(obj)
      .then(res => {
        if(res.statusCode == 200){
          this.getBackDataSupport = res.data
        }
      })
      console.log('点赞')
    },
    // 点击聊天图标
    commentClick(){
      this.$emit("talkClick", true);
    }
  }
}

</script>
<style lang='scss' scoped>
  .commRemark{
    .fixInput{
      height: 80px;
      background: red;
      position: fixed;
    }
    // .commRemark_list{
    // }
    .commRemark_list_content{
      // height: 115px;
      // background: red;
      .left{
        float: left;
        text-align: left;
        height: 100%;
        width: 100px;
        img{
          margin-top: 20px;
          height: 85px;
          width: 85px;
        }
      }
      .right{
        border-bottom:2px solid #f0f0f0;/*no*/
        padding-left: 20px;
        width: calc(100% - 100px);
        // background: yellow;
        float: left;
        .name{
          color: #5c5c5c;
          font-size: 28px;/*px*/
          text-align: left;
          line-height: 70px;
        }
        .content{
          line-height: 28px;
          text-align: left;
          color: #323232;
          font-size: 28px;
        }
        .totalReply{
          height: 60px;
          line-height: 40px;
          margin-top: 20px;
          color:#5380b0;
          font-size: 22px;/*px*/
          text-align: left;
        }
        .reply{
          padding: 0 20px;
          border-radius: 10px;
          margin-top: 20px;
          background: #f6f6f6;
          .reply_list{
            text-align: left;
            font-size: 26px;/*px*/
            .name{
              color: #5380b0;
            }
            .content{
              color: #303030;
            }
          }
        }
        .support{
          padding: 0 20px;
          line-height: 80px;
          font-size: 22px;/*px*/
          .time{
            float: left;
            color: #979797;
          }
          .number{
            float: right;
            color:#fd4557;
          }
          .apply{
            float: right;
            margin-right: 30px;
            margin-top: 15px;
            height: 50px;
            width: 50px;
          }
          .clickZan{
            margin-top: 10px;
            height: 50px;
            width: 50px;
            float: right;
          }
        }
      }
    }
  }
</style>
