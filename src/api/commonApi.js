
import fetch from 'utils/FetchHandle';
import serializeHttpParam from 'utils';
const loginApi = {
  login(params) {
    return fetch({
      url: '/api/v1/login/',
      method: 'post',
      data: params
    });
  },
  logout() {
    return fetch({
      url: '/api/v1/logout/',
      method: 'post',
      data: {}
    });
  },
  getCode() {
    return fetch({
      url: '/api/v1/getCode',
      method: 'get'
    });
  },
  userInfo: () => {
    return fetch({
      url: '/api/v1/isLogin',
      method: 'get'
    });
  },
}
const auditApi = {
  getList(params) {
    return fetch({
      url: '/api/v1/audit/',
      method: 'get',
      params
    });
  },
}
const jijinApi = {
  getList(params) {
    return fetch({
      url: '/api/v1/jijin/',
      method: 'get',
      params
    });
  },
  addCode(params) {
    return fetch({
      url: '/api/v1/addcode/',
      method: 'post',
      data: params
    });
  },
  upList(params) {
    return fetch({
      url: '/api/v1/upList/',
      method: 'post',
      data: params
    });
  },
  downList(params) {
    return fetch({
      url: '/api/v1/downList/',
      method: 'post',
      data: params
    });
  },
}

export {
  loginApi,
  auditApi,
  jijinApi
};