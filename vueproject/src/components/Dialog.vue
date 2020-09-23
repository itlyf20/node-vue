<template>
	<div class="dialog">
		<!-- 添加资金数据弹框 -->
		<el-dialog :title="dialog.title" 
		  :close-on-click-modal="false" 
		  :close-on-press-escape="false" 
		  :modal-append-to-body="false"
		  :visible.sync="dialog.show">
		  <el-form :model="profileForm" :rules="rules" ref="profileForm" label-width="60">
			  <el-form-item label="类型" prop="type">
			    <el-select v-model="profileForm.type" placeholder="请选择">
			      <el-option label="优惠券" value="优惠券"></el-option>
			      <el-option label="书籍" value="书籍"></el-option>
				  <el-option label="提现" value="提现"></el-option>
				  <el-option label="提现手续费" value="提现手续费"></el-option>
				  <el-option label="充值礼券" value="充值礼券"></el-option>
				  <el-option label="转账" value="转账"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="描述" prop="describe">
			    <el-input v-model="profileForm.describe" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="收入" prop="income">
			    <el-input v-model="profileForm.income" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="支出" prop="expend">
			    <el-input v-model="profileForm.expend" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="现金" prop="cash">
			    <el-input v-model="profileForm.cash" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="评论" prop="remark">
			    <el-input v-model="profileForm.remark" autocomplete="off"></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="handleclose">取 消</el-button>
		    <el-button type="primary" @click="handleAddAndEdit">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		name:"Dialog",
		// 获取父亲传过来的值
		props:{
			dialog:Object,
			profileForm:Object
		},
		data(){
			return{			
				rules: {
				 type: [
					  { required:true,message:"类型不能为空", trigger: 'blur' }
				  ],
				  describe: [
				    { required:true,message:"描述不能为空", trigger: 'blur' }
				  ],
				  income: [
				    {required:true,message:"支出不能为空", trigger: 'blur' }
				  ],
				  expend: [
				    {required:true,message:"收入不能为空", trigger: 'blur' }
				  ],
				  cash: [
				    {required:true,message:"金额不能为空", trigger: 'blur' }
				  ],
				  remark: [
				    {required:true,message:"评论不能为空", trigger: 'blur' }
				  ],
				}
			}
		},
		methods:{
			handleAddAndEdit(){
				//判断用户选择的是添加还是编辑按钮
				const url=this.dialog.option=="add" ? "addprofiles" :`editprofiles/${this.profileForm.id}`
				this.$axios.post(`/api/profiles/${url}`,this.profileForm).then(res=>{
					this.$message({
					  message:"操作成功",
					  type:"success"
					})
				})
				this.dialog.show=false;
				this.$emit("update")
			},
			handleclose(){
				this.dialog.show=false
			}
		}
	}
</script>

<style>
</style>
