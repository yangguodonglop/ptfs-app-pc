
//新路由
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import index from './views/charts/index.vue'
import distributed from './views/nodes/distributed.vue'
import grouping from './views/nodes/grouping.vue'
import nodequery from './views/nodes/nodequery.vue'
import updatenode from './views/nodes/updatenode.vue'
import logs from './views/nodes/logs.vue'
import filequery from './views/files/filequery.vue'
import blacklist from './views/files/blacklist.vue'
import kakfa from './views/kakfa/kakfa.vue'
import miningmachine from './views/miningmachine/miningmachine.vue'
import income from './views/income/income.vue'

import deviceinformation from './views/usercenter/deviceinformation.vue'




let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: 'PTFS网络管理',
        iconCls: 'el-icon-message', //图标样式class
        children: [
            // { path: '/main', component: Main, name: '主页', hidden: true },
            {
                path: '/',
                component: index,
                name: '网络概览',
            },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '西柚用户管理',
        iconCls: 'el-icon-tickets', //图标样式class
        children: [{
                path: '/deviceinformation',
                component: deviceinformation,
                name: '西柚用户信息'
            },
            {
                path: '/grouping',
                component: grouping,
                name: '西柚存储管理'
            },
            {
                path: '/nodequery',
                component: nodequery,
                name: '节点查询'
            },
            {
                path: '/updatenode',
                component: updatenode,
                name: '更新节点配置'
            },
            {
                path: '/logs',
                component: logs,
                name: '日志查看'
            },

        ]
    },
    {
        path: '/',
        component: Home,
        name: 'PTFS文件管理',
        iconCls: 'el-icon-document', //图标样式class
        children: [{
                path: '/filequery',
                component: filequery,
                name: '文件查询'
            },
            {
                path: '/blacklist',
                component: blacklist,
                name: '黑名单'
            },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '消息队列/Kakfa管理',
        iconCls: 'el-icon-bell', //图标样式class
        children: [{
                path: '/kakfa',
                component: kakfa,
                name: '消息队列/Kakfa管理'
            },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '矿机管理',
        iconCls: 'el-icon-printer', //图标样式class
        children: [{
                path: '/miningmachine',
                component: miningmachine,
                name: '矿机管理'
            },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '矿机收益管理',
        iconCls: 'el-icon-star-off', //图标样式class
        children: [{
                path: '/income',
                component: income,
                name: '矿机收益管理'
            },

        ]
    },



    {
        path: '*',
        hidden: true,
        redirect: {
            path: '/404'
        }
    }
];

export default routes;