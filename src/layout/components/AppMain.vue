<template>
    <section class="app-main">
        <keep-alive>
            <router-view />
        </keep-alive>
    </section>
</template>

<script>
    export default {
        name: 'AppMain',
        computed: {
            key() {
                return this.$route.path
            }
        }
    }
</script>

<style scoped>
</style>
