import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => {
        require(['@/views/login.vue'], resolve);
    }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => {
        require(['@/views/error-page/404.vue'], resolve);
    }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => {
        require(['@//views/error-page/403.vue'], resolve);
    }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => {
        require(['@/views/error-page/500.vue'], resolve);
    }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    meta: {
        auth: true
    },
    children: [
        {
            path: 'home', title: {i18n: 'home'}, name: 'home_index', meta: {auth: true}, component: resolve => {
                require(['@/views/home/home.vue'], resolve);
            }
        },
        {
            path: '/task/addJob', title: {i18n: 'addjob'}, name: 'addJob', meta: {auth: true}, component: resolve => {
                require(['@/views/task/job/add.vue'], resolve);
            }
        },
        {
            path: '/task/addNode', title: {i18n: 'addnode'}, name: 'addNode', meta: {auth: true}, component: resolve => {
                require(['@/views/task/node/add.vue'], resolve);
            }
        },
        {
            path: '/task/addCategory', title: {i18n: 'addcategory'}, name: 'addCategory', meta: {auth: true}, component: resolve => {
                require(['@/views/task/category/add.vue'], resolve);
            }
        }
    ]
};
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/task',
        icon: 'ios-folder',
        name: 'task',
        title: '任务管理',
        component: Main,
        meta: {
            auth: true
        },
        children: [
            {
                path: 'jobs',
                icon: 'ios-paper-outline',
                name: 'jobs',
                title: '任务列表',
                component: resolve => {
                    require(['@/views/task/job/list.vue'], resolve);
                }
            },
            {
                path: 'nodes',
                icon: 'ios-list-outline',
                name: 'nodes',
                title: '节点列表',
                component: resolve => {
                    require(['@/views/task/node/list.vue'], resolve);
                }
            },
            {
                path: 'categorys',
                icon: 'ios-list-outline',
                name: 'categorys',
                title: '分类列表',
                component: resolve => {
                    require(['@/views/task/category/list.vue'], resolve);
                }
            },
            {
                path: 'logs',
                icon: 'ios-list-outline',
                name: 'logs',
                title: '日志列表',
                component: resolve => {
                    require(['@/views/task/log/list.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/page',
        icon: 'ios-paper',
        title: '配置管理',
        name: 'page',
        component: Main,
        meta: {
            auth: true
        },
        children: [
            {
                path: 'index', title: 'Page', name: 'page_index', component: resolve => {
                    require(['@/views/page/page.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/performance',
        icon: 'ios-folder',
        name: 'performance',
        title: '性能查看',
        component: Main,
        meta: {
            auth: true
        },
        children: [
            {
                path: 'performances',
                icon: 'ios-list-outline',
                name: 'performances',
                title: '节点性能',
                component: resolve => {
                    require(['@/views/performance/list.vue'], resolve);
                }
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
