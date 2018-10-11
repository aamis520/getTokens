<!--  -->
<template>
  <div class="gameDetail">
    <tar-header :title="title" :backUrl="'/Dapp'"></tar-header>
    <div class="gameContent">
      <h2 class="headTitle">游戏</h2>
      <div class="bannerPic">
        <img style="height:100%;width:100%;" src="../../assets/gameDetail/733819173408224861.png" alt="游戏">
      </div>
      <div class="contentBody">
        <div class="contentBodyList" v-for="(item,index) in gameList" :key="index">
          <div class="gameIcon">
            <div class="imgContainer">
              <img :src="item.imgUrl" alt="图片">
              <!-- <img src= "../../assets/gameDetail/21.png" alt="图片" v-if="index == '1'"> -->
              <!-- <img src= "../../assets/gameDetail/xiaoxiao.png" alt="图片" v-if="index == '1'"> -->
            </div>
            <div class="leftSpan">
              <span class="nameSpan">{{item.name}}</span><br>
              <span class="varietySpan">{{item.gameVariety}}</span>
            </div>
          </div>
          <div class="gameBtn">
            <button class="goin" @click="goGame(index)">进入</button>
            <button class="goin"  v-if="index == '1'" @click="exchange(item)">兑换</button>
          </div>

        </div>
      </div>
    </div>
    <transition name="fade" v-if="exchangeCoin">
      <div class="exhange_bg" ></div>
    </transition>
    <transition name="fade" v-if="exchangeCoin">
      <div class="exchange_box">
        <div class="exchange_con">
          <p class="title">
            <span>筹码兑换</span>
            <i class="close" @click="closeExchange">
              <img src="@/assets/gameDetail/closeBg.png" alt="">
            </i>
          </p>
          <div class="exchange_body">
            <div class="exchange_input">
              <div class="exchange_utct">
                {{exchangeCount}}
                <input class="exchange_count" type="bumber" v-model="exchangeCount">
              </div>
              <span>UTCT</span>
              <img src="@/assets/gameDetail/exchange.png" alt="">
              <div class="exchange_utct">{{exchangeCount*10}}</div>
              <span>筹码</span>
            </div>
            <div class="exchange-desc">
              <p class="left">可用：{{available}} UTCT</p>
              <p class="right">*1UTCT/10个筹码</p>
            </div>
            <p class="exchange_all">合计：{{exchangeCount*10}}个筹码</p>
            <div class="exchange_btn">
              <button @click="confirmExchange">确定</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import header from "../comm/header"
import {api} from '@/static/api'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      urlBack: '/Dapp',
      getInfoStatus: false,
      backUrl:'/Dapp',
      title: "首页",
      getBackData: '',
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      gameList: [
        {gameVariety: '竞技游戏',name: '海盗旋转', imgUrl: require('@/assets/gameDetail/pirates.png'),
        gameUrl: 'http://g2.zhuandian.net/index.html?msg=aW50ZWdyYWwvMTEw'},
        {gameVariety: '棋牌游戏',name: '视频扑克', imgUrl: require('@/assets/gameDetail/WechatIMG3.png'), gameUrl: 'http://g2.zhuandian.net/dzpk/index.htm'}
        // {gameVariety: '益智游戏',name: 'SPIKES AHEAD', imgUrl: '../../assets/gameDetail/xiaoxiao.png'}
      ],
      exchangeCount: '',
      available: '',
      exchangeCoin: false,
      exchangeItem: {}
    };
  },

  components: {
    tarHeader: header
  },

  computed: {},

  mounted() {
    this.getBackPort()
  },

  methods: {
    checkBean(){
      api.selectBean({}, this.ApiConf)
      .then(res => {
        res.data.forEach(ele => {
          ele.name = ele.coin_name
          ele.method = this.gateIo
        });
        console.log(res.data)
        let data = res.data
        for(let i=0;i<data.length;i++){
          if(data[i].symbol == 'UTCT'){
            this.available = data[i].available
          }
        }
      })
      .catch(() => {


      })
    },
    // 游戏接口
    getBackPort(){
      api.getameInfo(this.ApiConf)
      .then(res => {
        this.getInfoStatus = true
        this.getBackData = res.data
      })
      .catch(() => {

      })
    },
    goGame(index){
      console.log(index)
      if (this.getInfoStatus){
        if (index == 0){
          window.location.href = 'http://g2.zhuandian.net/index.html?msg=aW50ZWdyYWwvMTEw' + this.getBackData
        } else if(index == 1){
          window.location.href = this.gameList[index].gameUrl + '?msg=aW50ZWdyYWwvMTEw' + this.getBackData
        }else{
          Toast("敬请期待")
        }
      } else {
        Toast('获取游戏失败')
      }
    },
    exchange(item){
      // 兑换
      this.exchangeItem = item
      this.exchangeCoin = true
      console.dir(item)
      this.checkBean()

    },
    closeExchange(){
      this.exchangeCount = ''
      this.exchangeItem = {}
      this.exchangeCoin = false
    },
    confirmExchange(){
      api.gameExchange({currencyAmount: this.exchangeCount}).then(res => {
        console.log(res)
        if(res.error_code == 1000){
          this.closeExchange()
          this.$toast({
            message: res.error_desc,
            duration: 1000
          })
        }else{
          this.exchangeCount = ''
          this.$toast({
            message: res.error_desc,
            duration: 1000
          })
        }
      }).catch(err => {
        this.exchangeCount = ''
        this.$toast({
          message: err.error_desc,
          duration: 1000
        })
      })
    }

  }
};
</script>
<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
  .gameDetail{
    height:100%;
    position: relative;
    .exhange_bg{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0,0,0,.8);
      z-index: 10;
      transition: all 0.5s;
    }
    .exchange_box{
      position: absolute;
      transition: all 0.5s;
      background: #fff;
      border-radius: 25px;
      box-shadow: 0 0 3px #333;
      overflow: hidden;
      width: 80%;
      height: 600px;
      top: 0 ;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      z-index: 11;
      .exchange_con{
        width: 100%;
        height: 100%;
        .title{
          position: relative;
          font-weight: bold;
          font-size: 30px;/*px*/
          line-height: 1;
          padding: 40px 0;
          box-sizing: border-box;
          width: 100%;
          letter-spacing: 1px;/*no*/
          border-bottom: 1px solid #f1f1f1;/*no*/
          color: #000;
          text-align: center;
          margin-bottom: 50px;
          .close{
            display: block;
            position: absolute;
            width: 30px;
            height: 30px;
            top: 40px;
            right: 40px;
            img{
              display: block;
              width: 100%;
            }
          }
        }
        .exchange_body{
          width: 88%;
          margin: 0 auto;
        }
        .exchange_all{
          text-align: center;
          font-size: 28px;
          line-height: 1;
          padding: 50px 0;
          font-weight: bold;
          letter-spacing: 1px;
          color: #151515;
          border-bottom: 1px solid #eeeeee;
        }
        .exchange-desc{
          display: flex;
          justify-content: center;
          align-items: center;
          p{
            flex: 1;
            font-size: 22px;/*px*/
            line-height: 1;
            text-align: left;
            color: #b1b1b1;
            padding-top: 40px;
          }
          .right{
            color: #ec7676;
            text-align: right;
          }
        }
        .exchange_input{
          display: flex;
          justify-content: center;
          align-items: center;
          div{
            flex: 1;
          }
          img{
            width: 28px;
            margin: 0 40px;
          }
          span{
            color: #808080;
            font-size: 26px;
          }
          .exchange_utct{
            width: 150px;
            height: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0 5px;
            line-height: 80px;
            font-size: 28px;
            color: #000;
            background: #f9f9f9;
            text-align: center;
            position: relative;
            border: 1px solid #c6c6c6; /*px*/
            border-radius: 8px;
            margin-right: 24px;
            .exchange_count{
              position: absolute;
              width: 100%;
              height: 100%;
              left: 0;
              top: 0;
              opacity: 0;
            }
          }
        }
        .exchange_btn{
          width: 100%;
          margin: 40px 0;
          border-radius: 10px;
          overflow: hidden;
          button{
            border: none;
            display: block;
            width: 100%;
            height: 88px;
            line-height: 88px;
            text-align: center;
            font-size: 32px;
            color: #fff;
            background: #fdd401;
          }
        }
      }
    }
  }
  .gameDetail .headTitle{
    padding: 15px 0 ;
    font-weight: bold;
    font-size: 36px;
    text-align: left;
  }
  .gameDetail .contentBody .contentBodyList{
    display: flex;
    height:185px;
    border-bottom: 1px solid #e7e8ea;/*no*/
  }
  .gameDetail .contentBody .contentBodyList .gameIcon{
    flex: 3;
  }
  .gameIcon .imgContainer{
    margin-top: 35px;
    float: left;
    height:105px;
    width:105px;
    /* border: 1px solid red; */
    border-radius: 20px;
  }
  .gameIcon .leftSpan{
    margin-left:20px;
    margin-top: 55px;
    float: left;
    vertical-align: middle;
  }
  .gameIcon .nameSpan{
    font-size:26px;
    color:#000000;
    font-weight: 500;
  }
  .gameIcon .varietySpan{
    font-size:20px;
    color:#8c8c91;
  }
  .imgContainer img{
    height:100%;
    width:100%;
  }
  .gameDetail .contentBody .contentBodyList .gameBtn{
    flex: 2;
  }
  .gameBtn .goin{
    -webkit-transform: translateY(-45px);
    -moz-transform:translateY(-45px);
    transform: translateY(-45px);
    margin-top: 50%;
    color: #fddc2f;
    background: white;
    border-radius: 50px;
    border: 1px solid #fddc2f;/*no*/
    text-align: center;
    height:45px;
    width: 115px;
    float: right;
    margin-right: 15px;
  }
  .gameDetail .gameContent{
    height:calc(100% - 250px);
    overflow-y: scroll;
    padding: 32px;
  }
  .gameDetail .gameContent .bannerPic{
    height:340px;
  }
</style>
