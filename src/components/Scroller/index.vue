<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "scroll",
  props: {
    handleToScroll: {
      type: Function,
      defalut: function () {},
    },
    handleToTouchEnd: {
      type: Function,
      defalut: function () {},
    },
  },
  mounted() {
    setTimeout(() => {
      var scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: 1,
      });
      this.scroll = scroll;
      scroll.on("scroll", (pos) => {
        this.handleToScroll(pos);
      });
      scroll.on("touchEnd", (pos) => {
        this.handleToTouchEnd(pos);
      });
    }, 500);
  },
  methods: {
    toScrollTop(y) {
      this.scroll.scrollTo(0, y);
    },
  },
};
</script>
<style scoped>
.wrapper {
  height: 100%;
}
</style>