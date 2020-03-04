/**
 * @author yuantingfei
 * created on 2019年9月6日11:11:37
 * @topic  任务集的API
 */
// import fetch from 'utils/FetchHandle';
import fetch from './Fetch';
import {
  param
} from 'utils';
const common = require('./common');

const mediaApi = {
  getmediaList(params) {
    return fetch({
      url: '/api/admin/media/list/',
      method: 'get',
      data: params
    });
  },
  deleteEvent(params) {
    return fetch({
      url: '/api/admin/media/',
      method: 'delete',
      data: params
    });
  },
  getmediaview(params) {
    return fetch({
      url: '/api/admin/media/',
      method: 'get',
      params
    });
  },
  getmediaEidt(params) {
    return fetch({
      url: '/api/admin/media/',
      method: 'post',
      data: params
    });
  },
  
}

export {
  mediaApi
};