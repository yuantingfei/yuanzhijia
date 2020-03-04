<template>
  <el-table :data="list" style="width:100%" border :default-sort="{prop: 'username', order: 'descending'}"
    @selection-change="handleSelectionChange" @sort-change="sortChange" :expand-row-keys="expandRowKeys" :row-key="rowKey" @row-click="handleRowClick" @expand-change="handleExpandChange" v-loading="listLoading">
    <el-table-column v-if="type" className="serial" :type="type" :selectable="selectable" width="40" :label="''">
    </el-table-column>
    <el-table-column v-if="!hideIndex" className="serial" type="index" :selectable="selectable" width="50" :label="$i18n.messages[$i18n.locale].index">
    </el-table-column>
    <el-table-column v-if="!customCol" :key='item.col' v-for='(item,index) in tableHeader' :label="item.name" :prop="item.sort" :sortable="!!item.sort"
      :min-width="item.width" :className="item.class" >
      <template slot-scope="scope">
        <div :class="scope.row[item.classname]" v-if="item.ishtml" v-html="scope.row[item.col]"></div>
        <div :class="scope.row[item.classname]" v-else>{{scope.row[item.col]}}</div>
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
</template>
<script>
export default {
  name: "userTable",
  props: {
    title: Array,
    list: Array,
    operations: Array,
    listLoading: {
      type: Boolean,
      default: false
    },
    type: String,
    rowKey: String,
    expandRowKeys: Array,
    selectable: {
      type: Function,
      default: function() {
        return true;
      }
    },
    customCol:{
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ""
    },
    hideIndex: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tableHeader: function() {
      return this.title.filter((item, index) => item.show && item.width!=0);
    }
  },
  watch: {

  },
  methods: {
    handleMothed(item, name) {
      this.$emit(name, item);
      this.$emit("revert", name);
    },
    handleSelectionChange(val) {
      this.$emit("selectItem", val);
    },
    sortChange(val) {
      this.$emit("sortItem", val);
    },
    handleRowClick(row, event, column) {
      if (column) {
        if (column.type == "selection" || column.type == "__stop") return;
        this.$emit("rowClick", row, event, column);
      }
    },
    handleExpandChange(row,expandedRows){
       this.$emit("ExpandChange", row, expandedRows);
    }
  }
};
</script>

<style lang="scss" scoped>
.oper-bg {
  display: inline-block;
  margin-right: 10px;
  height: 25px;
  width: 25px;
  padding-top: 4px;
  text-align: center;
  color: #fff;
  background: #4db3ff;
  border-radius: 4px;
}
</style>