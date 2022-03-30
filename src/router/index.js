import Vue from 'vue'
import VueRouter from 'vue-router'
import details from '../views/details.vue'
import login from '../views/login.vue'
import signin from '../views/signin.vue'
import main  from '../views/main.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/Home',
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/Home/details/:id',
    name: 'Home',
    component: details,
    component: () => import(/* webpackChunkName: "about" */ '../views/details.vue'),
    meta: {
      title: '详情页'
    }
  },
  {
    path:'/home/login',
    name:'login',
    component:login,
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
    meta: {
      title: '登录页'
    }
  },
  {
    path:'/home/signin',
    name:'login',
    component:signin,
    component: () => import(/* webpackChunkName: "about" */ '../views/signin.vue'),
    meta: {
      title: '注册页'
    }
  },
  {
    path:'/home/main/:name',
    name:'main',
    component:main,
    component: () => import(/* webpackChunkName: "about" */ '../views/main.vue'),
    meta: {
      title: '个人中心'
    }
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
