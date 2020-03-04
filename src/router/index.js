import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import config from './config';
import axios from 'axios';
import {loginApi} from 'api/commonApi';
import {
  constantRouterMap,
  asyncRouterMap
} from './router';
import NProgress from 'nprogress';
import Cookies from 'js-cookie';

Vue.use(Router);
const CancelToken = axios.CancelToken;
const avoidLoginList = config.avoidLoginList; // 免登录白名单
const noCancelList = config.noCancelList; // 不取消请求白名单

const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

router.beforeEach(async function (to, from, next){
  NProgress.start(); // 开启Progress
  next()
  // if (to.path.startsWith('/login')) {
  //   window.localStorage.removeItem('access-user')
  //   next()
  // } else {
  //   let res = await loginApi.userInfo();
  //   console.log(res.data)
  //   if(res.data.code=="10002"){
  //     next()
  //   }else{
  //     next({
  //       path: '/login'
  //     })
  //   }
  //   // store.dispatch("set_userinfo", res.data.userInfo)
  //   // if (!store.getters.userinfo) {
  //   //   next({
  //   //     path: '/login'
  //   //   })
  //   // } else {
  //   //   next()
  //   // }
  // }
  NProgress.done();
});

router.onReady(() => {
  $("#jsload").hide(500);
})

router.afterEach((to, from) => {
  NProgress.done(); // 结束Progress
});

export default router;