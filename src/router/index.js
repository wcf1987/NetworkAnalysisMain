import {createRouter, createWebHashHistory} from 'vue-router'
import ContainerPage from '../components/ContainerPage'
import Table1 from "../components/common/Table1";
import Table2 from "../components/common/Table2";
import FlowTable from "../components/customModeler/FlowTable"
import CustomBpmn from "../components/customModeler/CustomBpmn"
import InterfaceTable from '@/components/networktable/InterfaceTable'
import InterfaceDetailTable from '@/components/networktable/InterfaceDetailTable'
import PackageTable from '@/components/networktable/PackageTable'
import PackageDetailTable from '@/components/networktable/PackageDetailTable'
import AppTable from '@/components/networktable/AppTable'
import AppDetailTable from '@/components/networktable/AppDetailTable'
import MessageTable from '@/components/networktable/MessageTable'
import MessageDetailTable from '@/components/networktable/MessageDetailTable'
import TransRulesTable from '@/components/ruletable/TransRulesTable'
import TransRulesDetailTable from '@/components/ruletable/TransRulesDetailTable'
import FuncTable from '@/components/functiontable/FuncTable'
import PackTable from '@/components/functiontable/PackTable'
import Index from '@/components/staticpage/Index'
import Devicestatus from '@/components/staticpage/devicestatus'
import www_status from '@/components/staticpage/www_status'
import sub_www from '@/components/staticpage/sub_www'
import infor_statistics from '@/components/staticpage/infor_statistics'
import local_parameter_setting from '@/components/staticpage/local_parameter_setting'
import forwarding_rules from '@/components/staticpage/forwarding_rules'
import distribution_rules from '@/components/staticpage/distribution_rules'
import Transcoding_rule from '@/components/staticpage/Transcoding_rule'
import link_management from '@/components/staticpage/link_management'
import loginpage from '@/components/staticpage/loginpage'
import time_sync from '@/components/staticpage/time_sync'


//let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);

//importAll(require.context(path: '../components/networktable',true,/\.vue$/));

const routes = [
    {
        path: '/containerpage',
        name: 'ContainerPage',
        component: ContainerPage,
        meta: {displayName: '首页'},
        children: [
            {
                path: '/table1',
                name: 'Table1',
                component: Table1,
                meta: {displayName: '页面1'}
            },
            {
                path: '/flowTable',
                name: 'FlowTable',
                component: FlowTable,
                meta: {displayName: '页面1'}
            },
            {
                path: '/interfaceTable',
                name: 'InterfaceTable',
                component: InterfaceTable,
                meta: {displayName: '网络接口列表'}
            },
            {
                path: '/interfaceDetailTable',
                name: 'InterfaceDetailTable',
                component: InterfaceDetailTable,
                meta: {displayName: '网络接口详细信息列表'}
            }, {
                path: '/packageTable',
                name: 'PackageTable',
                component: PackageTable,
                meta: {displayName: '封装头列表'}
            },
            {
                path: '/packageDetailTable',
                name: 'PackageDetailTable',
                component: PackageDetailTable,
                meta: {displayName: '封装头详细信息列表'}
            }, {
                path: '/appTable',
                name: 'AppTable',
                component: AppTable,
                meta: {displayName: '应用头列表'}
            },
            {
                path: '/appDetailTable',
                name: 'AppDetailTable',
                component: AppDetailTable,
                meta: {displayName: '应用头详细信息列表'}
            }, {
                path: '/messageTable',
                name: 'MessageTable',
                component: MessageTable,
                meta: {displayName: '消息体列表'}
            },
            {
                path: '/messageDetailTable',
                name: 'MessageDetailTable',
                component: MessageDetailTable,
                meta: {displayName: '消息体详细信息列表'}
            },
            {
                path: '/transRulesTable',
                name: 'TransRulesTable',
                component: TransRulesTable,
                meta: {displayName: '转换规则列表'}
            },
            {
                path: '/transRulesDetailTable',
                name: 'TransRulesDetailTable',
                component: TransRulesDetailTable,
                meta: {displayName: '转换规则详细信息列表'}
            }, {
                path: '/funcTable',
                name: 'FuncTable',
                component: FuncTable,
                meta: {displayName: '常用函数列表'}
            }, {
                path: '/packTable',
                name: 'PackTable',
                component: PackTable,
                meta: {displayName: '封装函数列表'}
            },
            {
                path: '/table2',
                name: 'Table2',
                component: Table2,
                meta: {displayName: '页面2'}
            },
            {
                path: '/customBpmn',
                name: 'CustomBpmn',
                component: CustomBpmn,
                meta: {displayName: '图形界面'},

            }, {
                path: '/index',
                name: 'Index',
                //component: () => import('@/static/login.html'),
                component: Index,
                meta: {displayName: '首页'}
            }, {
                path: '/index',
                name: 'Index',
                //component: () => import('@/static/login.html'),
                component: Index,
                meta: {displayName: '首页'}
            }
            , {
                path: '/devicestatus',
                name: 'Devicestatus',
                //component: () => import('@/static/login.html'),
                component: Devicestatus,
                meta: {displayName: '设备状态'}
            }
            , {
                path: '/wwwstatus',
                name: 'www_status',
                //component: () => import('@/static/login.html'),
                component: www_status,
                meta: {displayName: '网内成员状态'}
            }
            , {
                path: '/subwww',
                name: 'sub_www',
                //component: () => import('@/static/login.html'),
                component: sub_www,
                meta: {displayName: '功能子网'}
            }
            , {
                path: '/inforstatistics',
                name: 'infor_statistics',
                //component: () => import('@/static/login.html'),
                component: infor_statistics,
                meta: {displayName: '消息统计'}
            }
            , {
                path: '/localparametersetting',
                name: 'local_parameter_setting',
                //component: () => import('@/static/login.html'),
                component: local_parameter_setting,
                meta: {displayName: '本地参数设置'}
            }, {
                path: '/forwardingrules',
                name: 'forwarding_rules',
                //component: () => import('@/static/login.html'),
                component: forwarding_rules,
                meta: {displayName: '转发规则'}
            }
            , {
                path: '/distributionrules',
                name: 'distribution_rules',
                //component: () => import('@/static/login.html'),
                component: distribution_rules,
                meta: {displayName: '分发规则'}
            }
            , {
                path: '/Transcodingrule',
                name: 'Transcoding_rule',
                //component: () => import('@/static/login.html'),
                component: Transcoding_rule,
                meta: {displayName: '数据转码规则'}
            }, {
                path: '/time_sync',
                name: 'time_sync',
                //component: () => import('@/static/login.html'),
                component: time_sync,
                meta: {displayName: '时间同步'}
            }

            , {
                path: '/linkmanagement',
                name: 'link_management',
                //component: () => import('@/static/login.html'),
                component: link_management,
                meta: {displayName: '系统运维'}
            }
            , {
                path: '/systemstatus',
                name: 'Systemstatus',
                //component: () => import('@/static/login.html'),
                component: Systemstatus,
                meta: {displayName: '系统运行总览'}
            }
            , { path: '/carstatus',
                name: 'Carstatus',
                //component: () => import('@/static/login.html'),
                component: Carstatus,
                meta: {displayName: '车辆状态'}
            }
            , {
                path: '/carstatus',
                name: 'Carstatus',
                //component: () => import('@/static/login.html'),
                component: Carstatus,
                meta: {displayName: '无人机状态'}
            }
            , {
                path: '/carstatus',
                name: 'Carstatus',
                //component: () => import('@/static/login.html'),
                component: Carstatus,
                meta: {displayName: '位置管理'}
            }
            , {
                path: '/carstatus',
                name: 'Carstatus',
                //component: () => import('@/static/login.html'),
                component: Carstatus,
                meta: {displayName: '设备管理'}
            }


        ]


    },
    {
        path: '/',
        redirect:
            '/loginpage',
    },

    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/common/About.vue'),
        meta: {displayName: '关于页面'}
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/Login.vue'),
        meta: {displayName: '登陆页面'}
    },
    {
        path: '/loginpage',
        name: 'loginpage',
        component: loginpage,
        meta: {displayName: '登录'}
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router
