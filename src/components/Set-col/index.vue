<template>
  <el-dropdown :hideOnClick="false" class="fr" @visible-change=visibleChange>
    <el-button>
      {{$i18n.messages[$i18n.locale].customer}}
      <i class="el-icon-caret-bottom el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(item,index) in title" :key='index'>
        <el-checkbox v-model="item.show">{{item[keyName]}}</el-checkbox>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "setcol",
  props: {
    title: Array,
    keyName: {
      type: String,
      default: "name"
    }
  },
   computed: {
    ...mapGetters(["userInfo"])
  },
  created() {
    // console.log(this.$props.title);
  },
  methods:{
    visibleChange(e){
      if(!e) {
        localStorage.setItem('username',this.userInfo.userName);
        localStorage.setItem(this.$route.meta.id+this.userInfo.userName,JSON.stringify(this.title));
        }
    }
  }
};
</script>