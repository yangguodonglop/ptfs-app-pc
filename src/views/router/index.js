import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/pages/login/index'
import login from '@/pages/login/login'
import loginCode from '@/pages/login/loginCode'
import protocol from '@/pages/login/protocol'
import find from '@/pages/login/find'
import binding from '@/pages/login/binding'
import username from '@/pages/login/username'
import saoma from '@/pages/login/saoma'

import minemachine from '@/pages/income/minemachine'
import ranking from '@/pages/income/ranking'
import allranking from '@/pages/income/allranking'
import bill from '@/pages/income/bill'
import recording from '@/pages/income/recording'
import tomoney from '@/pages/income/tomoney'
import billdetail from '@/pages/income/billdetail'

import management from '@/pages/management/management'
import managementinfo from '@/pages/management/managementinfo'
import mining from '@/pages/management/mining'
import jindu from '@/pages/management/jindu'

import usercenter from '@/pages/userinfo/usercenter'
import user from '@/pages/userinfo/user'
import changephone from '@/pages/userinfo/changephone'
import password from '@/pages/userinfo/password'
import transactionword from '@/pages/userinfo/transactionword'
import about from '@/pages/userinfo/about'
import privacy from '@/pages/userinfo/privacy'
import message from '@/pages/userinfo/message'
import updatepassword from '@/pages/userinfo/updatepassword'

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
    path: '/loginCode',
    name: 'loginCode',
    component: loginCode
  },
  {
    path: '/protocol',
    name: 'protocol',
    component: protocol
  },
  {
    path: '/find',
    name: 'find',
    component: find
  },
  {
    path: '/saoma',
    name: 'saoma',
    component: saoma
  },
  {
    path: '/binding',
    name: 'binding',
    component: binding
  },
  {
    path: '/username',
    name: 'username',
    component: username
  },
  {
    path: '/minemachine',
    name: 'minemachine',
    component: minemachine
  },
  {
    path: '/management',
    name: 'management',
    component: management
  },
  {
    path: '/usercenter',
    name: 'usercenter',
    component: usercenter
  },
  {
    path: '/managementinfo',
    name: 'managementinfo',
    component: managementinfo
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: ranking
  },
  {
    path: '/bill',
    name: 'bill',
    component: bill
  },
  {
    path: '/billdetail',
    name: 'billdetail',
    component: billdetail
  },
  {
    path: '/recording',
    name: 'recording',
    component: recording
  },
  {
    path: '/allranking',
    name: 'allranking',
    component: allranking
  },
  {
    path: '/tomoney',
    name: 'tomoney',
    component: tomoney
  },
  {
    path: '/mining',
    name: 'mining',
    component: mining
  },
  {
    path: '/jindu',
    name: 'jindu',
    component: jindu
  },
  {
    path: '/user',
    name: 'user',
    component: user
  },
  {
    path: '/changephone',
    name: 'changephone',
    component: changephone
  },
  {
    path: '/password',
    name: 'password',
    component: password
  },
  {
    path: '/transactionword',
    name: 'transactionword',
    component: transactionword
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: privacy
  },
  {
    path: '/message',
    name: 'message',
    component: message
  },
  {
    path: '/updatepassword',
    name: 'updatepassword',
    component: updatepassword
  }
]

const router = new VueRouter({
  routes: routes
})

export default router
