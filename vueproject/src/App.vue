<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
	import jwt from "jwt-decode";
	export default{
		name:"App",
		created(){
			if(localStorage.eleToken){
				const decoded=jwt(localStorage.eleToken)
				//将解析的token存储到vuex中
				this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded));
				this.$store.dispatch("setUser",decoded);
			}
		},
	methods:{
		//判断是否为空的方法
		isEmpty(value){
		  return(
			value===undefined ||
			value===null || 
			(typeof value==="object" && Object.keys(value).length===0) ||
			(typeof value==="string" && value.trim().length===0)
		  );
		},
	}
}
</script>
<style>
	html,body{
		margin: 0;
		padding: 0;
	}
</style>
