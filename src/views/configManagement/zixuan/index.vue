<template>
 <div class="main_box">
    <!-- <div class="box_search">
      <div class="bg">
        <search ref="search" :query="listQuery" @getList="getList"></search>
      </div>
    </div> -->
    <!-- <div class="box_search_btn">
      <el-button class="default-btn" @click="onSubmit()">搜索</el-button>
      <el-button type="white-btn" @click="onReset()">清空</el-button>
    </div> -->
    <div class="box_table">
      <div class="table_top_btn_greoup">
        <el-checkbox v-model="isOrder">排序</el-checkbox>
        <el-button class="default-btn" @click="create()">新增自选</el-button>
        
        <!-- <div class="group">
          <setcol style="float:right" :title="table.columns"></setcol>
        </div> -->
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
                <el-button  round size="mini" icon="el-icon-delete"  @click="deleteRow(scope.row)"></el-button>
              </div>
               <div v-else class="overdata" :title="scope.row[col.col]">{{ scope.row[col.col] }}</div> 
            </template>
          </el-table-column>
        </table-data>
      </div>
    </div>
    <el-dialog title="新增自选" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="基金编码" :label-width="'80px'" prop="code">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        如果基金编码在基金动态模块不存在,添加后数据会有延迟,请等待1分钟
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
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
      dialogFormVisible:false,
      form:{
        code:""
      },
      rules:{
        code: [{ required: true, trigger: "blur", message: "请输入基金编码,如:003175" }],
      },
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
          { col: "zixuan_value", name: "加自选时净值", width: "10%", sort: false, show: true },
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
        pageRows: 1000,
        total: 0,
        pageSizes: [1000]
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
  computed: {},
  watch:{
    isOrder(){
      this.getList();
    }
  },
  created() {
    setInterval(() => {
      this.getTableData();
    }, 10000);
  },
  mounted() {},
  methods: {
    create(){
      this.dialogFormVisible = true;
    },
    submit(){
      this.$refs.form.validate(valid => {
        if (valid) {
          if(localStorage.getItem('zixuan')!=""){
            localStorage.setItem('zixuan',localStorage.getItem('zixuan')+","+this.form.code);
          }else{
            localStorage.setItem('zixuan',this.form.code);
          }
          this.getTableData();
          this.dialogFormVisible = false;
          jijinApi.addCode({code:this.form.code})
        }
      });
    },
    deleteRow(row){
      let zixuan = localStorage.getItem('zixuan').split(",");
      for (let y = 0; y < zixuan.length; y++) {
        const elementy = zixuan[y];
        if (row.code == elementy.split('-')[0]) {
          zixuan.splice(y,1);
        }
      }
      localStorage.setItem('zixuan',zixuan.join(","));
      this.getTableData();
    },
    onReset(){
      this.listQuery.key = ""
      this.getList();
    },
    getTableData() {
      let params = Object.assign(this.listQuery, this.getParams());
      jijinApi
        .getList(params)
        .then(res => {
          let zixuan = localStorage.getItem('zixuan').split(",");
          let list = []
          for (let y = 0; y < zixuan.length; y++) {
            const elementy = zixuan[y].split('-')[0];
            let isHave = false;
            for (let i = 0; i < res.data.list.length; i++) {
              const elementi = res.data.list[i];
              if (elementy==elementi.code) {
                let tmp = {}
                if(zixuan[y].split('-').length==2){
                  Object.assign(tmp,elementi,{zixuan_value:zixuan[y].split('-')[1]})
                }else{
                  Object.assign(tmp,elementi,{zixuan_value:'--'})
                  localStorage.setItem('zixuan',localStorage.getItem('zixuan').replace(elementy,elementy+'-'+elementi.dqjz));
                }
                list.push(tmp)
                isHave = true;
              }
            }
            if(!isHave&&zixuan.length!=1){
              list.push({
                name:"数据更新中...",
                code:elementy,
                dqjz:"数据更新中...",
                value:"数据更新中...",
                zixuan_value:"数据更新中...",
                ztjz:"数据更新中...",
                ztzf:"数据更新中...",
                timeStr:"数据更新中...",
              })
            }
          }
          this.tableData = list;
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
          this.pagination.total = list.length;
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
@import "src/styles/jijin.scss";
.table_top_btn_greoup{
  padding-top: 10px !important;
}
</style>