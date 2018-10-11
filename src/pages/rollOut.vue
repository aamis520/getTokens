<template>
  <div class="rollOut">
    <tar-header :isSowBack='true' :title="title"></tar-header>
    <div class="rollOut_container">
      <!-- 余额 -->
      <p class="balence">
        <span>钱包余额: {{asset_count}} {{numMoney}}</span>
      </p>
      <div class="address_container">
        <p class="address">
          <span>地址</span>
        </p>
        <input v-model="form.address" class="address_input" type="text" placeholder="请输入收款地址">
      </div>
      <div class="address_container">
        <p class="address">
          <span>数量</span>
        </p>
        <input type="number" @keyup="getFee" v-model="form.amount" class="address_input" :placeholder="limitLowerMoney">
      </div>
      <div class="transfer_money">
        <p>传输费：{{rollFee}} {{numMoney}}</p>
      </div>
      <div class="transfer_money">
        <p>实际到账：{{toAccount}} {{numMoney}}</p>
      </div>
      <div class="btn_put" @click="saveTrans">
        <span>确认转出</span>
      </div>
    </div>
  </div>
</template>
<script>
import header from "../pages/comm/header"
// import assetsHeader from './header'
import { getTransferFee, getTransferCode, transferByUser, getLowerPrice } from '@/static/apiJava'
// import { getTransferFee, getTransferCode } from '../static/apiJava'
import { Toast } from 'mint-ui';
export default {
  components: {
    tarHeader: header
    // assetsHeader
  },
  filters: {
    availableFilter(val){
      let arr = String(val).split('.')
      let str = ''
      if(arr.length > 1){
        str  = arr[1].slice(0,2)
      }
      console.log(str)
      if(str){
        return arr[0] + '.' + str
      }else{
        return arr[0]
      }
    }
  },
  data () {
    return {
      limitLowerMoney: '请输入转账数量',
      lowlimit: '', //
      toAccount: 0, // 到账数量
      rollFee: 0, // 传输费
      numMoney: '', // 币种
      title: '转出HKDT',
      backTitle: '我的資產',
      assetsInfo: {
        available: 0
      },
      addressValid: false,
      form:{
        userId: this.$store.getters.UserId, //用户id
        symbol: this.$route.query.coin_name,
        address: '', // 地址
        amount: ''// 转账数量
      },
      rollFee: 0
    }
  },
  created () {
    this.numMoney = this.$route.query.coin_name
    this.asset_count = this.$route.query.asset_count
    this.title = '转出' + this.$route.query.coin_name
    this.getLowerMoney()
    // if(this.$store.getters.getUserInfo.userStatus == '1'){
    //   this.$toast({
    //     message: '請進行實名認證',
    //     duration: 1000
    //   })
    //   this.$router.push({
    //     path: '/idIndentify',
    //     query: {
    //       from :'exchange'
    //     }
    //   })
    //   return
    // }
    // this.getInfo()
    // let query = this.$router.currentRoute.query
    // if(query.available){
    //   this.assetsInfo.available = query.available
    // }
  },
  methods: {
    getLowerMoney(){
      var _this = this
      var coin_name = _this.$route.query.coin_name
      getLowerPrice(coin_name)
      .then(res => {
        if(res.statusCode == 200){
          _this.lowlimit = res.data.lowLimit
          // debugger
          _this.limitLowerMoney = _this.limitLowerMoney + ' ' + '(≥' + ' ' +  Number(res.data.lowLimit) + ')'
        }
      })
    },
    // 确认转出
    saveTrans(){
      if(!this.form.address){
        Toast({
          message: '请输入转账地址',
          duration: 1000
        })
        return
      }
      if (!this.form.amount){
        Toast({
          message: '请输入转账数量',
          duration: 1000
        })
        return
      }
      if(Number(this.form.amount) < Number(this.lowlimit)){
        Toast({
          message: '转账数量不小于'+ Number(this.lowlimit),
          duration: 1000
        })
        this.form.amount = ''
        return
      }
      transferByUser(this.form)
      .then(res => {
        if(res.statusCode == 200) {
          Toast({
            message: '转账成功',
            duration: 1000 ,
            iconClass: 'mint-toast-icon mintui mintui-success'
          })
          this.$router.push({
            path: '/homeWallet'
          })
        }
      })
    },
    getFee(){
      this.rollFee = 0
      if(this.form.amount != "" && this.form.address != ''){
        getTransferFee(this.numMoney,this.form.address).then(res => {
          // TODO
          if(res.statusCode == 200){
            let data = res.data
            this.rollFee = data
            this.addressValid = true
            this.toAccount = Number(this.form.amount) - Number(data)
          }
        }).catch(err => {
          this.addressValid = false
          this.$toast({
            message: err.msg,
            duration: 1000
          })
        })
      }
    },
    getInfo(){
      // api.balance().then(res => {
      //   this.assetsInfo = res.data
      // })
    },
    submit(){
      if(this.form.amount < 500){
        this.$toast({
          message: '轉賬額度不能低於500',
          duration: 1000
        })
        return
      }
      if(this.addressValid == false){
        this.$toast({
          message: '请输入正确的转账地址',
          duration: 1000
        })
        return
      }
      if(this.form.account > this.assetsInfo.available){
        this.$toast({
          message: '餘額不足',
          duration: 1000
        })
        return
      }
      if(this.form.address != "" && this.form.amount != ""){
        let data = {}
        data.address = this.form.address
        data.amount = this.form.amount
        data.num = this.rollFee
        let userInfo = this.$store.getters.getUserInfo
        data.userId = userInfo.userId
        data.mobile = userInfo.userMobile
        getTransferCode(data).then(res => {
          console.log(res)
          if(res.statusCode == 200){
            // TODO
            this.$toast({
              message: '發送驗證碼成功',
              duration: 1000
            })
            this.$router.push({
              path: '/assets/rollOutYzm',
              query:data
            })
            }
        }).catch(err => {
          this.$toast({
            message: err.msg,
            duration: 1000
          })
        })

      }
    },
    scan(){

      // Toast( '功能暫未開放')
    }
  }
}
</script>
<style lang="scss" scoped>
.rollOut{
  height: 100%;
  .rollOut_container{
    padding: 30px;
    height: calc(100% - 95px);
    // background: yellow;
    .balence{
      text-align: left;
      font-weight: bold;
      span{
        color: #000;
        font-size: 28px;/*px*/
      }
    }
    .address_container{
      // background: red;
      border-bottom: 1px solid #e2e2e1;
      height: 130px;
      // border-bottom: 1px solid red;
      margin-top: 50px;
      color: #000;
      font-size: 28px;/*px*/
      text-align: left;
      .address_input{
        padding: 0 30px;
        margin-top: 20px;
        height: 50px;
        width: 100%;
        // background: red;
        border: none
      }
    }
    .transfer_money{
      margin-top: 50px;
      text-align: left;
      p{
        color: #000;
        font-size: 28px;/*px*/
      }
    }
    .btn_put {
      margin-top: 200px;
      height: 80px;
      border-radius: 45px;
      background: -webkit-linear-gradient(
        left,
        #ffae00,
        #fdee01
      ); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(
        right,
        #ffae00,
        #fdee01
      ); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(
        right,
        #ffae00,
        #fdee01
      ); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #ffae00, #fdee01); /* 标准的语法 */
      span{
        line-height: 80px;
        color: white;
        font-size: 32px;
      }
    }
  }
}
</style>


