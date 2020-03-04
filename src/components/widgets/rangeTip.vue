<template>
  <div class="bar_range" ref="bar_range">
    <el-popover ref="popover" placement="left" trigger="hover" popper-class="tooltip" 
      :visible-arrow="false" :popper-options="options">
      <div v-for="(item, key) in config" :key="key" class="tooltip-item">
        <i class="_block" :class="key"></i>
        <span>{{displayContent(item, key)}}</span>
      </div>
    </el-popover>

    <div v-popover:popover class="range-content">
      <div v-for="(item, key) in config" :key="key" class="item" :class="key" :style="{width: computeWidth(item)}">
        <div v-if="!hideText">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bar_range",
  props: ["config", "hideText"],
  data() {
    return {
      total: 0,
      options: {}
    };
  },
  mounted() {
    this.computeTotal();
  },
  watch: {
    config: {
      handler() {
        this.computeTotal();
      },
      deep: true
    }
  },
  filters: {},
  methods: {
    computeTotal() {
      let total = 0;
      for (let k in this.config) {
        if (this.config[k]) total += parseInt(this.config[k]);
      }
      return (this.total = total);
    },
    displayContent(val, key) {
      let level = $i18n.messages[$i18n.locale].level;
      let risk = "";
      switch (key) {
        case "critical":
          risk = level[4];
          break;
        case "high":
          risk = level[3];
          break;
        case "medium":
          risk = level[2];
          break;
        case "low":
          risk = level[1];
          break;
        case "info":
          risk = level[0];
          break;
        default:
          break;
      }
      let per = !!this.total ? Number(+val / this.total * 100).toFixed(2) : 0;
      return `${risk}: ${val} (${Number(per)}%)`;
    },
    computeWidth(val) {
      let per = !!this.total ? +val / this.total : 0;
      return 100 * per + "%";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/var.scss";
.bar_range {
  cursor: pointer;
  user-select: none;
  color: #fff;
  width: 100%;
  line-height: 18px;
  height: 6px;
  border-radius: 3px;
  .range-content {
    display: flex;
    align-items: center;
    white-space: nowrap;
    width: 100%;
    height: 100%;
    .item {
      max-width: 100%;
      height: 100%;
      text-align: center;
      white-space: nowrap;
      &.critical {
        background: $very-high-color;
      }
      &.high {
        background: $high-color;
      }
      &.medium {
        background: $mid-color;
      }
      &.low {
        background: $low-color;
      }
      &.info {
        background: $very-low-color;
      }
    }
  }
}

.tooltip-item {
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 0 5px;
  font-size: 14px;
  ._block {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    display: inline-block;
    margin-right: 5px;
    &.critical {
      background: $very-high-color;
    }
    &.high {
      background: $high-color;
    }
    &.medium {
      background: $mid-color;
    }
    &.low {
      background: $low-color;
    }
    &.info {
      background: $very-low-color;
    }
  }
}
</style>