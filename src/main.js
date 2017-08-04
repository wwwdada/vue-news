import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routeConfig.js'
import axios from 'axios'
import Loading from './components/Loading'
import stores from './store/store'

require('./assets/css/base.css'); //引入全局的base文件

Vue.use(VueRouter);
Vue.use(Loading);

axios.interceptors.request.use(function (config) {  //配置发送请求的信息
  stores.dispatch('showLoading')  
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
  stores.dispatch('hideLoading')
  return response;
}, function (error) {

  return Promise.reject(error);
});

/*axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl:config.build.httpUrl);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';*/
//axios.defaults.baseURL='http://localhost:8081/';
Vue.prototype.$http = axios 

/*定义一个时间过滤器*/
Vue.filter('normalTime',function(time){
    if(time){
    var oDate=new Date();
    oDate.setTime(time);

    var y=oDate.getFullYear();
    var m=oDate.getMonth()+1;
    var d=oDate.getDate();

    var h=oDate.getHours();
    var m=oDate.getMinutes();
    var s=oDate.getSeconds();

    return y+'-'+m+'-'+d+' '+h+':'+m+':'+s;
  }
});

const router = new VueRouter({
	routes
});

new Vue({
  el: '#app',
  router,
  store:stores,
  render: h => h(App)
});
