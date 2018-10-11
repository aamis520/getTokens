<template>
	<div class="main-back" id="main-back">
		<div class="main-back">
			<router-view/>
		</div>
		<foot></foot>
	</div>
</template>
<script>
	import Foot from '@/components/Foot'
	export default {
		name:'Main',
		props:{

		},
		data(){
			return{

			}
		},
		components:{
			Foot
		},
		created(){
			console.log(this.$store.getters.IsLogin == false);
			if(this.$store.getters.IsLogin == false){
				this.$router.push({name:'Login'})
				return;
			}
			if(this.$store.getters.Name == ''){
				this.$router.push({name:'SetName'})
			}
		},
		mounted () {

		},
		watch:{

		},
		methods:{

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel='stylesheet/scss' scoped>
	 .main-back{width:100%;height:100%;}
</style>
