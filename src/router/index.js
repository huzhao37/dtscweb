import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import {routers} from './router';
import store from '../store';
import Cookies from 'js-cookie';
Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    let isLogin = sessionStorage.getItem('isLogin') === 'true';
    let usr = Cookies.get('user');
    if (to.matched.some(m => m.meta.auth)) {
        if (!store.state.isLogin && !isLogin && to.path !== '/login') {
            next({
                path: '/login'
            });
        } else if (!isLogin && to.path !== '/login') {    // 已经在登录页面进入首页的时候
            if (usr === '') {
                next({
                    path: '/login'
                });
            } else {
                sessionStorage.setItem('isLogin', store.state.isLogin);
                next();
            }
        } else if (isLogin && to.path !== '/login') {    // 登录进入后刷新页面时
            store.commit('changeLogin', isLogin);
            next();
        } else if (store.state.isLogin) { // 已经登陆
            next();  // 正常跳转到你设置好的页面
        } else {
            next({ path: '/login', query: {Rurl: to.fullPath} });// 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
        }
    } else {
        next();
    }
});

router.afterEach((to) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
