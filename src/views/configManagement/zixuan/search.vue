<template>
  <el-form :inline="true" :model="query" :rules="formRules" label-width="100px"  ref="queryForm" label-position="right">
    <el-row style="padding-top:20px;">
        <el-form-item :label="'关键词'" class="set-input-width">
          <el-input v-model="query.key"  :placeholder="'关键词'"></el-input>
        </el-form-item>
    </el-row>
  </el-form>
</template>

<script>
//import { mapGetters } from 'vuex'; 
export default {
  components:{
   // tab
  },
  props: {
    query: Object,
  },
  mixins:[],
  name: "",
  data(){
    return {
      dateTimeRange: "",
      dateTime: "24h",
      formRules: {
      },
    }
  },
  created(){
  },
  computed:{
  },
  methods:{
    onSubmit(){
      this.$emit("getList",Object.assign({}, this.query));
    },
    onReset() {
      this.clearQuery();
    },
    clearQuery(){
      this.query.stageCode="";
      this.query.stageType="";
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-select{
  width: 225px;
}
</style>
