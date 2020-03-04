/**
 * @author weidenglong
 * created on 2019年9月10日15:11:37
 * @topic  汇报情况的API
 */
// import fetch from 'utils/FetchHandle';
import fetch from './Fetch';
import {
  param
} from 'utils';
const common = require('./common');

const managementApi = {
  getmanagementList(params) {
    return fetch({
      url: '/api/admin/task/list/',
      method: 'get',
      data: params
    });
  },
 //编辑详情
 getmanagementview(params) {
  return fetch({
    url: '/api/admin/task/',
    method: 'get',
    params
  });
},
getmanagementEidt(params) {
  return fetch({
    url: '/api/admin/task/',
    method: 'post',
    data: params
  });
},
}

export {
  managementApi
};