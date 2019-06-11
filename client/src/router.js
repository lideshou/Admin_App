import Vue from 'vue'
import Router from 'vue-router'
import Index from "./views/Index"
import Register from "./views/Register"
import Login from "./views/Login"
import Notfound from "./views/404"
import Home from "./views/Home"
import InfoShow from "./views/Infoshow"
import Fundlist from "./views/Fundlist"

Vue.use(Router)

const router=new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children:[{
        path:"",
        component:Home
      },{
      path:"/home",
      name:"home",
      component:Home
      },{
        path:"/infoshow",
        name:"infoshow",
        component:InfoShow
      },{
        path:"/fundlist",
        name:"fundlist",
        component:Fundlist
      }]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '*',
      name: '/404',
      component: Notfound
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});

//路由守卫
router.beforeEach((to,from,next)=>{
  const isLogin=localStorage.liToken ? true:false;
  if(to.path=="/login"||to.path=="/register"){
    next();
  }else {
    isLogin ? next():next("./login");
  }
})

export default router;
