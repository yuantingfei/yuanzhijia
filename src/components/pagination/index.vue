<template>
  <div class="pagination-container text-right" >
    <el-pagination 
      v-show="!listLoading && query.total>0"
      :current-page="query.pageIndex" 
      :page-sizes="query.pageSizes || pageSizes" 
      :page-size="query.pageRows" 
      :total="query.total"  
      :layout="paginationLayout"
      :showlastpage="showlastpage"
      @size-change="sizeChange" 
      @current-change="pageChange" >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: {
    listLoading: Boolean,
    query: Object,
    showlastpage: {
      type: Boolean,
      default: true
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    }
  },
  data() {
    return {
      pageSizes: [10, 20, 30, 40]
    };
  },
  computed: {
    paginationLayout() {
      return this.query.layout || this.layout;
    }
  },
  methods: {
    pageChange(newval) {
      this.query.pageIndex = newval;
      this.$emit("getList", this.query);
    },
    sizeChange(val, $e) {
      this.query.pageRows = val;
      this.$emit("getList", this.query);
    }
  }
};
</script>

