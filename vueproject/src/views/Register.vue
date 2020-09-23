<template>
	<div class="register">
		<div class="registerform">
			<h1>后台管理系统</h1>
			<el-form :model="ruleForm" :rules="rules" label-width="100" ref="ruleForm">
			  <el-form-item label="用户名" prop="username">
			    <el-input v-model="ruleForm.username"></el-input>
			  </el-form-item>
			  <el-form-item  label="密码" prop="password">
			    <el-input type="password" v-model="ruleForm.password" ></el-input>
			  </el-form-item>
			  <el-form-item label="地址" prop="address">
			    <el-input v-model="ruleForm.address"></el-input>
			  </el-form-item>
			  <el-form-item label="电话" prop="tel">
			    <el-input v-model="ruleForm.tel"></el-input>
			  </el-form-item>
			  <el-form-item label="邮箱" prop="email">
			    <el-input v-model="ruleForm.email"></el-input>
			  </el-form-item>
			  <el-form-item  label="身份选择" prop="identity">
				<el-select v-model="ruleForm.identity">
					<el-option label="管理员" value="管理员"></el-option>
					<el-option label="普通用户" value="普通用户"></el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm" class="btn1">注册</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	        ruleForm: {
	          username: '',
	          password: '',
			  email:'',
			  identity:'',
			  address:'',
			  tel:''
	        },
	        rules: {
	          username: [
	            { required:true,message:"用户名不能为空", trigger: 'blur' },
				{min:4,max:8,message:"长度必须是4-8位"}
	          ],
	          password: [
	            { required:true,message:"密码不能为空", trigger: 'blur' },
				{min:6,max:12,message:"长度必须是6-12位"}
	          ],
			  email: [
			    {type:"email", required:true,message:"邮箱格式", trigger: 'blur' }
			  ],
			  address: [
			    {required:true,message:"地址不能为空", trigger: 'blur' }
			  ],
			  tel: [
			    {required:true,message:"电话不能为空", trigger: 'blur' },
				{min:11,message:"电话必须是11位", trigger: 'blur' }
			  ],
	        }
	      };
	    },
	    methods: {
	      submitForm() {
	         this.$axios.post('/api/users/register',this.ruleForm).then(res=>{
				  //注册成功
				  this.$message({
					  message:"账号注册成功",
					  type:"success"
				  })
				  this.$router.push("/login")
			  })
	      }
	    }
	  }
</script>

<style>
	.register{
		width: 100%;
		height: 100vh;
		background-color: #0000FF;
		position: relative;
	}
	.registerform{
		width: 400px;
		height: 720px;
		background-color: #ffffff;
		position: absolute;
		left: 40%;
		top: 8%;
		text-align: center;
	}
	.registerform h1{
		font-size: 19px;
		margin: 10px auto;
	}
	.el-form-item{
		width: 80%;
	}
	.el-select{
		width: 100%;
	}
	.btn1{
		width: 90%;
	}
</style>
