<!--  -->
<template>
  <div class="market">
    <tar-header :title="title"></tar-header>
    <div class="tabBar">
      <div :class="classA ? 'class-a' : 'class-b' ">
        <p @click="goToHangqing">行情</p>
      </div>
      <div :class="classA ? 'class-b' : 'class-a' ">
        <p @click="goToFastInfo">快讯</p>
      </div>
    </div>
    <div class="middle"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import header from "../comm/header";
import {api} from '@/static/api'

export default {
  data () {
    return {
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },

      classA: true,
      backUrl:'/Dapp',
      classBorder: true,
      title: '市场'
    }
  },
  watch: {
    "$route": function(){
      var currentRoute = this.$router.currentRoute.path
      var strArr = currentRoute.split('/')
      if (strArr.includes('hangqing')) {
        this.classA = true
        console.log('1')
      } else if (strArr.includes('fastInfo')) {
        this.classA = false
        console.log('2')
      }
    }
  },
  components: {
    tarHeader: header
  },
  computed: {},

  mounted() {
    // console.log(this.$route.query.status)
    // if(this.$route.query.status == '4') {
    //   this.classA = false
    // }
    var currentRoute = this.$router.currentRoute.path
    var strArr = currentRoute.split('/')
    if (strArr.includes('hangqing')) {
      this.classA = true
      console.log('1')
    } else if (strArr.includes('fastInfo')) {
      this.classA = false
      console.log('2')
    }
    // this.lookMarket()
  },

  methods: {
    goToHangqing(){
      this.$router.push({
        path: '/market/hangqing'
      })
      this.classA = true
    },
    goToFastInfo(){
      this.$router.push({
        path: '/market/fastInfo'
      })
      this.classA = false
    },


    // switchChange(data){
    //   this.classBorder = !this.classBorder
    // }
  }
}

</script>
<style lang="scss" scoped>
  .market{
    height:100%;
    .middle{
      height: 15px;
      background: #f9f9f9;
    }
  }
  .market .router-link-active{
    color: #fdd401;
    padding-bottom: 25px;
  }
  .market .tabBar{
    font-size: 30px;/*px*/
    height:70px;
    display: flex;
    font-weight: 500;
  }
  .class-a{
    color: #fdd401;
    border-bottom: 4px solid #fdd401;
  }
  .class-b{
    border-bottom:none;
  }
  .tabBar div{
    line-height: 70px;
    height:100%;
    text-align: center;
    flex: 1;
  }
</style>
