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

const linkageApi = {
  getlinkageList(params) {
    return fetch({
      url: '/api/admin/sysreact/list/',
      method: 'get',
      data: params
    });
  },
  //编辑详情
  getlinkageview(params) {
    return fetch({
      url: '/api/admin/sysreact/',
      method: 'get',
      params
    });
  },
  //编辑接口
  getlinkageEidt(params) {
    return fetch({
      url: '/api/admin/sysreact/',
      method: 'post',
      data: params
    });
  },
}

export {
  linkageApi
};