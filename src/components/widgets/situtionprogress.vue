<template>
  <div class="bar_progress">
    <!-- <div class="comment">
      <span class="label">{{ label }}</span>
      <span class="value">{{ value }}</span>
    </div> -->
    <div class="track">
      <div class="inner" :style="{ width: width+'px' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bar_progress",
  props: ["label", "value", "total"],
  data() {
    return {
      width: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let per = parseInt(this.value) / parseInt(this.total),
        containerWidth = this.$el.clientWidth;
      this.width = containerWidth * per;
    }
  }
};
</script>

<style lang="scss" scoped>
.bar_progress {
  width: 100%;
  // height: 30px;
  color: #fff;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .comment {
    display: flex;
    justify-content: space-between;
    .label {
      font-size: 13px;
    }
    .value {
      font-size: 15px;
    }
  }
  .track {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.12);
    .inner {
      border-radius: 3px;
      height: 100%;
      max-width: 100%;
      white-space: nowrap;
      background-image: -moz-linear-gradient(0deg, #023c80 0%, #39f2fd 100%);
      background-image:  -webkit-linear-gradient(0deg, #023c80 0%, #39f2fd 100%);
      background-image: -ms-linear-gradient(0deg, #023c80 0%, #39f2fd 100%);
    }
  }
}
.bar_progress.progressinline{
   .track {
   .inner{
     background:#4f85fe;
      //  background-image: -webkit-linear-gradient(0deg, #4f85fe 0%, #4f85fe 100%);
  }
  }
}
</style>


