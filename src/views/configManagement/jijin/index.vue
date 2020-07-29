<template>
 <div class="main_box">
    <div class="box_search">
      <div class="bg">
        <search ref="search" @getList="getList"></search>
      </div>
    </div>
    <!-- <div class="box_search_btn">
      <el-button class="default-btn" @click="onSubmit()">搜索</el-button>
      <el-button type="white-btn" @click="onReset()">清空</el-button>
    </div> -->
    <div class="box_table">
      <div class="table_top_btn_greoup">
        <div class="group">
          <el-checkbox v-model="isOrder">排序</el-checkbox>
          <setcol style="float:right" :title="table.columns"></setcol>
        </div>
      </div>
       <div class="table_comtent">
       <table-data :config="param" :listLoading="listLoading" :tableData="tableData"  @selection-change="handleSelectionChange" @refresh-table="getTableData" :hideIndex="true" type="index">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column v-for="(col, index) in param.table.columns" :key="index" v-if="col.show" :prop="col.col" :label="col.name" :sortable="col.sort" :min-width="col.width" align="center">
            <template slot-scope="scope">
              <div v-if="col.col=='idxu'">{{ scope.$index + 1 }}</div>
              <div v-else-if="col.col=='name'"><a target='_blank' :href="'http://fund.eastmoney.com/'+scope.row['code']+'.html'">{{ scope.row[col.col] }}</a></div>
              <div v-else-if="col.col=='code'"><a target='_blank' :href="'http://fund.eastmoney.com/'+scope.row['code']+'.html'">{{ scope.row[col.col] }}</a></div>
              <div v-else-if="col.col=='value'&&scope.row['isred']" class="valuered" >{{ scope.row[col.col] }}</div>
              <div v-else-if="col.col=='value'&&!scope.row['isred']" class="valuegreen" >{{ scope.row[col.col] }}</div>
              <div v-else-if="col.col=='opt'" class="opt">
                <el-button round size="mini" v-if="!isOrder" :title="'上移'" icon="el-icon-upload2"  @click="up(scope.row)"></el-button>
                <el-button round size="mini" v-if="!isOrder" :title="'下移'" icon="el-icon-download"  @click="down(scope.row)"></el-button>
                <el-button round size="mini" :title="'加自选'" icon="el-icon-circle-plus-outline"  @click="addzixuan(scope.row)"></el-button>
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
          { col: "opt", name: "操作", width: "10%", sort: false, show: true },
        ],
        pagination: true
      },
      pagination: {
        pageIndex: 1,
        pageRows: 100,
        total: 0,
        pageSizes: [100, 200, 500, 1000]
      },
      listQuery: {
        key: "",
      },
      tableData: [],
      selections: [],
      listLoading: false,
      isOrder:false
    };
  },
  watch:{
    isOrder(){
      this.getList();
    }
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
      let params = Object.assign({},this.listQuery, this.getParams());
      jijinApi
        .getList(params)
        .then(res => {
          this.tableData = res.data.list;
          this.tableData.forEach(item=>{
            item.valueFloat  = parseFloat(item.value);
            if(parseFloat(item.value)>=0){
              item.isred = true;
            }else{
              item.isred = false;
            }
          })
          if(this.isOrder){
            this.tableData = _.sortBy(this.tableData, function(item) {
              return -item.valueFloat;
            })
          }
          this.pagination.total = res.data.total;
        })
        .catch(e => {
          this.tableData = [];
        });
    },
    getList(query) {
      if(query==undefined){
        this.getTableData();
      }else{
        this.listQuery.key = query.key;
        this.getTableData();
      }
    },
    up(row){
      jijinApi.upList({id:row.id})
      this.getTableData();
    },
    down(row){
      jijinApi.downList({id:row.id})
      this.getTableData();
    },
    addzixuan(row){
      if(localStorage.getItem('zixuan').indexOf(row.code)==-1){
        localStorage.setItem('zixuan',localStorage.getItem('zixuan')+","+row.code);
        this.$message({
          message: '添加自选成功',
          type: 'success'
        });
      }else{
        this.$message({
          message: '自选已经存在',
          type: 'success'
        });
      }
    },
  },
  beforeDestroy() {}
};
</script>

<style lang="scss" scoped>
@import "src/styles/jijin.scss";
</style>