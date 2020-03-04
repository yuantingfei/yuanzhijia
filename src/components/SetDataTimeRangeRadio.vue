<template>
  <div class="SetDataTimeRangeRadio">
    <el-radio-group v-model="time_self">
        <el-radio :label="'5min'">最近5分钟</el-radio>
        <el-radio :label="'30min'">最近30分钟</el-radio>
        <el-radio :label="'24h'">最近24小时</el-radio>
        <el-radio :label="'7d'">最近7天</el-radio>
        <el-radio :label="'30d'">最近30天</el-radio>
        <el-radio :label="'custom'">指定时间</el-radio>
      </el-radio-group>
      <el-date-picker v-if="time_self=='custom'"
          v-model="dateTime"
          :editable="false"
          type="datetimerange"
          :range-separator="$i18n.messages[$i18n.locale].to "
          :start-placeholder="$i18n.messages[$i18n.locale].selectTime"
          :end-placeholder="$i18n.messages[$i18n.locale].selectTime"
          :default-time="['00:00:00', '23:59:59']"
          @change="change"
        ></el-date-picker>
  </div>
</template>

<script>
export default {
  name: "SetDataTimeRangeRadio",
  props: {
    time: {
      default: ""
    }
  },
  data() {
    return {
      separator: "--",
      dateTime:"",
      timeRange:"",
      time_self:"",
    };
  },
  watch: {
    time_self(val) {
      this.setTimeRange(val);
    },
    time(val){
      if(val){
        this.time_self = this.time;
      }
    }
  },
  computed:{
  },
  methods: {
    setTimeRange(val) {
      this.timeRange = [];
      let start, end;
      switch (val) {
        case "5min":
          start = this.$moment().subtract(5, "minutes");
          end = this.$moment();
          this.timeRange[0] = this.$moment(start).format("YYYY-MM-DD HH:mm:ss");
          this.timeRange[1] = this.$moment(end).format("YYYY-MM-DD HH:mm:ss");
          break;
        case "30min":
          start = this.$moment().subtract(30, "minutes");
          end = this.$moment();
          this.timeRange[0] = this.$moment(start).format("YYYY-MM-DD HH:mm:ss");
          this.timeRange[1] = this.$moment(end).format("YYYY-MM-DD HH:mm:ss");
          break;
        case "24h":
          start = this.$moment().subtract(1, "days");
          end = this.$moment();
          this.timeRange[0] = this.$moment(start).format("YYYY-MM-DD HH:mm:ss");
          this.timeRange[1] = this.$moment(end).format("YYYY-MM-DD HH:mm:ss");
          break;
        case "7d":
          start = this.$moment().subtract(7, "days");
          end = this.$moment();
          this.timeRange[0] = this.$moment(start).format("YYYY-MM-DD HH:mm:ss");
          this.timeRange[1] = this.$moment(end).format("YYYY-MM-DD HH:mm:ss");
          break;
        case "30d":
          start = this.$moment().subtract(30, "days");
          end = this.$moment();
          this.timeRange[0] = this.$moment(start).format("YYYY-MM-DD HH:mm:ss");
          this.timeRange[1] = this.$moment(end).format("YYYY-MM-DD HH:mm:ss");
          break;
        default:
          this.timeRange = val.split(this.separator);
          break;
      }
      this.$emit("tabRadio",this.timeRange,this.time_self=='custom'?"":this.time_self);
    },
    change() {
      this.setTime();
    },
    setTime() {
      this.timeRange = this.dateTime[0]
        ? [this.$moment(this.dateTime[0]).format("YYYY-MM-DD HH:mm:ss"),
          this.$moment(this.dateTime[1]).format("YYYY-MM-DD HH:mm:ss")]
        : "";
      this.$emit("tabRadio",this.timeRange,this.time_self=='custom'?"":this.time_self);
    },
  },
  created () {
    
  },
  mounted() {  
    this.time_self = this.time;  
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-date-editor.el-input__inner{
  margin-left: 10px;
}
</style>