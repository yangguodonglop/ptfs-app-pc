//新路由
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import index from './views/echars/index.vue'
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
import middlenodes from './views/nodes/middle.vue'
import middlefiles from './views/files/middle.vue'
import middledevive from './views/devicemanagement/middle.vue'
import middleuser from './views/usercenter/middle.vue'
import middledevice from './views/devicemanagement/middle.vue'
import userinformation from './views/usercenter/deviceinformation.vue'
import storagepower from './views/usercenter/storagepower.vue'
import system from './views/devicemanagement/system.vue'
import systemset from './views/devicemanagement/systemset.vue'
import application from './views/application/applicationmanagement.vue'
import applicationmiddle from './views/application/middle.vue'
import releasemanagement from './views/application/releasemanagement.vue'
import deviceinformation from './views/deviceinformation/information.vue'



let routes = [{
        path: "/",
        component: Home,
        name: "PTFS节点存储管理",
        icon: 'el-icon-menu',
        children: [{
                path: "/",
                component: index,
                name: "网络概览",
                icon: 'el-icon-menu',
            },
            {
                path: "/middlenodes",
                component: middlenodes,
                name: "PTFS节点管理",
                icon: 'el-icon-menu',
                children: [{
                        path: "/distributed",
                        component: distributed,
                        name: "节点分布",
                        icon: 'el-icon-menu',
                    },
                    {
                        path: "/grouping",
                        component: grouping,
                        name: "分区分组",
                        icon: 'el-icon-menu',
                    },
                    {
                        path: "/nodequery",
                        name: "节点查询",
                        component: nodequery,
                        icon: 'el-icon-menu',
                    },
                    {
                        path: "/updatenode",
                        name: "更新节点配置",
                        component: updatenode,
                        icon: 'el-icon-menu',
                    },
                    {
                        path: "/logs",
                        name: "日志查看",
                        component: logs,
                        icon: 'el-icon-menu',
                    }
                ]
            },
            {
                path: "/middlefiles",
                component: middlefiles,
                name: "PTFS文件管理",
                icon: 'el-icon-menu',
                children: [{
                        path: "/filequery",
                        name: "文件查询",
                        component: filequery,
                        icon: 'el-icon-menu',
                    },
                    {
                        path: "/blacklist",
                        name: "黑名单",
                        component: blacklist,
                        icon: 'el-icon-menu',
                    },

                ]
            },

        ]
    },
    {
        path: "/a",
        component: Home,
        name: "西柚机用户管理",
        icon: 'el-icon-menu',
        children: [{
                path: "/userinformation",
                name: "西柚机用户信息",
                component: userinformation,
                icon: 'el-icon-menu',
            },
            {
                path: "/storagepower",
                name: "西柚机储存管理",
                component: storagepower,
                icon: 'el-icon-menu',
            },
        ]
    },
    {
        path: "/b",
        component: Home,
        name: "西柚机管理",
        icon: 'el-icon-menu',
        children: [{
                path: "/deviceinformation",
                name: "西柚机设备信息",
                component: deviceinformation,
                icon: 'el-icon-menu',
            },
            {
                path: "/jiankong",
                name: "西柚机设备监控",
                icon: 'el-icon-menu',
            },
            {
                path: "/chunchu",
                name: "西柚机存储明细",
                icon: 'el-icon-menu',
            },
            {
                path: "/application",
                name: "西柚机应用管理",
                component: applicationmiddle,
                icon: 'el-icon-menu',
                children: [{
                        path: "/application",
                        name: "西柚机应用管理",
                        component: application,
                        icon: 'el-icon-menu',
                    },
                    {
                        path: "/releasemanagement",
                        name: "应用发布管理",
                        component: releasemanagement,
                        icon: 'el-icon-menu',
                    },
                ]
            },
            {
                path: "/ruku",
                name: "入库管理",
                icon: 'el-icon-menu',
            },
            {
                path: "/system",
                name: "西柚机系统管理",
                component: middledevive,
                icon: 'el-icon-menu',
                children: [{
                        path: "/system",
                        name: "西柚机系统管理",
                        component: system,
                        icon: 'el-icon-menu',
                    },
                    {
                        path: "/systemset",
                        name: "西柚机发布设置",
                        component: systemset,
                        icon: 'el-icon-menu',
                    },
                ]
            },

        ]
    },
    {
        path: "/c",
        component: Home,
        name: "西柚机收益管理",
        icon: 'el-icon-menu',
        children: [{
                path: "/收益",
                name: "西柚机用户收益统计",
                icon: 'el-icon-menu',
            },

        ]
    },
    {
        path: "/d",
        component: Home,
        name: "消息发布",
        icon: 'el-icon-menu',
        children: [{
                path: "/fabul",
                name: "消息发布管理",
                icon: 'el-icon-menu',
            },

        ]
    }
]

export default routes;