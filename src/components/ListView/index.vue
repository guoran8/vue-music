<template>
  <Scroll
    :class="$style.listView"
    :data="data"
    :isListenScroll="true"
    :probeType="3"
    @listenScroll="onListenScroll"
    ref="scroll"
  >
    <div>
      <div v-for="item in data" :key="item.alpha" ref="group">
        <p :class="$style.header">{{ item.alpha.toUpperCase() }}</p>
        <ul>
          <li :class="$style.singer" v-for="singer in item.data" :key="singer.id">
            <img :class="$style.avatar" v-lazy="singer.picUrl" :alt="singer.name" />
            <span :class="$style.name">{{ singer.name }}</span>
          </li>
        </ul>
      </div>
    </div>
    <ul
      :class="$style.nav"
      @touchstart="onAlphabetTouchStart"
      @touchmove.stop.prevent="onAlphabetTouchMove"
    >
      <li
        :class="$style['nav-item']"
        v-for="(letter, index) in alphabet"
        :key="index"
        :data-index="index">{{ letter }}</li>
    </ul>
  </Scroll>
</template>

<script>
import { getAttribute } from "@/utils/dom";
import Scroll from '@/components/Scroll';

const ALPHA_HEIGHT = 20;

export default {
  name: "index",
  components: {
      Scroll
  },
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  created() {
    this.touch = {};
  },
  methods: {
      onAlphabetTouchStart(e) {
        const index = parseInt(getAttribute(e.target, 'index'));
        const touch = e.touches[0];

        this.touch.y1 = touch.pageY;
        this.touch.index = index;
        const element = this.$refs.group[index];

        this.scrollToAlpha(element);
      },
      onAlphabetTouchMove(e) {
        const touch = e.touches[0];
        this.touch.y2 = touch.pageY;
        const delta = (this.touch.y2 - this.touch.y1) / ALPHA_HEIGHT | 0;
        const index = this.touch.index + delta;
        const element = this.$refs.group[index];

        this.scrollToAlpha(element);
      },
      scrollToAlpha(element) {
        this.$refs.scroll.scrollToElement(element, 0);
      },
      onListenScroll(pos) {
        console.log(pos);
      }
  },
  computed: {
    alphabet() {
        return this.data.map(item => (item.alpha.toUpperCase()));
    }
  }
}
</script>

<style lang="postcss" module>
@import "../../styles/variable.css";
.listView {
  position: relative;
  background: $bgColor;
}
.header {
  margin: 10px 0;
  height: 40px;
  line-height: 40px;
  text-indent: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #6e6e6e;
  background: #333333;
}
.singer {
  display: flex;
  align-items: center;
  padding: 10px 20px;
}
.avatar {
  margin-right: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.name {
  font-size: 14px;
  color: #6e6e6e;
}
.nav {
  position: absolute;
  top: 50%;
  right: 15px;
  //left: 50%;
  transform: translate(0,-60%);
  text-align: center;
}
.nav-item {
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: bold;
  color: #6e6e6e;
}
</style>