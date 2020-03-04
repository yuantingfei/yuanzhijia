<template>
  <div class="main">
    <div class="top">
      <span class="title">透明香港指挥平台</span>
    </div>
    <div class="middle">
      <div class="left">
        <div class="menu_item" :class="{selected:selected_menu=='overviewOfWork'}" @click="open('overviewOfWork')">工作概览</div>
        <div class="menu_item" :class="{selected:selected_menu=='media'}" @click="open('media')">任务集管理</div>
        <div class="menu_item" :class="{selected:selected_menu=='linkage'}" @click="open('linkage')">汇报情况</div>
        <div class="menu_item" :class="{selected:selected_menu=='contactCenter'}" @click="open('contactCenter')">联系中心</div>
        <div class="menu_item" :class="{selected:selected_menu=='userManagement'}" @click="open('userManagement')">用户管理</div>
        <div class="menu_item" :class="{selected:selected_menu=='groupManagement'}" @click="open('groupManagement')">分组管理</div>
      </div>
      <div class="right">
        <!-- <div class="location"></div>
        <div class="content">
          
        </div> -->
        <router-view></router-view>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
      return {
        selected_menu:'overviewOfWork'
      };
    },
  methods: {
    open(value){
      this.selected_menu = value;
      let path = "/index/"+value;
      this.$router.push({path:path})
    }
  },
  computed: {
  },
  watch:{
    $route(val) {
      this.selected_menu = val.name;
    }
  },
  created() {
    this.selected_menu = this.$route.name;
  },
  mounted() {
  },
  beforeDestroy() {}
};
</script>

<style lang="scss">
body{
  width: 100%;
  height: 100%;
}
.main{
  width: 100%;
  height: 1000px;
  .top{
    width: 100%;
    height: 80px;
    background-color:#000166;
    .title{
      line-height: 80px;
      font-size: 40px;
      font-weight: 900;
      color: #fbfcff;
      margin-left: 25px;
    }
  }
  .middle{
    width: 100%;
    position:absolute;
    height: calc(100% - 80px);
    .left{
      width: 220px;
      height: 100%;
      float: left;
      background-color:#000166;
      .menu_item{
        width: 220px;
        height: 35px;
        margin-top: 2px;
        background-color:#666798;
        text-align: center;
        font-size: 20px;
        line-height: 35px;
        color: #eafdff;
        cursor: pointer;
      }
      .menu_item:nth-child(1){
        margin-top: 0px;
      }
      .selected{
        color: #000027;
      }
    }
    .right{
      width: calc(100% - 220px);
      height: 100%;
      margin-left: 220px;
      padding: 20px;
      overflow: auto;
      background-color: #eafdff;
      // .location{
      //   // width: 100%;
      //   // height: 35px;
      // }
      // .content{
      //   width: 100%;
      //   padding: 10px;
        
      // }
    }
  }
}
</style>