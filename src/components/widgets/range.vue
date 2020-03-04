<template>
  <div class="bar_range">
    <el-tooltip v-for="(item, key) in config" :key="key" effect="light" 
      :content="displayContent(item, key)" placement="bottom">
      <div v-if="!!item" class="item" :class="key" :style="renderStyle(item)">
        <div v-if="!hideText">{{item}}</div>
      </div>
      <div v-else></div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: "bar_range",
  props:{
    config:Object,
    hideText:Boolean,
     type: {
      default: ""
    },
  },
  data() {
    return {
      clientWidth: 0
    };
  },
  mounted() {
    if (this.$el) this.clientWidth = this.$el.clientWidth;
  },
  filters: {},
  methods: {
    displayContent(val, key) {
      let level =this.type==='vuln'?$i18n.messages[$i18n.locale].vuln: $i18n.messages[$i18n.locale].level;
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
      return `${risk}: ${val}`;
    },
    renderStyle(val) {
      if (!this.clientWidth) return {};
      let total = 0;
      for (let k in this.config) {
        if (this.config[k]) total += parseInt(this.config[k]);
      }
      let per = parseInt(val) / total;
      return {
        width: this.clientWidth * per + "px"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/var.scss";
.bar_range {
  user-select: none;
  display: flex;
  white-space: nowrap;
  color: #fff;
  height: 18px;
  width: 100%;
  line-height: 18px;
  .item {
    max-width: 100%;
    text-align: center;
    white-space: nowrap;
    &:not(:last-child) {
      margin-right: 2px;
    }
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


