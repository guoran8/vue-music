<template>
  <div ref="wrapper" :class="$style.container">
    <!-- bscroll 只处理第一个子元素(content) -->
      <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        bounce: {
          type: Boolean,
          default: false
        },
        data: {
            type: Array,
            default: null
        }
    },
    data: () => ({
       scroll: null
    }),
    mounted() {
      this.$nextTick(() => {
          // this.$refs.wrapper.style.height = document.body.clientHeight + "px";
          this.initScroll();
      })
    },
    methods: {
        initScroll() {
          if(!this.$refs.wrapper) { // dom没有加载完成则不初始化scroll
              return;
          }
          this.scroll = new BScroll(this.$refs.wrapper, {
              probeType: this.probeType,
              click: this.click,
              bounce: this.bounce
          })
        },
        enable() {
            this.scroll && this.scroll.enable();
        },
        disable() {
            this.scroll && this.scroll.disable();
        },
        refresh() {
            this.scroll && this.scroll.refresh();
        },
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
        }
    },
    watch: {
        data() {
            this.$nextTick(() => {
                this.refresh();
            })
        }
    }
}
</script>

<style lang="postcss" module>
.container {
  height: 100vh;
  overflow: hidden;
}
</style>