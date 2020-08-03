<template>
    <div :class="$style.container">
        <img :class="$style.image" src="../../assets/loading.gif" />
        <span :class="$style.text">{{ title }}</span>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '正在载入中...'
        }
    }
}
</script>

<style lang="postcss" module>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.image {
    width: 24px;
    height: 24px;
}
.text {
    font-size: 16px;
    color: #97a8be;
}
</style>