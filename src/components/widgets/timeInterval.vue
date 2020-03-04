<template>
  <div class="time_interval">
    <el-select v-model="model" @change="$emit('update:value', $event)">
      <el-option :label="times[2]" value="24h"></el-option>
      <el-option :label="times[3]" value="7d"></el-option>
      <el-option :label="times[4]" value="30d"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "time_interval",
  props: ["value"],
  data() {
    return {
      model: this.value,
      times: $i18n.messages[$i18n.locale].times
    };
  },
  watch: {},
  mounted() {},
  filters: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "src/styles/var.scss";
.time_interval {
  user-select: none;
  padding: 0;
  margin: 0;
  width: 110px;
  /deep/ .el-select {
    .el-input__icon {
      color: #fff;
    }
    .el-input__inner {
      background: #d3d3d3;
      color: #fff;
      border-radius: 15px;
      height: 22px;
      padding: 0px 15px;
      outline: none;
    }
  }
}
</style>


