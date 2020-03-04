<template>
 <div class="main_box">
    <div class="box_search">
      <div class="bg">
        <search ref="search" :query="listQuery" @getList="getList"></search>
      </div>
    </div>
    <div class="box_search_btn">
      <el-button class="default-btn" @click="onSubmit()">搜索</el-button>
      <el-button type="white-btn" @click="onReset()">清空</el-button>
    </div>
    <div class="box_table">
      <div class="table_top_btn_greoup">
        <div class="group">
          <setcol style="float:right" :title="table.columns"></setcol>
        </div>
      </div>
       <div class="table_comtent">
       <table-data :config="param" :listLoading="listLoading" :tableData="tableData"  @selection-change="handleSelectionChange" @refresh-table="getTableData" :hideIndex="true" type="index">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column v-for="(col, index) in param.table.columns" :key="index" v-if="col.show" :prop="col.col" :label="col.name" :sortable="col.sort" :min-width="col.width" align="center">
            <template slot-scope="scope">
              <div v-if="col.col=='idxu'">{{ scope.$index + 1 }}</div>
              <div v-else-if="col.col=='opt'" class="opt">
              </div>
               <div v-else class="overdata" :title="scope.row[col.col]">{{ scope.row[col.col] }}</div> 
            </template>
          </el-table-column>
        </table-data>
      </div>
    </div>
  </div>
</template>

<script>
import search from "./search";
import setcol from "components/Set-col";
import {jijinApi}  from 'api/commonApi';
import List from "@/mixins/list";

export default {
  name: "jijin",
  components: { search ,setcol},
  mixins:[List],
  data() {
    return {
      table: {
        columns: [
          { col: "idxu", name: "序号", width: "5%", sort: false, show: true },
          {
            col: "name",
            name: "基金名称",
            width: "10%",
            sort: false,
            show: true
          },
          {
            col: "code",
            name: "基金代号",
            width: "10%",
            sort: false,
            show: true
          },
          { col: "dqjz", name: "当前净值", width: "10%", sort: false, show: true },
          { col: "value", name: "当前涨幅(比上个交易日)", width: "10%", sort: false, show: true },
          { col: "ztjz", name: "昨天净值", width: "10%", sort: false, show: true },
          { col: "ztzf", name: "昨天涨幅(比上个交易日)", width: "10%", sort: false, show: true },
          { col: "timeStr", name: "更新时间", width: "10%", sort: false, show: true },
        ],
        pagination: true
      },
      pagination: {
        pageIndex: 1,
        pageRows: 20,
        total: 0,
        pageSizes: [10, 20, 50, 100]
      },
      listQuery: {
        key: "",
      },
      tableData: [],
      selections: [],
      listLoading: false
    };
  },
  computed: {},
  created() {
    setInterval(() => {
      this.getTableData();
    }, 10000);
  },
  mounted() {},
  methods: {
    onReset(){
      this.listQuery.key = ""
      this.getList();
    },
    getTableData() {
      let params = Object.assign(this.listQuery, this.getParams());
      jijinApi
        .getList(params)
        .then(res => {
          this.tableData = res.data.list;
          this.pagination.total = res.data.total;
        })
        .catch(e => {
          this.tableData = [];
        });
    },
    getList(query) {
      if (query) {
        this.listQuery = query;
      }
      this.getTableData();
    },
  },
  beforeDestroy() {}
};
</script>

<style lang="scss" scoped>

</style>