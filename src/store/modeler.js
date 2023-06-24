import global from '@/store'
import {createStore} from "vuex"

const store = createStore({
    state: {
        bpmnModeler: null
    },
    mutations: {},
    actions: {},
    modules: {
        global
    }
})

export default store