<template>
    <div>
        <div :class="$style.container">
            <img :class="$style.logo" src="../../../assets/logo.png" alt="logo"/>
            <h2 :class="$style.title">G music</h2>
        </div>
        <Tab />
    </div>
</template>

<script>
import Tab from './Tab';
export default {
    components: {
        Tab
    },
    name: "Header"
}
</script>

<style lang="postcss" module>
@import "../../../styles/mixin.css";
@import "../../../styles/variable.css";
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $bgColor;
}

.logo {
    width: 30px;
    height: 30px;
    border-radius: 15px;
}

.title {
    padding: 20px 0;
    font-size: 14px;
    font-weight: normal;
    color: $mainColor;
}
</style>