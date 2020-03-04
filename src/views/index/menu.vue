<template>
  <div class="menu">
    <template v-for="(item,$index) in menuData">
      <div class="menu_box">
        <div class="menu_item_parent" :class="{selected:isSelectedMenu(item.id,0)}">
          <div class="menu_icon" :class="item.icon"></div>
          <span v-if="item.children.length!=0">{{item.name}}</span>
          <span v-if="item.children.length==0" @click="open(item,0)">{{item.name}}</span>
        </div>
        <div class="menu_item_children_box" v-if="item.children.length!=0">
          <template v-for="(child,$index2) in item.children">
            <div class="menu_item_children" :class="{selected:isSelectedMenu(child.id,1)}" @click="open(child,1,item)">{{child.name}}</div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { constants } from 'fs';
export default {
  name: "index",
  components: {},
  data() {
      return {
        selected_menu_id:'3-1',
        menuData:[
          {id:"2",name:"我的工作",path:"",icon:"menu_icon",children:[
            // {id:"2-1",name:"数据录入",path:"/index/media",icon:"menu_icon",children:[]},
            {id:"2-1",name:"事件列表",path:"/index/dataInput",icon:"menu_icon",children:[]},
            {id:"2-2",name:"系统联动",path:"/index/linkage",icon:"menu_icon",children:[]},
            {id:"2-3",name:"任务管理",path:"/index/management",icon:"menu_icon",children:[]},
             {id:"2-4",name:"媒体列表",path:"/index/media",icon:"menu_icon",children:[]},
          ]},
        ]
      };
    },
  methods: {
    open(child,level,parent){
      let positions = [];
      if(level==0){
        positions.push(child);
      }else if(level==1){
        positions = [parent,child]
      }
      this.$store.dispatch("set_new_positions",positions);
      this.selected_menu_id = child.id;
      let path = child.path;
      this.$router.push({path:path})
    },
    isSelectedMenu(id,level){
      let arr = this.selected_menu_id.split("-");
      if(level==0){
        return arr[0]==id
      }else if(level==1){
        return (arr[0]+"-"+arr[1])==id;
      }else{
        return false;
      }
    }
  },
  computed: {
  },
  watch:{
    $route(val) {

    }
  },
  created() {
    for (let i = 0; i < this.menuData.length; i++) {
      const element = this.menuData[i];
      if(element.id == this.$route.meta.selected_id){
        this.open(element,0);
        break;
      }else{
        for (let j = 0; j < element.children.length; j++) {
          const elementj = element.children[j];
          if(elementj.id == this.$route.meta.selected_id){
            this.open(elementj,1,element);
            break;
          }
        }
      }
    }
  },
  mounted() {
  },
  beforeDestroy() {}
};
</script>

<style lang="scss" scoped>
$menu_height:35px;
.menu{
  width: 175px;
  margin-top: 10px;
  .menu_box{
    width: 175px;
    padding: 15px 0px;
    border-bottom: 1px solid #3a445e;
    .menu_item_parent{
      height: $menu_height;
      line-height: $menu_height;
      padding: 0px 0px;
      display: flex;
      cursor: pointer;
      color: #fff;
      font-size: 16px;
      font-weight: 900;
      font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu;
      &.selected{
        color: #098aaf;
      }
      .menu_icon{
        width: 20px;
        height: 20px;
        margin-top: 9px;
        margin-left: 10px;
        margin-right: 10px;
        background-image: url("../../../static/1.png")
      }
    }
    .menu_item_children_box{
      margin-left: 40px;
      .menu_item_children{
        height: $menu_height;
        line-height: $menu_height;
        padding: 0px 0px;
        display: flex;
        cursor: pointer;
        color: #fff;
        font-size: 16px;
        font-weight: 300;
        font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu;
        &.selected{
          color: #098aaf;
        }
      }
    }
  }
  
}
</style>