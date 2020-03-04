<template>
  <div class="bar_progress">
    <!-- <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress> -->
    <div class="inner" :class="classObj" :style="{ width: width+'px' }">{{ `${value}/${total}` }}</div>
  </div>
</template>

<script>
export default {
  name: 'bar_progress',
  props: ['value', 'total'],
  data() {
    return {
      classObj: 0,
      width: 0
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init() {
      let per = parseInt(this.value)/parseInt(this.total),
      containerWidth = this.$el.clientWidth;
      if(per < 0.1) {
        this.classObj = 'low';
      } else if(per < 0.5) {
        this.classObj = 'small';
      } else if(per < 1) {
        this.classObj = 'big';
      } else {
        this.classObj = 'complete';
      }
      this.width = containerWidth * per;
    }
  }
}
</script>

<style lang="scss" scoped>
.bar_progress {
  width: 100%;
  color: #fff;
  background: #dcdcdc;
  user-select: none;
  height: 18px;
  line-height: 18px;
  .inner {
    max-width: 100%;
    white-space: nowrap;
    padding-left: 2px;
    &.low {
      background: #ED4E2A;
    }
    &.small {
      background: #FCB322;
    }
    &.big {
      background: #57B5E3;
    }
    &.complete {
      background: #3CC052;
    }
  }
}

</style>


