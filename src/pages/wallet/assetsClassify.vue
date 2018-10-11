<!--  -->
<template>
  <div class="assetsClassify">
    <tar-header :isSowBack='true' :title="title"></tar-header>
    <div class="box">
        <div class="list" v-for="(item,index) in getBackData" :key="index">
          <div class="list-item">
            <p class="img">
              <img src = "../../assets/wallet/utct.png" alt="UTCT" v-if="item.coin_name == 'UTCT'">
              <img src = "../../assets/wallet/hkdt.png" alt="UTCT" v-if="item.coin_name == 'HKDT'">
              <img src = "../../assets/wallet/sy.png" alt="UTCT" v-if="item.coin_name == 'SY'">
              <img src = "../../assets/wallet/eth.png" alt="UTCT" v-if="item.coin_name == 'ETH'">
              <!-- <img  :src="item.coin_img" alt="币种图标">
              <img  :src="item.coin_img" alt="币种图标">
              <img  :src="item.coin_img" alt="币种图标">
              <img  :src="item.coin_img" alt="币种图标"> -->
              <!-- <img v-else src="~@/assets/images/HKDT.png" alt=""> -->
            </p>
            <div>
              <p class="coin">
                <span>{{item.coin_name}}</span>
              </p>
              <!-- <p class="price">行情价格:{{item.market_price}}</p> -->
            </div>
            <p class="switch">
              <mt-switch v-model="item.statusSelf" @change="change(item)"></mt-switch>
            </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "../../pages/comm/header";
import {api} from '@/static/api'
import { Toast, Indicator } from "mint-ui";

export default {
  data() {
    return {
      status: false,
      getBackData: [],
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      title: "资产种类",
      data: [{}, {}, {}, {}, {}]
    };
  },

  components: {
    tarHeader: header
  },

  computed: {},

  mounted() {
   this.getBeanClassify()
  },

  methods: {
    // 获取资产种类列表
    getBeanClassify(){
      Indicator.open({
        text: '正在努力加载...',
        spinnerType: 'fading-circle'
      })
      var obj = {}
      obj.status = '0'
      api.getUserMoneyClass(this.ApiConf)
      .then(res => {
        if (res.error_code == '1000'){
          Indicator.close()
          res.data.forEach(ele => {
            if (String(ele.status) == '1') {
              ele.statusSelf = true
            } else if (String(ele.status) == '0'){
              ele.statusSelf = false
            }
          });
          this.getBackData = res.data
          // Toast({
          //   message: '获取资产分类成功。', //提示内容分
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
      })
      .catch(() => {

      })
    },
    // 开关调用接口
    getSwitchPort(data) {
      api.accountSwitch(data,this.ApiConf)
      .then(res => {
        console.log(res)
      })
      .catch(() => {

      })
    },
    // 切换按钮事件
    change(item) {
      console.log(item)
        //  "status":1, //TRUE/FALSE 是否查询用户关闭的资金
        // "asset":1, //开关余额的ID
      var obj = {
        coin: item.coin_id,
        status: ''
      }
      if (item.status == '0') {
        obj.status = '1'
      } else if(item.status == '1'){
        obj.status = '0'
      }
      this.getSwitchPort(obj)
    }
  }
};
</script>
<style lang='scss' scoped>
.assetsClassify{
  height: 100%;
  background: white;
}
.list {

  height: 160px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f4f4f4;/*no*/
  padding-bottom: 20px;
  .list-item {
    padding-top: 30px;
    width: 90%;
    margin: 0 auto;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    div {
      flex: 1;
      .coin {
        text-align: left;
        font-size: 30px;/*px*/
        color: black;
        font-weight: bold;
        letter-spacing: 0.29px;
      }
      .price {
        margin-top: 10px;
        text-align: left;
        font-size: 12px;/*no*/
        color: #9b9b9b;
        letter-spacing: 0.25px;
      }
    }
    .img {
      text-align: center;
      width: 90px;
      height: 90px;
      margin-right: 10px;
      position: relative;
      // margin: auto 10px;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 75px;
        width: 75px;
        display: block;
        // width: 100%;
      }
    }
    .switch {
      padding-left: 50px;
    }
  }
}
.box {
  margin: 30px 50px;
}
</style>
