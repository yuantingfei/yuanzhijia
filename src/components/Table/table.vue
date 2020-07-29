<template>
  <div class="table-data">
    <el-table
      :data="tableData"
      v-loading="!!listLoading"
      :height="param.table.height"
      :max-height="param.table.max_height"
      :border="param.table.border"
      :stripe="param.table.stripe"
      :fit="param.table.fit"
      :row-key="param.table.row_key"
      :row-style="rowStyle"
      :expand-row-keys="param.table.expand_row_key"
      :show-header="param.table.show_header"
      :highlight-current-row="param.table.highlight_current_row"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      @row-click="handleRowClick"
      @expand-change="handleExpand"
      @sort-change="handleSortChange"
    >
      <slot></slot>
      <slot name="append"></slot>
    </el-table>

    <!-- <el-pagination
      v-if="param.table.pagination && param.pagination.total"
      :current-page="param.pagination.pageIndex"
      :page-sizes="param.pagination.pageSizes"
      :page-size="param.pagination.pageRows"
      :total="param.pagination.total"
      :layout="paginationLayout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>-->
    <pagination v-if="param.table.pagination" :query="param.pagination" @getList="refreshTable"></pagination>
  </div>
</template>

<script>
import pagination from "../pagination";
const moduleConfig = {
  table: {
    checkbox: false, //是否设置行多选
    //height: 300, //Table 的高度，默认为自动高度。
    max_height: "100%", //Table 的最大高度
    border: true, //是否带有纵向边框
    stripe: false, //是否为斑马纹 table
    fit: true, //列的宽度是否自撑开
    show_header: true, //是否显示表头
    highlight_current_row: false, //是否要高亮当前行
    pagination: false //是否显示分页
  },
  pagination: {
    pageIndex: 1,
    pageRows: 20,
    pageSizes: [10, 20, 30, 40],
    total: 0,
    showTotal: true,
    showSizes: true,
    showJumper: true
  }
};
export default {
  name: "table-data",
  props: [
    "config",
    "tableData",
    "listLoading",
    "rowStyle",
    "tableRowClassName"
  ],
  components: { pagination },
  data() {
    return {
      data: [],
      multipleSelection: []
    };
  },
  mounted() {},
  computed: {
    paginationLayout() {
      let layout = ["total", "sizes", "prev", "pager", "next", "jumper"];
      !this.param.pagination.showTotal && _.remove(layout, v => v === "total");
      !this.param.pagination.showSizes && _.remove(layout, v => v === "sizes");
      !this.param.pagination.showJumper &&
        _.remove(layout, v => v === "jumper");
      return layout.join();
    },
    param() {
      return _.defaultsDeep(this.config, moduleConfig);
    }
  },
  watch: {
    tableData(val) {
      this.data = val;
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("selection-change", val);
    },
    handleSelect(selection, val) {
      this.$emit("select", selection, val);
    },
    handleRowClick(row, event, column) {
      if(column) {
        if (column.type == "selection" || column.type == "__stop") return;
        this.$emit("row-click", row, event, column);
      }
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.param.pagination.pageRows = val;
      this.refreshTable();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.param.pagination.pageIndex = val;
      this.refreshTable();
    },
    handleExpand(row, expanded) {
      this.$emit("expand", row, expanded);
    },
    handleSortChange(column, prop, order) {
      this.$emit("sort-change", column, prop, order);
    },
    refreshTable() {
      let pageRows = this.param.pagination.pageRows;
      let pageIndex = this.param.pagination.pageIndex;
      this.$emit("refresh-table", pageRows, pageIndex);
    }
  }
};
</script>

<style lang="scss" scoped>
.table-data {
  margin: 0;
  /deep/ .el-table {
    width: 100%;
    height: 100%;
    table {
      width: 100% !important;
    }
    .cell {
      padding-left: 0px;
      padding-right: 0px;
      text-align: left;
      line-height: 30px;
    }
    td{
      border-bottom: 0px;
    }
    .el-table__body-wrapper {
      overflow-x: hidden;
      overflow-y: hidden;
      height: calc(100% - 34px);
      table {
        overflow: hidden;
      }
    }
    .el-table-column--selection .cell {
      text-align: center;
    }
    .el-table__empty-block {
      width: 100% !important;
      padding: 30px;
    }
  }
}
</style>
