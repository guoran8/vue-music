<template>
    <Scroll ref="scroll" :data="hotList">
      <div>
        <!-- 不为空时加载slider组件,不然计算宽度会出错-->
        <Slider v-if="sliderList.length > 0">
          <div v-for="item in sliderList" :key="item.id">
            <img :class="$style['slider_img']" :src="item.picUrl" :alt="item.name" />
          </div>
        </Slider>
        <PlayList :data="hotList" @onRefresh="refreshScroll"/>
      </div>
      <div :class="$style.loading" v-show="!hotList.length">
        <Loading />
      </div>
    </Scroll>
</template>

<script>
import Slider from '@/components/Slider';
import Scroll from '@/components/Scroll';
import Loading from '@/components/Loading';
import PlayList from "./components/PlayList";
import { getRecommendList, getHotList } from "@/service/api/recommend";

export default {
    components: {
        Slider,
        PlayList,
        Scroll,
        Loading
    },
    data: () => ({
        sliderList: [],
        hotList: [],
    }),
    created() {
        this.initialData();
    },
    methods: {
        // 初始化推荐列表
        initialData() {
            getRecommendList({limit: 5}).then(res => {
                this.sliderList = res.result;
            })
            getHotList({limit: 20}).then(res => {
              this.hotList = res.playlists;
              // setTimeout(() => {
              //   this.hotList = res.playlists;
              // }, 1000)
            })
        },
        refreshScroll() {
          this.$refs.scroll.refresh();
          console.log(123);
            // if(!this.isLoaded) {
            //     this.isLoaded = true;
            //
            // }
        }
    }
}
</script>

<style lang="postcss" module>
.container {
  position: relative;
}
.slider_img {
    width: 100%;
    height: 160px;
}
.loading {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>