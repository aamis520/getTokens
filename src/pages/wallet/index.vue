<!--  -->
<template>
  <div class="wallet">
    <tar-header :isSowBack='true' :title="title" :addAsset="true"></tar-header>
    <!-- <tar-header :isSowBack='true' :title="title"></tar-header> -->
    <div class="walletOuter_container" ref="walletOuter_container">
      <div>
        <div class="wallet_head">
          <div class="wallet_head_top">
            <p>
              <!-- <span class="number">≈{{getRemainMoney.balence | availableFilter2}}</span> <br>
              <span class="remark">总资产（CNY）</span> -->
            </p>
          </div>
          <!-- <div class="wallet_head_bottom">
            <div class="top" @click="popupVisible= true">
                <img src="../../assets/wallet/saoma.png" alt="扫码"> <br>
                <span>钱包地址</span>
            </div>
            <div class="bottom" @click="addAssets">
              <img src="../../assets/wallet/add.png" alt="添加资产"><br>
              <span>添加资产</span>
            </div>
          </div> -->
        </div>
        <div class="wallet_container">
          <div class="wallet_container_inner" @click="goInwalletUrl(item)" v-for="(item, index) in listArr" :key="index">
            <div class="left comm">
              <img src = "../../assets/wallet/utct.png" alt="UTCT" v-if="item.symbol == 'UTCT'">
              <img src = "../../assets/wallet/hkdt.png" alt="UTCT" v-if="item.symbol == 'HKDT'">
              <img src = "../../assets/wallet/sy.png" alt="UTCT" v-if="item.symbol == 'SY'">
              <img src = "../../assets/wallet/eth.png" alt="UTCT" v-if="item.symbol == 'ETH'">
            </div>
            <div class="middle comm">
              <div class="spanContainer">
                <span class="middle_top">{{item.symbol}}</span> <br>
                <!-- <span class="middle_bottom">行情价：{{item.market_price | parseFilter}} CNY</span> -->
              </div>
            </div>
            <div class="right comm">
              <div class="spanContainer">
                <span class="right_top">{{item.available }}</span> <br>
                <!-- <span class="right_bottom">≈ {{item.market_price * item.asset_count | parseFilter}}</span> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      class="codePop"
      position="bottom">
      <div class="codePopContent">
        <p class="title">我的地址</p>
        <p class="address">{{moneyurl}}</p>
        <!-- TODO -->
        <p class="copyBtn"><mt-button type="primary" size="large" v-clipboard:copy="moneyurl"
          v-clipboard:success="onCopy">一键复制</mt-button></p>
        <!-- <p class="tip">*本字符串地址是您的专属接收地址，转账/收款时请注意地址准确性。个人因素导致的转账/收款损失，后果自负。</p>
        <p class="codeImg">
          <img src="http://zd2.dev.zhuandian.net/Adverout/getcode" alt="">
        </p>
        <p class="codeInfo">钱包地址二维码</p> -->
        <div class="closePop" @click="popupVisible=false">
          <img src="../../assets/account/close.png" alt="icon">
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { getAccountInfo } from '@/static/apiJava'
import header from "../../pages/comm/header";
import BScroll from "better-scroll";
import { Toast, Indicator } from "mint-ui";
import {api} from '@/static/api'
export default {
  data() {
    return {
      getRemainMoney: {balence: '0.00'},
      moneyurl: this.$store.getters.address,
      money: '',
      listArr: [],
      getBackList: [],
      getBackListPhp: [],
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      popupVisible: false,
      arr: [{}, {}, {}, {}, {}, {}, {}, {}],
      url: "../../assets/wallet/one.png",
      title: "钱包"
    };
  },
  components: {
    tarHeader: header
  },
  filters: {
    parseFilter: function(data){
      return Number(data).toFixed(2)
    },
    availableFilter2(val){
      let arr = String(val).split('.')
      let str = ''
      if(arr.length > 1){
        str  = arr[1].slice(0,4)
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
    }
  },
  computed: {},

  mounted() {
    // this.getListInfo() // 获取钱包地址
    this.getUserRemain()
    this.getTotalList()
    this.$nextTick(() => {
      this._initScroll();
    });
  },

  methods: {
    getListInfo(){
      var _this = this
      var id = _this.$store.getters.UserId
      getAccountInfo(id)
      .then(res => {
        if (res.statusCode == 200) {
          _this.getBackList = res.data
          var arr = []
          _this.getBackList.forEach(ele => {
            _this.getBackListPhp.forEach(pamas =>{
              if(ele.symbol == pamas.coin_name) {
                arr.push(ele)
              }
            })
          })
          this.listArr = arr
        }
      })
    },
    // 调用接口获取用户余额
    getUserRemain(){
      Indicator.open({
        text: '正在获取钱包总额...',
        spinnerType: 'fading-circle'
      })
      api.accountRemain(this.ApiConf)
      .then(res => {
        if (res.error_code == 1000) {
          Indicator.close()
          this.getRemainMoney = res.data
        } else {
          Indicator.close()
           Toast({
            message: '获取资产失败。', //提示内容分
            duration: 1000 , //持续时间（毫秒），若为 -1 则不会自动关闭
            iconClass: 'mint-toast-icon mintui mintui-field-error'  //icon 图标的类名
          })

        }
      })
      .catch(() => {


      })
    },
    onCopy(){
      console.log('gjkl')
      Toast({
        position: 'top',
        message: '复制成功', //提示内容分
        duration: 1000 //持续时间（毫秒），若为 -1 则不会自动关闭
      })
    },
    // 调用接口 获取资产列表
    getTotalList() {
      var _this = this
      Indicator.open({
        text: '正在努力加载...',
        spinnerType: 'fading-circle'
      })
    var obj = {}
    obj.status = '1'
      api.getUserMoneyList(obj,_this.ApiConf)
      .then(res => {
        if (res.error_code == '1000') {
          Indicator.close()
          _this.getBackListPhp = res.data
          _this.getListInfo()
          // debugger
          // Toast({
          //   message: '获取资产列表成功。', //提示内容分
          //   duration: 1000 , //持续时间（毫秒），若为 -1 则不会自动关闭
          //   iconClass: 'mint-toast-icon mintui mintui-success'  //icon 图标的类名
          // })
        } else {
          Indicator.close()
          Toast({
            message: '获取资产列表失败。', //提示内容分
            duration: 1000 , //持续时间（毫秒），若为 -1 则不会自动关闭
            iconClass: 'mint-toast-icon mintui mintui-field-error'  //icon 图标的类名
          })
        }
        console.log(res)
      })
      .catch(res => {
        Indicator.close()
        Toast({
          message: '获取资产列表失败。', //提示内容分
          duration: 1000 , //持续时间（毫秒），若为 -1 则不会自动关闭
          iconClass: 'mint-toast-icon mintui mintui-field-error'  //icon 图标的类名
        })
      })
    },
    goInwalletUrl(item) {
      console.log(item)
      this.$router.push({
        path: "/walletUrl",
        query: {
          money:item.available,
          bean: item.symbol
        }
      });
    },
    // 添加资产事件
    addAssets() {
      this.$router.push({
        path: "/assetsClassify"
      });
    },
    // better-scroll初始化dom节点
    _initScroll: function() {
      this.meunScroll = new BScroll(this.$refs.walletOuter_container, {
        click: true,
        scrollY: true,
        momentum: true, // 开启滑动惯性
        bounceTime: 200 // 回弹时间
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.wallet {
  // background: yellow;
  height: 100%;
  .walletOuter_container{
    background: #f7f7f7;
    height: calc(100% - 95px);
    overflow: hidden;
  }
  .wallet_head {
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("../../assets/wallet/walletShouye.png");
    width: 100%;
    height: 400px;
    .wallet_head_top {
      height: 100%;
      width: 100%;
      p {
        padding-top: 160px;
        .number {
          font-weight: bold;
          font-size: 66px; /*px*/
          color: black;
        }
        .remark {
          font-size: 18px; /*px*/
          color: black;
        }
      }
      // background: red;
    }
    .wallet_head_bottom {
      height: calc(100% - 260px);
      display: flex;
      .top {
        flex: 1;
        img {
          display: inline-block;
          height: 50px;
          width: 50px;
          margin-bottom: 10px;
          margin-top: 10px;
        }
        span {
          font-size: 21px; /*px*/
          color: black;
        }
      }
      .bottom {
        flex: 1;
        img {
          margin-top: 10px;
          margin-bottom: 10px;
          display: inline-block;
          height: 50px;
          width: 50px;
        }
        span {
          color: black;
          font-size: 21px; /*px*/
        }
      }
    }
  }
  .wallet_container {
    width: 100%;
    // height: calc(100% - 500px);
    background: #f7f7f7;
    // overflow: hidden;
    .wallet_container_inner {
      height: 200px;
      margin: 20px 30px;
      background: white;
      border-radius: 10px;
      display: flex;
      .middle {
        text-align: left;
        flex: 2;
      }
      .right {
        flex: 2;
        .right_top {
          font-size: 30px; /*px*/
          color: black;
          font-weight: bold;
        }
        .right_bottom {
          display: inline-block;
          margin-top: 10px;
          font-size: 22px; /*px*/
          color: #92939b;
        }
      }
      .left {
        flex: 1.5;
        img {
          height: 75px;
          width: 75px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: block;
          // height: 80px;
          // width: 80px;
          // border
        }
      }
      .spanContainer {
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        .middle_top {
          font-weight: bold;
          font-size: 30px; /*px*/
          color: black;
        }
        .middle_bottom {
          display: inline-block;
          margin-top: 10px;
          font-weight: bold;
          font-size: 18px; /*px*/
          color: #92939b;
        }
      }
      .comm {
        position: relative;
      }
    }
  }
  .codePop {
    width: 100%;
    height: 45%;
  }
  .codePop .codePopContent {
    position: relative;
    p {
      color: #1e1e39;
    }
    .title {
      margin-left: 30px;
      font-weight: bold;
      text-align: left;
      font-family: PingFangSC-Regular;
      font-size: 30px; /*px*/
      color: black;
      line-height: 30px;
      letter-spacing: 0.3px;
      margin-top: 120px;
    }
    .address {
      color:#82858b;
      margin-left: 30px;
      text-align: left;
      margin-top: 20px;
      font-family: PingFangSC-Regular;
      font-size: 30px; /*px*/
      letter-spacing: 0.29px;
      // margin: 10px auto;
    }
    .copyBtn {
      height: 100px;
      margin: 80px auto 50px;
      .mint-button {
        display: inline-block;
        height: 79px;
        width: 246px;
        padding: auto 20px;
        font-family: PingFangSC-Regular;
        font-size: 27px; /*px*/
        color: #ffffff;
        letter-spacing: 0.29px;
        text-align: center;
        // padding: 0
        background: #fcd302;
        // background-image: linear-gradient(131deg,  0%, #4c54f9 100%);
        border-radius: 50px;
      }
    }
    .tip {
      line-height: 50px;
      margin-left: 30px;
      font-family: PingFangSC-Regular;
      font-size: 23px; /*px*/
      color: #c7cbd2;
      letter-spacing: 0.21px;
      text-align: left;
    }
    .codeImg {
      background: #d8d8d8;
      border: 1px solid #979797;/*no*/
      width: 200px;
      height: 200px;
      margin: 80px auto 28px auto;
      img{
        height: 100%;
        width: 100%;
      }
    }
    .codeInfo {
      opacity: 0.5;
      font-family: PingFangSC-Medium;
      font-size: 23px; /*px*/
      line-height: 30px;
      color: #82858b;
      letter-spacing: 0.29px;
      text-align: center;
      margin-bottom: 54px;
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
