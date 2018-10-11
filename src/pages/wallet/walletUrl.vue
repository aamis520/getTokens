<!--  -->
<template>
  <div class="walletUrl">
    <tar-header :isSowBack='true' :title="title"></tar-header>
    <div class="walletUrl_container">
      <div class="head">
        <p class="head_top">
          <img src = "../../assets/wallet/utct.png" alt="" v-if="$route.query.bean == 'UTCT'">
          <img src = "../../assets/wallet/hkdt.png" alt="" v-if="$route.query.bean == 'HKDT'">
          <img src = "../../assets/wallet/sy.png" alt="" v-if="$route.query.bean == 'SY'">
          <img src = "../../assets/wallet/eth.png" alt="" v-if="$route.query.bean == 'ETH'">
        </p>
        <p class="head_bom">
          <!-- <span v-if="getBackData.coin_name == 'BTC'">{{getBackData.asset_count | availableFilter8}}</span> -->
          <!-- <span v-else>{{getBackData.asset_count | availableFilter6}}</span> -->
          <span>{{money}}</span>
        </p>
      </div>
      <div class="bom">
        <!-- <div>
          四级考了的价格空军航空
        </div> -->
        <div class="bom_top">
          <div>

          </div>
            <!-- <span class="spanOne">行情价（CNY）</span><br>
            <span class="spanTwo">{{ getBackData.market_price}}</span> -->
            <span class="spanTwo">地址：{{getBackAddress.address}}</span>
        </div>
        <div class="bom_bom">
          <button v-clipboard:copy="getBackAddress.address" v-clipboard:success="onCopy">复制</button>
          <!-- <div class="bom_bom_inner"></div>
          <span class="spanOne">合计（CNY）</span><br>
          <span class="spanTwo">{{(getBackData.asset_count * getBackData.market_price) | availableFilter2}}</span> -->
        </div>
      </div>
    </div>
    <div class="wallet_middle">

    </div>
    <div class="wallet_remark">
      <div class="leftBound"></div>
      <p>
        <span>
          交易记录
        </span>
      </p>
    </div>
    <div class="wallet_body_container" ref="wallet_body_container">
      <div>
        <div class="wallet_body" v-if="getBackRemark.length == 0">
          <div class="noRemark">暂无记录</div>
        </div>
        <div class="wallet_body" v-for="(item,index) in getBackRemark" :key="index">
          <!-- <p>
            <span>交易记录</span>
          </p> -->
          <div class="transferAccount">
            <div class="transferAccountList">
              <div class="transferAccountList_container">
                <div class="transferAccountList_left comm">
                  {{item.bizType | numParse}}
                </div>
                <div class="transferAccountList_middle comm">
                  {{item.createTime | timeParse}}
                </div>
                <div class="transferAccountList_right">
                  {{item.amount}}
                </div>
              </div>
              <div class="transferaddress">地址：{{item.address}}</div>
            </div>
            <!-- <div class="transferAccount_top" v-if="false">
              <div class="top comm">
              </div>
              <div class="bom comm">
                <span>暂无记录</span>
              </div>
            </div>
            <div class="transferAccount_bom">
              <p>
                暂无记录
              </p>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="left" @click="transSccounts">
        <span>转账</span>
      </div>
      <div class="right" @click="upwoard">
        <span>收款</span>
      </div>
    </div>
    <mt-popup
     v-model="popupVisible"
      class="codePop"
      position="bottom">
      <div class="codePopContent">
        <p class="title">我的地址</p>
        <p class="address">{{getBackAddress.address}}</p>
        <!-- TODO -->
        <p class="copyBtn"><mt-button type="primary" size="large" v-clipboard:copy="getBackAddress.address"
          v-clipboard:success="onCopy">一键复制</mt-button></p>
        <p class="tip">*本字符串地址是您的专属接收地址，转账/收款时请注意地址准确性。个人因素导致的转账/收款损失，后果自负。</p>
        <div class="codeImg">
          <div id="qrcode"></div>
          <!-- <img src="http://zd2.dev.zhuandian.net/Adverout/getcode" alt=""> -->
        </div>
        <p class="codeInfo">收款码</p>
        <div class="closePop" @click="popupVisible=false">
          <img src="../../assets/account/close.png" alt="icon">
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
// import moment from 'moment';
import BScroll from 'better-scroll'
import { timeParse } from "@/static/common";
import { getMyAddr, getTransferList } from '@/static/apiJava'
import header from "../../pages/comm/header"
import {api} from '@/static/api'
import { Toast } from "mint-ui"
import QRCode from 'qrcodejs2'
// import QRCode from 'qrcode'
// import { QRcode } from 'qrcodejs2'
export default {
  data () {
    return {
      getBackRemark: [], // 交易记录
      getBackAddress: {},
      // bean: '',
      money: '',
      coin_name: '',
      // moneyurl: 'uteriinjknkjncfksdj',
      popupVisible: false,
      getBackData: {},
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      id:'',
      title: '钱包'
    }
  },
  filters: {
    goOrInMoney(data){
      // if()
    },
    timeParse(data){
      if(data) {
        return timeParse(data)
        // var a = new Date(data).toLocaleString();
        // return a
      } else {
        return ''
      }
    },
    numParse: function(data) {
      if(data == '2'){
        return '转出'
      } else if (data == '1'){
        return '转入'
      }
    },
    parseFilter: function(data){
      return parseFloat(Number(data))
    },
    availableFilter2(val){
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
    },
    availableFilter6(val){
      let arr = String(val).split('.')
      let str = ''
      if(arr.length > 1){
        str  = arr[1].slice(0,6)
      }
      console.log(str)
      if(str){
        return arr[0] + '.' + str
      }else{
        return arr[0]
      }
    },
    availableFilter8(val){
      let arr = String(val).split('.')
      let str = ''
      if(arr.length > 1){
        str  = arr[1].slice(0,8)
      }
      console.log(str)
      if(str){
        return arr[0] + '.' + str
      }else{
        return arr[0]
      }
    },
  },
  components: {
    tarHeader: header
  },

  computed: {},

  mounted() {
    this.id = this.$route.query.id
    this.money = this.$route.query.money
    console.log(this.id)
    // this.getWalletDetail()
    this.getAddress() // 获取钱包地址
    this.getTransferDetail() //获取交易记录
  },

  methods: {
    qrcodeone () {
      var _this = this
      var qrcode = new QRCode('qrcode', {
        text: _this.getBackAddress.address,
        width: 100,
        height: 100,
        colorDark: '#000000',
        correctLevel: QRCode.CorrectLevel.H
        // colorLight: '#fdd718'
      })
      console.log(qrcode)
    },
     _initScroll:function () {
      if(!this.$refs.wallet_body_container){
        return
      }
      this.meunScroll = new BScroll(this.$refs.wallet_body_container, {
        pullDownRefresh: {
          threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
          stop: 0 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
        },
        pullUpLoad: {
          threshod: 50,
          stop: 0
        },
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 400 // 回弹时间
      })
    },
    // 获取交易详情列表
    getTransferDetail(){
      var _this = this
      var id = _this.$store.getters.UserId
      var beanName = _this.$route.query.bean
      getTransferList(id, beanName)
      .then(res => {
        if(res.statusCode == 200) {
          _this.getBackRemark = res.data
          _this.getBackRemark.forEach(ele => {
            if(ele.bizType == '1'){
              ele.amount = "+" + ele.amount
            } else if(ele.bizType == '2'){
              ele.amount = "-" + ele.amount
            }
          });
          _this.$nextTick(() => {
            _this._initScroll()
          })
        }
      })
    },
    onCopy(){
      Toast({
        position: 'top',
        message: '复制成功', //提示内容分
        duration: 1000 //持续时间（毫秒），若为 -1 则不会自动关闭
      })
    },
    // 获取钱包地址
    getAddress(){
      var _this = this
      var id = _this.$store.getters.UserId
      var bean =  _this.$route.query.bean
      getMyAddr(id, bean)
      .then(res => {
        if(res.statusCode == 200){
          _this.getBackAddress = res.data
          _this.qrcodeone()
        }
      })
    },
    getMoney(){
      this.popupVisible = true
    },
    // 调用钱包详情接口
    getWalletDetail(){
      var obj = {}
      obj.asset_id = this.id
      api.getWalletDetail(obj, this.ApiConf)
      .then(res => {
        this.getBackData = res.data[0]
        this.coin_name = res.data[0].coin_name
        console.log(res)
      })
      .catch(() => {

      })
    },
    // 点击转账事件
    transSccounts(){
      this.$router.push({
        path: '/rollOut',
        query: {
          coin_name: this.getBackAddress.symbol,
          asset_count: this.money
        }
      })
    },
    upwoard(){
      this.popupVisible = true
      // Toast({
      //   message: '敬请期待...', //提示内容分
      //   duration: 2000 //持续时间（毫秒），若为 -1 则不会自动关闭
      // })
    }
  }
}

</script>
<style lang='scss' scoped>
.walletUrl{
  background: #f6f7f8;
  // padding:0 20px;
  height: 100%;
  .wallet_middle{
    height: 20px;
    background: #f5f5f5;
  }
  .wallet_body_container{
    overflow: hidden;
    height: calc(100% - 800px);
  }
  .wallet_remark{
    text-align: left;
    height: 99px;
    line-height: 99px;
    .leftBound{
      margin-top: 30px;
      margin-left: 50px;
      margin-right: 30px;
      float: left;
      height: 35px;
      width: 7px;
      background: #fdd718;
    }
    p{
      padding-left:55px;
      font-weight: 600;
      margin-top: 10px;
      color: #000;
      font-size: 34px;/*px*/
    }
  }
  .walletUrl_container{
    // background: white;
    height: 460px;
    width: 750px;
    margin: 0 auto;
    margin-top: 19px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('../../assets/change/papererji.png');
    .head{
      // border: 1px solid white;
      padding: 0 45px;
      height: 275px;
      .head_top{
        padding-top: 63px;
        img{
          height: 80px;
          width: 80px;
        }
      }
      .head_bom{
        margin-top: 10px;
        font-size: 48px;/*px*/
        color: black;
        font-weight: bold;
      }
    }
    .bom{
      padding: 0 45px;
      margin-top: 25px;
      display: flex;
      height: calc(100% - 320px);
      .spanOne{
        font-size: 21px;/*px*/
        color:#979ba0;
      }

      .bom_top{
        color: #57576b;
        padding: 0 20px;
        margin-top: -10px;
        word-break: break-all; word-wrap:break-word;

        // white-space:nowrap;
        // text-overflow:ellipsis;
        flex: 1;
        .spanTwo{
          display: inline-block;
          margin-top: 25px;
          font-size: 27px;/*px*/
          color:black;
          height: 75px;
          line-height: 37px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; //（行数）
          -webkit-box-orient: vertical;
          // overflow: hidden;
          // text-overflow:ellipsis;
          // white-space:nowrap;
          // background: red;
          font-weight: blod;
        }
      }
      .bom_bom{
        // border-left: 1px solid #e2e2e1;
        flex: 1;
        button{
          margin-top: 15px;
          color: #000;
          height: 68px;
          width: 180px;
          background: #fdd718;
          border-radius: 45px;
        }
        .bom_bom_inner{
          float: left;
          height: 105px;
          width: 2px;/*no*/
          background: #f5f5f5;
        }
        .spanTwo{
          display: inline-block;
          margin-top: 20px;
          font-size: 27px;/*px*/
          color:black;
          font-weight: blod;
        }
      }
    }
  }
  .wallet_body{
    margin: 42px;
    height: 220px;
    background: white;
    border-radius: 20px;
    margin-top: 10px;
    .noRemark{
      height: 50px;
      line-height: 50px;
      padding-top: 20px;
      text-align: center;
      font-size: 30px;/*px*/
      font-weight: 600;
      color: black;
    }
    p{
      height: 50px;
      font-size: 28px;/*px*/
      color: black;
      font-weight: bold;
      margin-left: 20px;
      margin-top: 20px;
      text-align: left;
    }
    .transferAccount{
      padding: 20px;
      height:calc(100% - 50px);
      border-radius: 20px;
      .transferAccountList{
        // border-bottom:  1px solid #e2e2e1;/*no*/
        margin-top: 20px;
        height: 150px;
        .transferAccountList_container{
          height: 100px;
          display: flex;
          line-height: 100px;
          border-bottom: 1px solid #e2e2e1;/*no*/
          .comm{
            text-align: left;
            color: #000;
            font-size: 30px;/*px*/
          }
          .transferAccountList_right{
            font-weight: bold;
            text-align: right;
            flex: 1;
            color: #000;
            font-size: 30px;/*px*/
          }
          .transferAccountList_left{
            flex: 1;
            font-weight: bold;
          }
          .transferAccountList_middle{
            flex: 3;
            // font-weight: bold;
          }
        }
        .transferaddress{
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          width: 100%;
          // padding: 0 20px;
          margin-top: 20px;
          text-align: left;
          word-break: break-all; word-wrap:break-word;
          // line-height: 60px;
          // margin-top: 20px;
        }
      }
      .transferAccount_top{
        height: 100px;
        padding: 40px;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        .top{
          text-align: left;
        }
        .bom{
          text-align: right;
        }
        .comm{
          font-size: 29px;/*px*/
          color: black;
          font-weight: bold;
          flex: 1;
        }
      }
      .transferAccount_bom{
        border: 1px solid white;
        margin-top: 40px;
        // height: calc(100% - 100px);
        height: 100px;
        // background: red;
        p{
          border: 1px solid white;
          margin-top: 40px;
          text-align: center;
          height: 40px;
          text-indent: 10px;
          padding: 20px;
          line-height: 40px;
          color:#9b9a9a;
          font-size: 20px;/*px*/
        }

      }
    }
  }
  .footer{
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 85px;
    display: flex;
    .left{
      background: #44bc64;
      flex: 1;
      text-align: center;
      span{
        font-size: 28px;/*px*/
        color: white;
        line-height: 85px;
      }
    }
    .right{
      background: #fcd302;
      flex: 1;
      text-align: center;
      span{
        font-size: 28px;/*px*/
        color: white;
        line-height: 85px;
      }
    }
  }
   .codePop {
    width: 100%;
    height: 80%;
  }
  .codePop .codePopContent {
    margin-top: 120px;
    padding: 0 30px;
    // background: red;
    position: relative;
    p {
      color: #1e1e39;
    }
    .title {
      // height: 100px;
      // background: yellow;
      margin-left: 30px;
      font-weight: bold;
      text-align: left;
      font-family: PingFangSC-Regular;
      font-size: 26px; /*px*/
      color: black;
      line-height: 30px;
      letter-spacing: 0.3px;
      // margin-top: 120px;
    }
    .address {
      padding: 0 30px;
      height: 60px;
      color:#82858b;
      text-align: left;
      margin-top: 20px;
      word-wrap: break-word;
      font-size: 30px; /*px*/
      letter-spacing: 0.29px;
      // margin: 10px auto;
    }
    .copyBtn {
      height: 100px;
      margin: 30px auto 20px;
      .mint-button {
        display: inline-block;
        height: 79px;
        width: 246px;
        padding: auto 20px;
        font-family: PingFangSC-Regular;
        font-size: 27px; /*px*/
        color: #fff;
        letter-spacing: 0.29px;
        text-align: center;
        background: #fcd302;
        border-radius: 50px;
      }
    }
    .tip {
      padding: 0 30px;
      height: 150px;
      // background: yellowgreen;
      line-height: 50px;
      font-size: 20px; /*px*/
      color: #c7cbd2;
      letter-spacing: 4px;
      text-align: left;
    }
    .codeImg {
      border-top: 1px solid #e2e2e1;/*no*/
      height: 250px;
      margin: 10px auto 28px auto;
      text-align: center;
      #qrcode{
        width: 100px;/*no*/
        margin: 0 auto;
        margin-top: 50px;
      }
      img{
        margin-top: 70px;
        height: 250px;
        width: 250px;
      }
    }
    .codeInfo {
      // opacity: 0.5;
      font-family: PingFangSC-Medium;
      font-size: 20px; /*px*/
      line-height: 30px;
      color: #82858b;
      letter-spacing: 0.29px;
      text-align: center;
    }
    .closePop {
      position: absolute;
      width: 50px;
      height: 50px;
      right: 20px;
      top: -100px;
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
