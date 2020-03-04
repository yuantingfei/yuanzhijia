<template>
  <div class="_notification">
    <div class="icon">
      <i class="el-icon-message"></i>
    </div>
    <div class="content">
      <div class="notice_type" v-if="notice.type">{{notice.type}}</div>
      <div class="notice_content" @click="reviewDetail(notice.ticketUuid)">{{notice.content}}</div>
      <div class="notice_time">{{notice.time | parseTime}}</div>
      <div v-if="!!!type" class="mark" @click="mark">
        <el-tooltip effect="dark" :content="tooltip" placement="top">
          <i class="el-icon-message"></i>
        </el-tooltip>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { parseTime } from "utils";
let langCommon = $i18n.messages[$i18n.locale];
export default {
  name: "notification",
  props: {
    notice: {
      type: Object,
      default: {}
    },
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  computed: {
    tooltip() {
      return this.type ? `${langCommon.mark}${langCommon.unread}` : `${langCommon.mark}${langCommon.read}`;
    }
  },
  filters: {
    parseTime
  },
  methods: {
    mark() {
      this.$emit("mark");
    },
    reviewDetail(ticketUuid) {
      this.$emit("contentClick");
      this.$emit("mark");
      ticketUuid &&
        this.$router.push({
          path: "/order/acceptedDetail",
          query: {
            uuid: ticketUuid
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
._notification {
  width: 100%;
  line-height: 1;
  display: flex;
  .icon {
    width: 80px;
    font-size: 2.5vw;
    color: #1989d4;
  }
  .content {
    position: relative;
    width: calc(100% - 80px);
    font-size: 16px;
    background: #fff;
    padding: 10px 20px;
    border: 1px solid #e2e2e2;
    border-radius: 2px;
    overflow: hidden;
    .notice_type {
    }
    .notice_content {
      margin: 10px 0;
      line-height: 1.2;
      word-break: break-word;
      &:hover {
        cursor: pointer;
      }
    }
    .notice_time {
      font-size: 12px;
      color: #97a8be;
    }
    .mark {
      position: absolute;
      right: 20px;
      top: 10px;
      cursor: pointer;
    }
  }
}
</style>