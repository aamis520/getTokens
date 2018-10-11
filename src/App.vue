<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
document.querySelector('#app').addEventListener('touchstart', function (ev) {
// 　　let a=jquery('#app')[0].scrollTop
// 　　if(jquery('#app')[0].scrollTop <=0){
// 　　　　jquery('#app')[0].scrollTop =1
// 　　}
  })
export default {
  name: "App",
  mounted() {
    // color.titleColor('#000')
    // IOS 橡皮筋效果
    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
    }, {passive: false}) // passive 参数不能省略，用来兼容ios和android
  },
  method: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  /* -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
