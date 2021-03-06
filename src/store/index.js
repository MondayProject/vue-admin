import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'


Vue.use(Vuex)

const state = {
    userInfo: null, //用户信息
    login: true,//是否登录
    imgPath: null//头像地址
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
})
