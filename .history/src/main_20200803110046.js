import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import axios from "axios"
//导入全局样式表
import './assets/css/global.css';
//导入字体图标
import './assets/fonts/iconfont.css';

Vue.config.productionTip = false;
// 设置默认URL
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";
// 设置token权限认证
axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem("token");
  console.log(config);
  return config;
})
// 设置axios原型
Vue.prototype.$http = axios;
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
