<template>
  <div class="col-table">
    <div v-if="Object.values(tableData).length">
      <div class="row" v-for="(row, index) in rows" :key="index">
        <div class="cellGroup" v-for="(col, num) in row" :style="{width: cellGroupWidth}" :key="num">
          <div class="cell cellLabel" :style="{width: width[0]}">{{col.name}}</div>
          <div class="cell cellValue" :style="{width: width[1]}" :class="col.class">
            <slot v-if="freestyle" :row="Object.assign(col, {value: tableData[col.col]})" :$index="index"></slot>
            <div v-else>{{tableData[col.col]}}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="nodata">{{$i18n.messages[$i18n.locale].nodata}}</div>
  </div>
</template>

<script>
export default {
  name: "col-table",
  props: {
    freestyle: {
      type: Boolean,
      default: false
    },
    colNum: {
      type: Number,
      default: 1
    },
    width: {
      type: Array,
      default: () => ["50px", "100px"]
    },
    cols: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    rows() {
      let colsNotHidden = this.cols.filter(n => n.show);
      let rowNum = Math.ceil(colsNotHidden.length / this.colNum),
        result = [];
      for (let i = 0; i < colsNotHidden.length; i += this.colNum) {
        result.push(colsNotHidden.slice(i, i + this.colNum));
      }
      return result;
    },
    cellGroupWidth() {
      return `${100 / this.colNum}%`;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.col-table {
  // display: table;
  width: 100%;
  font-size: 14px;
  .row {
    min-height: 32px;
    width: 100%;
    display: flex;
    align-items: center;
    &:last-of-type {
      .cellLabel {
        border-bottom: 1px solid #bfbfbf;
      }
      .cellValue {
        border-bottom: 1px solid #e6e6e6;
      }
    }
    .cellGroup {
      display: flex;
      // align-items: center;
      .cell {
        display: inline-block;
        padding-left: 14px;
        padding-right: 8px;
        text-align: left;
        width: 100px;
        min-height: 32px;
        line-height: 32px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #444;
        & > div {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &.cellLabel {
          background: #f7f7f7;
          border-top: 1px solid #bfbfbf;
          border-left: 1px solid #bfbfbf;
          border-right: 1px solid #bfbfbf;
        }
        &.cellValue {
          border-top: 1px solid #e6e6e6;
          border-right: 1px solid #e6e6e6;
          &.span2 {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 2;
            word-break: break-word;
            white-space: unset;
            & > div {
              // overflow: inherit;
              // text-overflow: inherit;
              // display: inherit;
              // -webkit-box-orient: inherit;
              // -webkit-line-clamp: inherit;
              // word-break: inherit;
              white-space: inherit;
            }
          }
          &.span3 {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 3;
            word-break: break-word;
            white-space: unset;
            & > div {
              // overflow: inherit;
              // text-overflow: inherit;
              // display: inherit;
              // -webkit-box-orient: inherit;
              // -webkit-line-clamp: inherit;
              // word-break: inherit;
              white-space: inherit;
            }
          }
        }
      }
    }
  }
  .nodata {
    font-size: 14px;
    color: #5e7382;
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    user-select: none;
    &:before {
      content: "";
      display: block;
      width: 67px;
      height: 71px;
      background-image: url("../../assets/img/situation/empoty.png");
      background-repeat: no-repeat;
    }
  }
}
</style>


