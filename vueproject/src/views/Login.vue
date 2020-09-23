<template>
	<div class="login">
		<div class="loginform">
			<h1>后台管理系统</h1>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
			  <el-form-item label="账号" prop="email">
			    <el-input v-model="ruleForm.email"></el-input>
			  </el-form-item>
			  <el-form-item class="pinput"  label="密码" prop="password">
			    <el-input type="password" v-model="ruleForm.password" ></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm" class="btn1">登录</el-button>
			  </el-form-item>
			  <el-form-item>
				  <el-button type="text" @click="resetForm" class="btn2">没有账号？去注册</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import jwt from "jwt-decode";
	export default {
	    data() {
	      return {
	        ruleForm: {
	          email: '',
	          password: ''
	        },
	        rules: {
	          email: [
	            {type:"email",required:true,message:"邮箱格式不正确", trigger: 'blur' },
	          ],
	          password: [
	            { required:true,message:"密码不能为空", trigger: 'blur' },
				{min:6,max:12,message:"长度必须是6-12位"}
	          ],
	        }
	      };
	    },
	    methods: {
	      submitForm() {
			 this.$axios.post('/api/users/login',this.ruleForm).then(res=>{
				const {token}=res.data
				localStorage.setItem("eleToken",token);
				//解析token
				const decoded=jwt(token)
				//将解析的token存储到vuex中
				this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded));
				this.$store.dispatch("setUser",decoded);
				this.$message({
				  message:"登录成功",
				  type:"success"
				})
				this.$router.push("/index")
			  })
			  
	      },
		  //判断是否为空的方法
		  isEmpty(value){
			  return(
				value===undefined ||
				value===null || 
				(typeof value==="object" && Object.keys(value).length===0) ||
				(typeof value==="string" && value.trim().length===0)
			  );
		  },
	      resetForm() {
	       this.$router.push('/register')
	      }
	    }
	  }
</script>

<style>
	.login{
		width: 100%;
		height: 100vh;
		background-color: #0000FF;
		position: relative;
	}
	.login h1{
		font-size: 20px;
		margin: 10px auto;
	}
	.loginform{
		width: 400px;
		height: 400px;
		background-color: #ffffff;
		position: absolute;
		left: 40%;
		top: 20%;
		text-align: center;
	}
/* 	.pinput{
		position: relative;
		top: 20px;
	} */
	.el-form-item{
		width: 80%;
		margin: 20px auto;
	}
	.btn1{
		margin-top:20px;
		width: 90%;
	}
</style>
