<template>
  <div class="echarts" ref="echartsContainer"></div>
</template>

<script>
import echarts from "echarts";
import "echarts-gl";
const moduleConfig = {};

export default {
  name: "echarts",
  props: ["config", "type"],
  data() {
    return {
      myChart: null
    };
  },
  watch: {
    config: {
      handler(val, oldVal) {
        this.myChart && this.myChart.setOption(this.option);
      },
      deep: true // 深度观察
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    option() {
      return _.defaultsDeep(this.config, moduleConfig);
    }
  },
  beforeDestroy() {
    // window.removeEventListener('resize', this.myChart.resize);
    // this.myChart.dispose(); // 销毁图表实例(会与keep-alive冲突)
  },
  methods: {
    init() {
      let dom = this.$el;
      let myChart = echarts.init(dom);
      myChart.setOption(this.option, {
        notMerge: false,
        lazyUpdate: false,
        silent: false
      });
      this.myChart = myChart;
      this.myChart.on('click', (params) => {
         this.$emit("echartsClick", params);
      })
      this.$emit("echartsInstance", myChart);
      window.addEventListener("resize", myChart.resize); // 图表响应大小
    }
  }
};
</script>

<style scoped lang="scss">
.echarts {
  margin: 0;
  width: 100%;
  height: 100%;
  -webkit-text-size-adjust: none;
}
</style>
