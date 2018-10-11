<!--  -->
<template>
  <div class="lateUse">
    <tar-header :title="title"></tar-header>
    <dappcomm :content="content"></dappcomm>
  </div>

</template>

<script>
import dappcomm from "../components/dappcomm"
import header from "../pages/comm/header"
export default {
  data () {
    return {
      title: '最近使用',
       content: [
        {imgurl: require('../assets/newDapp/行情@2x.png'),title: '市场行情', detail: '查看数字行情实时的应用'},
        {imgurl: require('../assets/newDapp/购物车拷贝@2x.png'),title: '货币商城', detail: '用数字货币购买商品的应用'},
        {imgurl: require('../assets/newDapp/猜硬币52@2x.png'),title: '区块链预言家', detail: '业内趋势了解一下吗'},
        {imgurl: require('../assets/newDapp/聊天-2@2x.png'),title: '币知道', detail: '数字货币大佬交流基地'}
      ]
    };
  },

  components: {
    tarHeader: header,
    dappcomm
  },

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='scss' scoped>
  .lateUse{
    height: 100%;
  }

</style>
