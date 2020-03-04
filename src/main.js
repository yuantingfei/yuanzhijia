// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from 'vue';
import App from './App';
import router from './router';
import store from "./store";
import i18n from './i18n';
import './components';
import filters from './filters';
import ElementUI from 'element-ui';
// import locale from 'element-ui/lib/locale/lang/en'
// import 'element-ui/lib/theme-default/index.css';
// import 'assets/custom-theme/index.css'; // 换肤版本element-ui css https://github.com/PanJiaChen/custom-element-theme
import 'element-ui/lib/theme-chalk/index.css';
import 'assets/custom-theme/index_2.4.11.scss';
import 'normalize.css/normalize.css'; // normalize.css 样式格式化
import 'styles/index.scss'; // 全局自定义的css样式
import 'assets/iconfont/iconfont';
import 'nprogress/nprogress.css';
import vueMoment from 'vue-moment';
if (process.env.NODE_ENV !== 'productionen')
{
  require('moment/locale/zh-cn');
}
// register globally

Vue.use(ElementUI,{
  i18n:(key,value) =>i18n.t(key,value) //重点！！在注册Element时设置i18n的处理方法（这里有个小坑）
})
Vue.use(vueMoment);
// Vue.use(vueWaves);
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});


// window.onunhandledrejection = e => {
//     console.log('unhandled', e.reason, e.promise);
//     e.preventDefault()
// }; 
// 生产环境错误日志

if (process.env === 'production') {
  Vue.config.errorHandler = function (err, vm) {
    console.log(err, window.location.href);
    errLog.pushLog({
      err,
      url: window.location.href,
      vm
    })
  };
}


// window.onerror = function (msg, url, lineNo, columnNo, error) {
//     console.log('window')
// };
//
// console.error = (function (origin) {
//     return function (errorlog) {
//         // handler();//基于业务的日志记录及数据报错
//         console.log('console'+errorlog)
//         origin.call(console, errorlog);
//     }
// })(console.error);
window.a=new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');