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
        v-for="(letter, index) in alphabet"
        :key="index"
        :class="[$style['nav-item'], index === currentPage ? $style['nav-item--active'] : '' ]"
        :data-index="index"
        ref="navItem"
      >{{ letter }}</li>
    </ul>
    <!-- bscroll 只处理第一个子元素 -->
    <p :class="$style['fixed-header']" ref="fixedTitle">{{ currentAlpha }}</p>
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
  data: () => ({
      currentPage: 0, // 当前字母
  }),
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
        const positionY = Math.abs(pos.y);
        const group = this.$refs.group;
        let pageHeight = 0;

        for(let i = 0; i < group.length; i++) {
            pageHeight += group[i]['clientHeight'];
            if (positionY > pageHeight) {
                this.currentPage = i + 1;

                if(pageHeight - positionY < 40) {
                    const diff = pageHeight - positionY;
                    console.log(diff)
                    this.$refs.fixedTitle.style.transform = `translate3d(0,${diff}px,0)`
                }
            }

            if(positionY < pageHeight) {
                console.log(positionY);
                console.log(pageHeight);
                this.currentPage = i;
                break;
            }
        }
        // if(this.pageHeight === 0) { // 滚动初始化高度
        //     this.pageHeight = this.$refs.group[this.currentPage].clientHeight;
        // }
        //
        // if(Math.abs(pos.y) > this.pageHeight) { // 上滑
        //     const nextPage = this.currentPage + 1;
        //     this.pageHeight += this.$refs.group[nextPage].clientHeight;
        //     this.currentPage += 1;
        // }
        //
        // const currentPage = this.currentPage;
        // const prevPage = currentPage > 0 ? (currentPage - 1) : 0;
        // const prevPageHeight = this.pageHeight - this.$refs.group[prevPage].clientHeight;
        //
        // if(Math.abs(pos.y) < prevPageHeight && prevPage < currentPage) {
        //     console.log(Math.abs(pos.y));
        //     console.log(prevPageHeight);
        //     this.pageHeight -= this.$refs.group[currentPage].clientHeight;
        //     this.currentPage -= 1;
        // }
      }
  },
  computed: {
    currentAlpha() {
      if (this.data.length > 0) {
        return this.data[this.currentPage]['alpha'].toUpperCase();
      } else {
        return 'HOT';
      }
    },
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
.group {
  position: relative;
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
.fixed-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
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

.nav-item--active {
  color: #eeeeee;
}
</style>