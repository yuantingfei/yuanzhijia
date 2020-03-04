<template>
  <div class="SetDataTimeRange">
    <el-select
      v-model="range"
      :placeholder="$i18n.messages[$i18n.locale].selectTime"
      class="set-select-width"
      :clearable="clearableIs"
      @change="selectChange"
      :title="range&&range.indexOf(separator)>0?range:''"
    > 
      <div v-if="showoptionfour">
         <el-option   v-for="item in times" :key="item.label" :label="item.text" :value="item.label"  ></el-option>
      </div>
      <div v-if="!showoptionfour">
         <el-option  v-for="item in timesfour" :key="item.label" :label="item.text" :value="item.label"  ></el-option>
      </div>
      <el-option value v-if="showoptionfour">
        
        <el-date-picker
          v-model="dateTime"
          :editable="false"
          type="datetimerange"
          :range-separator="$i18n.messages[$i18n.locale].to "
          :start-placeholder="$i18n.messages[$i18n.locale].selectTime"
          :end-placeholder="$i18n.messages[$i18n.locale].selectTime"
          :default-time="['00:00:00', '23:59:59']"
          @change="change"
        ></el-date-picker>
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "SetDataTimeRange",
  props: {
    time: {
      default: ""
    },
    times: {
      type: Array,
      default: function() {
        let times = $i18n.messages[$i18n.locale].times;
        return [
          {
            label: "5min",
            text: times[0],
            show: false
          },
          {
            label: "30min",
            text: times[1],
            show: false
          },
          {
            label: "24h",
            text: times[2],
            show: false
          },
          {
            label: "7d",
            text: times[3],
            show: false
          },
          {
            label: "30d",
            text: times[4],
            show: false
          }
          // { label: '40d',text:'',show:false}
        ];
      }
    },
    timetype:{
       default: "1"
    },
    clearableIs:{
      default: true
    }
  },
  data() {
    return {
      separator: "--",
      range: "",
      dateTime: [],
      timeRange: [],
      showoptionfour:true,
      timesfour:[]
    };
  },
  watch: {
    time(val) {
      if (val !== null) this.range = val;
    },
    // clearableIs(val){
    //   console.log(val)
    // },
    range(val) {
      if(!val) {
        this.dateTime = [];
      }
      const timeScope = val && val.indexOf(this.separator) > 0 ? null : val;
      this.setTimeRange(val);
      this.$emit("update:time", timeScope);
      this.$emit("update:timeRange", this.timeRange);
      this.$emit("update:timeRangeString", this.timeRange.join(","));
    },
  },
  methods: {
    setTime() {
      this.showtitle = true;
      this.range = this.dateTime[0]
        ? this.$moment(this.dateTime[0]).format("YYYY-MM-DD HH:mm:ss") +
          this.separator +
          this.$moment(this.dateTime[1]).format("YYYY-MM-DD HH:mm:ss")
        : "";
    },
    change() {
      this.setTime();
    },
    selectChange(val) {
      if (!val) {
        this.range = "";
      }
      this.dateTime = [];
    },
    setTimeRange(val) {
      if (!val) {
        this.timeRange = [];
        return;
      }
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
    }
  },
  created () {
    // 判断time的显示选项类型默认为1，为2显示3个
    if(this.timetype =="2"){
      let timesone = $i18n.messages[$i18n.locale].times;
      this.timesfour=[
          {
            label: "24h",
            text: timesone[2],
            show: false
          },
          {
            label: "7d",
            text: timesone[3],
            show: false
          },
          {
            label: "30d",
            text: timesone[4],
            show: false
          }
      ],
      this.showoptionfour=false
    }
  },
  mounted() {    
    this.range = this.time;
  }
};
</script>

<style lang="scss" scoped>
.SetDataTimeRange {
  // margin-top: -2px;
  .el-radio-button__inner {
    border: solid 1px #1692c1;
    margin-left: -1px;
    padding: 5px 4px;
    line-height: 18px;
    font-size: 12px;
  }

  .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 2px 0 0 2px;
  }

  .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0 2px 2px 0;
  }

  .el-radio-button__orig-radio:checked + .el-radio-button__inner,
  .el-radio-button__inner:hover {
    background: #1692c1;
    color: #fff;
  }

  .el-select {
    width: 100%;
    /deep/ .el-input {
      width: 100%;
    }
  }
}
</style>