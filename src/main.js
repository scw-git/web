import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from "ant-design-vue";
import 'ant-design-vue/dist/antd.css';
import $http from '@/api'



Vue.use(Antd)
Vue.prototype.$http = $http
Vue.config.productionTip = false

//用于修改密码时，退出到首页，页面要重新登录
Vue.prototype.$vue = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
