<template>
	<div class="money">
		<table>
			<tr>
				<td colspan="5">
					<el-button type="primary" @click="dialogAdd" style="position: fixed;right:120px;">添加</el-button>
				</td>
			</tr>
		</table>
		<el-table border :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe style="width: 100%;margin-top: 50px;" :row-style="{height: '60px'}">
		    <el-table-column prop="type" label="类型" width="200"></el-table-column>
			<el-table-column prop="date" label="日期" width="250"></el-table-column>
			<el-table-column prop="describe" label="描述" width="250"></el-table-column>
			<el-table-column prop="income" label="收入" width="160"></el-table-column>
			<el-table-column prop="expend" label="支出" width="180"></el-table-column>
			<el-table-column prop="cash" label="现金" width="180"></el-table-column>
			<el-table-column prop="remark" label="评论" width="230"></el-table-column>
			 <el-table-column
			      fixed="right"
			      label="操作"
			      width="200">
			      <template slot-scope="scope">
					  <!-- scope可以获取下标和一整行数据 -->
			         <el-button type="primary"  @click="dialogEdit(scope.$index,scope.row)">编辑</el-button>
			        <el-button type="danger" @click="dialogDel(scope.$index,scope.row)">删除</el-button>
			      </template>
			</el-table-column>
		</el-table>
		 <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      :page-size="pageSize"
			  background
		      layout="total, prev, pager, next"
		      :total="total"
			  style="text-align:right;margin-top:30px">
		  </el-pagination>
		
				<!-- 向子组件传值 -->
		<Dialog :dialog="dialog" :profileForm="profileForm" @update="getProfile"></Dialog>
	</div>
</template>

<script>
	import Dialog from "../components/Dialog.vue"
	export default{
		name:"Money",
		components:{Dialog},
		data(){		
			return{
				tableData:[],
				currentPage:1,
				pageSize:10,
				total:0,
				//子组件对应的值
				dialog:{
					show:false,//是否显示弹出框
					title:"",//弹出框的title
					option:'edit'//默认为编辑操作
				},
				profileForm:{
					type:"",
					describe:"",
					income:"",
					expend:"",
					cash:"",
					remark:""
				}
			}
		},
		methods:{
			 handleSizeChange(val) {
			     this.pageSize = val;
			 },
			  handleCurrentChange(val) {
				this.currentPage = val; //当前页
			  },
			//添加
			  dialogAdd(){
				  this.dialog={
					  show:true,
					  title:"添加资金信息",
					  option:"add"
				  };	
				  //清空文本输入框
				  this.profileForm={
					  type:"",
					  describe:"",
					  income:"",
					  expend:"",
					  cash:"",
					  remark:"",
					  id:""
				  }
			  },
			  //编辑
			  dialogEdit(index, row){
				  this.dialog={
					  show:true,
					  title:"修改资金信息",
					  option:"edit"
				  };
				  //填充文本框
				  this.profileForm={
					  type:row.type,
					  describe:row.describe,
					  income:row.income,
					  expend:row.expend,
					  cash:row.cash,
					  remark:row.remark,
					  id:row._id
				  }
			  },
			  //删除
			  dialogDel(index, row){
				  this.$axios.delete(`/api/profiles/delprofile/${row._id}`).then(res=>{
					  this.$message({
					    message:"操作成功",
					    type:"success"
					  })
					  this.getProfile();
				  })
			  },
			  getProfile(){
				  this.$axios.get("/api/profiles/").then(res=>{
				  	this.tableData=res.data
					this.total=res.data.length;
				  })
			  }
		},
		created() {
			this.getProfile()
		}

	}
</script>

<style>
</style>
