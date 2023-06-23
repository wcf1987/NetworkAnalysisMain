import { createRouter, createWebHashHistory } from 'vue-router'
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
    meta: { displayName: '页面1' }
  },
         {
    path: '/flowTable',
    name: 'FlowTable',
    component: FlowTable,
    meta: { displayName: '页面1' }
  },
{
    path: '/interfaceTable',
    name: 'InterfaceTable',
    component: InterfaceTable,
    meta: { displayName: '网络接口列表' }
  },
{
    path: '/interfaceDetailTable',
    name: 'InterfaceDetailTable',
    component: InterfaceDetailTable,
    meta: { displayName: '网络接口详细信息列表' }
  },{
    path: '/packageTable',
    name: 'PackageTable',
    component: PackageTable,
    meta: { displayName: '封装头列表' }
  },
{
    path: '/packageDetailTable',
    name: 'PackageDetailTable',
    component: PackageDetailTable,
    meta: { displayName: '封装头详细信息列表' }
  },{
    path: '/appTable',
    name: 'AppTable',
    component: AppTable,
    meta: { displayName: '应用头列表' }
  },
{
    path: '/appDetailTable',
    name: 'AppDetailTable',
    component: AppDetailTable,
    meta: { displayName: '应用头详细信息列表' }
  },{
    path: '/messageTable',
    name: 'MessageTable',
    component: MessageTable,
    meta: { displayName: '消息体列表' }
  },
{
    path: '/messageDetailTable',
    name: 'MessageDetailTable',
    component: MessageDetailTable,
    meta: { displayName: '消息体详细信息列表' }
  },
        {
    path: '/transRulesTable',
    name: 'TransRulesTable',
    component: TransRulesTable,
    meta: { displayName: '转换规则列表' }
  },
{
    path: '/transRulesDetailTable',
    name: 'TransRulesDetailTable',
    component: TransRulesDetailTable,
    meta: { displayName: '转换规则详细信息列表' }
  }, {
    path: '/funcTable',
    name: 'FuncTable',
    component: FuncTable,
    meta: { displayName: '常用函数列表' }
  }, {
    path: '/packTable',
    name: 'PackTable',
    component: PackTable,
    meta: { displayName: '封装函数列表' }
  },
  {
    path: '/table2',
    name: 'Table2',
    component: Table2,
    meta: { displayName: '页面2' }
  },


    {
        path: '/customBpmn',
        name: 'CustomBpmn',
        component: CustomBpmn,
        meta: { displayName: '图形界面' }
    }
    ]


  },
    {
    path: '/',
    redirect: '/login',
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/common/About.vue'),
    meta: { displayName: '关于页面' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue'),
    meta: { displayName: '登陆页面' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
