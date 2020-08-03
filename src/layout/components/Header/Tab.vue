<template>
    <div :class="$style.tab">
        <router-link tag="div" :class="$style.item" to="/recommend">推荐</router-link>
        <router-link tag="div" :class="$style.item" to="/singer">歌手</router-link>
        <router-link tag="div" :class="$style.item" to="/rank">排行</router-link>
        <router-link tag="div" :class="$style.item" to="/search">搜索</router-link>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="postcss" module>
@import "../../../styles/variable.css";
.tab {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: $bgColor;
}
.item {
    padding-bottom: 10px;
    color: #5a5e66;
}

:global(.router-link-active) {
    color: $mainColor;
    border-bottom: 2px solid $mainColor;
}

</style>