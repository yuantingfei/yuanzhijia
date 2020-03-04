<template>
  <div class="bar_rate">
    <span v-for="item in type">
      <i class="el-icon-star-on star on"></i>
    </span>
    <span v-for="item in (max-type)">
      <i class="el-icon-star-on star off"></i>
    </span>
    <span v-if="showText" class="text digi">{{value}}</span>
  </div>
</template>

<script>
export default {
  name: "bar_rate",
  props: {
    type: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 0
    },
    showText: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      max: 5
    };
  },
  filters: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.bar_rate {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .star {
    font-size: 17px;
    margin: 0 2px;
    &.on {
      color: #296bcc;
    }
    &.off {
      color: #c5c5c5;
    }
  }
  .text {
    font-size: 17px;
    margin-left: 5px;
  }
}
</style>
