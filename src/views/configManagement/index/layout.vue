<template>
  <div class="main">
    <div class="top">
      <!-- <img class="logo" src="/static/configManagement/配置管理子系统.png"/>  -->
      <div class="box">
        <span class="time">欢迎您！管理员</span>
        <!-- <el-button class="blue-btn" @click="exit()" size="mini">退出</el-button> -->
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
import {loginApi}  from 'api/commonApi';
export default {
  name: "index",
  components: {navMenu},
  data() {
      return {
        nowDate:new Date(),
        position_flag:">"
      };
    },
  methods: {
    exit(){
      this.$confirm(
          "确认要退出当前登录么?",'提示',
          {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          loginApi.logout().then(res=>{
            if(res.data.code=='10000'){
              this.$router.push({
                path: "/login",
                query: {}
              });
            }
          })
          let path = "/nav";
          this.$router.push({path:path})
        })
        .catch(() => {
          //取消操作
        });
    }
  },
  computed: {
    time(){
      return this.$moment(this.nowDate).format("YYYY-MM-DD HH:mm:ss");
    },
    positions(){
      return this.$store.getters.positions
    }
  },
  watch:{
  },
  created() {
    setInterval(() => {
      this.nowDate = new Date();
    }, 1000);
  },
  mounted() {
  },
  beforeDestroy() {}
};
</script>

<style lang="scss" scoped>
body{
  width: 100%;
  height: 100%;
}
.main{
  width: 100%;
  // height: 1000px;
  .top{
    width: 100%;
    height: 55px;
    background-color:#121f3f;
    background-image: url('/static/configManagement/topbg.png');
    align-items: center;
    .logo{
      margin-left: 40px;
      float: left;
      margin-top: 15px;
    }
    .text{
      color: #FFF;
      font-weight: 600;
      float: left;
    }
    .box{
      float: right;
      // width: 380px;
      width: 263px;
      height: 55px;
      display: flex;
      align-items: center;
      line-height: 55px;
      font-size: 12px;
      .time{
        color: #FFF;
        margin-right: 10px;
      }
      .user_icon{
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
  }
  .middle{
    width: 100%;
    position:absolute;
    height: calc(100% - 55px);
    .left{
      width: 155px;
      height: calc(100%);
      float: left;
      display: flex;
      justify-content: center;
      background-color:#0f1b3a;
      background-image: url('/static/configManagement/leftimg.png');
      background-repeat: no-repeat;
      background-position: bottom;
    }
    .right{
      width: calc(100% - 155px);
      height: calc(100%);
      margin-left: 155px;
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