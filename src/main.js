//import babelpolyfill from 'babel-polyfill'
//import Vue from 'vue'
import App from './App'
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
//import VueRouter from 'vue-router'
//import store from './vuex/store'
//import Vuex from 'vuex'
import VCharts from 'v-charts'
import common from "./common/js/util.js";
Vue.prototype.common = common
    //import NProgress from 'nprogress'
    //import 'nprogress/nprogress.css'
import routes from './routes'
// import Mock from './mock'
// Mock.bootstrap();
//import 'font-awesome/css/font-awesome.min.css'

//Vue.use(ElementUI)
//Vue.use(VueRouter)
//Vue.use(Vuex)
Vue.use(VCharts)
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.use(echarts)

//import axios from 'axios';
//import vuePopper from 'element-ui/lib/utils/vue-popper';
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//Vue.prototype.$axios = axios;

//NProgress.configure({ showSpinner: false });
import "babel-polyfill";

const router = new VueRouter({
    routes
})

// router.beforeEach((to, from, next) => {
//   //NProgress.start();
//   if (to.path == '/login') {
//     sessionStorage.removeItem('user');
//   }
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   if (!user && to.path != '/login') { 
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })

// router.afterEach(transition => {
// NProgress.done();
// });

new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    //store,
    //components: { App }
    render: h => h(App)
}).$mount('#app')