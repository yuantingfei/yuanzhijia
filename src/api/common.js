import $http from '../utils/FetchHandle';
import { Notification } from 'element-ui';
import { serializeHttpParam } from 'utils';
import axios from 'axios';
import store from '../store';
let CancelToken = axios.CancelToken;

/**
 * [download file]
 * @param {*} url
 * @param {*} argObj
 */
export function downloadFile(url, argObj,ispost) {
  if(!url) return;
  let params= !argObj?{}:argObj;
  let req = {
    method: ispost?'post':'get',
    url: ispost?url:!argObj ? url : url + '?' + serializeHttpParam(argObj),
    timeout: 120000,
    data:params,
    responseType: 'blob',
    cancelToken: new CancelToken(function executor(cancel) {
      // executor 函数接收一个 cancel 函数作为参数
      store.dispatch('SetCancelToken', {
        cancel: cancel
      })
    })
  };

  $http(req).then(function (res) {
    var filename = res.headers['content-disposition'].split('=');
    var blob = new Blob([res.data], { type: res.data.type });
    autoDownloadFile(filename[1], blob);
  }).catch(function (err) {
    // Notification({
    //   message: `文件下载失败`,
    //   type: 'error'
    // });
  });
}

export function autoDownloadFile(filename, data) {
  var doc = document;
  var a = doc.createElement("a");
  doc.body.appendChild(a);
  a.download = decodeURI(_.trim(filename, '"'));
  a.href = typeof (data) === 'string' ? data : URL.createObjectURL(data);
  a.click();
  doc.body.removeChild(a);
}
// const columnlist={
//   getColumnList(query) {
//     return $http({
//       url: '/v1/get/column/list',
//       method: 'get',
//       params: query
//     });
//   },
//   saveColumnList(query) {
//     let data = query;
//     return $http({
//       url: '/v1/save/column/list',
//       method: 'post',
//       data
//     });
//   }
// }
// export {
//   columnlist
// };