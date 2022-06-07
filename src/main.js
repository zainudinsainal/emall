import Vue from 'vue'
import App from './App.vue'
import FastClick from "fastclick"
import router from "./router/index"
import store from "./store/index"

//1.引用FastClick
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

//2.引用全局样式
import "./style/common.less"

//3.引入ui组件库-Vant Weapp
import "./plugins/vant"

//4.引入rem
import "./config/rem.js"

//5.引入过滤器
import "./config/filters"


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
