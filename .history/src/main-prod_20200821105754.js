import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import './plugins/element.js';
import axios from "axios";
import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import moment from "moment"
//导入全局样式表
import './assets/css/global.css';
//导入字体图标
import './assets/fonts/iconfont.css';
import VueRouter from 'vue-router';
import TreeTable from "vue-table-with-tree-grid";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
Vue.config.productionTip = false;
// 设置默认URL
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";
// 设置token权限认证
axios.interceptors.request.use((config) => {
    config.headers.Authorization = window.sessionStorage.getItem("token");
    return config;
})
Vue.component("tree-table", TreeTable);
// 设置axios原型
Vue.prototype.$http = axios;
//设置格式化时间原型
moment.locale('zh-cn');
Vue.filter('format', function (val) {
    const dt = new Date(val);
    const y = dt.getFullYear();
    const m = (dt.getMonth() + 1 + "").padStart(2, "0");
    const d = (dt.getDate() + "").padStart(2, "0");

    const hh = (dt.getHours() + "").padStart(2, "0");
    const mm = (dt.getMinutes() + "").padStart(2, "0");
    const ss = (dt.getSeconds() + "").padStart(2, "")
    return `${y}-${m}-${d} ${hh}-${mm}-${ss}`
})
Vue.use(VueQuillEditor)
new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}