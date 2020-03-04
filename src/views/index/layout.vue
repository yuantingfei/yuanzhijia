<template>
  <div class="main">
    <div class="top">
      <!-- <span class="title">透明香港指挥平台</span> -->
      <!-- <img src="/static/logo/logo.png"/> -->
      <img src="/static/logo/logo.jpg"/> 
      <span class="text">透明香港-后台管理系统</span>
      <div class="box">

      </div>
    </div>
    <div class="middle">
      <div class="left">
        <navMenu></navMenu>
      </div>
      <div class="right">
        <div class="positions">
          <div class="text">当前位置：</div>
          <div v-for="(item,$index) in positions" class="text">
            {{item.name}}
            <span v-if="$index!=positions.length-1">{{position_flag}}</span>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import navMenu from "./menu"
export default {
  name: "index",
  components: {navMenu},
  data() {
      return {
        position_flag:">"
      };
    },
  methods: {
  },
  computed: {
    positions(){
      return this.$store.getters.positions
    }
  },
  watch:{
  },
  created() {},
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
    height: 55px;
    background-color:#121f3f;
    display: flex;
    align-items: center;
    img{
      // margin-top: 19px;
      margin-left: 35px;
    }
    .text{
      color: #FFF;
      font-weight: 600;
    }
    .box{
      float: right;
      width: 300px;
      height: 55px;
      line-height: 55px;
      font-size: 12px;
    }
    // .title{
    //   line-height: 55px;
    //   font-size: 20px;
    //   font-weight: 900;
    //   color: #fbfcff;
    //   margin-left: 25px;
    // }

  }
  .middle{
    width: 100%;
    position:absolute;
    height: calc(100% - 55px);
    .left{
      width: 230px;
      height: 100%;
      float: left;
      display: flex;
      justify-content: center;
      background-color:#0f1b3a;
    }
    .right{
      width: calc(100% - 230px);
      height: 100%;
      margin-left: 230px;
      padding: 20px;
      overflow: auto;
      background-color: #f2f2f2;
      .positions{
        width: 100%;
        height: 30px;
        display: flex;
        color: #000;
        font-size: 14px;
      }
    }
  }
}
</style>