import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import axios from "axios"
//导入全局样式表
import './assets/css/global.css';
//导入字体图标
import './assets/fonts/iconfont.css';
import VueRouter from 'vue-router';
Vue.config.productionTip = false;
// 设置默认URL
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";
// 设置token权限认证
axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
})
// 设置axios原型
Vue.prototype.$http = axios;
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}