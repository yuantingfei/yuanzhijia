<template>
  <div class="notification-index app-container">
    <div class="table-container panel">
      <setcol :title="param.table.columns"></setcol>
      <table-data :config="param" :tableData="tableData" 
        @selection-change="handleSelectionChange" 
        @row-click="tableRowClick" 
        @refresh-table="getTableData">

        <el-table-column type="selection" align="center"></el-table-column>
        
        <el-table-column type="expand">
          <template scope="scope">
            {{ getExpandData(scope.row) }}
          </template>
        </el-table-column>

        <el-table-column v-for="(col, index) in param.table.columns" :key="index" align="center" 
          v-if="col.show" :prop="col.col" :label="col.name" :width="col.width">
          <template scope="scope">
            <div v-if="col.col=='id'">{{ scope.$index + 1 }}</div>
            <div v-else>{{ scope.row[col.col] }}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="240" align="center">
          <template scope="scope">
            <el-button :disabled="scope.row.status==2" size="small" icon="iconfont iconfont icon-tixing" :plain="true" type="primary" title="下发通报" @click="handleModifyStatus($event, scope.row, 'sendDown')">通报</el-button>
            <el-button :disabled="scope.row.status!=2" size="small" icon="search" :plain="true" type="primary" title="查看通报" @click="handleModifyStatus($event, scope.row, 'review')">查看</el-button>
            <el-button :disabled="scope.row.status==1" size="small" icon="iconfont iconfont icon-flag" :plain="true" type="primary" title="处理事件" @click="handleModifyStatus($event, scope.row, 'handle')">处理</el-button>
          </template>
        </el-table-column>
      </table-data>
    </div>
  </div>
</template>

<script>
import List from '@/mixins/list';
import setcol  from 'components/Set-col';

const tableData = [
  {
    "organizationName": "中国电科1",
    "organizationUuid": "11",
    "createdDatetime": "2017-07-30",
    "eventType": "漏洞",
    "uuid": "12313",
    "status": "未通报",
    "assetName": "中国电科网站",
    "assetType": "网站",
    "assetAddr": "www.uej.com"
  },
  {
    "organizationName": "中国电科2",
    "organizationUuid": "22",
    "createdDatetime": "2017-02-12",
    "eventType": "漏洞",
    "uuid": "12313",
    "status": "已通报",
    "assetName": "中国电科网站",
    "assetType": "网站",
    "assetAddr": "www.jjgg.com"
  },
  {
    "organizationName": "中国电科3",
    "organizationUuid": "66",
    "createdDatetime": "2017-07-20",
    "eventType": "漏洞",
    "uuid": "12313",
    "status": "已通报",
    "assetName": "中国电科网站",
    "assetType": "网站",
    "assetAddr": "www.gg.com"
  }
];

export default {
  name: 'table-demo',
  mixins: [List],
  components: { setcol },
  data() {
    return {
      tableData: [],
      table: {
        columns: [
          { col: 'id', name: '序号', width: '70', sort: false, show: true },
          { col: 'assetName', name: '资产名称', width: '150', sort: false, show: true },
          { col: 'assetAddr', name: '资产地址', width: '150', sort: false, show: true },
          { col: 'assetType', name: '资产类型', width: '100', sort: false, show: true },
          { col: 'organizationName', name: '所属企业', width: '150', sort: false, show: true },
          { col: 'eventType', name: '事件类型', width: '100', sort: false, show: true },
          { col: 'status', name: '状态', width: '80', sort: false, show: true },
          { col: 'createdDatetime', name: '时间', width: '110', sort: false, show: true }
        ],
        pagination: true
      },
      selections: []
    }
  },
  watch: {

  },
  mounted() {
    // this.getTableData();
  },
  filters: {

  },
  methods: {
    handleSelectionChange(selections) {
      this.selections = selections;
      // console.log('handleSelectionChange', selections);
    },
    getExpandData(row) {
      return Object.assign({}, row, { test: '123' });
    },
    tableRowClick(row, ev, column) {
      ev.stopPropagation();
      //console.log('tableRowClick', row.date, column && column.property);
    },
    /**
     * 事件类型列表查询
     */
    async queryEventType() {
      let result = await service.event.queryEventType();
      return result.data.data || [];
    },
    /**
     * 资产类型列表查询
     */
    async queryAssetCategory() {
      let result = await service.event.queryAssetCategory();
      return result.data.data || [];
    },
    /**
     * 渲染表格数据
     */
    getTableData(pageRows, pageIndex) {
      let vm = this;
      if (pageRows) this.pagination.pageRows = pageRows;
      if (pageIndex) this.pagination.pageIndex = pageIndex;
      let params = this.getParams();
      // service.event.fetchList(params).then(response => {
      //   let result = response.data;
      //   vm.tableData = result.data.list;
      //   vm.pagination.totalRows = result.data.total;
      // }).catch((e) => {
      //   console.warn(e);
      // });
      vm.tableData = tableData;
      vm.pagination.total = vm.tableData.length;
    },
    handleModifyStatus(ev, row, action) {
      ev.stopPropagation();
    }
  }
}
</script>

<style lang="scss" scoped>
.notification-index {
  /*padding: 10px;*/
}
</style>
