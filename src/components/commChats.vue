<!--  -->
<template>
  <div class="commChats">
    <div class="commChats_container">
      <div @click="gobbsDetail(item)" class="commChats" v-for="(item,index) in content" :key="index">
        <p class="commChats_title">
          <span>{{item.title}}</span>
        </p>
        <div class="commChats_content">
          <div class="commChats_content_left">
            <span class="name">{{item.name}}</span>
            <span class="number">{{item.message}}</span>
          </div>
          <div class="commChats_content_right">
            <span>{{changeTime(item.createTime)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
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
      // content: [
        // {title: '交易平台已上线BCH和LTC',name: '小妖精', message: 133, icon: '', time: '10分钟前'}
      // ]
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    gobbsDetail(item){
      this.$router.push({
        path: '/bbsDetail',
        query: {
          articleId: item.articleId
        }
      })
    }
  }
}

</script>
<style lang='scss' scoped>
  .commChats_container{
    .commChats{
      padding-top: 20px;
      height: 150px;
      border-bottom: 1px solid #e7e7e7;/*no*/
      // background: red;
      .commChats_title{
        margin-top: 12px;
        text-align: left;
        color: #262626;
        font-size: 30px;/*px*/
      }
      .commChats_content{
        margin-top: 20px;
        display: flex;
        .commChats_content_left{
          text-align: left;
          flex: 1;
          .name{
            color:#b1b1b1;
            font-size: 22px;/*px*/
          }
         .number{
            font-size: 20px;/*px*/
            color:#b1b1b1;
         }
        }
        .commChats_content_right{
          color: #b1b1b1;
          font-size: 20px;/*px*/
          text-align: right;
          flex: 1;
        }
      }
    }
  }
</style>
