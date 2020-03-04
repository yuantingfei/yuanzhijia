<template>
  <div class="box_title">
    <div class="fangkuai"></div>
    <div class="text">{{title}}</div>
  </div>
</template>
<script>
export default {
  name: "title",
  props: {
    title: String
  },
  computed: {
    
  },
  watch: {

  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.box_title{
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  .fangkuai{
    margin-left: 10px;
    margin-right: 10px;
    width: 6px;
    height: 15px;
    border-radius: 3px;
    background-color: #2a93cb;
  }
  .text{
    line-height: 50px;
    font-size: 14px;
    font-weight: 700;
  }
}
</style>