import axios from 'axios';
import wrapper from '../cache';
import router from '../router/index';
import {
  Message,
  Loading
} from 'element-ui';
import store from '../store';
import Cookies from 'js-cookie';
const SERVICE = axios.create({
  // baseURL: process.env.BASE_API,
  timeout: 100000,
});

// let http = wrapper(SERVICE, {
//   maxCacheSize: 15,
//   ttl: 5000
// });

SERVICE.interceptors.request.use(
  config => {
    //todo: 调用rap 返回模拟的数据移除X-Token 要不然会报错
    // if (store.getters.token) {
    //   console.log(232323233)
    //   config.headers['X-AUTH-TOKEN'] = store.getters.token;
    // };
    // if (process.env.NODE_ENV === 'productionen') config.headers['Accept-Language'] = "en-US"; //国际化
    // // config.url = config.url + '?' + new Date().getTime();
    // const cancelToken = store.getters.cancelSource.token;
    // if (cancelToken) config.cancelToken = cancelToken;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

SERVICE.interceptors.response.use(
  response => {
    const CODE = response.status;
    switch (CODE) {
      case 400:
        break;
      case 403: //logout
        break;
      default:
        // response.data=Mock.mock(response.data);
        return response;
    }
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        // case 400:
        //  error.message = '请求错误'
        //   break

        case 401:
          error.message = error.response.data.msg;
          break

        case 403:
          error.message = error.response.data.msg;
          //  用户未登录
          // console.log( error.response )
          // if(error.response.data.msg === ""){
          //   error.response  = false
          // }
          store.dispatch('LogOut').then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break
        case 405:
          error.message = `请求地址无权限: ${error.response.config.url}`;
          break
        case 500:
          error.message = '服务器内部出错';
          break
          // case 408:
          //   error.message = '请求超时'
          //   break

          // case 500:
          //  error.message = '服务器内部错误'
          //   break

          // case 501:
          //   error.message= '服务未实现'
          //   break

          // case 502:
          //   error.message = '网关错误'
          //   break

          // case 503:
          //  error.message = '服务不可用'
          //   break

        case 504:
          error.message = '网关超时'
          break

          // case 505:
          //   error.message = 'HTTP版本不受支持'
          //   break

        default:
          error.message = error.response.data.msg;
      }
    }
    if (error.response && error.response.data && error.response.data.msg == "用户登录超时") {
      error.response && error.response.config && error.response.config.url !== '/login'
    } else {
      error.response && error.response.config &&
        error.response.config.url !== '/login' &&
        error.response.config.url.indexOf("dictionary") < 0 &&
        Message({
          message: error.message,
          type: 'error',
          showClose: true,
          duration: 5 * 1000
        });
    }
    return Promise.reject(error);
  }
);

export default SERVICE;