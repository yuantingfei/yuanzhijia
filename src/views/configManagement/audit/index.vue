<template>
 <div class="config_main_box">
    <!-- <div class="box_search">
      <div class="bg">
        <search ref="search" :query="listQuery" @getList="getList"></search>
      </div>
    </div>
    <div class="box_search_btn">
      <el-button class="default-btn" @click="onSubmit()">搜索</el-button>
      <el-button type="white-btn" @click="onReset()">清空</el-button>
    </div> -->
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
import {auditApi}  from 'api/commonApi';
import List from "@/mixins/list";

export default {
  name: "userManagement",
  components: { search ,setcol},
  mixins:[List],
  data() {
    return {
      table: {
        columns: [
          { col: "idxu", name: "序号", width: "5%", sort: false, show: true },
          {
            col: "account_name",
            name: "用户账号",
            width: "10%",
            sort: false,
            show: true
          },
          {
            col: "description",
            name: "描述",
            width: "10%",
            sort: false,
            show: true
          },
          { col: "source_ip", name: "登录源IP", width: "10%", sort: false, show: true },
          { col: "stat_time", name: "日志发生时间", width: "10%", sort: false, show: true },
        ],
        pagination: true
      },
      pagination: {
        pageIndex: 1,
        pageRows: 10,
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
  created() {},
  mounted() {},
  methods: {
    getTableData() {
      let params = Object.assign(this.listQuery, this.getParams());
      console.log(params)
      auditApi
        .getList(params)
        .then(res => {
          console.log(res.data)
          this.tableData = res.data.list;
          this.pagination.total = res.data.total;
           for(let i of this.tableData) {
            if(i.accountStatus == 0) {
            i.switchStatus = true;
          }else if(i.accountStatus == 1) {
            i.switchStatus = false;
          }
        }
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