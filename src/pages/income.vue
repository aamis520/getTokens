<!--  -->
<template>
  <div class="income">
    <tar-header :title="title"></tar-header>
    <div class="income_container" ref="income">
      <div class="friendRequestBg" v-if="isSowBack">
        <img src="../assets/empty.png" alt="背景图">
        <p>暂无记录</p>
      </div>
      <div>
        <div class="income_remark" v-for="(item,index) in getBackdata" :key="index">
          <div class="income_remark_left">
            <span class="income_remark_left_top">{{item.asset_log_desc}}</span><br>
            <span class="income_remark_left_bottom">上链成功</span>
          </div>
          <div class="income_remark_right">
            <span class="income_remark_right_top">{{item.asset_log_money}} {{item.coin_id}}</span><br>
            <span class="income_remark_right_bottom">{{item.asset_log_addtime}}</span>
          </div>
        </div>
        <div class="uploadingMore" v-if="upPullStatus">
          <img v-if="isLoading" class="loadingPic" src="../assets/account/loading.gif" alt="loading">
          <!-- <span v-if="isLoading" class="loadingspan">努力加载中...</span> -->
          <p v-if="!isLoading && getBackdata.length > 0">{{downLoadingSpan}}</p>
        </div>
      </div>
      <!-- <div class="moreBnottom" v-show="upPullStatus">
        <p>查看更多...</p>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
import header from "../pages/comm/header";
import BScroll from "better-scroll";
import { api } from "@/static/api";
export default {
  data() {
    return {
      form: {
        page: 1
      },
      downLoadingSpan: "上拉加载更多...",
      isLoading: false,
      isSowBack: false,
      upPullStatus: false,
      downPullStatus: false,
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      getBackdata: [],
      title: "收支记录",
      content: [
        {
          classify: "日程领取",
          orSuccess: "上链成功",
          upPencent: "+0.056UTCT",
          date: "6.27-13-14"
        }
      ]
    };
  },
  components: {
    tarHeader: header
  },
  filters: {
    // numParse:function(data){
    //   if (data > 0) {
    //     return '+' + Number(data).toFixed(2)
    //   }
    // }
  },
  computed: {},

  mounted() {
    this.form.page = 1;
    this.downPullStatus = true;
    // this.upPullStatus = false
    this.getPort();
  },
  // getBackdata() {
  //   this.$nextTick(()=>{
  //     this.refresh();
  //   })
  // },
  methods: {
    // 收支记录接口
    getPort() {
      var _this = this;
      api.incomeRemark(this.form, this.ApiConf)
        .then(res => {
          /**
           * 先进行error_code 是否成功进行判断
           * 在对 上拉 还是下拉的动作进行判断
           * 1.如果是上拉的话  page重置为'1',. 直接进行数据更新
           * 2.如果下拉的话，分两种情况--有数据 还是没有数据
           *    如果有数据的话  原数据数组直接push，page++,为空的话，提示：加载完毕page--
           */
          if (this.form.page == 1 && res.data.length == 0) {
            this.isSowBack = true
          }
          if (res.error_code == "1000") {
            Indicator.close();
            res.data.forEach(ele => {
              if (ele.asset_log_type == "1") {
                ele.asset_log_money = "+" + ele.asset_log_money;
              } else if (ele.asset_log_type == "2") {
                ele.asset_log_money = "-" + ele.asset_log_money;
              }
              /**
               * 返回数据根据金额进行小数点后边位数截取
               * 如果是UTC的话 截取8位 否则的话 保留6位
               */
              let arr = String(ele.asset_log_money).split(".");
              if (ele.coin_name == "BTC") {
                var str = "";
                if (arr.length > 1) {
                  str = arr[1].slice(0, 8);
                }
                if (str) {
                  ele.asset_log_money = arr[0] + "." + str;
                } else {
                  ele.asset_log_money = arr[0];
                }
              } else {
                var str = "";
                if (arr.length > 1) {
                  str = arr[1].slice(0, 6);
                }
                if (str) {
                  ele.asset_log_money = arr[0] + "." + str;
                } else {
                  ele.asset_log_money = arr[0];
                }
              }
            });
            if (_this.form.page == 1) {
              _this.getBackdata = res.data;
              _this.$nextTick(() => {
                _this._initScroll()
              })
            } else if(_this.form.page >= 2) {
              if (res.data.length > 0){
                _this.getBackdata.push(res.data)
                res.data.forEach(ele => {
                  _this.getBackdata.push(ele)
                });
                _this.meunScroll.finishPullUp()
                _this.meunScroll.refresh();
              } else if(res.data.length == 0){
                _this.form.page--
                _this.isLoading = false
                _this.downLoadingSpan = '没有更多内容...'
                _this.meunScroll.finishPullUp()
                _this.meunScroll.refresh();
              }
            }
            // ========
          } else {
            Indicator.close();
            Toast({
              message: res.error_desc, //提示内容分
              duration: 2000 //持续时间（毫秒），若为 -1 则不会自动关闭
            });
          }
        })
        .catch(() => {
          Indicator.close();
          Toast({
            message: "获取收入记录失败", //提示内容分
            duration: 2000 //持续时间（毫秒），若为 -1 则不会自动关闭
          });
        });
    },
    _initScroll: function() {
      this.meunScroll = new BScroll(this.$refs.income, {
        probeType: 2,
        pullDownRefresh: {
          threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
          stop: 0 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
        },
        pullUpLoad: {
          threshold: -50,
          stop: 0
        },
        click: true,
        scrollY: true,
        momentum: true, // 开启滑动惯性
        bounceTime: 400 // 回弹时间
      });
      // 监听滚动事件
      this.meunScroll.on("scroll", pos => {});
      // 上拉触发
      this.meunScroll.on("pullingUp", () => {
        console.log("上拉");
        this.isLoading = true;
        // this.upPullStatus = true
        // this.downPullStatus = false
        this.form.page++;
        this.getPort();
        this.upPullStatus = true
        setTimeout(
          function() {
            this.$nextTick(function() {
              this.meunScroll.finishPullUp();
            });
            // this.isShowBom = true
          }.bind(this),
          2000
        );
        // this.meunScroll.finishPullUp() // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
      });
      // 滚动结束时触发
      this.meunScroll.on('scrollEnd', (data) => {
        this.downLoadingSpan = '上拉加载更多...'
        this.upPullStatus = false
      }),
      // 监听下拉事件
      this.meunScroll.on("pullingDown", () => {
        console.log("下拉");
        this.form.page = 1;
        // this.downPullStatus = true
        // this.upPullStatus = false
        this.getPort();
        this.meunScroll.finishPullDown(); // 解决下拉只执行一次的问题
      });
    }
  }
};
</script>
<style lang="scss" scoped>
// 地
.income {
  height: 100%;
}
.income_container {
  position: relative;
  /* border:1px solid red; */
  margin: 0 43px;
  height: calc(100% - 110px);
  overflow: hidden;
  .uploadingMore {
    // background: rgba(0, 0, 0, .3);
    color: #fdd401;
    // color: white;
    display: inline-block;
    transition: 2s;
    -moz-transition: 2s; /* Firefox 4 */
    -webkit-transition: 2s; /* Safari 和 Chrome */
    -o-transition: 2s; /* Opera */
    font-size: 30px;
    // margin:0 20px;
    height: 50px;
    width: 100%;
    // background: red;
    p {
      line-height: 50px;
    }
    .loadingPic {
      // height: 45px;
      vertical-align: middle;
      width: 45px;
    }
  }
}
.income_remark {
  margin-top: 20px;
  padding: 20px 20px;
  display: flex;
  height: 150px;
  border-bottom: 1px solid #e2e2e1; /*no*/
}
.income_remark_left {
  flex: 1;
  text-align: left;
}
.income_remark_right {
  flex: 3;
  text-align: right;
}
.income_remark_left_top {
  font-size: 27px; /*px*/
  color: #000;
  font-weight: 600;
}
.income_remark_left_bottom {
  display: inline-block;
  margin-top: 20px;
  font-size: 20px; /*px*/
  color: #cecdcd;
}
.income_remark_right_top {
  font-size: 32px; /*px*/
  color: #fdd401;
}
.income_remark_right_bottom {
  display: inline-block;
  margin-top: 20px;
  font-size: 20px; /*px*/
  color: #d6d5d5;
}
.friendRequestBg {
  background: red;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 317px;
  width: 389px;
}
.friendRequestBg img {
  height: 100%;
  width: 100%;
}
.friendRequestBg p {
  letter-spacing: 3px;
  font-size: 32px;
  color: #adadad;
}
</style>
