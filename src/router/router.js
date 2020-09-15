import Vue from 'vue';
import VueRouter from 'vue-router';
// import Login from './components/Login.vue'
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Login.vue')
// import Home from './components/Home.vue'
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Home.vue')
// import Welcome from './components/Welcome.vue'
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Welcome.vue')

// import Users from './components/user/Users.vue'
const Users = () => import(/* webpackChunkName: "Users_Rights_Roles" */ './components/user/Users.vue')
// import Rights from './components/power/Rights.vue'
const Rights = () => import(/* webpackChunkName: "Users_Rights_Roles" */ './components/power/Rights.vue')
// import Roles from './components/power/Roles.vue'
const Roles = () => import(/* webpackChunkName: "Users_Rights_Roles" */ './components/power/Roles.vue')

// import Cate from './components/goods/Cate.vue'
const Cate = () => import(/* webpackChunkName: "Cate_Params" */ './components/goods/Cate.vue')
// import Params from './components/goods/Params.vue'
const Params = () => import(/* webpackChunkName: "Cate_Params" */ './components/goods/Params.vue')

// import GoodsList from './components/goods/List.vue'
//const GoodsList = () => import(/* webpackChunkName: "GoodsList_Add" */ './components/goods/List.vue')
// import Add from './components/goods/Add.vue'
const Add = () => import(/* webpackChunkName: "GoodsList_Add" */ './components/goods/Add.vue')

// import Order from './components/order/Order.vue'
const Order = () => import(/* webpackChunkName: "Order_Report" */ './components/order/Order.vue')
// import Report from './components/report/Report.vue'
const Report = () => import(/* webpackChunkName: "Order_Report" */ './components/report/Report.vue')
const Index = () => import(/* webpackChunkName: "Order_Report" */ './components/Index.vue')


// // import Login from '../components/Login.vue';
// const Login = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Login.vue')
// // import Home from "../components/Home.vue"
// const Home = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Home.vue')
// // import Welcome from "../components/Welcome.vue"
// const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Welcome.vue')
// import Users from "../components/user/Users.vue"

// import Rights from "../components/power/Rights.vue"
// import Roles from "../components/power/Roles.vue"
// import Cate from "../components/goods/Cate.vue"
// import Params from "../components/goods/Params"
// import List from "../components/goods/List"
// import Add from "../components/goods/Add"
// import Order from "../components/order/Order"
// import Report  from "../components/report/Report";
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: "/index",
        component: Index,
    },
    {
        path: "/home",
        component: Home,
        redirect: "/welcome",
        children: [{
            path: "/welcome",
            component: Welcome,
        },
        {
            path: "/users",
            component: Users,
        },
        {
            path: "/rights",
            component: Rights,
        },
        {
            path: "/roles",
            component: Roles,
        },
        {
            path: "/categories",
            component: Cate,
        }, {
            path: "/params",
            component: Params,
        }, {
            path: "/goods",
            component: List,
        }, {
            path: "/goods/add",
            component: Add,
        }, {
            path: "/orders",
            component: Order
        }, {
            path: "/reports",
            component: Report,
        }
        ]
    }
];


const router = new VueRouter({
    routes,
});


//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to--将要访问的路径
    // from--代表从哪个路径跳转而来
    // next是一个函数,代表放行
    // next()放行 next("/login")强制跳转
    if (to.path === "/login") {
        return next();
    }
    const tokenStr = window.sessionStorage.getItem("token");
    if (!tokenStr) {
        return next("/login");
    }
    next();
});

export default router;
