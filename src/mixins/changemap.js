import echarts from "echarts";
export default {
  data() {
  },
  methods: {
    getInstance(instance) {
      if (instance) {
        this.chart = instance;
        this.chart.resize();
        var chinaEchartsObj = echarts.getMap('world');
        var geoJSONChina = chinaEchartsObj.geoJson;
        var allDefProvince = geoJSONChina.features;
        for(var i=0,len=allDefProvince.length; i<len; i++){
          var sglProvinceProperties = allDefProvince[i].properties;
          var sglProvinceName = sglProvinceProperties.name;
          switch(sglProvinceName){
            case 'United States':
              sglProvinceProperties.cp=[-98.10268889453125,40.843369154871226]; 
              break;
            case 'Russia':
              sglProvinceProperties.cp=[117.14145173046873,61.14088023564832]; 
              break;
          }
        }
        echarts.registerMap('world', geoJSONChina, {});
      }
    }
  }
}