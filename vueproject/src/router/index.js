import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from "../views/Register.vue"
import Index from "../views/Index.vue"
import Money from "../views/Money.vue"
import Message from "../views/Message.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
	children:[
		{
			path: '/message',
			name: 'Message',
			component: Message
		},
		{
			path: '/money',
			name: 'Money',
			component: Money
		}
	]
  },
  {
    path: '/',
    redirect:"/login"
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由守卫
router.beforeEach((to,from,next)=>{
	const isLogin=localStorage.eleToken ? true : false;
	if(to.path=="/login" || to.path=="/register"){
		next();
	}else{
		isLogin ? next() : next('/login')
	}
});

export default router
