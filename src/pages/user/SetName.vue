<template>
  <div class="setName">
    <tar-header :isSowBack='isSowBack' :title="title"></tar-header>
    <div class="main">
      <div class="setName_head">
        <h1>设置昵称</h1>
      </div>
      <div class="name">
        <input type="text" placeholder="起一个一枝独秀的昵称吧" v-model="name"/>
      </div>
      <span class="btn" :class="{btn_put:IsPut}" href="javascript:void(0);" @click="SetName">确认更改</span>
      <!-- <ErrorMessage :ErrorDescShow="ErrorDesc"></ErrorMessage> -->
    </div>
  </div>
</template>
<script>
import header from "../../pages/comm/header"
import { api } from "@/static/api";
import { checkerror } from "@/static/common";
import { Toast } from "mint-ui";

// import ErrorMessage from "@/components/ErrorMessage";
export default {
  name: "SetName",
  props: {},
  data() {
    return {
      isSowBack: true,
      backUrl:'/register',
      title: '设置昵称',
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      name: "",
      IsPut: false, //是否能提交数据
      CheckErrorData: {},
      ErrorDesc: "",
      query: {
        from: ''
      }
    };
  },
  components: {
    tarHeader: header
   },
  created() {
    this.query = this.$router.currentRoute.query
  },
  mounted() {},
  watch: {
    name() {
      console.log(1);
      if (this.name != "") {
        this.IsPut = true;
      } else {
        this.IsPut = false;
      }
    }
  },
  methods: {
  // 设置名称
    SetName() {
      var userName =  this.$store.getters.Name // 获取保存的名字
      // debugger
      if (this.name == userName) {
        Toast({
          position: 'top',
          message: '昵称不能和当前一致', //提示内容分
          duration: 1000 //持续时间（毫秒），若为 -1 则不会自动关闭
        })
        return
      }
      var _this = this;

      if (!_this.IsPut) { // 按钮动态的样式
        return;
      }
      _this.CheckErrorData = checkerror.SetName(_this.name); // 调用函数获取提示信息
      console.log(_this.CheckErrorData);
      // if (_this.CheckErrorData.code != 1000) {
      //   _this.ErrorDesc = res.error_desc + new Date().getTime();
      //   return;
      // }
      var data = {
        name: _this.name
      };
      // 访问接口
      api.SetName(data, _this.ApiConf).then(res => {
        if (res.error_code == 1000) {
          this.$store.dispatch('UpdateName',_this.name)
          if(this.query.from != 'regist'){
            _this.$router.push({ path: '/Home' })
          }else{
            _this.$router.push({ name: "setPassword", query: {from: 'regist'} })
          }
          return;
        } else {
           Toast({
            position: 'top',
            message: res.error_desc, //提示内容分
            duration: 1000 //持续时间（毫秒），若为 -1 则不会自动关闭
          })
          // _this.ErrorDesc = res.error_desc + new Date().getTime();
        }
      });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.setName{
  height: 100%;
  width: 100%;
}
.main {
  /* background: #040016; */
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 100px;
}
.name {
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #ececec;
  overflow: hidden;
  margin-top: 40px;
}

.name > input {
  width: 100%;
  float: left;
  height: 70px;
  line-height: 70px;
  background: none;
  border: none;
  font-size: 35px;
  padding: 0 30px;
  color: #000000;
}
.btn {
  width: 100%;
  display: block;
  height: 90px;
  font-size: 30px;
  line-height: 90px;
  color: white;
  margin-top: 110px;
  border-radius: 100px;
  background: #ececec; /* Safari 5.1 - 6.0 */
}
.btn_put {
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
}
.setName_head{
  text-align: left;
  height: 120px;
  // background: red;
  h1{
    font-size: 54px;/*px*/
    color:#231815;
  }
}
</style>
