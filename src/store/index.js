import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
Vue.use(Vuex)

//我们保存的状态
const state = {
    count: 1
}
export default new Vuex.Store({
    state,
    mutations
})