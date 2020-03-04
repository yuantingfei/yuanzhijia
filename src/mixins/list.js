// const service = require('@/api/common.js');

export default {
  data() {
    return {
      tableData: [],
      listLoading: false,
      listQuery: {},
      pagination: {
        pageIndex: 1,
        pageRows: 20,
        total: 0,
        pageSizes: [10, 20, 50, 100]
      },
      selections:[]
    }
  },
  computed: {
    param() {
      return {
        table: this.table,
        pagination: this.pagination
      }
    },
    startDatePickerOptions() {
      let vm = this;
      return {
        disabledDate(d) {
          return vm.listQuery.endDate ? d > vm.listQuery.endDate : false;
        }
      }
    },
    endDatePickerOptions() {
      let vm = this;
      return {
        disabledDate(d) {
          return vm.listQuery.startDate ? d < vm.listQuery.startDate : false;
        }
      }
    }
  },
  created() {
    let doNotInit = this.$options.doNotInit;
    if (!doNotInit) this.getTableData();
  },
  watch: {},
  filters: {
    level(val) {
      return `level _${val}`;
    },
    displayLevel(val) {
      let level = '';
      switch (val) {
        case '0':
          level = '高危';
          break;
        case '1':
          level = '中危';
          break;
        case '2':
          level = '低危';
          break;
        default:
          level = '提示';
      }
      return level;
    }
  },
  filters: {
    filtersession(val) {
      if (!val) return "";
      let num = 1024.0; //byte

      if (val < num) return val + "B";
      if (val < Math.pow(num, 2)) return (val / num).toFixed(2) + "KB"; //kb
      if (val < Math.pow(num, 3))
        return (val / Math.pow(num, 2)).toFixed(2) + "MB"; //M
      if (val < Math.pow(num, 4))
        return (val / Math.pow(num, 3)).toFixed(2) + "GB"; //G
      return (val / Math.pow(num, 4)).toFixed(2) + "TB"; //T
    }
  },
  methods: {
    getParams() {
      return Object.assign({}, this.listQuery, {
        pageRows: this.pagination.pageRows,
        pageIndex: this.pagination.pageIndex
      });
    },
    handleSelectionChange(selections) {
      this.selections = selections;
    },
    /**
     * 初始化列表
     */
    initList() {},
    getTableData() {
      // 每个列表自己的获取数据的方法需要重写
      // this.listLoading = true;
    },
    onSubmit(){
      this.$refs.search.onSubmit();
    },
    onReset(){
      this.$refs.search.onReset();
    }
  }
}