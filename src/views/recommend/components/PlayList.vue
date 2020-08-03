<template>
  <section :class="$style.container">
    <h4 :class="$style.title">热门歌单推荐</h4>
    <div>
      <div v-for="item in data" :key="item.id" :class="$style.item">
        <img :class="$style.cover" v-lazy="item.coverImgUrl" :alt="item.name" @load="refreshScroll"/>
        <div :class="$style['item_info']">
          <span :class="$style['item_name']">{{ item.name }}</span>
          <span :class="$style['item_desc']">{{ item.description }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PlayList",
  props: ['data'],
  methods: {
    refreshScroll() {
      this.$emit('onRefresh');
    }
  }
}
</script>

<style lang="postcss" module>
@import '../../../styles/variable.css';
@import '../../../styles/mixin.css';

.container {
  padding-top: 20px;
  background: $bgColor;
}

.title {
  margin-bottom: 10px;
  font-size: 16px;
  text-align: center;
  color: $mainColor;
}

.item {
  display: flex;
  padding: 10px;
}

.item_info {
  margin-left: 10px;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  overflow: hidden;
}

.item_name {
  @include no-wrap();
  color: #ffffff;
}

.item_desc {
  @include multi-row-ellipsis(2);
  font-size: 12px;
  color: #5a5e66;
}

.cover {
  width: 80px;
  height: 80px;
}
</style>