import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus, {ElIcon, ElMenu, ElMenuItem} from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import router from './router'
import store from './store/index'
import HTTPRequest from '@/plugins/axiosInstance'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {ArrowRight, Location} from '@element-plus/icons-vue'
import 'bpmn-js/dist/assets/diagram-js.css' // 左边工具栏以及编辑节点的样式
import 'bpmn-js/dist/assets/bpmn-js.css'
import './App.scss'
//import '@/css/index.scss';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import {createPinia} from 'pinia'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'


//const app = createApp(App)
//installElementPlus(app)
//app.mount('#app')
const pinia = createPinia()

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

if (process.env.NODE_ENV == "development"){
    HTTPRequest.defaults.baseURL = "/api";
}
else{
    HTTPRequest.defaults.baseURL = "http://localhost:9080"
}
//HTTPRequest.defaults.baseURL = "http://localhost:9080"
HTTPRequest.defaults.headers.post['Content-Type'] = 'application/json';
app.config.globalProperties.$http = HTTPRequest
app.use(store).use(pinia).use(router).use(ElementPlus, {locale: zhCn}).use(ElIcon).use(ElMenu).use(ElMenuItem).component('location', Location).component('arrowRight', ArrowRight)


app.mount('#app')

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && store.state.username === '') next({name: 'Login'})
    else next()
})


//const app2=createApp(ContainerPage)

//app2.mount('#app')