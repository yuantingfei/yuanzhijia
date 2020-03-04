import fetch from 'utils/FetchHandle';
import serializeHttpParam from 'utils';

export default {
  groupSecurityOverview:{
    getLatestAlarms(params){
      return fetch({
        url: '/api/v1/latestAlarms',
        method: 'get',
        params
      });
    },
    top5(){
      return fetch({
        url: '/api/v1/top5/',
        method: 'get'
      });
    },
    getMapData(){
      return fetch({
        url: '/api/v1/map/',
        method: 'get'
      });
    },
    statistics(){
      return fetch({
        url: '/api/v1/statistics/',
        method: 'get'
      });
    }
  } 
};