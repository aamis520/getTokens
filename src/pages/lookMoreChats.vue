<!--  -->
<template>
  <div class="lookMoreChats">
    <tar-header :title="title"></tar-header>
    <div class="looMoreChats_container">
      <div class="lookMore_tabbar">
        <div :class="classA ? 'class-a' : 'class-b' " class="lookMore_tabbar_left comm" @click="getHot">
          <span>
            最热
          </span>
        </div>
        <div :class="classA ? 'class-b' : 'class-a' " class="lookMore_tabbar_right comm" @click="getNew">
          <div class="partingLine"></div>
          <span>
            最新
          </span>
        </div>
      </div>
      <div class="looMoreChats_line"></div>
      <div class="looMoreChats_body" v-show="classA">
        <commChats :content="content"></commChats>
      </div>
      <div class="looMoreChats_body" v-show="!classA">
        <commChats :content="contentNew"></commChats>
      </div>
    </div>
  </div>
</template>

<script>
import header from "../pages/comm/header";
import commChats from "../components/commChats"
export default {
  data() {
    return {
      classA: true,
      title: "全部帖子",
      content: [
        {title: '交易平台已上线BCH和LTC',name: '小妖精', message: 133, icon: '', time: '10分钟前'},
        {title: '交易平台已上线BCH和LTC',name: '小妖精', message: 133, icon: '', time: '10分钟前'},
        {title: '交易平台已上线BCH和LTC',name: '小妖精', message: 133, icon: '', time: '10分钟前'},
        {title: '交易平台已上线BCH和LTC',name: '小妖精', message: 133, icon: '', time: '10分钟前'},
        {title: '交易平台已上线BCH和LTC',name: '小妖精', message: 133, icon: '', time: '10分钟前'},
        {title: '交易平台已上线BCH和LTC',name: '小妖精', message: 133, icon: '', time: '10分钟前'}
      ],
      contentNew: [
        {title: '交易平台已上线BCH和LTC',name: '小妖精', message: 133, icon: '', time: '10分钟前'},
        {title: '你对区块链生态怎么看？',name: '小妖精', message: 133, icon: '', time: '10分钟前'},
        {title: '币特币再创新低度，你怎么看？',name: '小妖精', message: 133, icon: '', time: '10分钟前'},
        {title: '[涨知识]如何成为加密货币的中心？',name: '小妖精', message: 133, icon: '', time: '10分钟前'},
        {title: '[涨知识]如何成为加密货币的中心？',name: '小妖精', message: 133, icon: '', time: '10分钟前'}
      ]
    };
  },

  components: {
    tarHeader: header,
    commChats
  },

  computed: {},

  mounted() {},

  methods: {
    getHot(){
      this.classA = true
    },
    getNew(){
      this.classA = false
    }
  }
};
</script>
<style lang='scss' scoped>
.lookMoreChats {
  height: 100%;
  .looMoreChats_container {
    background: white;
    height: calc(100% - 95px);
    .looMoreChats_body{
      padding: 20px 40px 0;
      background: white;
    }
    .looMoreChats_line{
      height: 20px;
      background: #f2f2f2;
    }
    .lookMore_tabbar {
      margin-bottom: 20px;
      background: white;
      // margin-top: 10px;
      height: 100px;
      display: flex;
      // width: 100%;
      .comm {
        line-height: 100px;
        text-align: center;
        flex: 1;
        font-size: 32px; /*px*/
      }
      .lookMore_tabbar_right {
        .partingLine {
          float: left;
          height: 60px;
          margin-top: 20px;
          width: 2px;
          background: #f2f2f2;
        }
      }
      .class-a {
        color: #fdd718;
        border-bottom: 1px solid #fdd718; /*no*/
      }
      .class-b {
      }
    }
  }
}
</style>
