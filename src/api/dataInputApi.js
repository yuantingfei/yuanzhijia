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

const dataInputApi = {
  getEventList(params) {
    return fetch({
      url: '/api/admin/event/list/',
      method: 'get',
      params
    });
  },
  addEvent(params) {
    return fetch({
      url: '/api/admin/event/',
      method: 'post',
      data: params
    });
  },
  getOneEvent(params) {
    return fetch({
      url: '/api/admin/event/',
      method: 'get',
      params
    });
  },
  deleteEvent(params) {
    return fetch({
      url: '/api/admin/event/',
      method: 'delete',
      data: params
    });
  },
  
  // 阶段任务中的附件删除（只存在已保存后的阶段任务操作)
  downFile(params) {
    common.downloadFile("/v1/task/downloadStageAttach",params);
  },
}

export {
  dataInputApi
};