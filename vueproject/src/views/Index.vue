<template>
	<div class="index">
		<el-container style="height: 100vh; border: 1px solid #eee">
			<el-header>
				<div class="header">
					<el-row>
						<el-col :span="6" class="logo-container">
							<img src="../assets/logo.jpg" alt="">
							<span class="title">用户资金后台管理系统</span>
						</el-col>
						<el-col :span="5" class="userinfo">
							<img src="../assets/avatar.jpg" alt="">
							<span class="title">欢迎你！&nbsp;&nbsp;&nbsp;{{user.username}}</span>
							<el-dropdown @command="setDialogInfo">
								<span class="el-dropdown-link">
									<span class="title">用户设置</span>
									<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item command="info">个人信息</el-dropdown-item>
									<el-dropdown-item command="logout">退出登录</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</el-col>
					</el-row>
				</div>
			</el-header>
			<el-container>
				<el-aside width="200px" style="background-color: rgb(238, 241, 250)">
					<el-menu>
						<el-submenu index="1">
							<template slot="title">
								<i class="el-icon-coin"></i>资金管理
							</template>
							<el-menu-item-group>
								<router-link to="/money" tag="el-menu-item" class="link">资金收支</router-link>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="2">
							<template slot="title">
								<i class="el-icon-user-solid"></i>信息管理
							</template>
							<el-menu-item-group>
								<router-link to="/message" tag="el-menu-item" class="link">用户信息</router-link>
							</el-menu-item-group>
						</el-submenu>
					</el-menu>
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script>
	export default {
		name: "Index",
		data() {
			return {
				user: this.$store.getters.user, //获取vuex中的存放用户信息
			};
		},

		methods: {
			// 下拉框选择，点击个人信息后调整到对应的函数执行
			setDialogInfo(comItem) {
				switch (comItem) {
					case "info":
						this.showInfoList();
						break;
					case "logout":
						this.logout();
						break;
				}
			},
			//展示个人信息
			showInfoList() {
				this.$alert(
					`<div>名称：${this.user.username}</div>
						<div>地址：${this.user.address}</div>
						<div>电话：${this.user.tel}</div>`,
					'个人信息', {
						dangerouslyUseHTMLString: true
					});
			},
			//退出登录
			logout() {
				this.$confirm('确定退出登录吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//清除token
					localStorage.removeItem("eleToken");
					//设置vuex store
					this.$store.dispatch("clearCurrentState");
					//跳转
					this.$router.push("/login")
				}).catch(() => {
					return;
				});
			}
		}
	};
</script>
<style>
	.el-header {
		background-color: lightgray;
		color: #000000;
		line-height: 60px;
	}

	.el-aside {
		color: #000000;
	}

	.logo-container {
		display: flex;
	}

	.header {
		position: relative;
	}

	.logo-container img {
		width: 40px;
		height: 40px;
		border-radius: 15em;
		margin: 8px 0;
	}

	.userinfo {
		display: flex;
		text-align: right;
		position: absolute;
		right: 8px;
	}

	.userinfo img {
		width: 40px;
		height: 40px;
		border-radius: 2em;
		margin: 8px 0;
	}

	.title {
		padding: 0 20px;
		font-size: 18px;
		color: #000000;
	}
</style>
