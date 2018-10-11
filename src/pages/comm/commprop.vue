<!-- 公用的提示框 -->
<template>
  <div class="commProp">
    <div class="commProp_inner">

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='scss' scoped>
  .commProp{
    opacity: .5;
    background: #8e8e8e;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .commProp_inner{
      height: 330px;
      width: 640px;
      background: white;
    }
  }
</style>
