<template>
  <div class="loophole_item">
    <div class="spliter-top"></div>
    <div class="content">
      <div class="left">
        <span>{{config.time}}</span>
      </div>
      <div class="center">
        <i class="el-icon-message"></i>
        <div class="spliter"></div>
      </div>
      <div class="right">
        <div class="row" v-for="(item, i) in colMap" :key="i">
          <div class="label">{{item}}</div>
          <div v-if="i=='level'" class="value level" :class="levelClass(config[i])">{{config[i] | displayLevel}}</div>
          <div v-else class="value">{{config[i]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loophole_item",
  props: ["config"],
  data() {
    return {
      colMap: {
        name: "漏洞名称：",
        origin: '漏洞来源：',
        level: "风险级别：",
        // description: "风险描述：",
      }
    };
  },
  mounted() {
    this.init();
  },
  filters: {
    displayLevel(level) {
      return level || "无";
    }
  },
  methods: {
    init() {},
    levelClass(level) {
      switch (level) {
        case '严重':
          return "critical";
        case '高危':
          return "high";
        case '中危':
          return "middle";
        case '低危':
          return "low";
        default:
          return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.loophole_item {
  &:first-child {
    .spliter-top {
      display: none;
    }
  }
  &:last-child {
    .spliter {
      display: none;
    }
  }
  .spliter-top {
    width: 0px;
    height: 20px;
    border-left: 1px solid #0099cc;
    margin-left: calc(22.5% - 1px);
  }
  .content {
    position: relative;
    width: 100%;
    color: #fff;
    user-select: none;
    display: flex;
    justify-content: space-around;
    overflow: hidden;
    .left {
      width: 15%;
      text-align: right;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      * {
        text-align: justify;
      }
    }
    .center {
      // min-height: 130px;
      i {
        height: 2em;
        width: 2em;
        line-height: 2em;
        border-radius: 50%;
        border: 2px solid rgba(0, 153, 204,0.02);
        color: rgb(0, 153, 204);
        background: #0a234b;
        font-size: 1em;
      }
      .spliter {
        border-left: 1px solid #0099cc;
        width: 0px;
        height: 100%;
        margin: -2px auto 0 auto;
      }
    }
    .right {
      font-size: 12px;
      padding: 8px;
      width: 70%;
      height: 100%;
      border-style: solid;
      border-width: 1px;
      border-color: rgba(0, 153, 204,0.2);
      // border-radius: 4px;
      background-color: rgba(0, 153, 204, 0.05);
      .row {
        line-height: 1.55;
        display: flex;
        .label {
          min-width: 70px;
          color: #01b7ff;
        }
        .value {
          color: #fff;
          &.level {
            font-size: 0.85em;
            border-style: solid;
            border-width: 1px;
            border-radius: 2px;
            padding: 0 5px;
            height: 17px;
            line-height: 17px;
            &.critical {
              border-color: rgb(208, 5, 34);
              background-color: rgba(208, 5, 34, 0.702);
            }
            &.high {
              border-color: rgb(255, 104, 22);
              background-color: rgba(255, 104, 22, 0.702);
            }
            &.middle {
              border-color: rgb(255, 247, 22);
              background-color: rgba(255, 247, 22, 0.702);
            }
            &.low {
              border-color: rgb(0, 255, 168);
              background-color: rgba(0, 255, 168, 0.702);
            }
            &.normal {
              border-color: rgb(0, 203, 245);
              background-color: rgba(0, 203, 245, 0.702);
            }
          }
        }
      }
    }
  }
}
</style>


