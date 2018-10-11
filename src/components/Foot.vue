<template>
    <div class="footer">
       <router-link class="footer_nav" active-class="footer_nav_active" to="/Home">首页</router-link>
			 <router-link class="footer_nav" active-class="footer_nav_active" to="/Advertisement">广告</router-link>
			 <router-link class="footer_nav" active-class="footer_nav_active" :to="dappRouter">DAPP</router-link>
			 <router-link class="footer_nav" active-class="footer_nav_active" to="/consumer">账户</router-link>
		</div>
</template>
<script>
export default {
  name: "Foot",
  props: {},
  data() {
    return {
      dappRouter: process.env.NODE_ENV === 'development' ? '/newDapp' : '/newDapp'
    };
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel='stylesheet/scss'>
.footer {
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #e5e5e5;/*no*/
  background: white;
}
.footer_nav {
  float: left;
  display: block;
  width: 25%;
  height: 100px;
  line-height: 150px;
  font-size: 20px;/*px*/
  color: #858383;
}
.footer_nav:nth-child(1) {
  background: url("~@/assets/getTonkens/首页原始.png") no-repeat center 8px;
  background-size: 56px 56px;
}
.footer_nav:nth-child(2) {
  background: url("~@/assets/getTonkens/广告原始.png") no-repeat center 8px;
  background-size: 56px 56px;
}
.footer_nav:nth-child(3) {
  background: url("~@/assets/getTonkens/DAPP原始.png") no-repeat center 8px;
  background-size: 56px 56px;
}
.footer_nav:nth-child(4) {
  background: url("~@/assets/getTonkens/用户-原始.png") no-repeat center 8px;
  background-size: 56px 56px;
}
.footer_nav_active {
  color: #fde201;
}
.footer_nav_active:nth-child(1) {
  background: url("~@/assets/getTonkens/首页选中.png") no-repeat center 8px;
  background-size: 56px 56px;
}
.footer_nav_active:nth-child(2) {
  background: url("~@/assets/getTonkens/广告选中.png") no-repeat center 8px;
  background-size: 56px 56px;
}
.footer_nav_active:nth-child(3) {
  background: url("~@/assets/getTonkens/DAPP选中.png") no-repeat center 8px;
  background-size: 56px 56px;
}
.footer_nav_active:nth-child(4) {
  background: url("~@/assets/getTonkens/账户选中.png") no-repeat center 8px;
  background-size: 56px 56px;
}
</style>
