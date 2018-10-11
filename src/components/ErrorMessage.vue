<template>
    <div class="error" v-if="IsShow"><span>{{ErrorDescShowT}}</span></div>
</template>
<script>
export default {
    name:'ErrorMessage',
    props:['ErrorDescShow'],
    data(){
        return{
					time:2000,//弹窗消失时间
					Interval:'',
					IsShow:false,
					ErrorDescShowT:'',
        }
    },
    created(){
    },
    mounted () {

    },
    watch:{
      ErrorDescShow:function(val,oldval){
        this.ErrorDescShowT = this.HandleErrorDesc(val);
        this.ShowError();
      }
    },
    methods:{
			ShowError(){// 显示错误提示
				var _this = this;
				clearTimeout(_this.Interval);
				_this.IsShow = true;
				_this.Interval = setTimeout(() => {
					_this.IsShow = false;
					clearTimeout(_this.Interval);
					_this.Interval = null;
				}, _this.time);
			},
			HandleErrorDesc(ErrorDescShowT){
				return ErrorDescShowT.substring(0,ErrorDescShowT.length-13);
			}
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel='stylesheet/scss'>
	.error{
		height:100px;
		width:100%;
		color:white;
		font-size:20px;
		position:fixed;
		top:100px;
		left:0;
		right:0;
		z-index:1000;
	}
	.error>span{
		height: 50px;
		padding: 15px 40px;
		background:black;
		border-radius:100px;
	}
</style>
