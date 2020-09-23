<template>
	<div class="money">
		<el-main style="margin:20px auto;width:100%;align-items:center;">
			<el-table border :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" :row-style="{height: '60px'}">
				<el-table-column prop="_id" label="序号" width="250"></el-table-column>
				<el-table-column prop="username" label="用户名" width="250"></el-table-column>
				<el-table-column prop="email" label="邮箱" width="300"></el-table-column>
				<el-table-column prop="address" label="地址" width="300"></el-table-column>
				<el-table-column prop="tel" label="电话" width="234"></el-table-column>
				<el-table-column prop="identity" label="身份" width="300"></el-table-column>
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
		</el-main>
	</div>
</template>

<script>
	export default{
		name:"Money",
		data(){	
			return{
				tableData:[],
				currentPage:1,
				pageSize:10,
				total:0,
			}
		},
		mounted() {
			this.$axios.get("/api/users/").then(res=>{
				this.tableData=res.data
				this.total=res.data.length;
			})
		},
		methods:{
			handleSizeChange(val) {
			    this.pageSize = val;
			},
			 handleCurrentChange(val) {
				this.currentPage = val; //当前页
			 },
		}
	}
</script>

<style>
	.money td{
		padding: 0 10px;
		font-size: 15px;
	}
</style>
