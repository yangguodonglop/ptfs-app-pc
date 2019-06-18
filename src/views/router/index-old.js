import Vue from 'vue'
// import Router from 'vue-router'
import index from '@/pages/index'
import description from '@/pages/description'
import device from '@/pages/device'
import devicedetails from '@/pages/devicedetails'
import mining from '@/pages/mining'
import management from '@/pages/management'
import user from '@/pages/user'
import ceshi from '@/pages/ceshi'
import ceshinext from '@/pages/ceshinext'
import saomiao from '@/pages/saomiao'
import VueRouter from 'vue-router'
import login from '@/pages/login'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'index',
    component: index

  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/description',
    name: 'description',
    component: description,
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    path: '/device',
    name: 'device',
    component: device,
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    path: '/devicedetails',
    name: 'devicedetails',
    component: devicedetails,
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    path: '/mining',
    name: 'mining',
    component: mining
  },
  {
    path: '/management',
    name: 'management',
    component: management
  },
  {
    path: '/user',
    name: 'user',
    component: user
  },
  {
    path: '/ceshi',
    name: 'ceshi',
    component: ceshi
  },
  {
    path: '/ceshinext',
    name: 'ceshinext',
    component: ceshinext
  },
  {
    path: '/saomiao',
    name: 'saomiao',
    component: saomiao
  }
]

const router = new VueRouter({
  routes: routes
})

router.beforeEach((to, from, next) => {
  const nextRoute = ['user']
  let isLogin = sessionStorage.getItem('Authorization')
  console.log(isLogin)
  console.log(nextRoute.indexOf(to.name))
  if (nextRoute.indexOf(to.name) >= 0) {
    console.log('*****')
    if (isLogin == null) {
      console.log('&&&&&&&')
      router.push({ name: 'login' })
    }
  }
  // 已登录状态；当路由到login时，跳转至home
  // if (to.name === 'index') {
  //   if (isLogin) {
  //     router.push({ name: 'user' });
  //   }
  // }

  next()
  // if (to.path === '/login') {
  //   next();
  // } else {
  //   let token = sessionStorage.getItem('Authorization');
  //   if (token === 'null' || token === '') {
  //     next('/saomiao');
  //   } else {
  //     next();
  //   }
  // }
})
export default router
