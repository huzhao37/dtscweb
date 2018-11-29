import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';

Vue.use(Vuex);
var state = {
    isLogin: false,   // 初始时候给一个 isLogin=0 表示用户未登录
   // isExit: true
};
const store = new Vuex.Store({
    mutations: {
        changeLogin (state, data) {
            state.isLogin = data;
        }
    },
    actions: {

    },
    modules: {
        app,
        user
    }
});

export default store;
