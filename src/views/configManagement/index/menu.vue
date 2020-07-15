<template>
  <div class="menu">
    <template v-for="(item,$index) in menuData">
      <div class="menu_box">
        <div class="menu_item_parent" @click="open_close(item,0)" :class="{selected:isSelectedMenu(item.id,0)}">
          <div class="menu_icon">
            <div :class="item.icon"></div>
          </div>
          <span v-if="item.children.length!=0">{{item.name}}</span>
          <span v-if="item.children.length==0" @click="open(item,0)">{{item.name}}</span>
          <div v-if="item.children.length!=0" :class="{up:item.isOpen,down:!item.isOpen}"></div>
        </div>
        <div class="menu_item_children_box" v-if="item.children.length!=0 && item.isOpen">
          <template v-for="(child,$index2) in item.children">
            <div class="menu_item_children" :class="{selected:isSelectedMenu(child.id,1)}" @click="open(child,1,item)">{{child.name}}</div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
      return {
        selected_menu_id:'M-1',
        menuData:[
          // {id:"M-1",name:"用户管理",path:"/configManagement/usermanagement",icon:"user",isOpen:true,children:[]},
          // {id:"M-2",name:"日志管理",path:"/configManagement/audit",icon:"xiwei",children:[]},
          {id:"M-4",name:"基金动态",path:"/configManagement/jijin",icon:"xiwei",children:[]},
          {id:"M-5",name:"自选管理",path:"/configManagement/zixuan",icon:"xiwei",children:[]},
          {id:"M-6",name:"基金业绩",path:"/configManagement/jijinhistory",icon:"xiwei",children:[]},
          // {id:"M-8",name:"测试例子",path:"/configManagement/showTest",icon:"xiwei",children:[]},
          // {id:"M-3",name:"防御能力",path:"",icon:"fangyunengli",isOpen:true,children:[
          //   {id:"M-3-1",name:"防御ZD",path:"/configManagement/denfencePosition",icon:"",children:[]},
          //   {id:"M-3-2",name:"防御系统",path:"/configManagement/denfenceSystem",icon:"",children:[]},
          //   {id:"M-3-3",name:"防御单位",path:"/configManagement/denfenceUnit",icon:"",children:[]},
          // ]},
          // {id:"M-4",name:"防御目标",path:"/configManagement/target",icon:"fangyumubiao",children:[]},
          // {id:"M-5",name:"应急资源管理",path:"",icon:"yingji",isOpen:true,children:[
          //   {id:"M-5-1",name:"应急物资管理",path:"/configManagement/emergencyMaterial",icon:"",children:[]},
          //   {id:"M-5-2",name:"应急工具管理",path:"/configManagement/emergencyTool",icon:"",children:[]},
          //   {id:"M-5-3",name:"技术支撑队伍管理",path:"/configManagement/emergencyTechnicalTeam",icon:"",children:[]},
          //   {id:"M-5-4",name:"应急联络配置管理",path:"/configManagement/emergencyContactConfig",icon:"",children:[]},
          // ]},
          // {id:"M-6",name:"知识库管理",path:"",icon:"zhishi",isOpen:true,children:[
          //   {id:"M-6-1",name:"预案管理",path:"/configManagement/knowledgebasePlan",icon:"",children:[]},
          //   {id:"M-6-2",name:"案例管理",path:"/configManagement/knowledgebaseCase",icon:"",children:[]},
          // ]},
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
      console.log(this.selected_menu_id)
    },
    open_close(item,level){
      if(level==0&&item.children.length!=0){
        item.isOpen = !item.isOpen;
      }
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
    console.log(this.$route.meta.selected_id)
    for (let i = 0; i < this.menuData.length; i++) {
      const element = this.menuData[i];
      if(element.id == this.$route.meta.selected_id){
        this.open(element,0);
        break;
      }else{
        for (let j = 0; j < element.children.length; j++) {
          const elementj = element.children[j];
          if(elementj.id == this.$route.meta.selected_id){
            console.log(elementj)
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
  width: 125px;
  margin-top: 10px;
  .menu_box{
    width: 125px;
    padding: 15px 0px;
    border-bottom: 1px solid #3a445e;
    .menu_item_parent{
      height: $menu_height;
      line-height: $menu_height;
      position: relative;
      padding: 0px 0px;
      display: flex;
      cursor: pointer;
      color: #fff;
      font-size: 14px;
      font-weight: 1000;
      font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu;
      &.selected{
        color: #098aaf;
      }
      .menu_icon{
        width: 20px;
        height: 20px;
        margin-left: 10px;
        margin-right: 10px;
        .user{
          width: 17px;
          height: 19px;
          margin-top: 7px;
          background-image: url('/static/configManagement/user.png')
        }
        .fangyunengli{
          width: 16px;
          height: 18px;
          margin-top: 10px;
          background-image: url('/static/configManagement/fangyunengli.png')
        }
        .fangyumubiao{
          width: 18px;
          height: 18px;
          margin-top: 7px;
          background-image: url('/static/configManagement/fangyumubiao.png')
        }
        .yingji{
          width: 17px;
          height: 19px;
          margin-top: 6px;
          background-image: url('/static/configManagement/yingji.png')
        }
        .zhishi{
          width: 18px;
          height: 17px;
          margin-top: 8px;
          background-image: url('/static/configManagement/zhishi.png')
        }
        .xiwei{
          width: 17px;
          height: 16px;
          margin-top: 8px;
          background-image: url('/static/configManagement/xiwei.png');
          background-size: 100%;
        }
      }
      .up{
        width: 11px;
        position: absolute;
        right: 10px;
        top: 14px;
        height: 7px;
        background-image: url('/static/configManagement/up.png');
      }
      .down{
        width: 11px;
        height: 7px;
        position: absolute;
        right: 10px;
        top: 14px;
        background-image: url('/static/configManagement/down.png');
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
        font-size: 14px;
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